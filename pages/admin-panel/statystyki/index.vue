<script setup lang="ts">

const statisticStore = useStatisticsStore();

const test = () => {
    console.log(statisticStore.getfullGymEntriesList);
    statisticStore.getfullGymEntriesList();
    statisticStore.getfullPaymentList();
}

</script>

<template>

    <h1>Stata</h1>
    <UButton @click="test">Pobierz</UButton>
    <div class="flex flex-row gap-10 bg-slate-200 border-4 border-black m-4 p-4 justify-around">
        <pre>{{statisticStore.fullGymEntriesList}}</pre>
        <pre>{{statisticStore.fullPaymentList}}</pre>
    </div>
    

</template>

<style scoped>

</style>