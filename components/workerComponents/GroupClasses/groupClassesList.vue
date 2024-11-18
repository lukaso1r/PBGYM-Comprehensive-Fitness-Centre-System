<script setup lang="ts">

import type {  } from '~/types';

const router = useRouter();

const groupClassesStore = useGroupClassesStore();

onMounted(async () => {
   await groupClassesStore.getGroupClassesUpcoming();
   await groupClassesStore.getGroupClassesHistorical();

})

const props = defineProps(['showButton'])

const columns = [{
        key: 'id',
        label: 'Id'
    },
    {
        key: 'title',
        label: 'Tytuł'    
    },
    {
        key: 'date',
        label: 'Data'
    },
    {
        key: 'trainer',
        label: 'Trener'
    },
    {
        key: 'currentMemberCount',
        label: 'Liczba zapisanych osób'
    },
    {
        key: 'memberLimit',
        label: 'Maksymalna liczba osób'
    }
]

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
    ], 
    [
        {
            label: 'Deaktywuj',
            icon: 'i-ic-baseline-cancel'
        }
    ]
]


const isOpen = ref(false)
const selectedRow = ref()


// biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const select = (row: any) => {
    console.log('Selected Row:', row);
    isOpen.value = true;
    selectedRow.value = row;
};



</script>

<template>

<div class="active-pass w-full max-w-[78vw] flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
    <div class="flex flex-row justify-between align-middle">
        <p class="text-slate-500">Zbliżające zajęcia zarejestrowane w systemie</p>
        <UButton v-if="showButton" label="szczegóły" to="/admin-panel/zarzadzanie/pracownicy" color="blue" icon="i-material-symbols-loupe-outline" />
    </div>
    <UTable :rows="groupClassesStore.groupClassesUpcoming" :columns="columns" @select="select">
        <template #trainer-data="{ row }">
            {{ row.trainer.name + " " + row.trainer.surname + " " + row.trainer.email }}
        </template> 
        <template #date-data="{ row }">
            {{ dateWithTimeString(new Date(row.date)) }}
        </template>
    </UTable>
</div>

<div class="active-pass w-full max-w-[78vw] flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
    <div class="flex flex-row justify-between align-middle">
        <p class="text-slate-500">Historia odbytych zajęć</p>
        <UButton v-if="showButton" label="szczegóły" to="/admin-panel/zarzadzanie/pracownicy" color="blue" icon="i-material-symbols-loupe-outline" />
    </div>
    <UTable :rows="groupClassesStore.groupClassesHistorical" :columns="columns" @select="select">
        <template #date-data="{ row }">
            {{ dateWithTimeString(new Date(row.date)) }}
        </template>
        <template #trainer-data="{ row }">
            {{ row.trainer.name + " " + row.trainer.surname + " " + row.trainer.email }}
        </template> 
    </UTable>
</div>

<UModal v-model="isOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
            <h3 class="font-medium text-lg">
                {{selectedRow.title ? `Zajęcia: ${selectedRow.title}` : 'Błąd wczytania danych'}}
            </h3>
        </template>
        <table class="table-auto">
            <tbody>
                <tr v-for="(value, key) in selectedRow" :key="key">
                    <td class="font-bold pr-8 pb-2">{{ key }}</td>
                    <td>{{ value }}</td>
                </tr>
            </tbody>
        </table>
        <template #footer >
            <div class="optionButtons flex flex-row justify-between">
                <div class="flex flex-row justify-end">
                    <UButton label="Zamknij" @click="isOpen=false" color="gray" icon="i-material-symbols-cancel"/>
                </div>
            </div>
            
        </template>
    </UCard>
</UModal>






</template>

<style scoped>


</style>