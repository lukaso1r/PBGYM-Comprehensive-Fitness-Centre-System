<script setup lang="ts">

import { trainerTagTranslations } from '~/utils/trainerTagTranslations';
import type { TrainerOffer } from '~/types';

const { createTrainerOfferObject } = useObjectFactory();
const route = useRoute();
const email = ref<string>(route.params.id as string);

const trainerStore = useTrainerStore();
const groupClassesStore = useGroupClassesStore();

const showTrainerDataEditModal = ref(false);
const showAddOfferModal = ref(false);
const typeDataToEdit = ref('');
const offerToEdit = ref<TrainerOffer>(createTrainerOfferObject())
const isAddClassesModalOpen = ref(false);

const editTrainerData = (type: string) => {
    showTrainerDataEditModal.value = true;
    typeDataToEdit.value = type;
}

onMounted( async () => {
    await trainerStore.getTrainerByEmail(email.value);
    await trainerStore.getTrainerEntries(email.value);
    await trainerStore.getTrainerOfferByEmail(email.value);
    await groupClassesStore.getGroupClassesUpcomingByTrainerEmail(trainerStore.trainerData.email);
    await groupClassesStore.getGroupClassesHistoricalByTrainerEmail(trainerStore.trainerData.email);
});

onBeforeRouteLeave(() => {
    trainerStore.clearData();
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const selectOffer = (row: any) => {
    console.log(row)
    offerToEdit.value = row;
    toggleEditOfferModal();
}

const deactivateOffer = async (row: any) => {
    offerToEdit.value = row;
    offerToEdit.value.visible = false
    await trainerStore.putUpdateTrainerOffer(offerToEdit.value, trainerStore.trainerData?.email);
}

const activateOffer = async (row: any) => {
    offerToEdit.value = row;
    offerToEdit.value.visible = true
    await trainerStore.putUpdateTrainerOffer(offerToEdit.value, trainerStore.trainerData?.email);
}


const columnsTrainerSingleOffer = [{
        key: 'trainerOffers.id',
        label: 'Id'
    },
    {
        key: 'trainerOffers.title',
        label: 'Tytuł'    
    },
    {
        key: 'trainerOffers.price',
        label: 'Cena'
    },
    {
        key: 'trainerOffers.trainingSessionCount',
        label: 'Ilość sesji'
    },
    {
        key: 'trainerOffers.trainingSessionDurationInMinutes',
        label: 'Długość sesji'
    },
    {
        key: 'trainerOffers.visible',
        label: 'Aktywność'
    },
    {
        key: 'options',
        label: 'Opcje'
    }
]

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const items = (row: any) => [
    [
        {
            label: 'Szczegóły',
            icon: 'i-heroicons-document-magnifying-glass-16-solid',
            click: () => selectOffer(row)
        }
    ], 
    [
        {
            label: `${row.visible ? 'Deaktywuj' : 'Aktywuj'}`,
            icon:  row.visible ? 'i-ic-baseline-cancel' : 'i-material-symbols-mode-off-on',
            click: () => `${row.visible ? deactivateOffer(row) : activateOffer(row)}`
        }
    ], 
    [
        {
            label: 'Usuń ofertę',
            icon:   'i-material-symbols-delete-forever',
            click: () => trainerStore.deleteTrainerOffer(trainerStore.trainerData?.email, row.id)
        }
    ]
]

const showEditOfferModal = ref(false);

const toggleEditOfferModal = () => {
    showEditOfferModal.value = !showEditOfferModal.value;
}

const toggleAddOfferModal = () => {
    offerToEdit.value = createTrainerOfferObject();
    showAddOfferModal.value = !showAddOfferModal.value;
}

const onSubmitEditOffer = async () => {
    console.log('submit', offerToEdit.value)
    await trainerStore.putUpdateTrainerOffer(offerToEdit.value, trainerStore.trainerData?.email);
    toggleEditOfferModal();
}

const onSubmitAddOffer = async () => {
    console.log('submit', offerToEdit.value)
    await trainerStore.postTrainerOffer(offerToEdit.value, trainerStore.trainerData?.email);
    toggleAddOfferModal();
}

const toggleAddClassesModal = () => {
    isAddClassesModalOpen.value = !isAddClassesModalOpen.value;
}

</script>

<template>

<workerComponents-header-worker></workerComponents-header-worker>

<div class="flex flex-row bg-[#F5F7F8] items-start pb-10">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>
  
    <!-- TODO: poprawić margines -->
    <main class="min-h-screen content-start basis-4/5 mt-4 flex flex-row flex-wrap items-start justify-start gap-8">
        
        <div class="flex flex-row flex-wrap lg:min-w-[79vw] lg:max-w-[79vw] gap-8">
            <div class="trainerCardInfo w-max flex flex-row rounded-lg p-4 bg-white flex-nowrap gap-10 items-center" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <div >
                    <h1 class="text-xl font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Trener: </span>{{trainerStore.trainerData?.name}} {{trainerStore.trainerData?.surname}}</h1>
                    <p class="text-lg"><span class="text-slate-500 text-base pr-3">Id trenera: </span>{{trainerStore.trainerData?.id}}</p>
                    
                    <hr class="mt-3 mb-3"/>
                    <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Email: </span>{{trainerStore.trainerData?.email}}</p>
                    <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Telefon: </span>{{trainerStore.trainerData?.phoneNumber}}</p>
                    <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Widoczność: </span>{{trainerStore.trainerData?.visible ? 'Widoczny' : 'Niewidoczny'}}</p>
                    <UButton
                        class="lg:mt-6"
                        icon="i-material-symbols-key"
                        size="sm"
                        color="blue"
                        variant="solid"
                        label="Edytuj dane logowania trenera"
                        @click="editTrainerData('login')"
                    />
                </div>
                <img src="/images/worker/komar.jpg" class="rounded-full w-32" alt=""/>
            </div>

            <div class="trainer-info w-max max-w-1/2 flex flex-col  rounded-lg p-4 bg-white flex-nowrap justify-between" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <ul class="list-none space-y-2">
                    <li>
                        <span class="text-slate-500 pr-3">Data urodzenia:</span>
                        <span>{{trainerStore.trainerData?.birthdate}}</span>
                    </li>
                    <li>
                        <span class="text-slate-500 pr-3">Pesel:</span>
                        <span>{{trainerStore.trainerData?.pesel}}</span>
                    </li>
                    <li class="flex flex-row">
                        <span class="text-slate-500 pr-3">Adres:</span>
                        <div class="flex flex-row flex-wrap gap-4">
                            <p>{{ trainerStore.trainerData?.address.city }}</p>
                            <p>ul. {{ trainerStore.trainerData?.address.streetName }} {{ trainerStore.trainerData?.address.buildingNumber }} {{ trainerStore.trainerData?.address.apartmentNumber ? ('/ ' + trainerStore.trainerData?.address.apartmentNumber) : ' ' }}</p>
                            <p>Kod pocztowy: {{ trainerStore.trainerData?.address.postalCode }}</p>
                        </div>
                    </li>
                    <li>
                        <span class="text-slate-500 pr-3">Opis:</span>
                        <span>{{trainerStore.trainerData?.description ?? 'Brak'}}</span>
                    </li>
                    <li>
                        <span class="text-slate-500 pr-3">Tagi:</span>
                        <span>
                            {{
                                trainerStore.trainerData?.trainerTags[0] 
                                ? trainerStore.trainerData?.trainerTags
                                    .map(tag => trainerTagTranslations[tag] || tag)
                                    .join(', ') 
                                : 'Brak'
                            }}
                        </span>
                    </li>
                </ul>
                <UButton
                    class="w-fit lg:mt-6"
                    icon="i-material-symbols-manage-accounts-rounded"
                    size="sm"
                    color="blue"
                    variant="solid"
                    label="Edytuj dane personalne trenera"
                    @click="editTrainerData('personal')"
                />
                <WorkerComponentsTrainerDataEditModal v-model:showTrainerDataEditModal="showTrainerDataEditModal" :typeDataToEdit="typeDataToEdit" :trainerByEmail="trainerStore.trainerData" />
            </div>
        </div>
        

        <div class="offersContainer w-fit max-w-[79vw] flex flex-col gap-8 ">
            <div class="offers flex flex-row flex-wrap gap-8 ">
                <div class="offer flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start  gap-4" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <span class="font-semibold text-lg">Oferty trenera</span>
                    <UTable :rows="trainerStore.trainerOffersByEmail" :columns="columnsTrainerSingleOffer" @select="selectOffer">
                        <template #trainerOffers.id-data="{ row }">
                            {{ row.id }}
                        </template>
                        <template #trainerOffers.title-data="{ row }">
                            {{ row.title }}
                        </template>
                        <template #trainerOffers.price-data="{ row }">
                            {{ row.price }}
                        </template>
                        <template #trainerOffers.trainingSessionCount-data="{ row }">
                            {{ row.trainingSessionCount }}
                        </template>
                        <template #trainerOffers.trainingSessionDurationInMinutes-data="{ row }">
                            {{ row.trainingSessionDurationInMinutes }}
                        </template>
                        <template #trainerOffers.visible-data="{ row }">
                            {{ row.visible ? 'Tak ✅' : 'Nie ❌' }}
                        </template>
                        <template #empty-state>
                            <div class="flex flex-col items-center justify-center py-6 gap-3">
                                <span class="italic text-sm">Brak ofert</span>
                            </div>
                        </template>
                        <template #options-data="{ row }" @click.stop>
                            <UDropdown :items="items(row)" @click.stop>
                                <UButton  color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                            </UDropdown>
                        </template>
                    </UTable>
                    <UButton label="Dodaj ofertę" @click="toggleAddOfferModal()" color="blue" icon="i-material-symbols-add" />
                </div>
            </div>
            <UModal 
                :model-value="showEditOfferModal"
                :closable="true"
                @close="toggleEditOfferModal()"
                :ui="{}"
                >
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <h3 class="font-bold text-lg">Formularz edycji oferty trenera</h3>
                    </template>
                    <div class="w-full">
                        <div class="changeMemberDetailsContainer flex flex-col rounded-lg px-4 bg-white w-full">
                            <UForm class="flex flex-col gap-4 justify-start" :state="offerToEdit" :validate="validateNewTrainerOffer" @submit="onSubmitEditOffer()">
                                <div class="grid grid-cols-3 gap-5 items-end" >
                                    <h4 class="col-span-3 text-xl font-semibold">Edycja oferty</h4>
                                    <UFormGroup class="col-span-3" label="Tytuł oferty" name="title" required>
                                        <UInput v-model="offerToEdit.title" type="string" placeholder="Tytuł oferty" :value="offerToEdit.title"  />
                                    </UFormGroup>
                                    <UFormGroup label="Cena" name="price" required>
                                        <UInput v-model="offerToEdit.price" type="number" placeholder="Cena" :value="offerToEdit.price" />
                                    </UFormGroup>
                                    <UFormGroup label="Ilość sesji" name="trainingSessionCount" required>
                                        <UInput v-model="offerToEdit.trainingSessionCount" type="number" placeholder="Ilość sesji" :value="offerToEdit.trainingSessionCount" />
                                    </UFormGroup>
                                    <UFormGroup label="Długość sesji" name="trainingSessionDurationInMinutes" required>
                                        <UInput v-model="offerToEdit.trainingSessionDurationInMinutes" type="number" placeholder="Długość sesji" :value="offerToEdit.trainingSessionDurationInMinutes" />
                                    </UFormGroup>
                                    <UFormGroup label="Aktywność" name="visible" required>
                                        <USelect v-model="offerToEdit.visible" :options="[{label: 'Aktywna', value: true}, {label: 'Nieaktywna', value: false}]"/>
                                    </UFormGroup>
                                    
                                    <UButton type="submit" color="blue" class="bg-[#203983] hover:bg-[#617F9B] text-center grid">
                                        Zapisz dane oferty
                                    </UButton>
                                </div>
                            </UForm>
                        </div>
                    </div>
                    <template #footer>
                        <div class="flex flex-row justify-end gap-5">
                            <UButton label="Anuluj" @click="toggleEditOfferModal()" color="gray" icon="i-material-symbols-cancel" />
                        </div>
                    </template>
                </UCard>
            </UModal>
            <UModal 
                :model-value="showAddOfferModal"
                :closable="true"
                @close="toggleAddOfferModal()"
                :ui="{}"
                >
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <h3 class="font-bold text-lg">Formularz dodania nowej oferty</h3>
                    </template>
                    <div class="w-full">
                        <div class="changeMemberDetailsContainer flex flex-col rounded-lg px-4 bg-white w-full">
                            <UForm class="flex flex-col gap-4 justify-start" :state="offerToEdit" :validate="validateNewTrainerOffer" @submit="onSubmitAddOffer()">
                                <div class="grid grid-cols-3 gap-5 items-end" >
                                    <h4 class="col-span-3 text-xl font-semibold">Dodanie nowej oferty</h4>
                                    <UFormGroup class="col-span-3" label="Tytuł oferty" name="title" required>
                                        <UInput v-model="offerToEdit.title" type="string" placeholder="Tytuł oferty" :value="offerToEdit.title"  />
                                    </UFormGroup>
                                    <UFormGroup label="Cena" name="price" required>
                                        <UInput v-model="offerToEdit.price" type="number" placeholder="Cena" :value="offerToEdit.price" />
                                    </UFormGroup>
                                    <UFormGroup label="Ilość sesji" name="trainingSessionCount" required>
                                        <UInput v-model="offerToEdit.trainingSessionCount" type="number" placeholder="Ilość sesji" :value="offerToEdit.trainingSessionCount" />
                                    </UFormGroup>
                                    <UFormGroup label="Długość sesji" name="trainingSessionDurationInMinutes" required>
                                        <UInput v-model="offerToEdit.trainingSessionDurationInMinutes" type="number" placeholder="Długość sesji" :value="offerToEdit.trainingSessionDurationInMinutes" />
                                    </UFormGroup>
                                    <UFormGroup label="Aktywność" name="visible" required>
                                        <USelect v-model="offerToEdit.visible" :options="[{label: 'Aktywna', value: true}, {label: 'Nieaktywna', value: false}]"/>
                                    </UFormGroup>
                                    
                                    <UButton type="submit" color="blue" class="bg-[#203983] hover:bg-[#617F9B] text-center grid">
                                        Zapisz dane oferty
                                    </UButton>
                                </div>
                            </UForm>
                        </div>
                    </div>
                    <template #footer>
                        <div class="flex flex-row justify-end gap-5">
                            <UButton label="Anuluj" @click="toggleAddOfferModal()" color="gray" icon="i-material-symbols-cancel" />
                        </div>
                    </template>
                </UCard>
            </UModal>
        </div>

        <div class="groupClassesContainer lg:min-w-[79vw] lg:max-w-[79vw] flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start gap-4" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <span class="font-semibold text-lg">Zajęcia grupowe trenera</span>
            <WorkerComponentsGroupClassesList :showButton="false" :trainerEmail="trainerStore.trainerData.email"/>
            <UButton label="Dodaj zajęcia" @click="toggleAddClassesModal()" color="blue" icon="i-material-symbols-add" />
            <WorkerComponentsGroupClassesAddGroupClasses v-model:isAddClassesModalOpen="isAddClassesModalOpen" :trainerEmail="trainerStore.trainerData.email"/>
        </div>
        <CallendarComponentsGroupClassesCalendarForAdmin
            class="lg:min-w-[79vw] lg:max-w-[79vw]" 
            :groupClassesUpcoming="groupClassesStore.groupClassesUpcomingByTrainerEmail" 
            :groupClassesHistory="groupClassesStore.groupClassesHistoricalByTrainerEmail" 
            :trainerEmail="trainerStore.trainerData.email"
        />

        <div class="statsContainer grid grid-cols-2 gap-8 ">
            
            <div class="stats-title col-span-2 w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2 " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <h1 class="text-xl font-semibold">Statystyki</h1>
                <p class="text-slate-500">Możesz zobaczyć tutaj statystyki dotyczące trenera</p>
            </div> 

            <div class="documents flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start gap-4" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <span class="font-semibold text-lg">Historia wejść na siłownię</span>
                <ul class="flex flex-col gap-5 w-full justify-between ">
                    <pre class="">{{trainerStore.trainerEntries?.length ? trainerStore.trainerEntries :'Brak historii wejść' }}</pre>
                </ul>
            </div>
            
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