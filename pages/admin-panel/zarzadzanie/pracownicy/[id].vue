<script setup lang="ts">

import type { Worker } from '~/types'

const route = useRoute()
const router = useRouter()

const store = useWorkerStore()
const worker = ref<Worker>()

const showSettingsModal = ref(false)
const option = ref('')

watchEffect(() => {
    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    worker.value = store.allWorkers.find(worker => worker.id == route.params.id);
    // TODO: to potencjalnie może wywalać w przyszłości kiedy będzie to już public np i będzie jakieś opóźnienie w pobraniu danych 
    if(!worker.value) {
        router.push('/admin-panel/zarzadzanie/pracownicy')
    }
});

const closeModal = () => {
    showSettingsModal.value = false;
}

const test = () => {
    console.log('test', worker.value)
    console.log('showSettingsModal', showSettingsModal.value)
}



const toggleModal = (choosenOption: string) => {
    option.value = choosenOption;
    showSettingsModal.value = !showSettingsModal.value;
    console.log('option', option.value)
};


</script>

<template>
<!-- <UButton @click="test">test</UButton> -->

<workerComponents-header-worker></workerComponents-header-worker>

<div class="flex flex-row bg-[#F5F7F8] items-start pb-10">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>
  
    <!-- TODO: poprawić margines -->
    <main  v-if="checkPermission(['ADMIN'])"  class="min-h-screen content-start basis-4/5 mt-4 grid grid-cols-3 items-stretch justify-start gap-8">
        
        <div  v-if="checkPermission(['ADMIN'])"  class="active-pass w-full col-span-1 flex flex-row rounded-lg p-4 bg-white flex-nowrap gap-10 items-center" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <div>
                <h1 class="text-xl font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Pracownik: </span>{{worker?.name}} {{worker?.surname}}</h1>
                <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Stanowisko: </span>{{worker?.position}}</p>
                <p class="text-lg"><span class="text-slate-500 text-base pr-3">Id pracownika: </span>{{worker?.id}}</p>
                
                <hr class="mt-3 mb-3"/>
                <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Email: </span>{{worker?.email}}</p>
                <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Telefon: </span>{{worker?.phoneNumber}}</p>
                <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Karta: </span>{{worker?.idCardNumber}}</p>
            </div>
        </div>

        <div  v-if="checkPermission(['ADMIN'])"  class="active-pass w-full col-span-1 flex flex-col  rounded-lg p-4 bg-white flex-nowrap justify-between" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <ul>
                <li class="text-lg"><span class="text-slate-500 text-base pr-3">Data urodzenia: </span>{{worker?.birthdate}}</li>
                <li class="text-lg"><span class="text-slate-500 text-base pr-3">Pesel: </span>{{worker?.pesel}}</li>
                <li class="text-lg"><span class="text-slate-500 text-base pr-3">Adres: </span>{{worker?.address.city + ' ' + worker?.address.streetName + ' ' + worker?.address.buildingNumber + (worker?.address.apartmentNumber ? ('/' + worker?.address.apartmentNumber) : ' ') + worker?.address.postalCode }}</li>
                <li class="text-lg"><span class="text-slate-500 text-base pr-3">Uprawnienia: </span>{{ worker?.permissions.join(', ') }}</li>
            </ul>
            <div class="flex flex-row gap-4">
                
            </div>
        </div>

        <div  v-if="checkPermission(['ADMIN'])"  class="options w-full col-span-1 flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-4  items-start" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
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
                <UButton
                    icon="i-material-symbols-manage-accounts-rounded"
                    size="sm"
                    color="blue"
                    variant="solid"
                    label="Edytuj uprawnienia pracownika"
                    @click="toggleModal('permissions')"
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

        

    </main>
    
    <div v-else>
        <p class="text-red-500">Brak uprawnień do przeglądania tej strony</p>
    </div>

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