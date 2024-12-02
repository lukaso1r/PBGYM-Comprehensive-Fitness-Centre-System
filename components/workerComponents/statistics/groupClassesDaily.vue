<script setup lang="ts">

import { BarChart } from '@/components/ui/chart-bar'
import CustomChartTooltip from './CustomChartTooltip.vue'

const statisticStore = useStatisticsStore();

onMounted(() => {
  statisticStore.getGroupClassesDaily();
});

const allMonths = [
  "styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec",
  "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
];

const data = ref(
  Object.entries(statisticStore.groupClassesDaily)
    .map(([name, total]) => ({ name: new Date(name), "Ilość zajęć": total })) // Zmiana klucza na "Ilość zajęć"
    .sort((a, b) => Number(a.name) - Number(b.name))
    .map(item => ({ name: item.name.toISOString().split('T')[0], "Ilość zajęć": item["Ilość zajęć"] }))
);

watch(() => statisticStore.groupClassesDaily, () => {
  console.log('groupClassesDaily', statisticStore.groupClassesDaily);
  data.value = Object.entries(statisticStore.groupClassesDaily)
    .map(([name, total]) => ({ name: new Date(name), "Ilość zajęć": total })) 
    .sort((a, b) => Number(a.name) - Number(b.name))
    .map(item => ({ name: item.name.toISOString().split('T')[0], "Ilość zajęć": item["Ilość zajęć"] }));
});

</script>


<template>
    <div class="total-entrance-amount col-span-1 blockCustomShadow grid grid-cols-1 rounded-lg p-4 bg-white gap-4">
        <p class="font-semibold text-lg">Ilość zajęć grupowych dziennie- <span class="font-normal text-slate-500">StatisticStore.groupClassesDaily</span> </p>
        <BarChart
            index="name"
            :data="data"
            :categories="['Ilość zajęć']" 
            :y-formatter="(tick, i) => {
                return Number.isInteger(tick) ? tick.toString() : ''
            }"
            :rounded-corners="4"
            :x-axis-options="{
                ticks: {
                    callback: (value: any, index: string | number) => {
                        return data.value[index]?.name || ''
                    }
                }
            }"
            :colors="['#203983']"
            :showLegend="false"
        />
    </div>
</template>

<style scoped>


</style>