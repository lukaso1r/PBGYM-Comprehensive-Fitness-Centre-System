<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';

const props = defineProps<{ memberEmail?: string }>();

const statisticStore = useStatisticsStore();
const membersManagmentStore = useMembersManagmentStore();

const currentYear = new Date().getFullYear();
const selectedYear = ref(currentYear);
const selectedEmail = ref(props.memberEmail || '');
const isLoading = ref(false);

// Pobranie listy członków, jeśli `memberEmail` nie jest przekazany
const allMembers = ref([]);
if (!props.memberEmail) {
  const { data } = await useAsyncData('members', async () => {
    await membersManagmentStore.getAllMembers();
    return membersManagmentStore.allMembers || [];
  });
  allMembers.value = data.value || [];
}

const allEmails = computed(() => allMembers.value.map(member => member.email));

// Lista lat (np. 5 lat wstecz i 2 lata do przodu)
const years = Array.from({ length: 7 }, (_, i) => currentYear - 5 + i);

// Funkcja pobierająca dane
const fetchData = async () => {
  if (selectedEmail.value) {
    isLoading.value = true;
    await statisticStore.getGroupClassesMonthlyByEmail(selectedEmail.value);
    isLoading.value = false;
  }
};

// Obserwowanie zmiany `props.memberEmail` i pobieranie danych
watch(
  () => props.memberEmail,
  (newEmail) => {
    if (newEmail) {
      selectedEmail.value = newEmail;
      fetchData();
    }
  },
  { immediate: true }
);

// Pobieranie danych po zmianie roku
watch(selectedYear, fetchData);

onMounted(() => {
  fetchData
});

// Przekształcenie danych na format wykresu
const groupClassesMonthlyByEmail = computed(() => {
  return Array.from({ length: 12 }, (_, index) => {
    const formattedMonth = `${selectedYear.value}-${String(index + 1).padStart(2, '0')}`;
    const total = statisticStore.groupClassesMonthlyByEmail[formattedMonth] || 0;

    return {
      name: new Date(`${formattedMonth}-01`).toLocaleString('pl-PL', { month: 'long' }),
      "Zajęcia grupowe": total,
    };
  });
});

// Obliczenie sumy zajęć grupowych
const totalGroupClasses = computed(() => {
  return Object.entries(statisticStore.groupClassesMonthlyByEmail)
    .filter(([key]) => key.startsWith(`${selectedYear.value}`))
    .reduce((sum, [, value]) => sum + value, 0);
});

// Zmiana roku
const changeYear = (direction: 'prev' | 'next') => {
  if (direction === 'prev') selectedYear.value--;
  else if (direction === 'next') selectedYear.value++;
};
</script>

<template>
  <div class="groupClassesMonthlyByEmail col-span-1 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg col-span-2">Zajęcia grupowe miesięcznie - <span class="font-normal text-slate-500">Z możliwością wyboru klienta</span></p>

    <!-- Nawigacja między latami -->
    <div class="year-navigation flex items-center gap-4">
      <div class="flex flex-row w-fit items-center">
        <label for="yearSelect" class="font-semibold">Wybierz rok:</label>
        <select id="yearSelect" v-model="selectedYear" class="rounded px-2 py-1">
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      <button @click="changeYear('prev')" class="bg-gray-200 px-2 py-1 rounded">
        &larr; Poprzedni rok
      </button>
      <button @click="changeYear('next')" class="bg-gray-200 px-2 py-1 rounded">
        Następny rok &rarr;
      </button>
    </div>

    <!-- Wyświetl e-mail klienta, jeśli został przekazany w props -->
    <p v-if="memberEmail" class="font-semibold col-span-2">
      Dane dla użytkownika: <span class="text-blue-600">{{ selectedEmail }}</span>
    </p>

    <!-- Wybór emaila, jeśli `memberEmail` nie został przekazany -->
    <div v-else class="email-selector col-span-2 flex gap-4 p-4 pl-0">
      <label for="emailSelect" class="font-semibold">Wybierz email:</label>
      <select id="emailSelect" v-model="selectedEmail" class="rounded px-2 py-1">
        <option v-for="email in allEmails" :key="email" :value="email">{{ email }}</option>
      </select>
    </div>

    <p class="font-semibold col-span-1">Suma zajęć: <span class="text-blue-600">{{ totalGroupClasses }}</span></p>

    <div class="total-group-classes-monthly col-span-2 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
      <BarChart
        index="name"
        :data="groupClassesMonthlyByEmail"
        :categories="['Zajęcia grupowe']"
        :y-formatter="(tick) => (Number.isInteger(tick) ? tick.toString() : '')"
        :x-axis-options="{
          type: 'category',
          ticks: {
            autoSkip: false,
            maxTicksLimit: 12,
          },
        }"
        :colors="['#203983']"
        :rounded-corners="4"
        :showLegend="false"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
