<script lang="ts" setup>
import type { LoggedMemberData } from '~/types';

const route = useRoute();
const email = ref<string>(route.params.id as string);

const membersManagmentStore = useMembersManagmentStore();
const loginStore = useLoginStore();
const loggedWorker = computed(() => loginStore.loggedWorkerData);

const showMemberDataEditModal = ref(false);
const typeDataToEdit = ref('');

const editMemberData = (type: string) => {
    showMemberDataEditModal.value = true;
    typeDataToEdit.value = type;
}

onMounted( async () => {
    await membersManagmentStore.getMemberByEmail(email.value);
});



</script>

<template>
    Email {{email}} drugi:{{membersManagmentStore.memberByEmail}}
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
                        <h1 class="text-xl font-semibold"><span class="text-slate-500 text-base font-normal pr-3">
                            Klient: </span>
                            {{membersManagmentStore.memberByEmail?.name}} {{membersManagmentStore.memberByEmail?.surname}}</h1>
                        <p class="text-lg"><span class="text-slate-500 text-base pr-3">Id klienta: </span>{{membersManagmentStore.memberByEmail?.id}}</p>
                        
                        <hr class="mt-3 mb-3"/>
                        <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Email: </span>{{membersManagmentStore.memberByEmail?.email}}</p>
                        <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Telefon: </span>{{membersManagmentStore.memberByEmail?.phoneNumber}}</p>
                    </div>
                    <img src="/images/worker/komar.jpg" class="rounded-full w-32" alt=""/>
                </div>
        
                <div class="active-pass w-max flex flex-col  rounded-lg p-4 bg-white flex-nowrap justify-between" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <ul>
                        <li class="text-lg"><span class="text-slate-500 text-base pr-3">Data urodzenia: </span>{{membersManagmentStore.memberByEmail?.birthdate}}</li>
                        <li class="text-lg"><span class="text-slate-500 text-base pr-3">Pesel: </span>{{membersManagmentStore.memberByEmail?.pesel}}</li>
                        <li class="text-lg">
                            <span class="text-slate-500 text-base pr-3">
                                Adres: </span>
                                {{membersManagmentStore.memberByEmail?.address?.city 
                                + ' ' 
                                + membersManagmentStore.memberByEmail?.address?.streetName 
                                + ' ' 
                                + membersManagmentStore.memberByEmail?.address?.buildingNumber 
                                + (membersManagmentStore.memberByEmail?.address?.apartmentNumber ? ('/' + membersManagmentStore.memberByEmail?.address?.apartmentNumber) : ' ') 
                                + ' ' 
                                +  membersManagmentStore.memberByEmail?.address?.postalCode }}
                        </li>
                    </ul>
                </div>
        
                <div class="options w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-4  items-start" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <UButton
                        icon="i-material-symbols-account-box"
                        size="sm"
                        color="blue"
                        variant="solid"
                        label="Edytuj dane personalne klienta"
                        @click="editMemberData('data')"
                        v-show="loggedWorker.permissions.includes('ADMIN')"
                    />
                    <UButton
                        icon="i-material-symbols-key"
                        size="sm"
                        color="blue"
                        variant="solid"
                        label="Edytuj dane logowania klienta"
                        @click="editMemberData('login')"
                    />

                    <WorkerComponentsMemberDataEditModal 
                        v-model:showMemberDataEditModal="showMemberDataEditModal"
                        :typeDataToEdit="typeDataToEdit"   
                        :memberByEmail="membersManagmentStore.memberByEmail" 
                    />
                </div>
            </div>
            <div class="active-pass w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2 " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <h1 class="text-xl font-semibold">Statystyki</h1>
                <p class="text-slate-500">Możesz zobaczyć tutaj statystyki dotyczące pracownika</p>
            </div>
    
            <div class="flex flex-row flex-nowrap gap-8 items-start">
                <div class="total-entrance-amount flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start basis-3/5 gap-4" 
                    style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <span class="font-semibold text-lg">Tu będą wykresy ***TODO***</span>
                    <img src="/images/twoj-profil/chart.jpg" alt="" srcset="">
                    <p>Chyba stąd: <a href="ui.shadcn.com/charts" class="text-blue-800">ui.shadcn.com/charts</a></p>
                </div>
            
                <div class="total-entrance-amount flex flex-col rounded-lg p-4 gap-4 basis-2/5 bg-white justify-end bg-cover bg-right-bottom " 
                    style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <span class="font-semibold text-lg">Tu będą diagramy ***TODO***</span>
                    <img src="/images/worker/diagram.jpg" alt="" srcset="">
                </div>  
            </div>
        </main>
    </div>
</template>

<style scoped>

</style>