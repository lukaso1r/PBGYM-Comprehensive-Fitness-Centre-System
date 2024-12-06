<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';

const statisticStore = useStatisticsStore();

onMounted(() => {
  statisticStore.getPaymentSumMonthly(); 
});

const currentYear = new Date().getFullYear();
const selectedYear = ref(currentYear);

const allMonths = [
  "styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec",
  "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
];

const paymentSumMonthly = computed(() => {
  return allMonths.map((month, index) => {
    const formattedMonth = `${selectedYear.value}-${String(index + 1).padStart(2, "0")}`;
    const total = statisticStore.paymentSumMonthly[formattedMonth] || 0;

    return {
      name: `${month}`,
      "Suma płatności (zł)": total
    };
  });
});

// Pobierz dane przy zmianie roku
watch(selectedYear, async () => {
  console.log(`Wybrano rok: ${selectedYear.value}`);
  await statisticStore.getPaymentSumMonthly();
});

// Funkcja zmiany roku
const changeYear = (direction: 'prev' | 'next') => {
  if (direction === 'prev') {
    selectedYear.value--;
  } else if (direction === 'next') {
    selectedYear.value++;
  }
};
</script>

<template>
  <div class="paymentSumMonthly col-span-1 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg">
      Suma płatności miesięcznie
    </p>

    <!-- Nawigacja między latami -->
    <div class="year-navigation flex items-center gap-4">
      
      <div class="flex flex-row w-fit items-center">
        <label for="yearSelect" class="font-semibold">Wybierz rok:</label>
        <select id="yearSelect" v-model="selectedYear" class="rounded px-2 py-1">
          <option v-for="year in [2024, 2025, 2026]" :key="year" :value="year">{{ year }}</option>
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
    <div class="total-payment-amount col-span-1 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
      <BarChart
        index="name"
        :data="paymentSumMonthly"
        :categories="['Suma płatności (zł)']"
        :y-formatter="(tick) => (Number.isInteger(tick) ? tick.toString() : '')"
        :x-axis-options="{
          type: 'category',
          ticks: {
            autoSkip: false,
            maxTicksLimit: 12,
            callback: (value, index) => paymentSumMonthly.value[index]?.name || '',
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
