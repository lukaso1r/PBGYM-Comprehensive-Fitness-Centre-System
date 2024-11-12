<script lang="ts" setup>

import type { DefaultLoginData, TrainerData } from '~/types';

const loginStore = useLoginStore();
const trainerStore = useTrainerStore();

const selectedTrue = ref(false)
const selected = ref(true)

const defaultLoginData = useCookie<DefaultLoginData>('defaultLoginData');
const loggedTrainerData = useCookie<TrainerData>('loggedTrainerData');

onMounted(() => {

})

</script>

<template>

<HeaderTrainerProfile />

<div class="flex flex-row bg-[#F5F7F8] items-start pb-10 min-h-screen">
    <Trainer-navbar class="basis-1/5 max-w-[350px]  px-6" />
    <main class="basis-4/5 mt-4 flex flex-row flex-wrap items-start justify-start gap-8">
        
        <div class="members-panel-title w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Twój panel trenera</h1>
            <p class="text-slate-500">Możesz z tego miejsca przeglądać i zarządzać wykonywanymi usługami.</p>
        </div>

        <div class="user-information flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start w-[47%] gap-4" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <span class="font-semibold text-lg">Informacje</span>
            <div class="information-container w-full bg-slate-50 py-3 px-5 flex flex-col rounded-xl">
                <div class="inf-row-title flex flex-row justify-between items-center">
                    <span class="font-medium " style="word-spacing: 0.7rem;">{{ loggedTrainerData?.name }}  {{ loggedTrainerData?.surname}}</span>
                    <UButton
                        icon="i-ic-baseline-create"
                        size="sm"
                        color="blue"
                        variant="ghost"
                        label=""
                        :trailing="false"
                        :to="'/twoj-profil/ustawienia-konta'"
                    />
                </div>
                <div class="inf-row-info">
                    <ul class="flex flex-col gap-1 py-3">
                        <li>
                            <span class="font-medium text-gray-500 pr-3">Adres Email:</span> {{loggedTrainerData?.email}}
                        </li>
                        <li>
                            <span class="font-medium text-gray-500 pr-3">Miasto:</span> {{loggedTrainerData?.address?.city}}
                        </li>
                        <li>
                            <span class="font-medium text-gray-500 pr-3">Ulica:</span> {{loggedTrainerData?.address?.streetName}}
                        </li>
                        <li>
                            <span class="font-medium text-gray-500 pr-3">Numer budynku:</span> {{loggedTrainerData?.address?.buildingNumber}}
                        </li>
                        <li>
                            <span class="font-medium text-gray-500 pr-3">Numer mieszkania:</span> {{loggedTrainerData?.address?.apartmentNumber}}
                        </li>
                        <li>
                            <span class="font-medium text-gray-500 pr-3"> Kod pocztowy:</span> {{loggedTrainerData?.address?.postalCode}}
                        </li>
                        <li>
                            <span class="font-medium text-gray-500 pr-3">Rok urodzenia:</span> {{ loggedTrainerData?.birthdate }} 
                        </li>
                        <li>
                            <span class="font-medium text-gray-500 pr-3"> Pesel:</span> {{loggedTrainerData?.pesel}}
                        </li>
                        <li>
                            <span class="font-medium text-gray-500 pr-3">Typ konta:</span> {{ defaultLoginData?.userType==='Member' ? "Członek" : "Trener" }}
                        </li>
                        
                    </ul>
                </div>
            </div>

        </div>

        <div class="active-pass w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2 " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Statystyki</h1>
            <p class="text-slate-500">Możesz zobaczyć tutaj statystyki dotyczące pracownika</p>
        </div>

        <div class="flex flex-row flex-nowrap gap-8 items-start">
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