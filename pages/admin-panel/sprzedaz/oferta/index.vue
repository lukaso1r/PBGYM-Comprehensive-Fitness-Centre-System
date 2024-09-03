<script setup lang="ts">

const columns = [{
  key: 'title',
  label: 'Nazwa'
}, {
  key: 'monthlyPrice',
  label: 'Cena/miesiąc'
}, {
  key: 'durationInMonths',
  label: 'Okres trwania'
}, {
  key: 'active',
  label: 'Aktywność'
}, 
{
    key: 'type',
    label: 'Typ'
},
{
    key: 'actions',
    label: 'Opcje'
}

]

const isOpen = ref(false)
const rowW = ref()

const items = (row) => [
    [
        {
            label: 'Szczegóły',
            icon: 'i-heroicons-document-magnifying-glass-16-solid',
            to: { name: 'admin-panel-sprzedaz-oferta-id', params: { id: row.id } }
        },
        {
            label: 'Edytuj',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => console.log('Edit', row.id)
        }
    ], 
    [
        {
            label: 'Deaktywuj',
            icon: 'i-ic-baseline-cancel'
        }
    ]
]

const offersStore = useOffersStore();
const { data: offersData} = await useAsyncData('offers', async () => {
    await offersStore.getOffers();
    return offersStore.offers;
});

const select = (row) => {
    console.log('Selected', row)
    isOpen.value = true
    rowW.value = row
    console.log('roww', rowW.value)
}
</script>

<template>
<workerComponents-header-worker></workerComponents-header-worker>
<div class="flex flex-row bg-[#F5F7F8] items-start pb-10">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>
  
    <!-- TODO: poprawić margines -->
    <main class="min-h-screen content-start basis-4/5 mt-4 flex flex-row flex-wrap items-start justify-start gap-8">
              
        <div class="active-pass w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Aktualna oferta karnetów</h1>
            <p class="text-slate-500">Możesz z tego miejsca przeglądać i zarządzać aktualnie dostępnymi karnetami</p>
        </div>

        <div class="active-pass w-full flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <p class="text-slate-500">Karnety dostępne w systemie</p>

            <UTable :rows="offersData" :columns="columns" @select="select">
                <template #actions-data="{ row }" @click.stop>
                  <UDropdown :items="items(row)" @click.stop>
                    <UButton  color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                  </UDropdown>
                </template>
            </UTable>

            <UModal v-model="isOpen">
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <Placeholder class="h-8" />
                        <h3 class="font-medium text-lg">{{rowW ? rowW.title : 'nic'}}</h3>
                    </template>

                    <Placeholder class="h-32" />
                    <table class="table-auto">
                        <tbody>
                            <tr v-for="(value, key) in rowW" :key="key">
                                <td class="font-bold pr-8 pb-2">{{ key }}</td>
                                <td>{{ value }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <template #footer >
                        <Placeholder class="h-8" />
                        <div class="flex flex-row justify-end">
                            <UButton label="Zamknij" @click="isOpen=false" color="blue" icon="i-material-symbols-cancel"/>
                        </div>
                    </template>
                </UCard>
            </UModal>

        </div>
      
    </main>
    
</div>

</template>

<style scoped>



</style>