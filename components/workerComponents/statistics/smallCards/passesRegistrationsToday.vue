<script setup lang="ts">
const statisticStore = useStatisticsStore();

onMounted(() => {
    statisticStore.getPassesRegistrationsToday();
});
</script>


<template>
    <div class="fastInfoCard passesRegistrationsToday blockCustom flex flex-col justify-between ">
        <div class="fastInfoCardInnerRow flex w-full gap-10 items-center  justify-between">
            <div v-if="statisticStore.passesRegistrationsToday">
                <h3 class="text-gray-500 text-sm font-semibold tracking-wide pb-1">Dzisiejsza sprzedaż karnetów </h3>
                <span class="font-bold text-lg">{{statisticStore.passesRegistrationsToday.split(';')[0]}}</span>                    
            </div>
            <div class="flex flex-row justify-center place-items-center bg-blue-800  rounded-full p-1 aspect-square ">
                <UIcon name="i-material-symbols-credit-score-rounded" class="w-6 h-6 bg-white" />
            </div>
        </div>
        <div class=" flex w-full gap-2 text-gray-500" v-if="statisticStore.passesRegistrationsToday">
            <span :class="statisticStore.passesRegistrationsToday.split(';')[1][1]!=='-' ? 'text-green-500' : 'text-red-500'">{{statisticStore.passesRegistrationsToday.split(';')[1]}}</span> niż wczoraj
        </div>
    </div>
</template>