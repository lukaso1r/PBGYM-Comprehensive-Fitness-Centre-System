<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';
import { ref, computed, watch } from 'vue';

const statisticStore = useStatisticsStore();

const selectedYear = ref(2024);

// Miesiące w języku polskim
const allMonths = [
  "styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec",
  "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
];

// Przekształcenie danych na format wykresu
const memberRegistrationsMonthly = computed(() => {
  return allMonths.map((month, index) => {
    const formattedMonth = new Date(`${selectedYear.value}-${index + 1}-01`).toISOString().slice(0, 7);
    const total = statisticStore.memberRegistrationsMonthly[formattedMonth] || 0;
    return {
      name: `${month}`,
      "Rejestracje": total
    };
  });
});

// Obserwacja zmiany danych w statisticStore
watch(() => statisticStore.memberRegistrationsMonthly, () => {
  console.log('memberRegistrationsMonthly', statisticStore.memberRegistrationsMonthly);
});
</script>

<template>
  <div class="memberRegistrationsMonthly col-span-1 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg">Rejestracje członków miesięcznie - <span class="font-normal text-slate-500">StatisticStore.memberRegistrationsMonthly</span> </p>
    <!-- Dodaj przełącznik roku -->
    <div class="year-selector col-span-2 flex gap-4 p-4">
      <label for="yearSelect" class="font-semibold">Wybierz rok:</label>
      <select id="yearSelect" v-model="selectedYear">
          <option v-for="year in [2024, 2025]" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>

    <div class="total-member-registrations col-span-1 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
        <BarChart
            index="name"
            :data="memberRegistrationsMonthly"
            :categories="['Rejestracje']"
            :y-formatter="(tick) => (Number.isInteger(tick) ? tick.toString() : '')"
            :x-axis-options="{
                type: 'category',
                ticks: {
                    autoSkip: false,
                    maxTicksLimit: 12,
                    callback: (value, index) => memberRegistrationsMonthly[index]?.name || '',
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
