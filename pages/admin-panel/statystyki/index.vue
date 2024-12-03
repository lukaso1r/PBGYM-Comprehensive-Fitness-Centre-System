<script setup lang="ts">

import { BarChart } from '@/components/ui/chart-bar'

const statisticStore = useStatisticsStore();

onMounted(() => {

    statisticStore.getTrainerCount();

    statisticStore.getGroupClassesDaily();
    statisticStore.getGroupClassesMonthly();
    statisticStore.getGroupClassesToday();

    statisticStore.getPaymentSumToday();
    statisticStore.getPaymentSumMonthly();
    statisticStore.getPaymentSumDaily();

    statisticStore.getPassesRegistrationsToday();
    statisticStore.getPassesRegistrationsMonthly();
    statisticStore.getPassesRegistrationsDaily();

    statisticStore.getMemberRegistrationsToday();
    statisticStore.getMemberRegistrationsMonthly();
    statisticStore.getMemberRegistrationsDaily();

    statisticStore.getMemberCount();

    statisticStore.getGymEntriesToday();
    statisticStore.getGymEntriesMonthly();
    statisticStore.getGymEntriesDaily();

    statisticStore.getFullPaymentHistoryByEmail('test1@member.com');
    statisticStore.getGymEntriesMonthlyByEmail('test1@member.com');
    statisticStore.getGroupClassesMonthlyByEmail('test1@member.com');
    statisticStore.getDailyGymMinutesByEmail('test1@member.com');
    statisticStore.getMonthlyGroupClassesByTrainerEmail('mario@trainer.com');
    
})

const test = () => {
    console.log('pobrnie danych', statisticStore.activePassCount)
    statisticStore.getActivePassCount();

    statisticStore.getTrainerCount();

    statisticStore.getGroupClassesDaily();
    statisticStore.getGroupClassesMonthly();
    statisticStore.getGroupClassesToday();

    statisticStore.getPaymentSumToday();
    statisticStore.getPaymentSumMonthly();
    statisticStore.getPaymentSumDaily();

    statisticStore.getPassesRegistrationsToday();
    statisticStore.getPassesRegistrationsMonthly();
    statisticStore.getPassesRegistrationsDaily();

    statisticStore.getMemberRegistrationsToday();
    statisticStore.getMemberRegistrationsMonthly();
    statisticStore.getMemberRegistrationsDaily();

    statisticStore.getMemberCount();

    statisticStore.getGymEntriesToday();
    statisticStore.getGymEntriesMonthly();
    statisticStore.getGymEntriesDaily();

    statisticStore.getFullPaymentHistoryByEmail('test1@member.com');
    statisticStore.getGymEntriesMonthlyByEmail('test1@member.com');
    statisticStore.getGroupClassesMonthlyByEmail('test1@member.com');
    statisticStore.getDailyGymMinutesByEmail('test1@member.com');
    statisticStore.getMonthlyGroupClassesByTrainerEmail('test1@trainer.com');
}

const zero = ref(0);

</script>

<template>
<workerComponents-header-worker></workerComponents-header-worker>

