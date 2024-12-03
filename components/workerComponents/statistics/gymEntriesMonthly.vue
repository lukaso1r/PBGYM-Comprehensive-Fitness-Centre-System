<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';
import { ref, computed, watch } from 'vue';

const statisticStore = useStatisticsStore();

const selectedYear = ref(2024);

// Przekształcenie danych na format wykresu
const gymEntriesMonthly = computed(() => {
  const allMonths = [
    "styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec",
    "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
  ];
  return allMonths.map((month, index) => {
    const formattedMonth = `${selectedYear.value}-${String(index + 1).padStart(2, '0')}`;
    const total = statisticStore.gymEntriesMonthly[formattedMonth] || 0;

    return {
      name: `${month}`,
      "Wejścia": total
    };
  });
});

// Obserwacja zmiany danych w statisticStore
watch(() => statisticStore.gymEntriesMonthly, () => {
  console.log('gymEntriesMonthly', statisticStore.gymEntriesMonthly);
});
</script>

<template>
  <div class="gymEntriesMonthly col-span-1 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg">Wejścia na siłownię miesięcznie - <span class="font-normal text-slate-500">StatisticStore.gymEntriesMonthly</span> </p>
    <!-- Dodaj przełącznik roku -->
    <div class="year-selector col-span-2 flex gap-4 p-4">
      <label for="yearSelect" class="font-semibold">Wybierz rok:</label>
      <select id="yearSelect" v-model="selectedYear">
          <option v-for="year in [2024, 2025]" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>

    <div class="total-gym-entries-monthly col-span-1 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
      <BarChart
          index="name"
          :data="gymEntriesMonthly"
          :categories="['Wejścia']"
          :y-formatter="(tick) => (Number.isInteger(tick) ? tick.toString() : '')"
          :x-axis-options="{
              type: 'category',
              ticks: {
                  autoSkip: false,
                  maxTicksLimit: 12,
                  callback: (value, index) => gymEntriesMonthly[index]?.name || '',
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
