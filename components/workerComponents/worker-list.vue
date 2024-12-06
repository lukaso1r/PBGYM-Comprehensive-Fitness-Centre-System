<script setup lang="ts">

const workerStore = useWorkerStore();
const { data: allWorkers} = await useAsyncData('workers', async () => {
    await workerStore.getAllWorkers();
    return workerStore.allWorkers;
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
        key: 'idCardNumber',
        label: 'Numer Karty'
    },
    {
        key: 'email',
        label: 'Email'
    },
    {
        key: 'position',
        label: 'Rola'
    },
    {
        key: 'phoneNumber',
        label: 'Telefon'
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
            to: { name: 'admin-panel-zarzadzanie-pracownicy-id', params: { id: row.id } }
        }
    ], 
    [
        {
            label: 'Deaktywuj',
            icon: 'i-ic-baseline-cancel'
        }
    ]
]

</script>

<template>

<div class="active-pass w-full flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
    <div class="flex flex-row justify-between align-middle">
        <p class="text-slate-500">Pracownicy zarejestrowani w systemie</p>
        <UButton v-if="showButton" label="szczegóły" to="/admin-panel/zarzadzanie/pracownicy" color="blue" icon="i-material-symbols-loupe-outline" />
    </div>
    <UTable :rows="allWorkers" :columns="columns" @select="select">
        <template #actions-data="{ row }" @click.stop>
            <UDropdown :items="items(row)" @click.stop>
            <UButton  color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
        </template>
    </UTable>
    <UModal v-model="isOpen">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <h3 class="font-medium text-lg">{{selectedRow ? `${selectedRow.name}  ${selectedRow.surname} - ${selectedRow.position}` : 'nic'}}</h3>
            </template>
            <table class="table-auto">
                <tbody>
                    <tr>
                        <td class="font-bold pr-8 pb-2">ID:</td>
                        <td>{{selectedRow.id}}</td>
                    </tr>
                    <tr>
                        <td class="font-bold pr-8 pb-2">Email:</td>
                        <td>{{selectedRow.email}}</td>
                    </tr>
                    <tr>
                        <td class="font-bold pr-8 pb-2">Imię:</td>
                        <td>{{selectedRow.name}}</td>
                    </tr>
                    <tr>
                        <td class="font-bold pr-8 pb-2">Nazwisko:</td>
                        <td>{{selectedRow.surname}}</td>
                    </tr>
                    <tr>
                        <td class="font-bold pr-8 pb-2">Data urodzenia:</td>
                        <td>{{selectedRow.birthdate}}</td>
                    </tr>
                    <tr>
                        <td class="font-bold pr-8 pb-2">Pesel:</td>
                        <td>{{selectedRow.pesel}}</td>
                    </tr>
                    <tr>
                        <td class="font-bold pr-8 pb-2">Numer telefonu:</td>
                        <td>{{selectedRow.phoneNumber}}</td>
                    </tr>
                    <tr>
                        <td class="font-bold pr-8 pb-2">Adres:</td>
                        <td>{{`${selectedRow.address.streetName} ${selectedRow.address.buildingNumber}${selectedRow.address.apartmentNumber ? '/' + selectedRow.address.apartmentNumber : ''}, ${selectedRow.address.postalCode} ${selectedRow.address.city}`}}</td>
                    </tr>
                    <tr>
                        <td class="font-bold pr-8 pb-2">Numer dowodu:</td>
                        <td>{{selectedRow.idCardNumber}}</td>
                    </tr>
                    <tr>
                        <td class="font-bold pr-8 pb-2">Stanowisko:</td>
                        <td>{{selectedRow.position}}</td>
                    </tr>
                    <tr>
                        <td class="font-bold pr-8 pb-2">Płeć:</td>
                        <td>{{selectedRow.gender}}</td>
                    </tr>
                    <tr>
                        <td class="font-bold pr-8 pb-2">Uprawnienia:</td>
                        <td>{{selectedRow.permissions.join(", ")}}</td>
                    </tr> 
                </tbody>
            </table>
            <template #footer >
                <div class="flex flex-row justify-end gap-8">
                    <UButton label="Przejdź do profilu pracownika"  :to="{ name: 'admin-panel-zarzadzanie-pracownicy-id', params: { id: selectedRow.id } }" color="blue" icon="i-heroicons-arrow-right-20-solid"/>
                    <UButton label="Zamknij" @click="isOpen=false" color="blue" icon="i-material-symbols-cancel"/>
                </div>
            </template>
        </UCard>
    </UModal>
</div>

</template>