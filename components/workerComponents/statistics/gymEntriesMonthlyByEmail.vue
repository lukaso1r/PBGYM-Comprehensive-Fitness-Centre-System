<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';
import { ref, computed, watch, onMounted } from 'vue';

const props = defineProps<{ memberMail?: string }>();

const statisticStore = useStatisticsStore();
const membersManagmentStore = useMembersManagmentStore();

const currentYear = new Date().getFullYear();
const selectedYear = ref(currentYear);
const selectedEmail = ref(props.memberMail || '');
const isLoading = ref(false);

// Funkcja pobierająca dane dla wybranego emaila i roku
const fetchData = async () => {
  if (selectedEmail.value) {
    isLoading.value = true;
    await statisticStore.getGymEntriesMonthlyByEmail(selectedEmail.value);
    isLoading.value = false;
  }
};

// Obserwowanie zmiany `props.memberMail` i pobieranie danych
watch(
  () => props.memberMail,
  (newMail) => {
    if (newMail) {
      selectedEmail.value = newMail;
      fetchData();
    }
  },
  { immediate: true }
);

// Pobieranie danych po zmianie roku
watch(selectedYear, fetchData);

// Pobieranie danych po zamontowaniu komponentu
onMounted(() => {
  fetchData
});

// Przekształcenie danych na format wykresu
const gymEntriesMonthlyByEmail = computed(() => {
  return Array.from({ length: 12 }, (_, index) => {
    const formattedMonth = `${selectedYear.value}-${String(index + 1).padStart(2, '0')}`;
    const total = statisticStore.gymEntriesMonthlyByEmail[formattedMonth] || 0;

    return {
      name: new Date(`${formattedMonth}-01`).toLocaleString('pl-PL', { month: 'long' }),
      "Wejścia": total,
    };
  });
});

// Obliczenie sumy wejść
const totalGymEntries = computed(() => {
  return Object.entries(statisticStore.gymEntriesMonthlyByEmail)
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
  <div class="gymEntriesMonthlyByEmail col-span-1 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg col-span-2">Wejścia na siłownię miesięcznie</p>

    <!-- Nawigacja między latami -->
    <div class="year-navigation flex items-center gap-4 col-span-2">
      <div class="flex flex-row w-fit items-center">
        <label for="yearSelect" class="font-semibold">Wybierz rok:</label>
        <select id="yearSelect" v-model="selectedYear" class="rounded px-2 py-1">
          <option v-for="year in Array.from({ length: 7 }, (_, i) => currentYear - 5 + i)" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      <button @click="changeYear('prev')" class="bg-gray-200 px-2 py-1 rounded">
        &larr; Poprzedni rok
      </button>
      <button @click="changeYear('next')" class="bg-gray-200 px-2 py-1 rounded">
        Następny rok &rarr;
      </button>
    </div>

    <!-- Informacja o użytkowniku, jeśli przekazano `memberMail` -->
    <p v-if="props.memberMail" class="font-semibold col-span-2">
      Dane dla użytkownika: <span class="text-blue-600">{{ selectedEmail }}</span>
    </p>

    <p class="font-semibold col-span-1">Suma wejść: <span class="text-blue-600">{{ totalGymEntries }}</span></p>

    <div  class="total-gym-entries-monthly col-span-2 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
      <BarChart
        index="name"
        :data="gymEntriesMonthlyByEmail"
        :categories="['Wejścia']"
        :y-formatter="tick => (Number.isInteger(tick) ? tick.toString() : '')"
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
