<script setup lang="ts">

import type {  } from '~/types';

const router = useRouter();

const groupClassesStore = useGroupClassesStore();

onMounted(async () => {
   await groupClassesStore.getGroupClassesUpcoming();
   await groupClassesStore.getGroupClassesHistorical();

})

const props = defineProps<{
    showButton?: boolean,
    trainerEmail?: string,
}>();

const columns = [{
        key: 'id',
        label: 'Id'
    },
    {
        key: 'title',
        label: 'Tytuł'    
    },
    {
        key: 'dateStart',
        label: 'Data',
        sortable: true,
        direction: 'asc' as const
    },
    {
        key: 'trainer',
        label: 'Trener',
        sortable: true,
    },
    {
        key: 'currentMemberCount',
        label: 'Liczba zapisanych osób',
        sortable: true,
    },
    {
        key: 'memberLimit',
        label: 'Maksymalna liczba osób',
        sortable: true,
    }
]

const isOpen = ref(false)
const selectedRow = ref()
const currentDateTime = new Date();


// biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const select = (row: any) => {
    console.log('Selected Row:', row);
    isOpen.value = true;
    selectedRow.value = row;
};



</script>

<template>

<div 
    class="active-pass w-full max-w-[79vw] flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" 
    :class="{ 'border-2 border-slate-300': trainerEmail }"
    :style="{ boxShadow: trainerEmail ? '' : '0px 0px 24px -8px rgba(66, 68, 90, 1)' }"      
>
    <div class="flex flex-row justify-between align-middle">
        <p class="text-slate-500">Zbliżające zajęcia zarejestrowane w systemie</p>
        <UButton v-if="showButton" label="szczegóły" to="/admin-panel/zarzadzanie/pracownicy" color="blue" icon="i-material-symbols-loupe-outline" />
    </div>
    <UTable :rows="groupClassesStore.groupClassesUpcoming" :columns="columns" @select="select">
        <template #trainer-data="{ row }">
            {{ row.trainer.name + " " + row.trainer.surname + " " + row.trainer.email }}
        </template> 
        <template #dateStart-data="{ row }">
            <span :class="{
            'text-green-400': new Date(row.dateStart) < currentDateTime,
            'text-orange-300': new Date(row.dateStart) >= currentDateTime && new Date(row.dateStart) <= new Date(currentDateTime.getTime() + 30 * 60000)
            }">
            {{ dateWithTimeString(new Date(row.dateStart)) }}
            </span>
        </template>
        <template #empty-state>
            <p class="text-slate-500 text-center pt-2">Brak zajęć</p>
        </template>
    </UTable>
</div>

<div class="active-pass w-full max-w-[79vw] flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" 
    :style="{ boxShadow: trainerEmail ? '' : '0px 0px 24px -8px rgba(66, 68, 90, 1)' }"
    :class="{ 'border-2 border-slate-300': trainerEmail }"
>
    <div class="flex flex-row justify-between align-middle">
        <p class="text-slate-500">Historia odbytych zajęć</p>
        <UButton v-if="showButton" label="szczegóły" to="/admin-panel/zarzadzanie/pracownicy" color="blue" icon="i-material-symbols-loupe-outline" />
    </div>
    <UTable :rows="groupClassesStore.groupClassesHistorical" :columns="columns" @select="select">
        <template #dateStart-data="{ row }">
            {{ dateWithTimeString(new Date(row.dateStart)) }}
        </template>
        <template #trainer-data="{ row }">
            {{ row.trainer.name + " " + row.trainer.surname + " " + row.trainer.email }}
        </template> 
        <template #empty-state>
            <p class="text-slate-500 text-center pt-2">Brak zajęć</p>
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
                <tr class="pb-2">
                    <td class="font-bold pr-8 ">id</td>
                    <td>{{selectedRow.id}}</td>
                </tr>
                <tr class="pb-2">
                    <td class="font-bold pr-8">Tytuł</td>
                    <td>{{selectedRow.title}}</td>
                </tr>
                <tr class="pb-2">
                    <td class="font-bold pr-8">Trener</td>
                    <td>{{selectedRow.trainer.name + " " + selectedRow.trainer.surname + " " + selectedRow.trainer.email + " tel: " + selectedRow.trainer.phoneNumber}}</td>
                </tr>
                <tr class="pb-2">
                    <td class="font-bold pr-8">Data</td>
                    <td>{{dateWithTimeString(new Date(selectedRow.dateStart))}}</td>
                </tr>
                <tr class="pb-2">
                    <td class="font-bold pr-8">Liczba zapisanych osób</td>
                    <td>{{selectedRow.currentMemberCount}}</td>
                </tr>
                <tr class="pb-2">
                    <td class="font-bold pr-8">Maksymalna liczba osób</td>
                    <td>{{selectedRow.memberLimit}}</td>
                </tr>
                <tr class="pb-2">
                    <td class="font-bold pr-8">Czas trwania w minutach</td>
                    <td>{{selectedRow.durationInMinutes}}</td>
                </tr>

            </tbody>
        </table>
        <template #footer >
            <div class="optionButtons flex flex-row justify-between">
                <div class="flex flex-row justify-end w-full gap-6">
                    <UButton label="Przejdź do panelu zajęć" 
                        color="blue" icon="i-material-symbols-edit"
                        @click="router.push(`/admin-panel/zarzadzanie/zajecia/${ 
                            isDateFromPast(new Date(new Date(selectedRow.dateStart).getTime() + selectedRow.durationInMinutes * 60000)) 
                              ? 'past' 
                              : 'future' 
                          }/${selectedRow.id}`)"
                    />
                    <UButton label="Zamknij" @click="isOpen=false" color="gray" icon="i-material-symbols-cancel"/>
                </div>
            </div>
            
        </template>
    </UCard>
</UModal>






</template>

<style scoped>


</style>