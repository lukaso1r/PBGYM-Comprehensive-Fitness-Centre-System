<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAdminLogsStore } from '@/stores/adminLogsStore';

const adminLogsStore = useAdminLogsStore();
const interval = ref<number>(60000);
const logsToShow = ref<number>(30);

onMounted(async () => {
    await adminLogsStore.getSystemLogs();
    setInterval(async () => {
        await adminLogsStore.getSystemLogs();
        interval.value = 60000;
    }, interval.value);
})

const refreshSysLogs = async () => {
    await adminLogsStore.getSystemLogs();
    interval.value = 120000;
}

const showMoreLogs = (count: number) => {
    logsToShow.value += count;
};

const showAllLogs = () => {
    logsToShow.value = adminLogsStore.sysLogs.split('\n').length;
};
</script>

<template>

<WorkerComponentsHeaderWorker />
<div class="flex flex-row bg-[#F5F7F8] items-start pb-10 min-h-screen">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>
    <main class="basis-4/5 mt-4 flex flex-col flex-wrap items-start justify-start gap-8">
        
        <div class="members-panel-title w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Dziennik zdarzeń</h1>
            <p class="text-slate-500">Możesz z tego miejsca przeglądać zdarzenia które wystąpiły w systemie</p>
        </div>

        <div class="group-class-details p-4 bg-white rounded-lg shadow-md max-w-[79vw]">
            <div class="flex flex-row justify-between pb-3">
                <h2 class="text-lg font-semibold mb-2">Zdarzenia</h2>
                <UButton @click="refreshSysLogs()" color="gray" icon="i-material-symbols-rotate-left-rounded" size="sm">Odśwież</UButton>
            </div>
            <ul>                
                <template v-for="(log, index) in adminLogsStore.sysLogs.split('\n').reverse().slice(0, logsToShow)" :key="index"> 
                    <li :class="{'bg-gray-50': index % 2 === 0, 'bg-blue-50': index % 2 !== 0}" class="my-[8px] px-2 break-words">
                        {{ log }}
                    </li>
                </template>
            </ul>
            <div class="flex gap-4 mt-4">
                <UButton @click="showMoreLogs(30)" color="blue" size="sm">Pokaż kolejne 30</UButton>
                <UButton @click="showMoreLogs(100)" color="blue" size="sm">Pokaż kolejne 100</UButton>
                <UButton @click="showAllLogs()" color="blue" size="sm">Pokaż wszystkie</UButton>
            </div>
        </div>

    </main> 
</div>

</template>

<style lang="css" scoped>
</style>
