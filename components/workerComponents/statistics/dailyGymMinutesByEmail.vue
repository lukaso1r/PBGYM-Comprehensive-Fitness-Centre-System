<script setup lang="ts">
import { ref, computed, watch } from 'vue';
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
const selectedYear = ref(currentYear);
const selectedMonth = ref(new Date().getMonth() + 1); // Bieżący miesiąc

// Lista miesięcy
const months = [
  { name: 'Styczeń', value: 1 },
  { name: 'Luty', value: 2 },
  { name: 'Marzec', value: 3 },
  { name: 'Kwiecień', value: 4 },
  { name: 'Maj', value: 5 },
  { name: 'Czerwiec', value: 6 },
  { name: 'Lipiec', value: 7 },
  { name: 'Sierpień', value: 8 },
  { name: 'Wrzesień', value: 9 },
  { name: 'Październik', value: 10 },
  { name: 'Listopad', value: 11 },
  { name: 'Grudzień', value: 12 },
];

// Lista lat (np. 5 lat wstecz i 2 do przodu)
const years = Array.from({ length: 7 }, (_, i) => currentYear - 5 + i);

// Przekształcenie danych na format wykresu
const dailyGymMinutesByEmail = computed(() => {
  const daysInMonth = new Date(selectedYear.value, selectedMonth.value, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const formattedDate = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const minutes = statisticStore.dailyGymMinutesByEmail[formattedDate] || 0;

    return {
      name: day.toString(), // Nazwa to numer dnia
      "Czas na siłowni (minuty)": minutes,
    };
  });
});

// Obliczenie sumy minut na siłowni
const totalGymMinutes = computed(() => {
  return Object.entries(statisticStore.dailyGymMinutesByEmail)
    .filter(([key]) => key.startsWith(`${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}`))
    .reduce((sum, [, value]) => sum + value, 0);
});

// Nawigacja między miesiącami i latami
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

// Pobierz dane dla wybranego emaila i okresu
watch([selectedEmail, selectedYear, selectedMonth], async () => {
  if (selectedEmail.value) {
    await statisticStore.getDailyGymMinutesByEmail(selectedEmail.value, selectedYear.value, selectedMonth.value);
  }
}, { immediate: true });
</script>

<template>
  <div class="dailyGymMinutesByEmail col-span-2 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
    <p class="font-semibold text-lg">
      Minuty na siłowni - <span class="font-normal text-slate-500">{{ selectedYear }} / {{ selectedMonth }}</span>
    </p>

    <!-- Nawigacja między miesiącami i wybór miesiąca oraz roku -->
    <div class="date-selector flex flex-wrap items-center gap-4">
      
      <div>
        <label for="monthSelect" class="font-semibold">Wybierz miesiąc:</label>
        <select id="monthSelect" v-model="selectedMonth" class=" rounded px-2 py-1">
          <option v-for="month in months" :key="month.value" :value="month.value">{{ month.name }}</option>
        </select>
      </div>
      <div>
        <label for="yearSelect" class="font-semibold">Wybierz rok:</label>
        <select id="yearSelect" v-model="selectedYear" class=" rounded px-2 py-1">
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      <button @click="changeMonth('prev')" class="bg-gray-200 px-2 py-1 rounded">
        &larr; Poprzedni miesiąc
      </button>
      <button @click="changeMonth('next')" class="bg-gray-200 px-2 py-1 rounded">
        Następny miesiąc &rarr;
      </button>
    </div>

    <!-- Wybierz email -->
    <div class="email-selector col-span-2 flex gap-4 p-4">
      <label for="emailSelect" class="font-semibold">Wybierz email:</label>
      <select id="emailSelect" v-model="selectedEmail">
        <option v-for="email in allEmails" :key="email" :value="email">{{ email }}</option>
      </select>
      <p class="font-semibold">Suma minut: <span class="text-blue-600">{{ totalGymMinutes }}</span></p>
    </div>

    <div class="total-gym-minutes-daily col-span-2 grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
      <BarChart
        index="name"
        :data="dailyGymMinutesByEmail"
        :categories="['Czas na siłowni (minuty)']"
        :y-formatter="(tick) => (Number.isInteger(tick) ? tick.toString() : '')"
        :x-axis-options="{
          type: 'category',
          ticks: {
            autoSkip: false,
            maxTicksLimit: 31,
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
