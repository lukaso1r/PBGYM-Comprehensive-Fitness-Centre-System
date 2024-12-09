<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { BarChart } from '@/components/ui/chart-bar';

const props = defineProps<{ trainerMail?: string }>();

const statisticStore = useStatisticsStore();
const trainerStore = useTrainerStore();

const currentYear = new Date().getFullYear();
const selectedYear = ref(currentYear);
const selectedEmail = ref(props.trainerMail || '');
const isLoading = ref(false);

// Lista lat (np. 5 lat wstecz i 2 lata do przodu)
const years = Array.from({ length: 7 }, (_, i) => currentYear - 5 + i);

// Pobierz listę trenerów, jeśli `trainerMail` nie jest przekazany
const allTrainers = ref([]);
if (!props.trainerMail) {
  const { data } = await useAsyncData('trainers', async () => {
    await trainerStore.getAllTrainers();
    return trainerStore.allTrainers || [];
  });
  allTrainers.value = data.value || [];
}

// Generowanie listy emaili trenerów
const allEmails = computed(() => allTrainers.value.map(trainer => trainer.email));

// Funkcja pobierająca dane dla wybranego e-maila i roku
const fetchData = async () => {
  if (selectedEmail.value) {
    isLoading.value = true;
    await statisticStore.getMonthlyGroupClassesByTrainerEmail(selectedEmail.value, selectedYear.value);
    isLoading.value = false;
  }
};

// Obserwacja zmian `props.trainerMail` i aktualizacja `selectedEmail`
watch(
  () => props.trainerMail,
  (newMail) => {
    if (newMail) {
      selectedEmail.value = newMail;
      fetchData();
    }
  },
  { immediate: true }
);

// Obserwacja zmian `selectedEmail` i `selectedYear`
watch([selectedEmail, selectedYear], fetchData);

// Pobranie danych po zamontowaniu komponentu
onMounted(fetchData);

// Przekształcenie danych na format wykresu
const monthlyGroupClassesByTrainerEmail = computed(() => {
  return Array.from({ length: 12 }, (_, index) => {
    const formattedMonth = `${selectedYear.value}-${String(index + 1).padStart(2, '0')}`;
    const total = statisticStore.monthlyGroupClassesByTrainerEmail[formattedMonth] || 0;

    return {
      name: new Date(`${formattedMonth}-01`).toLocaleString('pl-PL', { month: 'long' }),
      "Ilość zajęć": total,
    };
  });
});

// Obliczenie sumy zajęć grupowych
const totalGroupClasses = computed(() => {
  return Object.entries(statisticStore.monthlyGroupClassesByTrainerEmail)
    .filter(([key]) => key.startsWith(`${selectedYear.value}`))
    .reduce((sum, [, value]) => sum + value, 0);
});

// Zmiana roku
const changeYear = (direction: 'prev' | 'next') => {
  if (direction === 'prev') {
    selectedYear.value--;
  } else if (direction === 'next') {
    selectedYear.value++;
  }
};
</script>

<template>
  <div class="monthlyGroupClassesByTrainerEmail col-span-1 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg col-span-2">Zajęcia grupowe zrealizowane miesięcznie <span v-if="!trainerMail" class="font-normal text-slate-500"> - Z możliwością wyboru trenera</span></p>

    <!-- Nawigacja między latami -->
    <div class="year-navigation flex items-center gap-4 col-span-1">
      <div>
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

    <!-- Informacja o użytkowniku, jeśli przekazano `trainerMail` -->
    <p v-if="props.trainerMail" class="font-semibold col-span-2">
      Dane dla trenera: <span class="text-blue-600">{{ selectedEmail }}</span>
    </p>

    <!-- Wybór emaila tylko jeśli `trainerMail` nie został przekazany -->
    <div v-else class="email-selector col-span-2 flex gap-4 p-4 pl-0 items-center">
      <label for="emailSelect" class="font-semibold">Wybierz email:</label>
      <select id="emailSelect" v-model="selectedEmail" class="rounded px-2 py-1">
        <option v-for="email in allEmails" :key="email" :value="email">{{ email }}</option>
      </select>
    </div>

    <p class="font-semibold col-span-1">Suma zajęć: <span class="text-blue-600">{{ totalGroupClasses }}</span></p>

    
    <div class="total-group-classes-monthly col-span-2 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
      <BarChart
        index="name"
        :data="monthlyGroupClassesByTrainerEmail"
        :categories="['Ilość zajęć']"
        :y-formatter="tick => (Number.isInteger(tick) ? tick.toString() : '')"
        :x-axis-options="{
          type: 'category',
          ticks: {
            autoSkip: false,
            maxTicksLimit: 12,
            callback: (value, index) => monthlyGroupClassesByTrainerEmail.value[index]?.name || '',
          }
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
