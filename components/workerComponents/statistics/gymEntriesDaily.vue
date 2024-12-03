<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';
import { ref, computed, watch } from 'vue';

const statisticStore = useStatisticsStore();

const selectedMonth = ref('2024-11');

// Przekształcenie danych na format wykresu
const gymEntriesDaily = computed(() => {
  const daysInMonth = new Date(parseInt(selectedMonth.value.split('-')[0]), parseInt(selectedMonth.value.split('-')[1]), 0).getDate();
  return Array.from({ length: daysInMonth }, (_, day) => {
    const formattedDay = `${selectedMonth.value}-${String(day + 1).padStart(2, '0')}`;
    const total = statisticStore.gymEntriesDaily[formattedDay] || 0;

    return {
      name: `${day + 1}`,
      "Wejścia": total
    };
  });
});

// Obserwacja zmiany danych w statisticStore
watch(() => statisticStore.gymEntriesDaily, () => {
  console.log('gymEntriesDaily', statisticStore.gymEntriesDaily);
});
</script>

<template>
  <div class="gymEntriesDaily col-span-1 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg">Wejścia na siłownię dziennie  -<br /> <span class="font-normal text-slate-500">StatisticStore.gymEntriesDaily</span> </p>
    <!-- Dodaj przełącznik miesiąca -->
    <div class="month-selector col-span-2 flex gap-4 p-4">
      <label for="monthSelect" class="font-semibold">Wybierz miesiąc:</label>
      <select id="monthSelect" v-model="selectedMonth">
          <option v-for="month in ['2024-11', '2024-12']" :key="month" :value="month">{{ month }}</option>
      </select>
    </div>

    <div class="total-gym-entries-daily col-span-1 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
      <BarChart
          index="name"
          :data="gymEntriesDaily"
          :categories="['Wejścia']"
          :y-formatter="(tick) => (Number.isInteger(tick) ? tick.toString() : '')"
          :x-axis-options="{
              type: 'category',
              ticks: {
                  autoSkip: false,
                  maxTicksLimit: 31,
                  callback: (value, index) => gymEntriesDaily[index]?.name || '',
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
