<script setup lang="ts">
const statisticStore = useStatisticsStore();

onMounted(() => {
    statisticStore.getPassesRegistrationsToday();
});
</script>


<template>
    <div class="fastInfoCard passesRegistrationsToday blockCustom flex flex-col justify-between ">
        <div class="fastInfoCardInnerRow flex w-full gap-10 items-center">
            <div v-if="statisticStore.passesRegistrationsToday">
                <h3 class="text-gray-500 text-sm font-semibold tracking-wide pb-1">Dzisiejsza sprzedaż karnetów <span class="text-slate-300 text-xs">statisticStore.passesRegistrationsToday</span></h3>
                <span class="font-bold text-lg">{{statisticStore.passesRegistrationsToday.split(';')[0]}}</span>                    
            </div>
            <div class="flex flex-row justify-center place-items-center bg-blue-800 w-8 h-8 rounded-full py-4">
                <UIcon name="i-material-symbols-attach-money" class="w-5 h-5 bg-white" />
            </div>
        </div>
        <div class=" flex w-full gap-2 text-gray-500" v-if="statisticStore.passesRegistrationsToday">
            <span :class="statisticStore.passesRegistrationsToday.split(';')[1][1]!=='-' ? 'text-green-500' : 'text-red-500'">{{statisticStore.passesRegistrationsToday.split(';')[1]}}</span> niż wczoraj
        </div>
    </div>
</template>