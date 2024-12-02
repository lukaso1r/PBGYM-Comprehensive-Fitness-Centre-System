<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';

const statisticStore = useStatisticsStore();

onMounted(() => {
  statisticStore.getPaymentSumMonthly(); 
});

const selectedYear = ref(2024);

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

watch(selectedYear, () => {
  console.log(`Wybrano rok: ${selectedYear.value}`);
  statisticStore.getPaymentSumMonthly(); // Pobierz dane dla nowego roku
});
</script>

<template>
  <div class="paymentSumMonthly col-span-1 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg">
      Suma płatności miesięcznie - <span class="font-normal text-slate-500">StatisticStore.paymentSumMonthly</span>
    </p>
    <!-- Dodaj przełącznik roku -->
    <div class="year-selector col-span-2 flex gap-4 p-4">
      <label for="yearSelect" class="font-semibold">Wybierz rok:</label>
      <select id="yearSelect" v-model="selectedYear">
        <option v-for="year in [2024, 2025]" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>

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
            callback: (value, index) => paymentSumMonthly[index]?.name || '',
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
