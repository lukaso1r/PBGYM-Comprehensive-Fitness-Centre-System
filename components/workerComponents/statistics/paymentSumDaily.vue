<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';
import { ref, computed, onMounted, watch } from 'vue';

const statisticStore = useStatisticsStore();

onMounted(() => {
  statisticStore.getPaymentSumDaily(); // Pobierz dane dzienne na temat sum płatności
});

// Miesiące i lata do wyboru
const allMonths = [
  { name: "styczeń", value: 1 },
  { name: "luty", value: 2 },
  { name: "marzec", value: 3 },
  { name: "kwiecień", value: 4 },
  { name: "maj", value: 5 },
  { name: "czerwiec", value: 6 },
  { name: "lipiec", value: 7 },
  { name: "sierpień", value: 8 },
  { name: "wrzesień", value: 9 },
  { name: "październik", value: 10 },
  { name: "listopad", value: 11 },
  { name: "grudzień", value: 12 },
];

const currentDate = new Date();
const selectedYear = ref(currentDate.getFullYear());
const selectedMonth = ref(currentDate.getMonth() + 1); // Miesiące w JavaScript są indeksowane od 0

// Obliczenia sumy płatności dziennych dla wybranego miesiąca
const paymentSumDaily = computed(() => {
  const daysInMonth = new Date(selectedYear.value, selectedMonth.value, 0).getDate(); // Ilość dni w wybranym miesiącu
  return Array.from({ length: daysInMonth }, (_, dayIndex) => {
    const formattedDay = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, "0")}-${String(dayIndex + 1).padStart(2, "0")}`;
    const total = statisticStore.paymentSumDaily[formattedDay] || 0;

    return {
      name: `${dayIndex + 1}`,
      "Suma płatności (zł)": total,
    };
  });
});

// Przełącz miesiąc do przodu lub do tyłu za pomocą strzałek
const changeMonth = (direction: 'prev' | 'next') => {
  if (direction === 'prev') {
    if (selectedMonth.value === 1) {
      selectedMonth.value = 12;
      selectedYear.value--;
    } else {
      selectedMonth.value--;
    }
  } else if (direction === 'next') {
    if (selectedMonth.value === 12) {
      selectedMonth.value = 1;
      selectedYear.value++;
    } else {
      selectedMonth.value++;
    }
  }
};

watch([selectedYear, selectedMonth], () => {
  console.log(`Wybrano miesiąc: ${selectedMonth.value}, rok: ${selectedYear.value}`);
  statisticStore.getPaymentSumDaily(); // Pobierz dane dla nowego miesiąca i roku
});
</script>

<template>
  <div class="paymentSumDaily col-span-2 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg">
      Suma płatności dziennie - <span class="font-normal text-slate-500">StatisticStore.paymentSumDaily</span>
    </p>
    
    <!-- Wybierz rok i miesiąc -->
    <div class="month-selector col-span-2 flex items-center gap-4 p-4">
      <label for="yearSelect" class="font-semibold">Wybierz rok:</label>
      <select id="yearSelect" v-model="selectedYear">
        <option v-for="year in [2024, 2025]" :key="year" :value="year">{{ year }}</option>
      </select>

      <label for="monthSelect" class="font-semibold">Wybierz miesiąc:</label>
      <select id="monthSelect" v-model="selectedMonth">
        <option v-for="month in allMonths" :key="month.value" :value="month.value">{{ month.name }}</option>
      </select>

      <!-- Przełączniki do zmiany miesiąca -->
      <button @click="changeMonth('prev')" class="bg-gray-200 px-2 py-1 rounded">
        &larr; Poprzedni miesiąc
      </button>
      <button @click="changeMonth('next')" class="bg-gray-200 px-2 py-1 rounded">
        Następny miesiąc &rarr;
      </button>
    </div>

    <!-- Wykres sumy płatności dziennych -->
    <div class="total-daily-payment col-span-1 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
      <BarChart
        index="name"
        :data="paymentSumDaily"
        :categories="['Suma płatności (zł)']"
        :y-formatter="(tick) => (Number.isInteger(tick) ? tick.toString() : '')"
        :x-axis-options="{
          type: 'category',
          ticks: {
            autoSkip: false,
            maxTicksLimit: 31,
            callback: (value, index) => paymentSumDaily[index]?.name || '',
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
/* Dodaj style w razie potrzeby */
</style>
