<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';
import { ref, computed, watch, onMounted } from 'vue';

const statisticStore = useStatisticsStore();

onMounted(async () => {
  await statisticStore.getGymEntriesMonthly();
});

const currentYear = new Date().getFullYear();
const selectedYear = ref(currentYear);

// Lista lat (np. 5 lat wstecz i 2 lata do przodu)
const years = Array.from({ length: 7 }, (_, i) => currentYear - 5 + i);

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

// Pobierz dane przy zmianie roku
watch(selectedYear, async () => {
  await statisticStore.getGymEntriesMonthly();
  console.log(`Wybrano rok: ${selectedYear.value}`);
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
  <div class="gymEntriesMonthly col-span-1 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg col-span-2">Wejścia na siłownię miesięcznie</p>
    
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

    <!-- Wykres -->
    <div class="total-gym-entries-monthly col-span-2 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
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
            callback: (value, index) => gymEntriesMonthly.value[index]?.name || '',
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
