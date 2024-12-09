<script setup lang="ts">
const statisticStore = useStatisticsStore();

onMounted(() => {
    statisticStore.getLiveMemberCount();
});
</script>


<template>
    <div class="trainerCount smallStatsCard blockCustom col-span-1 grid grid-cols-2 items-center">
        <div class="col-span-1">
            <p class=" text-sm font-semibold tracking-wide pb-1">Ilość osób na siłowni teraz</p>
            <div v-if="statisticStore.liveMemberCount!=null" class="font-bold text-lg">
                {{ statisticStore.liveMemberCount }}
            </div>                    
        </div>
        <div class="flex flex-row justify-end col-span-1">
            <div class="flex flex-row justify-center place-items-center bg-blue-800  rounded-full p-1 aspect-square ">
                <UIcon name="i-mdi-human-queue" class="w-6 h-6 bg-white" />
            </div> 
        </div>
    </div>
</template>