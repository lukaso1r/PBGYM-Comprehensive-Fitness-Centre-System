<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';

const statisticStore = useStatisticsStore();
const trainerStore = useTrainerStore();

// Pobierz wszystkie emaile trenerów
const { data: allTrainers } = await useAsyncData('trainers', async () => {
  await trainerStore.getAllTrainers();
  return trainerStore.allTrainers || [];
}, { default: () => [] });

const selectedEmail = ref('');
const allEmails = computed(() => allTrainers.value.map(trainer => trainer.email));

// Przekształcenie danych na format wykresu
const monthlyGroupClassesByTrainerEmail = computed(() => {
  return Object.entries(statisticStore.monthlyGroupClassesByTrainerEmail).map(([month, classes]) => ({
    name: new Date(`${month}-01`).toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' }),
    "Ilość zajęć": classes,
  }));
});

// Obliczenie sumy zajęć grupowych
const totalGroupClasses = computed(() => {
  return Object.values(statisticStore.monthlyGroupClassesByTrainerEmail).reduce((sum, value) => sum + value, 0);
});

// Obserwacja zmiany danych w statisticStore
watch(() => statisticStore.monthlyGroupClassesByTrainerEmail, () => {
  console.log('monthlyGroupClassesByTrainerEmail', statisticStore.monthlyGroupClassesByTrainerEmail);
});

// Pobierz dane dla wybranego emaila
watch(selectedEmail, async () => {
  if (selectedEmail.value) {
    await statisticStore.getMonthlyGroupClassesByTrainerEmail(selectedEmail.value);
  }
});
</script>

<template>
  <div class="monthlyGroupClassesByTrainerEmail col-span-1 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg">Zajęcia grupowe zrealizowane miesięcznie - <span class="font-normal text-slate-500">StatisticStore.monthlyGroupClassesByTrainerEmail</span> </p>
    <!-- Dodaj przełącznik emaila -->
    <div class="email-selector col-span-2 flex gap-4 p-4">
      <label for="emailSelect" class="font-semibold">Wybierz email:</label>
      <select id="emailSelect" v-model="selectedEmail">
        <option v-for="email in allEmails" :key="email" :value="email">{{ email }}</option>
      </select>
      <p class="font-semibold">Suma zajęć: <span class="text-blue-600">{{ totalGroupClasses }}</span></p>
    </div>

    <div class="total-group-classes-monthly col-span-1 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
      <BarChart
          index="name"
          :data="monthlyGroupClassesByTrainerEmail"
          :categories="['Ilość zajęć']"
          :y-formatter="(tick) => (Number.isInteger(tick) ? tick.toString() : '')"
          :x-axis-options="{
              type: 'category',
              ticks: {
                  autoSkip: false,
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
