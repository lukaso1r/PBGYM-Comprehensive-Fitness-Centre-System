<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';
import CustomChartTooltip from './CustomChartTooltip.vue';

const statisticStore = useStatisticsStore();

onMounted(() => {
  statisticStore.getGroupClassesMonthly();
});

const currentYear = new Date().getFullYear();
const selectedYear = ref(currentYear);

// Lista lat (np. 5 lat wstecz i 2 do przodu)
const years = Array.from({ length: 7 }, (_, i) => currentYear - 5 + i);

const allMonths = [
  "styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec",
  "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
];

const groupClassesMonthly = computed(() => {
  return allMonths.map((month, index) => {
    const formattedMonth = `${selectedYear.value}-${String(index + 1).padStart(2, "0")}`;
    const total = statisticStore.groupClassesMonthly[formattedMonth] || 0;

    return {
      name: `${month}`,
      "Ilość zajęć": total
    };
  });
});

// Funkcje nawigacji między latami
const changeYear = (direction: 'prev' | 'next') => {
  if (direction === 'prev') {
    selectedYear.value--;
  } else if (direction === 'next') {
    selectedYear.value++;
  }
};

// Pobierz dane przy zmianie roku
watch(selectedYear, () => {
  console.log(`Wybrano rok: ${selectedYear.value}`);
  statisticStore.getGroupClassesMonthly(); // Pobierz dane dla nowego roku
});
</script>

<template>
  <div class="groupClassesMonthly col-span-1 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg">
      Ilość zajęć grupowych miesięcznie - <span class="font-normal text-slate-500">Bez podziału na trenerów</span>
    </p>

    <!-- Nawigacja między latami i wybór roku -->
    <div class="year-navigation col-span-2 flex gap-4 flex-row items-center">
      
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

    <!-- Wykres -->
    <div class="total-entrance-amount col-span-1 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
      <BarChart
        index="name"
        :data="groupClassesMonthly"
        :categories="['Ilość zajęć']"
        :y-formatter="(tick) => (Number.isInteger(tick) ? tick.toString() : '')"
        :x-axis-options="{
          type: 'category',
          ticks: {
            autoSkip: false,
            maxTicksLimit: 12,
            callback: (value, index) => groupClassesMonthly[index]?.name || '',
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
