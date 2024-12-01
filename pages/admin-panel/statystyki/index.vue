<script setup lang="ts">

const statisticStore = useStatisticsStore();

onMounted(() => {
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


</script>

<template>

    <UButton @click="statisticStore.getMonthlyGroupClassesByTrainerEmail('test1@trainer.com')">Pobierz getMonthlyGroupClassesByTrainerEmail</UButton>

    <h1>Stata</h1>
    <UButton @click="test">Pobierz</UButton>
    <div class="flex flex-col gap-2 bg-slate-200 border-4 border-black m-4 p-4 justify-around">
        <div class="border-2 border-black rounded p-2">1 statisticStore.activePassCount: {{ statisticStore.activePassCount }}</div>
        <div class="border-2 border-black rounded p-2">2 statisticStore.trainerCount: {{ statisticStore.trainerCount }}</div>
        <div class="border-2 border-black rounded p-2">3 statisticStore.groupClassesDaily: {{ statisticStore.groupClassesDaily }}</div>
        <div class="border-2 border-black rounded p-2">4 statisticStore.groupClassesMonthly: {{ statisticStore.groupClassesMonthly }}</div>
        <div class="border-2 border-black rounded p-2">5 statisticStore.groupClassesToday: {{ statisticStore.groupClassesToday }}</div>
        <div class="border-2 border-black rounded p-2">6 statisticStore.paymentSumToday: {{ statisticStore.paymentSumToday }}</div>
        <div class="border-2 border-black rounded p-2">7 statisticStore.paymentSumMonthly: {{ statisticStore.paymentSumMonthly }}</div>
        <div class="border-2 border-black rounded p-2">8 statisticStore.paymentSumDaily: {{ statisticStore.paymentSumDaily }}</div>
        <div class="border-2 border-black rounded p-2">9 statisticStore.passesRegistrationsToday: {{ statisticStore.passesRegistrationsToday }}</div>
        <div class="border-2 border-black rounded p-2">10 statisticStore.passesRegistrationsMonthly: {{ statisticStore.passesRegistrationsMonthly }}</div>
        <div class="border-2 border-black rounded p-2">11 statisticStore.passesRegistrationsDaily: {{ statisticStore.passesRegistrationsDaily }}</div>
        <div class="border-2 border-black rounded p-2">12 statisticStore.memberRegistrationsToday: {{ statisticStore.memberRegistrationsToday }}</div>
        <div class="border-2 border-black rounded p-2">13 statisticStore.memberRegistrationsMonthly: {{ statisticStore.memberRegistrationsMonthly }}</div>
        <div class="border-2 border-black rounded p-2">14 statisticStore.memberRegistrationsDaily: {{ statisticStore.memberRegistrationsDaily }}</div>
        <div class="border-2 border-black rounded p-2">15 statisticStore.memberCount: {{ statisticStore.memberCount }}</div>
        <div class="border-2 border-black rounded p-2">16 statisticStore.gymEntriesToday: {{ statisticStore.gymEntriesToday }}</div>
        <div class="border-2 border-black rounded p-2">17 statisticStore.gymEntriesMonthly: {{ statisticStore.gymEntriesMonthly }}</div>
        <div class="border-2 border-black rounded p-2">18 statisticStore.gymEntriesDaily: {{ statisticStore.gymEntriesDaily }}</div>
        <div class="border-2 border-black rounded p-2">19 statisticStore.fullPaymentListByEmail: {{ statisticStore.fullPaymentListByEmail }}</div>
        <div class="border-2 border-black rounded p-2">20 statisticStore.gymEntriesMonthlyByEmail: {{ statisticStore.gymEntriesMonthlyByEmail }}</div>
        <div class="border-2 border-black rounded p-2">21 statisticStore.groupClassesMonthlyByEmail: {{ statisticStore.groupClassesMonthlyByEmail }}</div>
        <div class="border-2 border-black rounded p-2">22 statisticStore.dailyGymMinutesByEmail: {{ statisticStore.dailyGymMinutesByEmail }}</div>
        <div class="border-2 border-black rounded p-2">23 statisticStore.monthlyGroupClassesByTrainerEmail: {{ statisticStore.monthlyGroupClassesByTrainerEmail }}</div>
    </div>
    


</template>

<style scoped>

</style>