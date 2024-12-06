<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { BarChart } from '@/components/ui/chart-bar';

const props = defineProps<{ email: string }>();

const loggedMemberStore = useLoggedMemberStore();

const selectedYear = ref(new Date().getFullYear()); // Domyślnie bieżący rok

// Przekształcenie danych na format wykresu
const groupClassesMonthlyByEmail = computed(() => {
  return Array.from({ length: 12 }, (_, index) => {
    const formattedMonth = `${selectedYear.value}-${String(index + 1).padStart(2, '0')}`;
    const total = loggedMemberStore.groupClassesMonthlyByEmail[formattedMonth] || 0;

    return {
      name: `${new Date(`${formattedMonth}-01`).toLocaleString('pl-PL', { month: 'long' })}`,
      "Zajęcia grupowe": total,
    };
  });
});

// Obliczenie sumy zajęć grupowych
const totalGroupClasses = computed(() => {
  return Object.entries(loggedMemberStore.groupClassesMonthlyByEmail)
    .filter(([key]) => key.startsWith(`${selectedYear.value}`)) // Filtruj dane tylko dla wybranego roku
    .reduce((sum, [, value]) => sum + value, 0);
});

// Pobierz dane przy zmianie emaila lub roku
watch(
  () => [props.email, selectedYear],
  async () => {
    if (props.email) {
      await loggedMemberStore.getGroupClassesMonthlyByEmail(props.email, selectedYear.value);
    }
  },
  { immediate: true }
);

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
    <p class="font-semibold text-lg">Uczestnictwo w zajęciach grupowych miesięcznie<br />
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

    <p class="font-semibold">Suma zajęć: <span class="text-blue-600">{{ totalGroupClasses }}</span></p>

    <div class="total-group-classes-monthlycol-span-1 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
      <BarChart
        index="name"
        :data="groupClassesMonthlyByEmail"
        :categories="['Zajęcia grupowe']"
        :y-formatter="(tick) => (Number.isInteger(tick) ? tick.toString() : '')"
        :x-axis-options="{
          type: 'category',
          ticks: {
            autoSkip: false,
            maxTicksLimit: 12,
            callback: (value, index) => groupClassesMonthlyByEmail.value[index]?.name || '',
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
