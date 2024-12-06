<script setup lang="ts">
import { ref, computed } from 'vue';
import { BarChart } from '@/components/ui/chart-bar';

const loggedMemberStore = useLoggedMemberStore();

const selectedYear = ref(new Date().getFullYear()); // Domyślnie bieżący rok

// Przekształcenie danych na format wykresu
const gymEntriesMonthly = computed(() => {
  return Array.from({ length: 12 }, (_, index) => {
    const formattedMonth = `${selectedYear.value}-${String(index + 1).padStart(2, '0')}`;
    const total = loggedMemberStore.memberMonthlyGymEntriesByEmail[formattedMonth] || 0;

    return {
      name: `${new Date(`${formattedMonth}-01`).toLocaleString('pl-PL', { month: 'long' })}`,
      "Wejścia": total,
    };
  });
});

// Obliczenie sumy wejść
const totalGymEntries = computed(() => {
  return Object.entries(loggedMemberStore.memberMonthlyGymEntriesByEmail)
    .filter(([key]) => key.startsWith(`${selectedYear.value}`)) // Filtruj tylko dane dla wybranego roku
    .reduce((sum, [, value]) => sum + value, 0);
});

// Funkcje zmiany roku
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
    <p class="font-semibold text-lg">Miesięczne wejścia na siłownię <br />
        <span class="text-slate-500">Rok: {{ selectedYear }}</span>
    </p>

    <!-- Nawigacja między latami -->
    <div class="year-navigation flex items-center gap-4">
      <button @click="changeYear('prev')" class="bg-gray-200 px-2 py-1 rounded">
        &larr; Poprzedni rok
      </button>
      <button @click="changeYear('next')" class="bg-gray-200 px-2 py-1 rounded">
        Następny rok &rarr;
      </button>
    </div>

    <p class="font-semibold">Suma wejść: <span class="text-blue-600">{{ totalGymEntries }}</span></p>

    <div class="total-gym-entries-monthly col-span-1 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
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
            callback: (value, index) => gymEntriesMonthly[index]?.name || '',
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
