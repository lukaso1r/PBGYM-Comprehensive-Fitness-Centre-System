<script setup lang="ts">
const statisticStore = useStatisticsStore();

onMounted(() => {
    statisticStore.getTrainerCount();
});
</script>


<template>
    <div class="trainerCount smallStatsCard blockCustom col-span-1 grid grid-cols-2 items-center">
        <div class="col-span-1">
            <p class="text-gray-500 text-sm font-semibold tracking-wide pb-1">Ilość aktywnych trenerów </p>
            <div v-if="statisticStore.trainerCount!=null" class="font-bold text-lg">
                {{ statisticStore.trainerCount }}
            </div>                    
        </div>
        <div class="flex flex-row justify-end col-span-1">
            <div class="flex flex-row justify-center place-items-center bg-blue-800  rounded-full p-1 aspect-square ">
                <UIcon name="i-material-symbols-light-physical-therapy-outline-rounded" class="w-6 h-6 bg-white" />
            </div> 
        </div>
    </div>
</template>