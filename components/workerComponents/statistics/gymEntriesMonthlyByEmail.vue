<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';

const statisticStore = useStatisticsStore();
const membersManagmentStore = useMembersManagmentStore();

// Pobierz wszystkie emaile członków
const { data: allMembers } = await useAsyncData('members', async () => {
  await membersManagmentStore.getAllMembers();
  return membersManagmentStore.allMembers || [];
}, { default: () => [] });

const selectedEmail = ref('');
const allEmails = computed(() => allMembers.value.map(member => member.email));
const currentYear = new Date().getFullYear();
const selectedYear = ref(currentYear); // Domyślnie bieżący rok

// Lista lat (np. 5 lat wstecz i 2 lata do przodu)
const years = Array.from({ length: 7 }, (_, i) => currentYear - 5 + i);

// Przekształcenie danych na format wykresu
const gymEntriesMonthlyByEmail = computed(() => {
  return Array.from({ length: 12 }, (_, index) => {
    const formattedMonth = `${selectedYear.value}-${String(index + 1).padStart(2, '0')}`;
    const total = statisticStore.gymEntriesMonthlyByEmail[formattedMonth] || 0;

    return {
      name: `${new Date(`${formattedMonth}-01`).toLocaleString('pl-PL', { month: 'long' })}`,
      "Wejścia": total,
    };
  });
});

// Obliczenie sumy wejść
const totalGymEntries = computed(() => {
  return Object.entries(statisticStore.gymEntriesMonthlyByEmail)
    .filter(([key]) => key.startsWith(`${selectedYear.value}`))
    .reduce((sum, [, value]) => sum + value, 0);
});

// Obserwacja zmiany danych w statisticStore
watch(() => statisticStore.gymEntriesMonthlyByEmail, () => {
  console.log('gymEntriesMonthlyByEmail', statisticStore.gymEntriesMonthlyByEmail);
});

// Pobierz dane dla wybranego emaila i roku
watch([selectedEmail, selectedYear], async () => {
  if (selectedEmail.value) {
    await statisticStore.getGymEntriesMonthlyByEmail(selectedEmail.value, selectedYear.value);
  }
}, { immediate: true });

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
  <div class="gymEntriesMonthlyByEmail col-span-1 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
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

    <!-- Wybór emaila -->
    <div class="email-selector col-span-2 flex gap-4 p-4 pl-0">
      <label for="emailSelect" class="font-semibold">Wybierz email:</label>
      <select id="emailSelect" v-model="selectedEmail" class="rounded px-2 py-1">
        <option v-for="email in allEmails" :key="email" :value="email">{{ email }}</option>
      </select>
      <p class="font-semibold">Suma wejść: <span class="text-blue-600">{{ totalGymEntries }}</span></p>
    </div>

    <!-- Wykres -->
    <div class="total-gym-entries-monthly col-span-2 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
      <BarChart
        index="name"
        :data="gymEntriesMonthlyByEmail"
        :categories="['Wejścia']"
        :y-formatter="(tick) => (Number.isInteger(tick) ? tick.toString() : '')"
        :x-axis-options="{
          type: 'category',
          ticks: {
            autoSkip: false,
            maxTicksLimit: 12,
            callback: (value, index) => gymEntriesMonthlyByEmail.value[index]?.name || '',
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
