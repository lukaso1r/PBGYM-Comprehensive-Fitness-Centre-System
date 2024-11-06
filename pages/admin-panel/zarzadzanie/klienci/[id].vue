<script lang="ts" setup>
import type { LoggedMemberData } from '~/types';

const route = useRoute();
const email = ref<string>(route.params.id as string);

const membersManagmentStore = useMembersManagmentStore();

const memberByEmail = ref<LoggedMemberData>({} as LoggedMemberData);

onMounted( async () => {
    await membersManagmentStore.getMemberByEmail(email.value);
    memberByEmail.value = membersManagmentStore.memberByEmail;
});

</script>

<template>
    Email {{email}} drugi:{{memberByEmail}}
    <workerComponents-header-worker></workerComponents-header-worker>
    

    <div class="flex flex-row bg-[#F5F7F8] items-start pb-10 min-h-screen">
      <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>
        
        <main class="basis-4/5 mt-4 flex flex-col flex-wrap items-start justify-start gap-8">

            <div class="members-panel-title w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <h1 class="text-xl font-semibold">Panel zarządzania klientem</h1>
                <p class="text-slate-500">Możesz z tego miejsca przeglądać i zarządzać wybranym klientem.</p>
            </div>

            <div class="flex flex-row flex-wrap gap-8">
                <div class="active-pass w-max flex flex-row rounded-lg p-4 bg-white flex-nowrap gap-10 items-center" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <div>
                        <h1 class="text-xl font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Pracownik: </span>{{memberByEmail?.name}} {{memberByEmail?.surname}}</h1>
                        <p class="text-lg"><span class="text-slate-500 text-base pr-3">Id pracownika: </span>{{memberByEmail?.id}}</p>
                        
                        <hr class="mt-3 mb-3"/>
                        <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Email: </span>{{memberByEmail?.email}}</p>
                        <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Telefon: </span>{{memberByEmail?.phoneNumber}}</p>
                        <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Karta: </span>{{memberByEmail?.pesel}}</p>
                    </div>
                    <img src="/images/worker/komar.jpg" class="rounded-full w-32" alt=""/>
                </div>
        
                <div class="active-pass w-max flex flex-col  rounded-lg p-4 bg-white flex-nowrap justify-between" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <ul>
                        <li class="text-lg"><span class="text-slate-500 text-base pr-3">Data urodzenia: </span>{{memberByEmail?.birthdate}}</li>
                        <li class="text-lg"><span class="text-slate-500 text-base pr-3">Pesel: </span>{{memberByEmail?.pesel}}</li>
                        <li class="text-lg"><span class="text-slate-500 text-base pr-3">Adres: </span>{{memberByEmail?.address.city + ' ' + memberByEmail?.address.streetName + ' ' + memberByEmail?.address.buildingNumber + (memberByEmail?.address.apartmentNumber ? ('/' + memberByEmail?.address.apartmentNumber) : ' ') + memberByEmail?.address.postalCode }}</li>
                    </ul>
                    <div class="flex flex-row gap-4">
                        
                    </div>
                </div>
        
                <div class="options w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-4  items-start" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <UButton
                            icon="i-material-symbols-account-box"
                            size="sm"
                            color="blue"
                            variant="solid"
                            label="Edytuj dane personalne pracownika"
                            @click="toggleModal('personal')"
                            v-show="worker?.permissions.includes('ADMIN')"
                        />
                        <UButton
                            icon="i-material-symbols-key"
                            size="sm"
                            color="blue"
                            variant="solid"
                            label="Edytuj dane logowania pracownika"
                            @click="toggleModal('login')"
                        />
                               
                        <!-- Sprawdzić co ja tu miałem na myśli z tym niezadeklaorwanym worker id XDD -->
                        <WorkerComponentsWorkerModal 
                            :workerId="workerId" 
                            :worker="worker" 
                            :showSettingsModal="showSettingsModal" 
                            @update:showSettingsModal="value => showSettingsModal = value" 
                            @close="closeModal" 
                            :title="'Edytuj dane personalne pracownika'"
                            :option="option"
                        />
        
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