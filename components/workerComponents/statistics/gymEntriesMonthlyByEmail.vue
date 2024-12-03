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
const selectedMonth = ref('2024-11');

// Przekształcenie danych na format wykresu
const gymEntriesMonthlyByEmail = computed(() => {
  return Array.from({ length: 12 }, (_, index) => {
    const formattedMonth = `${selectedMonth.value.split('-')[0]}-${String(index + 1).padStart(2, '0')}`;
    const total = statisticStore.gymEntriesMonthlyByEmail[formattedMonth] || 0;

    return {
      name: `${new Date(`${formattedMonth}-01`).toLocaleString('pl-PL', { month: 'long' })}`,
      "Wejścia": total
    };
  });
});

// Obliczenie sumy wejść
const totalGymEntries = computed(() => {
  return Object.values(statisticStore.gymEntriesMonthlyByEmail).reduce((sum, value) => sum + value, 0);
});

// Obserwacja zmiany danych w statisticStore
watch(() => statisticStore.gymEntriesMonthlyByEmail, () => {
  console.log('gymEntriesMonthlyByEmail', statisticStore.gymEntriesMonthlyByEmail);
});

// Pobierz dane dla wybranego emaila
watch(selectedEmail, async () => {
  if (selectedEmail.value) {
    await statisticStore.getGymEntriesMonthlyByEmail(selectedEmail.value);
  }
});
</script>

<template>
  <div class="gymEntriesMonthlyByEmail col-span-1 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg">Wejścia na siłownię miesięcznie - <span class="font-normal text-slate-500">StatisticStore.gymEntriesMonthlyByEmail</span> </p>
    <!-- Dodaj przełącznik emaila -->
    <div class="email-selector col-span-2 flex gap-4 p-4">
      <label for="emailSelect" class="font-semibold">Wybierz email:</label>
      <select id="emailSelect" v-model="selectedEmail">
        <option v-for="email in allEmails" :key="email" :value="email">{{ email }}</option>
      </select>
      <p class="font-semibold">Suma wejść: <span class="text-blue-600">{{ totalGymEntries }}</span></p>
    </div>

    <div class="total-gym-entries-monthly col-span-1 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
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
                  callback: (value, index) => gymEntriesMonthlyByEmail[index]?.name || '',
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
