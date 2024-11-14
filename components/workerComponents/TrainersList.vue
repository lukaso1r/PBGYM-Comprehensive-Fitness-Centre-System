<script setup lang="ts">



const trainerStore = useTrainerStore();
const registerStore = useRegisterStore();
const { data: allTrainers} = await useAsyncData('trainers', async () => {
    await trainerStore.getAllTrainers();
    return trainerStore.allTrainers;
});

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
        label: 'Aktywny'
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

const isOpen = ref(false)
const selectedRow = ref()

const select = (row: any) => {
    console.log('Selected', row)
    isOpen.value = true
    selectedRow.value = row
    console.log('roww', selectedRow.value)
}

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


///



</script>

<template>

<div class="active-pass w-full flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
    <div class="flex flex-row justify-between align-middle">
        <p class="text-slate-500">Pracownicy zarejestrowani w systemie</p>
        <UButton v-if="showButton" label="szczegóły" to="/admin-panel/zarzadzanie/pracownicy" color="blue" icon="i-material-symbols-loupe-outline" />
    </div>
    <UTable :rows="allTrainers" :columns="columns" @select="select">
        <template #actions-data="{ row }" @click.stop>
            <UDropdown :items="items(row)" @click.stop>
            <UButton  color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
        </template>
        <template #visible-data="{ row }">
            {{ row.visible ? 'Tak ✅' : 'Nie ❌' }}
        </template> 
        <template #trainerTags-data="{ row }">
            {{ row.trainerTags.length===0 ? 'Brak' : row.trainerTags.join(', ') }}
        </template> 
    </UTable>
    <UModal v-model="isOpen">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <h3 class="font-medium text-lg">{{selectedRow ? `${selectedRow.name}  ${selectedRow.surname}` : 'Błąd wczytania danych'}}</h3>
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
                <div class="flex flex-row justify-end">
                    <UButton label="Zamknij" @click="isOpen=false" color="blue" icon="i-material-symbols-cancel"/>
                </div>
            </template>
        </UCard>
    </UModal>
</div>


</template>