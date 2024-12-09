<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';
import { ref, computed, watch, onMounted } from 'vue';

const statisticStore = useStatisticsStore();
const selectedYear = ref(2024);

// Pobierz dane przy montowaniu komponentu
onMounted(() => {
  statisticStore.getMemberRegistrationsMonthly();
});

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

// Funkcja do zmiany roku
const changeYear = (direction: 'prev' | 'next') => {
  if (direction === 'prev') {
    selectedYear.value--;
  } else if (direction === 'next') {
    selectedYear.value++;
  }
};
</script>

<template>
  <div class="memberRegistrationsMonthly col-span-1 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg">
      Rejestracje członków miesięcznie
    </p>
    
    <!-- Nawigacja między latami -->
    <div class="year-navigation flex items-center gap-4 p-4">
      
      
      <div class="flex items-center">
        <label for="yearSelect" class="font-semibold mr-2">Wybierz rok:</label>
        <select id="yearSelect" v-model="selectedYear" class="rounded px-2 py-1">
          <option v-for="year in [2024, 2025, 2026, 2027, 2028]" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      
      <button @click="changeYear('next')" class="bg-gray-200 px-2 py-1 rounded">
        Następny rok &rarr;
      </button>
      <button @click="changeYear('prev')" class="bg-gray-200 px-2 py-1 rounded">
        &larr; Poprzedni rok
      </button>
    </div>

    <!-- Wykres rejestracji członków -->
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
.year-navigation button {
  transition: background-color 0.2s ease;
}
.year-navigation button:hover {
  background-color: #d1d5db;
}
</style>
