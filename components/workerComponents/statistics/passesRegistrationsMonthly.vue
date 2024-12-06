<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';
import { ref, computed, onMounted, watch } from 'vue';

const statisticStore = useStatisticsStore();

onMounted(() => {
  statisticStore.getPassesRegistrationsMonthly(); // Pobierz dane miesięczne na temat rejestracji karnetów
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

const currentYear = new Date().getFullYear();
const selectedYear = ref(currentYear);

// Lista lat (np. 5 lat wstecz i 2 lata do przodu)
const years = Array.from({ length: 7 }, (_, i) => currentYear - 5 + i);

// Obliczenia rejestracji karnetów miesięcznych dla wybranego roku
const passesRegistrationsMonthly = computed(() => {
  return allMonths.map((month, index) => {
    const formattedMonth = `${selectedYear.value}-${String(index + 1).padStart(2, "0")}`;
    const total = statisticStore.passesRegistrationsMonthly[formattedMonth] || 0;

    return {
      name: `${month.name}`,
      "Liczba rejestracji": total,
    };
  });
});

// Obserwowanie zmiany roku
watch(selectedYear, async () => {
  console.log(`Wybrano rok: ${selectedYear.value}`);
  await statisticStore.getPassesRegistrationsMonthly(); // Pobierz dane dla nowego roku
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
  <div class="passesRegistrationsMonthly col-span-1 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg">
      Kupno karnetów miesięcznie
    </p>

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

    <!-- Wykres rejestracji karnetów miesięcznie -->
    <div class="total-passes-registrations col-span-1 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
      <BarChart
        index="name"
        :data="passesRegistrationsMonthly"
        :categories="['Liczba rejestracji']"
        :y-formatter="(tick) => (Number.isInteger(tick) ? tick.toString() : '')"
        :x-axis-options="{
          type: 'category',
          ticks: {
            autoSkip: false,
            maxTicksLimit: 12,
            callback: (value, index) => passesRegistrationsMonthly.value[index]?.name || '',
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