<div class="flex flex-row bg-[#F5F7F8] items-start pb-10">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>

    <main class="basis-4/5 mt-4 grid gird-cols-2 gap-8 ">

        <!-- <div class="buttons col-span-2 flex flex-col justify-start items-start gap-1 p-4 lg:mx-w-[79vw] bg-white rounded blockCustomShadow">
            <UButton @click="statisticStore.getMonthlyGroupClassesByTrainerEmail('test1@trainer.com')">Pobierz getMonthlyGroupClassesByTrainerEmail</UButton>
            <h1>Stata</h1>
            <UButton @click="test">Pobierz</UButton>
        </div> -->

       

        <div class="smallCards col-span-2 grid grid-cols-3 justify-start  gap-8">
            
            <WorkerComponentsStatisticsSmallCardsActivePassesCount />

            <WorkerComponentsStatisticsSmallCardsTrainerCount />

            <WorkerComponentsStatisticsSmallCardsGroupClassesToday />

            <WorkerComponentsStatisticsSmallCardsPaymentSumToday />

            <WorkerComponentsStatisticsSmallCardsPassesRegistrationsToday />

            <WorkerComponentsStatisticsSmallCardsMemberRegistrationsToday />

            <WorkerComponentsStatisticsSmallCardsGymEntriesToday />

            <WorkerComponentsStatisticsSmallCardsMemberCount />

        </div>

        <WorkerComponentsStatisticsGroupClassesDaily />

        <WorkerComponentsStatisticsGroupClassesMonthly />

        <WorkerComponentsStatisticsPaymentSumMonthly />

        <WorkerComponentsStatisticsPassesRegistrationsMonthly />

        <WorkerComponentsStatisticsPaymentSumDaily />

        <WorkerComponentsStatisticsPassesRegistrationsDaily />
        
        <WorkerComponentsStatisticsMemberRegistrationsMonthly />

        <WorkerComponentsStatisticsMemberRegistrationsDaily />

        <WorkerComponentsStatisticsGymEntriesMonthly />

        <WorkerComponentsStatisticsGymEntriesDaily />

        <WorkerComponentsStatisticsGymEntriesMonthlyByEmail />

        <WorkerComponentsStatisticsGroupClassesMonthlyByEmail />

        <WorkerComponentsStatisticsDailyGymMinutesByEmail />

        <WorkerComponentsStatisticsMonthlyGroupClassesByTrainerEmail />
        
        <!-- <div class="col-span-2 flex flex-col gap-2 bg-slate-200 border-4 border-black m-4 p-4 justify-around">
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 1 statisticStore.activePassCount: {{ statisticStore.activePassCount }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 2 statisticStore.trainerCount: {{ statisticStore.trainerCount }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 3 statisticStore.groupClassesDaily: {{ statisticStore.groupClassesDaily }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 4 statisticStore.groupClassesMonthly: {{ statisticStore.groupClassesMonthly }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 5 statisticStore.groupClassesToday: {{ statisticStore.groupClassesToday }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 6 statisticStore.paymentSumToday: {{ statisticStore.paymentSumToday }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 7 statisticStore.paymentSumMonthly: {{ statisticStore.paymentSumMonthly }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 8 statisticStore.paymentSumDaily: {{ statisticStore.paymentSumDaily }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 9 statisticStore.passesRegistrationsToday: {{ statisticStore.passesRegistrationsToday }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 10 statisticStore.passesRegistrationsMonthly: {{ statisticStore.passesRegistrationsMonthly }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 11 statisticStore.passesRegistrationsDaily: {{ statisticStore.passesRegistrationsDaily }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 12 statisticStore.memberRegistrationsToday: {{ statisticStore.memberRegistrationsToday }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 13 statisticStore.memberRegistrationsMonthly: {{ statisticStore.memberRegistrationsMonthly }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 14 statisticStore.memberRegistrationsDaily: {{ statisticStore.memberRegistrationsDaily }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 15 statisticStore.memberCount: {{ statisticStore.memberCount }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 16 statisticStore.gymEntriesToday: {{ statisticStore.gymEntriesToday }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 17 statisticStore.gymEntriesMonthly: {{ statisticStore.gymEntriesMonthly }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 18 statisticStore.gymEntriesDaily: {{ statisticStore.gymEntriesDaily }}</div>
            <div class="border-2 border-black rounded p-2">19 statisticStore.fullPaymentListByEmail: {{ statisticStore.fullPaymentListByEmail }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 20 statisticStore.gymEntriesMonthlyByEmail: {{ statisticStore.gymEntriesMonthlyByEmail }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 21 statisticStore.groupClassesMonthlyByEmail: {{ statisticStore.groupClassesMonthlyByEmail }}</div>
            <div class="border-2 border-black rounded p-2 text-green-500">DONE 22 statisticStore.dailyGymMinutesByEmail: {{ statisticStore.dailyGymMinutesByEmail }}</div>
            <div class="border-2 border-black rounded p-2">23 statisticStore.monthlyGroupClassesByTrainerEmail: {{ statisticStore.monthlyGroupClassesByTrainerEmail }}</div>
        </div> -->

    </main>

    
</div>




</template>

<style scoped>

</style>