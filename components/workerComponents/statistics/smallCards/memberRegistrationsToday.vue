<script setup lang="ts">
const statisticStore = useStatisticsStore();

onMounted(() => {
    statisticStore.getMemberRegistrationsToday();
});
</script>


<template>
<div class="fastInfoCard memberRegistrationsToday blockCustom flex flex-col justify-between ">
    <div class="fastInfoCardInnerRow flex w-full gap-10 items-center">
        <div v-if="statisticStore.memberRegistrationsToday">
            <h3 class="text-gray-500 text-sm font-semibold tracking-wide pb-1">Ogólny przyrost klientów <span class="text-slate-300 text-xs">statisticStore.memberRegistrationsToday</span></h3>
            <span class="font-bold text-lg">{{statisticStore.memberRegistrationsToday.split(';')[0]}}</span>                    
        </div>
        <div class="flex flex-row justify-center place-items-center bg-blue-800 w-8 h-8 rounded-full py-4">
            <UIcon name="i-material-symbols-attach-money" class="w-5 h-5 bg-white" />
        </div>
    </div>
    <div class=" flex w-full gap-2 text-gray-500" v-if="statisticStore.memberRegistrationsToday">
        <span :class="statisticStore.memberRegistrationsToday.split(';')[1][1]!=='-' ? 'text-green-500' : 'text-red-500'">{{statisticStore.memberRegistrationsToday.split(';')[1]}}</span> niż wczoraj
    </div>
</div>
</template>