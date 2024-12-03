<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';
import { ref, computed, onMounted, watch } from 'vue';

const statisticStore = useStatisticsStore();

onMounted(() => {
  statisticStore.getPassesRegistrationsDaily(); // Pobierz dane dzienne o rejestracjach karnetów
});

// Lista miesięcy oraz lat dostępnych do wyboru
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

const selectedYear = ref(2024);
const selectedMonth = ref(11); // Domyślnie ustawiony miesiąc na listopad

// Obliczenia dziennych rejestracji karnetów dla wybranego roku i miesiąca
const passesRegistrationsDaily = computed(() => {
  const daysInMonth = new Date(selectedYear.value, selectedMonth.value, 0).getDate(); // Liczba dni w wybranym miesiącu
  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = String(index + 1).padStart(2, '0');
    const formattedDate = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}-${day}`;
    const total = statisticStore.passesRegistrationsDaily[formattedDate] || 0;

    return {
      name: `${day}`,
      "Liczba rejestracji": total,
    };
  });
});

// Metoda do zmiany miesiąca za pomocą strzałek
const changeMonth = (increment: number) => {
  let newMonth = selectedMonth.value + increment;
  let newYear = selectedYear.value;

  if (newMonth > 12) {
    newMonth = 1;
    newYear += 1;
  } else if (newMonth < 1) {
    newMonth = 12;
    newYear -= 1;
  }

  selectedMonth.value = newMonth;
  selectedYear.value = newYear;
};

// Obserwowanie zmiany miesiąca lub roku
watch([selectedYear, selectedMonth], () => {
  console.log(`Wybrano rok: ${selectedYear.value}, miesiąc: ${selectedMonth.value}`);
  statisticStore.getPassesRegistrationsDaily(); // Pobierz dane dla nowego miesiąca
});
</script>

<template>
  <div class="passesRegistrationsDaily col-span-2 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg">
      Rejestracje karnetów dziennie - <span class="font-normal text-slate-500">StatisticStore.passesRegistrationsDaily</span>
    </p>
    
    <!-- Wybór miesiąca i roku -->
    <div class="month-year-selector col-span-2 flex items-center gap-4 p-4">
      <label for="yearSelect" class="font-semibold">Wybierz rok:</label>
      <select id="yearSelect" v-model="selectedYear">
        <option v-for="year in [2024, 2025]" :key="year" :value="year">{{ year }}</option>
      </select>

      <label for="monthSelect" class="font-semibold ml-4">Wybierz miesiąc:</label>
      <select id="monthSelect" v-model="selectedMonth">
        <option v-for="month in allMonths" :key="month.value" :value="month.value">{{ month.name }}</option>
      </select>

      <div class="month-navigation ml-4 flex items-center gap-2">
        <button @click="changeMonth(-1)" class="bg-gray-200 px-2 py-1 rounded">
            &larr; Poprzedni miesiąc
          </button>
          <button @click="changeMonth(+1)" class="bg-gray-200 px-2 py-1 rounded">
            Następny miesiąc &rarr;
          </button>
      </div>
    </div>

    <!-- Wykres rejestracji karnetów dziennie -->
    <div class="total-passes-registrations-daily col-span-1 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
      <BarChart
        index="name"
        :data="passesRegistrationsDaily"
        :categories="['Liczba rejestracji']"
        :y-formatter="(tick) => (Number.isInteger(tick) ? tick.toString() : '')"
        :x-axis-options="{
          type: 'category',
          ticks: {
            autoSkip: false,
            maxTicksLimit: 31,
            callback: (value, index) => passesRegistrationsDaily[index]?.name || '',
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
  
