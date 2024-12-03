<script setup lang="ts">

const store = useLoginStore();

const statisticsStore = useStatisticsStore();

const test = () => {
  console.log('test', store.loggedWorkerData)
}


</script>

<template>
<!-- <UButton @click="test">test</UButton> -->
<workerComponents-header-worker></workerComponents-header-worker>

<div class="flex flex-row bg-[#F5F7F8] items-start pb-10">
  <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>

  <!-- TODO: poprawić margines -->
  <main class="basis-4/5 mt-4 flex flex-row flex-wrap items-start justify-start gap-8">

    <div class="flex flex-row flex-nowrap gap-8">
      
      <WorkerComponentsStatisticsPaymentSumDaily class="w-3/4" />

      <div class="total-entrance-amount flex flex-col rounded-lg p-8 bg-[url('/images/worker/aktualizacja.png')] gap-4 basis-2/5 text-white justify-end bg-cover bg-right-bottom " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
        <p class="text-2xl font-semibold drop-shadow-xl">Aktualizacja 10 Paź. 2024</p>
        <p class="drop-shadow-2xl font-medium w-4/5">Zapoznaj się z aktualizacją systemu i wdróż poprawione rozwiązania w twoim obiekcie</p>
      </div>  
    </div>
    

    <div class="flex flex-row gap-8 basis-full items-start">

      
    <WorkerComponentsWorkerList :showButton="true"/>
      
    </div>

  </main>

</div>

</template>

<style scoped>



</style>