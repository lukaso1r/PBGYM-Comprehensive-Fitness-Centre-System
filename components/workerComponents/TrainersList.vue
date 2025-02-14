<script setup lang="ts">

import type { TrainerOffer, TrainerWithOffers } from '~/types';

const trainerStore = useTrainerStore();
const router = useRouter();

const props = defineProps(['showButton'])

const columns = [{
        key: 'id',
        label: 'Id'
    },
    {
        key: 'name',
        label: 'Imię'    
    },
    {
        key: 'surname',
        label: 'Nazwisko'
    },
    {
        key: 'email',
        label: 'Email'
    },
    {
        key: 'visible',
        label: 'Widoczność'
    },
    {
        key: 'phoneNumber',
        label: 'Telefon'
    },
    {
        key: 'trainerTags',
        label: 'Tagi'
    },
    {
        key: 'actions',
        label: 'Opcje'
    }
]

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const items = (row: any) => [
    [
        {
            label: 'Szczegóły',
            icon: 'i-heroicons-document-magnifying-glass-16-solid',
            click: () => select(row)
            
        },
        {
            label: 'Edytuj',
            icon: 'i-heroicons-pencil-square-20-solid',
            to: { name: 'admin-panel-zarzadzanie-trenerzy-id', params: { id: row.email } }
        }
    ]
]

const columnsTrainerOffers = [{
        key: 'trainerInfo.id',
        label: 'Id'
    },
    {
        key: 'trainerInfo.name',
        label: 'Imię'    
    },
    {
        key: 'trainerInfo.surname',
        label: 'Nazwisko'
    },
    {
        key: 'amoutOfOffers',
        label: 'Liczba ofert'
    },
    {
        key: 'trainerOffers',
        label: 'Oferty'
    }
]

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
    }
]

onMounted(async () => {
    await trainerStore.getAllTrainersWithOffers();
    await trainerStore.getAllTrainers();

})

const isOpen = ref(false)
const selectedRow = ref()

const offerId = ref();
const trainer = ref<TrainerWithOffers>({} as TrainerWithOffers);


// biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const select = (row: any) => {
    console.log('Selected Row:', row);
    if (!row.email) {
        console.error('Row does not contain email!');
        return;
    }
    isOpen.value = true;
    selectedRow.value = row;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const selectOffer = (row: any) => {
    console.log('Selected Offer Row:', row);
    if (!row.id) {
        console.error('Row does not contain id!');
        return;
    }
    isOpen.value = true;
    selectedRow.value = row;
    offerId.value = row.id;
    trainer.value = trainerStore.allTrainersWithOffers.find(trainer =>
        trainer.trainerOffers.some(offer => offer.id === offerId.value as unknown as number)
    ) as TrainerWithOffers;
};


</script>

<template>

