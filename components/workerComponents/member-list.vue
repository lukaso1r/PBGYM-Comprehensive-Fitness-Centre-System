<script setup lang="ts">

import type { LoggedMemberData } from '~/types';

const workerStore = useWorkerStore();

const membersManagmentStore = useMembersManagmentStore();
const { data: allMembers} = await useAsyncData('members', async () => {
    await membersManagmentStore.getAllMembers();
    return membersManagmentStore.allMembers || [];
}, { default: () => [] });

const props = defineProps(['showButton'])

const columns = [
    {
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
        key: 'pesel',
        label: 'Numer Pesel'
    },
    {
        key: 'email',
        label: 'Email'
    },
    {
        key: 'phoneNumber',
        label: 'Telefon'
    },
    {
        key: 'passActive',
        label: 'Aktwyny karnet?',
        sortable: true,
        direction: 'asc' as const
    },
    {
        key: 'passDateEnd',
        label: 'Koniec karnetu',
        sortable: true
    },
    {
        key: 'actions',
        label: 'Opcje'
    }
]

const isOpen = ref(false)
const selectedRow = ref()

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const select = (row: any) => {
    console.log('Selected', row)
    isOpen.value = true
    selectedRow.value = row
    console.log('roww', selectedRow.value)
}

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
            to: { name: 'admin-panel-zarzadzanie-klienci-id', params: { id: row.email } }
        }
    ]
]

const memberQuerry = ref('')

const filteredRows = computed(() => {
  if (memberQuerry.value === '') {
    return allMembers.value
  }

  return allMembers.value?.filter((member: LoggedMemberData ) => {
    return Object.values(member).some((value) => {
      return String(value).toLowerCase().includes(memberQuerry.value.toLowerCase())
    })
  })
})

</script>

<template>

<div class="active-pass w-full flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
    <div class="flex flex-row justify-between align-middle">
        <p class="text-slate-500">Klienci zarejestrowani w systemie</p>
        <UButton v-if="showButton" label="szczegóły" to="/admin-panel/zarzadzanie/pracownicy" color="blue" icon="i-material-symbols-loupe-outline" />
    </div>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
        <UInput v-model="memberQuerry" placeholder="Wyszukaj klienta..." />
    </div>
    <UTable :rows="filteredRows" :columns="columns" @select="select">
        <template #actions-data="{ row }" @click.stop>
            <UDropdown :items="items(row)" @click.stop>
                <UButton  color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
        </template>
        <template #passDateEnd-data="{ row }" @click.stop>
            <span>{{row.passDateEnd ? dateToString(new Date(row.passDateEnd)) : ''}}</span>
        </template>
        <template #passActive-data="{ row }" @click.stop>
            <span>{{row.passActive ? 'Tak' : 'Nie'}}</span>
        </template>
        <template #empty-state>
            <div class="flex flex-col items-center justify-center py-6 gap-3">
                <span class="italic text-sm">Brak zarejestrowanych klientów</span>
            </div>
        </template>
        
    </UTable>
    <UModal v-model="isOpen">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <h3 class="font-medium text-lg">{{selectedRow ? `${selectedRow.name} ${selectedRow.surname}` : 'nic'}}</h3>
            </template>
            <table class="table-auto">
                <tbody>
                    <tr>
                        <td class="font-bold pr-8 pb-2">Id:</td>
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
                        <td class="font-bold pr-8 pb-2">Płeć:</td>
                        <td>{{selectedRow.gender}}</td>
                    </tr>
                    <tr>
                        <td class="font-bold pr-8 pb-2">Adres:</td>
                        <td>{{selectedRow.address ? `${selectedRow.address.streetName} ${selectedRow.address.buildingNumber}${selectedRow.address.apartmentNumber ? '/' + selectedRow.address.apartmentNumber : ''}, ${selectedRow.address.postalCode} ${selectedRow.address.city}` : ''}}</td>
                    </tr>
                    <tr>
                        <td class="font-bold pr-8 pb-2">Aktywny karnet:</td>
                        <td>{{selectedRow.passActive ? "Tak" : "Nie"}}</td>
                    </tr>
                    <tr v-if="selectedRow.passDateEnd">
                        <td class="font-bold pr-8 pb-2">Koniec karnetu:</td>
                        <td>{{dateToString(new Date(selectedRow.passDateEnd))}}</td>
                    </tr>
                </tbody>
            </table>
            <template #footer >
                <div class="flex flex-row justify-end gap-8">
                    <UButton label="Przejdź do profilu klienta" :to="{ name: 'admin-panel-zarzadzanie-klienci-id', params: { id: selectedRow.email } }" color="blue" icon="i-heroicons-arrow-right-20-solid"/>
                    <UButton label="Zamknij" @click="isOpen=false" color="gray" icon="i-material-symbols-cancel"/>
                </div>
            </template>
        </UCard>
    </UModal>
</div>

</template>