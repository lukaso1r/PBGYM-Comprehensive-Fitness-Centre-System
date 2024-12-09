<script setup lang="ts">

// definePageMeta({
//   middleware: 'auth',
// });

const zero = ref(0);

</script>

<template>
<workerComponents-header-worker></workerComponents-header-worker>

<div class="flex flex-row bg-[#F5F7F8] items-start pb-10">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>

    <main v-if="checkPermission(['STATISTICS'])"  class="basis-4/5 mt-4 grid gird-cols-2 gap-8 ">

        <div class="smallCards col-span-2 grid grid-cols-4 justify-start gap-8">

            <WorkerComponentsStatisticsSmallCardsGroupClassesToday />

            <WorkerComponentsStatisticsSmallCardsPaymentSumToday />

            <WorkerComponentsStatisticsSmallCardsPassesRegistrationsToday />
            
            <WorkerComponentsStatisticsSmallCardsMemberRegistrationsToday />

            <WorkerComponentsStatisticsSmallCardsActivePassesCount />

            <WorkerComponentsStatisticsSmallCardsTrainerCount />

            <WorkerComponentsStatisticsSmallCardsMemberCount />

            <WorkerComponentsStatisticsSmallCardsLiveMemberCount />

            <WorkerComponentsStatisticsSmallCardsGymEntriesToday />


        </div>

        <WorkerComponentsStatisticsGroupClassesMonthly />

        <WorkerComponentsStatisticsMonthlyGroupClassesByTrainerEmail  v-if="checkPermission(['TRAINER_MANAGEMENT'])"/>

        <WorkerComponentsStatisticsGroupClassesMonthlyByEmail  v-if="checkPermission(['TRAINER_MANAGEMENT'])"/>

        <WorkerComponentsStatisticsPaymentSumMonthly />

        <WorkerComponentsStatisticsPassesRegistrationsMonthly />

        <WorkerComponentsStatisticsMemberRegistrationsMonthly />

        <WorkerComponentsStatisticsGymEntriesMonthly />

        <WorkerComponentsStatisticsGymEntriesMonthlyByEmail  v-if="checkPermission(['MEMBER_MANAGEMENT'])"/>


        <WorkerComponentsStatisticsPaymentSumDaily />

        <WorkerComponentsStatisticsGroupClassesDaily />
        
        <WorkerComponentsStatisticsPassesRegistrationsDaily />

        <WorkerComponentsStatisticsGymEntriesDaily />

        <WorkerComponentsStatisticsDailyGymMinutesByEmail  v-if="checkPermission(['MEMBER_MANAGEMENT'])"/>

        <WorkerComponentsStatisticsMemberRegistrationsDaily />


    </main>
    <div v-else>
        <p class="text-red-500">Brak uprawnień do przeglądania tej strony</p>
    </div>

    
</div>




</template>

<style scoped>

</style>