<div class="active-pass w-full max-w-[78vw] flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
    <div class="flex flex-row justify-between align-middle">
        <p class="text-slate-500">Trenerzy zarejestrowani w systemie</p>
        <UButton v-if="showButton" label="szczegóły" to="/admin-panel/zarzadzanie/pracownicy" color="blue" icon="i-material-symbols-loupe-outline" />
    </div>
    <UTable :rows="trainerStore.allTrainers" :columns="columns" @select="select">
        <template #actions-data="{ row }" @click.stop>
            <UDropdown :items="items(row)" @click.stop>
                <UButton  color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
        </template>
        <template #visible-data="{ row }">
            {{ row.visible ? 'Tak ✅' : 'Nie ❌' }}
        </template> 
        <template #trainerTags-data="{ row }">
            {{ row.trainerTags.length === 0 ? 'Brak' : row.trainerTags.slice(0, 3).join(', ') + (row.trainerTags.length > 3 ? '...' : '') }}
        </template> 
        <template #empty-state>
            <div class="flex flex-col items-center justify-center py-6 gap-3">
                <span class="italic text-sm">Brak trenerów</span>
            </div>
        </template>
    </UTable>
    <UModal v-model="isOpen">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <h3 class="font-medium text-lg">
                    {{selectedRow.name ? `${selectedRow.name}  ${selectedRow.surname}` : selectedRow.title ? `Oferta: ${selectedRow.title}` : 'Błąd wczytania danych'}}
                </h3>
            </template>
            <table class="table-auto">
                <tbody>
                    <template v-if="selectedRow.name">
                        
                        <tr>
                            <td class="font-bold pr-8 pb-2">Id</td>
                            <td>{{ selectedRow.id }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Email</td>
                            <td>{{ selectedRow.email }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Imię</td>
                            <td>{{ selectedRow.name }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Nazwisko</td>
                            <td>{{ selectedRow.surname }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Data urodzenia</td>
                            <td>{{ selectedRow.birthdate }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">PESEL</td>
                            <td>{{ selectedRow.pesel }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Telefon</td>
                            <td>{{ selectedRow.phoneNumber }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Adres</td>
                            <td>{{ selectedRow.address.city }}, {{ selectedRow.address.streetName }} {{ selectedRow.address.buildingNumber }}/{{ selectedRow.address.apartmentNumber }}, {{ selectedRow.address.postalCode }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Opis</td>
                            <td>{{ selectedRow.description }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Zdjęcie</td>
                            <td>
                                <img v-if="selectedRow?.photo" :src="selectedRow?.photo" alt="Podgląd zdjęcia" class="mt-2 lg:max-w-48 object-cover rounded" />
                                <span v-else>Brak zdjęcia</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Płeć</td>
                            <td>{{ selectedRow.gender }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Widoczny</td>
                            <td>{{ selectedRow.visible ? 'Tak ✅' : 'Nie ❌' }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Tagi</td>
                            <td>{{ selectedRow.trainerTags.length === 0 ? 'Brak' : selectedRow.trainerTags.join(', ') }}</td>
                        </tr>
                    </template>
                    <template v-else-if="selectedRow.title">
                            <tr>
                                <td class="font-bold pr-8 py-2">Id:</td>
                                <td>{{selectedRow.id}}</td>
                            </tr>
                            <tr>
                                <td class="font-bold pr-8 py-2">Tytuł:</td>
                                <td>{{selectedRow.title}}</td>
                            </tr>
                            <tr>
                                <td class="font-bold pr-8 py-2">Cena:</td>
                                <td>{{selectedRow.price}}</td>
                            </tr>
                            <tr>
                                <td class="font-bold pr-8 py-2">Ilość sesji:</td>
                                <td>{{selectedRow.trainingSessionCount}}</td>
                            </tr>
                            <tr>
                                <td class="font-bold pr-8 py-2">Długość sesji:</td>
                                <td>{{selectedRow.trainingSessionDurationInMinutes}}</td>
                            </tr>
                            <tr>
                                <td class="font-bold pr-8 py-2">Aktywność:</td>
                                <td>{{selectedRow.visible ? 'Tak ✅' : 'Nie ❌'}}</td>
                            </tr>
                            <tr>
                                <td class="font-bold pr-8 py-2">Trener:</td>
                                <td>{{trainer.trainerInfo.name}} {{trainer.trainerInfo.surname}}</td>
                            </tr>
                    </template>
                </tbody>
            </table>
            <template #footer >
                <div class="optionButtons flex flex-row justify-end gap-8">
                    <div class="flex flex-row" v-if="selectedRow.email">
                        <UButton label="Zobacz szczegóły" @click="router.push({ name: 'admin-panel-zarzadzanie-trenerzy-id', params: { id: selectedRow.email } })" color="blue" icon="i-material-symbols-edit-square-outline-rounded"/>
                    </div>
                    <div class="flex flex-row">
                        <UButton label="Zamknij" @click="isOpen=false" color="gray" icon="i-material-symbols-cancel"/>
                    </div>
                </div>
                
            </template>
        </UCard>
    </UModal>
</div>

<div class="trainers-with-offers w-full max-w-[78vw] flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
    <div class="flex flex-row justify-between align-middle">
        <p class="text-slate-500">Trenerzy z ofertami</p>
    </div>
        <UTable :rows="trainerStore.allTrainersWithOffers" :columns="columnsTrainerOffers">
            <template #trainerOffers-data="{ row }">
                <template v-if="row.trainerOffers.length != 0">
                    <UTable :rows="row.trainerOffers" :columns="columnsTrainerSingleOffer" @select="selectOffer">
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
                    </UTable>
                </template>
                <template v-else>
                    <div class="flex flex-col items-center justify-center py-2 gap-3">
                        <span class="italic text-sm">Brak ofert</span>
                    </div>
                </template>
            </template>
            <template #amoutOfOffers-data="{ row }">
                {{ row.trainerOffers?.length }}
            </template>
        </UTable>
</div>




</template>

<style scoped>


</style>