
<script lang="ts" setup>

const statisticStore = useStatisticsStore();

onMounted(() => {
    statisticStore.getActivePassCount();
});


</script>

<template>

    <div class="activePassesCount smallStatsCard blockCustom col-span-1 grid grid-cols-2 items-center">
        <div class="col-span-1">
            <p class=" text-sm font-semibold tracking-wide pb-1">Ilość aktywnych karnetów <span class="text-slate-300 text-xs">statisticStore.activePassCount</span></p>
            <div v-if="statisticStore.activePassCount!=null" class="font-bold text-lg">
                {{ statisticStore.activePassCount }}
            </div>                    
        </div>
        <div class="flex flex-row justify-end col-span-1">
            <div class="flex flex-row justify-center place-items-center bg-blue-800  rounded-full p-1 aspect-square ">
                <UIcon name="i-material-symbols-play-pass" class="w-6 h-6 bg-white" />
            </div>
        </div>
    </div>

</template>