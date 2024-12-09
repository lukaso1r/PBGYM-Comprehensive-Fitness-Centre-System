<script setup lang="ts">


const zero = ref(0);

</script>

<template>
<workerComponents-header-worker></workerComponents-header-worker>

<div class="flex flex-row bg-[#F5F7F8] items-start pb-10">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>

    <main class="basis-4/5 mt-4 grid gird-cols-2 gap-8 ">

        <div class="smallCards col-span-2 grid grid-cols-3 justify-start  gap-8">
            
            <WorkerComponentsStatisticsSmallCardsActivePassesCount />

            <WorkerComponentsStatisticsSmallCardsTrainerCount />

            <WorkerComponentsStatisticsSmallCardsGroupClassesToday />

            <WorkerComponentsStatisticsSmallCardsPaymentSumToday />

            <WorkerComponentsStatisticsSmallCardsPassesRegistrationsToday />

            <WorkerComponentsStatisticsSmallCardsMemberRegistrationsToday />

            <WorkerComponentsStatisticsSmallCardsGymEntriesToday />

            <WorkerComponentsStatisticsSmallCardsMemberCount />

            <WorkerComponentsStatisticsSmallCardsLiveMemberCount />

        </div>

        <WorkerComponentsStatisticsGroupClassesMonthly />

        <WorkerComponentsStatisticsMonthlyGroupClassesByTrainerEmail />

        <WorkerComponentsStatisticsGroupClassesMonthlyByEmail />

        <WorkerComponentsStatisticsPaymentSumMonthly />

        <WorkerComponentsStatisticsPassesRegistrationsMonthly />

        <WorkerComponentsStatisticsMemberRegistrationsMonthly />

        <WorkerComponentsStatisticsGymEntriesMonthly />

        <WorkerComponentsStatisticsGymEntriesMonthlyByEmail />


        <WorkerComponentsStatisticsPaymentSumDaily />

        <WorkerComponentsStatisticsGroupClassesDaily />
        
        <WorkerComponentsStatisticsPassesRegistrationsDaily />

        <WorkerComponentsStatisticsGymEntriesDaily />

        <WorkerComponentsStatisticsDailyGymMinutesByEmail />

        <WorkerComponentsStatisticsMemberRegistrationsDaily />


    </main>

    
</div>




</template>

<style scoped>

</style>