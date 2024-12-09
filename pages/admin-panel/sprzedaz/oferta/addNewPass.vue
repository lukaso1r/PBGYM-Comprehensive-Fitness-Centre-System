<script setup lang="ts">

const offerType = ref('standard')

const setOfferType = (type: string) => {
    offerType.value = type
}
</script>

<template>

<workerComponents-header-worker></workerComponents-header-worker>
<div class="flex flex-row bg-[#F5F7F8] items-start pb-10">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>

    <main  v-if="checkPermission(['PASS_MANAGEMENT'])" class="min-h-screen content-start basis-4/5 mt-4 flex flex-col flex-wrap items-start justify-start gap-8">

        <div class="w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Formularz dodawania nowego karnetu</h1>
            <p class="text-slate-500">Możesz z tego miejsca dodać nowy karnet i skonfigurować jego najważniejsze opcje</p>
            <div id="chooseOfferType" class="flex flex-row rounded-lg pt-4 gap-7 bg-white flex-nowrap">
                <UButton @click="setOfferType('standard')" color="blue">Dodaj standardową ofertę</UButton>
                <UButton @click="setOfferType('special')" color="blue">Dodaj specjalną ofertę</UButton>
            </div>
        </div>
        
        <WorkerComponentsOfferAddStandardOffer v-if="offerType==='standard'" />
        <WorkerComponentsOfferAddSpecialOffer v-if="offerType==='special'"/>

    </main>

    <div v-else>
        <p class="text-red-500">Brak uprawnień do przeglądania tej strony</p>
    </div>
</div>

</template>

<style scoped>



</style>