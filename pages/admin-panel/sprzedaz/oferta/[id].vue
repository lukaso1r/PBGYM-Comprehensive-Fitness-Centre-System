<script setup lang="ts">

import type { Offer } from '~/types'

const route = useRoute()
const router = useRouter()

const store = useOffersStore()
const offer = ref<Offer | null>(null);

watchEffect(() => {
    offer.value = store.offers.find(offer => offer.id == route.params.id) || null;
});

</script>

<template>
<workerComponents-header-worker></workerComponents-header-worker>
<div class="flex flex-row bg-[#F5F7F8] items-start pb-10">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>
  
    <!-- TODO: poprawić margines -->
    <main class="min-h-screen content-start basis-4/5 mt-4 flex flex-row flex-wrap items-start justify-start gap-8">
        
        <div class="active-pass w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold"><span class="text-slate-500 text-base font-normal">Tytuł: </span>{{offer?.title}}</h1>
            <p class="font-semibold"><span class="text-slate-500 text-base font-normal">Podtytuł: </span>{{offer?.subtitle}}</p>
        </div>

        <div class="active-pass w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <ul>
                <li class="text-lg"><span class="text-slate-500 text-base">Id oferty: </span>{{offer?.id}}</li>
                <li class="text-lg"><span class="text-slate-500 text-base">Miesięczna cena oferty: </span>{{offer?.monthlyPrice}}</li>
                <li class="text-lg"><span class="text-slate-500 text-base">Opłata aktywacyjna: </span>{{offer?.entryFee}}</li>
                <li class="text-lg"><span class="text-slate-500 text-base">Okres trwania: </span>{{offer?.durationInMonths}}</li>
                <li class="text-lg"><span class="text-slate-500 text-base">Cechy oferty: </span>{{offer?.properties}}</li>
                <li :class="['text-lg', {'text-green-600': offer.active, 'text-red-600': !offer.active}]"><span class="text-slate-500 text-base">Aktywność: </span>{{offer?.active === true ? 'Aktywna' : 'Nieaktywna'}}</li>
                <li class="text-lg"><span class="text-slate-500 text-base">Typ oferty: </span>{{offer?.type}}</li>
            </ul>
        </div>

        <div class="active-pass w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Statystyki</h1>
            <p class="text-slate-500">Możesz zobaczyć tutaj statystyki dotyczące oferty, ilość wykupionych dostępów, wpływ i inne.</p>
        </div>

        <div class="flex flex-row flex-nowrap gap-8">
            <div class="total-entrance-amount flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start basis-3/5 gap-4" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
              <span class="font-semibold text-lg">Tu będą wykresy ***TODO***</span>
              <img src="/images/twoj-profil/chart.jpg" alt="" srcset="">
              <p>Chyba stąd: <a href="ui.shadcn.com/charts" class="text-blue-800">ui.shadcn.com/charts</a></p>
            </div>
      
            <div class="total-entrance-amount flex flex-col rounded-lg p-4 gap-4 basis-2/5 bg-white justify-end bg-cover bg-right-bottom " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <span class="font-semibold text-lg">Tu będą diagramy ***TODO***</span>
                <img src="/images/worker/diagram.jpg" alt="" srcset="">
            </div>  
        </div>

    </main> 

</div>
</template>

<style scoped>

</style>