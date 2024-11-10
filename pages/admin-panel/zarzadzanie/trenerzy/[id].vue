<script setup lang="ts">

import type { TrainerData, TrainerDataToEdit} from '~/types';

const route = useRoute();
const email = ref<string>(route.params.id as string);

const trainerStore = useTrainerStore();
const passStore = usePassStore();


const showTrainerDataEditModal = ref(false);
const typeDataToEdit = ref('');

const editTrainerData = (type: string) => {
    showTrainerDataEditModal.value = true;
    typeDataToEdit.value = type;
}

onMounted( async () => {
    await trainerStore.getTrainerByEmail(email.value);
    // await passStore.getMemberPassHistory(email.value);
    // await passStore.getActiveMemberPass(email.value);
});

onBeforeRouteLeave(() => {
    // membersManagmentStore.clearData();
    passStore.clearData();
});

const buyPassForMember = () =>{
    console.log('buyPassForMember');
    // passStore.buyPassForMember(email.value);
}

const test = () => {
    console.log('test', passStore.activeMemberPass);
}


</script>

<template>
<!-- <UButton @click="test">test</UButton> -->

<workerComponents-header-worker></workerComponents-header-worker>

<div class="flex flex-row bg-[#F5F7F8] items-start pb-10">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>
  
    <!-- TODO: poprawić margines -->
    <main class="min-h-screen content-start basis-4/5 mt-4 flex flex-row flex-wrap items-stretch justify-start gap-8">
        
        {{trainerStore.trainerData}}

        <div class="active-pass w-max flex flex-row rounded-lg p-4 bg-white flex-nowrap gap-10 items-center" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <div>
                <h1 class="text-xl font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Trener: </span>{{trainerStore.trainerData?.name}} {{trainerStore.trainerData?.surname}}</h1>
                <p class="text-lg"><span class="text-slate-500 text-base pr-3">Id trenera: </span>{{trainerStore.trainerData?.id}}</p>
                
                <hr class="mt-3 mb-3"/>
                <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Email: </span>{{trainerStore.trainerData?.email}}</p>
                <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Telefon: </span>{{trainerStore.trainerData?.phoneNumber}}</p>
                <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Widoczność: </span>{{trainerStore.trainerData?.visible ? 'Aktywny' : 'Nieaktywny'}}</p>
            </div>
            <img src="/images/worker/komar.jpg" class="rounded-full w-32" alt=""/>
        </div>

        <div class="active-pass w-max flex flex-col  rounded-lg p-4 bg-white flex-nowrap justify-between" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <ul>
                <li class="text-lg"><span class="text-slate-500 text-base pr-3">Data urodzenia: </span>{{trainerStore.trainerData?.birthdate}}</li>
                <li class="text-lg"><span class="text-slate-500 text-base pr-3">Pesel: </span>{{trainerStore.trainerData?.pesel}}</li>
                <li class="text-lg">
                    <span class="text-slate-500 text-base pr-3">Adres: </span>
                    {{
                        trainerStore.trainerData?.address.city 
                        + ' ' + trainerStore.trainerData?.address.streetName 
                        + ' ' + trainerStore.trainerData?.address.buildingNumber 
                        + (trainerStore.trainerData?.address.apartmentNumber ? ('/' + trainerStore.trainerData?.address.apartmentNumber) : ' ') 
                        + trainerStore.trainerData?.address.postalCode 
                    }}
                </li>
                <li class="text-lg"><span class="text-slate-500 text-base pr-3">Opis: </span>{{trainerStore.trainerData?.description ?? 'Brak'}}</li>
                <li class="text-lg"><span class="text-slate-500 text-base pr-3">Tagi: </span>{{trainerStore.trainerData?.trainerTags ?? 'Brak'}}</li>
            </ul>
            <div class="flex flex-row gap-4">
                
            </div>
        </div>

        <div class="options w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-4  items-start" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <UButton
                icon="i-material-symbols-key"
                size="sm"
                color="blue"
                variant="solid"
                label="Edytuj dane logowania trenera"
                @click="editTrainerData('login')"
            />
            <UButton
                icon="i-material-symbols-manage-accounts-rounded"
                size="sm"
                color="blue"
                variant="solid"
                label="Edytuj dane personalne trenera"
                @click="editTrainerData('personal')"
            />

            <WorkerComponentsTrainerDataEditModal v-model:showTrainerDataEditModal="showTrainerDataEditModal" :typeDataToEdit="typeDataToEdit" :trainerByEmail="trainerStore.trainerData" />



        </div>

        <div class="active-pass w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2 " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Statystyki</h1>
            <p class="text-slate-500">Możesz zobaczyć tutaj statystyki dotyczące trenera</p>
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

table{
    border-spacing: 20px!important;
}

tr>td{
    padding: 5px;
}

</style>