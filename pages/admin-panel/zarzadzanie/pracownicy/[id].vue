<script setup lang="ts">

import type { Worker } from '~/types'

const route = useRoute()
const router = useRouter()

const store = useWorkerStore()
const worker = ref<Worker | null>(null);

watchEffect(() => {
    worker.value = store.allWorkers.find(worker => worker.id == route.params.id) || null;
});
// const worker = useState<Worker>(() => store.allWorkers.find(worker => worker.id == route.params.id))



</script>

<template>
<workerComponents-header-worker></workerComponents-header-worker>
<div class="flex flex-row bg-[#F5F7F8] items-start pb-10">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>
  
    <!-- TODO: poprawić margines -->
    <main class="min-h-screen content-start basis-4/5 mt-4 flex flex-row flex-wrap items-stretch justify-start gap-8">
        
        <div class="active-pass w-max flex flex-row rounded-lg p-4 bg-white flex-nowrap gap-10 items-center" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <div>
                <h1 class="text-xl font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Pracownik: </span>{{worker?.name}} {{worker?.surname}}</h1>
                <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Stanowisko: </span>{{worker?.position}}</p>
                <hr class="mt-3 mb-3"/>
                <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Email: </span>{{worker?.email}}</p>
                <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Telefon: </span>{{worker?.phoneNumber}}</p>
                <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Karta: </span>{{worker?.idCardNumber}}</p>
            </div>
            <img src="/images/worker/komar.jpg" class="rounded-full w-32" alt=""/>
        </div>

        <div class="active-pass w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <ul>
                <li class="text-lg"><span class="text-slate-500 text-base pr-3">Id pracownika: </span>{{worker?.id}}</li>
                <li class="text-lg"><span class="text-slate-500 text-base pr-3">Data urodzenia: </span>{{worker?.birthdate}}</li>
                <li class="text-lg"><span class="text-slate-500 text-base pr-3">Pesel: </span>{{worker?.pesel}}</li>
                <li class="text-lg"><span class="text-slate-500 text-base pr-3">Adres: </span>{{worker?.address.city + ' ' + worker?.address.streetName + ' ' + worker?.address.buildingNumber + (worker?.address.apartmentNumber ? ('/' + worker?.address.apartmentNumber) : ' ') + worker?.address.postalCode }}</li>
                <li class="text-lg"><span class="text-slate-500 text-base pr-3">Uprawnienia: </span>{{ worker?.permissions.join(', ') }}</li>
            </ul>
        </div>

        <div class="active-pass w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Statystyki</h1>
            <p class="text-slate-500">Możesz zobaczyć tutaj statystyki dotyczące pracownika</p>
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