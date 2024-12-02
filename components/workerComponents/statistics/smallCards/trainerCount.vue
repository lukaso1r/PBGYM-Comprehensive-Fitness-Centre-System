<script setup lang="ts">
const statisticStore = useStatisticsStore();

onMounted(() => {
    statisticStore.getTrainerCount();
});
</script>


<template>
    <div class="trainerCount smallStatsCard blockCustom col-span-1 grid grid-cols-2 items-center">
        <div class="col-span-1">
            <p class=" text-sm font-semibold tracking-wide pb-1">Ilość aktywnych trenerów <span class="text-slate-300 text-xs">statisticStore.trainerCount</span></p>
            <div v-if="statisticStore.trainerCount!=null" class="font-bold text-lg">
                {{ statisticStore.trainerCount }}
            </div>                    
        </div>
        <div class="flex flex-row justify-end col-span-1">
            <div class="flex flex-row justify-center place-items-center bg-blue-800 w-8 h-8 rounded-full py-4">
                <UIcon name="i-material-symbols-attach-money" class="w-5 h-5 bg-white" />
            </div> 
        </div>
    </div>
</template>