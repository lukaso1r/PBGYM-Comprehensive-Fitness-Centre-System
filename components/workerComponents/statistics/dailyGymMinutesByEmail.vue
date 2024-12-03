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

// Przekształcenie danych na format wykresu
const dailyGymMinutesByEmail = computed(() => {
  return Object.entries(statisticStore.dailyGymMinutesByEmail).map(([date, minutes]) => ({
    name: new Date(date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    "Czas na siłowni (minuty)": minutes,
  }));
});

// Obliczenie sumy minut na siłowni
const totalGymMinutes = computed(() => {
  return Object.values(statisticStore.dailyGymMinutesByEmail).reduce((sum, value) => sum + value, 0);
});

// Obserwacja zmiany danych w statisticStore
watch(() => statisticStore.dailyGymMinutesByEmail, () => {
  console.log('dailyGymMinutesByEmail', statisticStore.dailyGymMinutesByEmail);
});

// Pobierz dane dla wybranego emaila
watch(selectedEmail, async () => {
  if (selectedEmail.value) {
    await statisticStore.getDailyGymMinutesByEmail(selectedEmail.value);
  }
});
</script>

<template>
  <div class="dailyGymMinutesByEmail col-span-1 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg">Minuty na siłowni -<br /> <span class="font-normal text-slate-500">StatisticStore.dailyGymMinutesByEmail</span> </p>
    <!-- Dodaj przełącznik emaila -->
    <div class="email-selector col-span-2 flex gap-4 p-4">
      <label for="emailSelect" class="font-semibold">Wybierz email:</label>
      <select id="emailSelect" v-model="selectedEmail">
        <option v-for="email in allEmails" :key="email" :value="email">{{ email }}</option>
      </select>
      <p class="font-semibold">Suma minut: <span class="text-blue-600">{{ totalGymMinutes }}</span></p>
    </div>

    <div class="total-gym-minutes-daily col-span-1 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
      <BarChart
          index="name"
          :data="dailyGymMinutesByEmail"
          :categories="['Czas na siłowni (minuty)']"
          :y-formatter="(tick) => (Number.isInteger(tick) ? tick.toString() : '')"
          :x-axis-options="{
              type: 'category',
              ticks: {
                  autoSkip: false,
                  callback: (value, index) => dailyGymMinutesByEmail.value[index]?.name || '',
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
