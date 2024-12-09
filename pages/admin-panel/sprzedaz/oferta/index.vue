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
const isOpenSpecial = ref(false)
const rowW = ref()
const router = useRouter();

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const itemsStandard = (row: any) => [
    [
        {
            label: 'Szczegóły',
            icon: 'i-heroicons-document-magnifying-glass-16-solid',
            click: () => select(row)
        },
        {
            label: 'Edytuj',
            icon: 'i-heroicons-pencil-square-20-solid',
            to: { name: 'admin-panel-sprzedaz-oferta-standard-id', params: { id: row.id } }
        }
    ], 
    [
        {
            label: 'Deaktywuj',
            icon: 'i-ic-baseline-cancel'
        }
    ]
]

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const itemsSpecial = (row: any) => [
    [
        {
            label: 'Szczegóły',
            icon: 'i-heroicons-document-magnifying-glass-16-solid',
            click: () => select(row)
        },
        {
            label: 'Edytuj',
            icon: 'i-heroicons-pencil-square-20-solid',
            to: { name: 'admin-panel-sprzedaz-oferta-special-id', params: { id: row.id } }
        }
    ]
]

const offersStore = useOffersStore();
const { data: offersStandardAll} = await useAsyncData('offersStandard', async () => {
    await offersStore.getOfferStandardAll();
    return offersStore.offerStandardAll;
});

const { data: offersSpecialAll} = await useAsyncData('offersSpecial', async () => {
    await offersStore.getOfferSpecialAll();
    return offersStore.offerSpecialAll;
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const select = (row: any) => {
    console.log('Selected', row)
    isOpen.value = true
    rowW.value = row
    console.log('roww', rowW.value)
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const selectSpecial = (row: any) => {
    console.log('Selected', row)
    isOpenSpecial.value = true
    rowW.value = row
    console.log('roww', rowW.value)
}

const test = () => {
    console.log('test getOfferStandardAll')
    offersStore.getOfferStandardAll();
}
</script>

<template>

<!-- <UButton @click="test">test</UButton> -->

<workerComponents-header-worker></workerComponents-header-worker>
<div class="flex flex-row bg-[#F5F7F8] items-start pb-10">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>
  
    <!-- TODO: poprawić margines -->
    <main  v-if="checkPermission(['PASS_MANAGEMENT'])"  class="min-h-screen content-start basis-4/5 mt-4 flex flex-row flex-wrap items-start justify-start gap-8">
              
        <div class="active-pass w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Aktualna oferta karnetów</h1>
            <p class="text-slate-500">Możesz z tego miejsca przeglądać i zarządzać aktualnie dostępnymi karnetami, które widzą klienci.</p>
        </div>

        <div class="active-pass w-full flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <p class="text-slate-500">Standardowe karnety dostępne w systemie dla klientów.</p>

            <UTable :rows="offersStandardAll" :columns="columns" @select="select">
                <template #actions-data="{ row }" @click.stop>
                  <UDropdown :items="itemsStandard(row)" @click.stop>
                    <UButton  color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                  </UDropdown>
                </template>
            </UTable>

            <UModal v-model="isOpen">
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <h3 class="font-medium text-lg">{{rowW ? rowW.title : 'nic'}}</h3>
                    </template>

                    <table class="table-auto">
                        <tbody>
                         <tr>
                            <td class="font-bold pr-8 pb-2">ID:</td>
                            <td>{{ rowW.id }}</td>
                        </tr>   
                        <tr>
                            <td class="font-bold pr-8 pb-2">Typ:</td>
                            <td>{{ rowW.type }}</td>
                        </tr>
                        
                        <tr>
                            <td class="font-bold pr-8 pb-2">Tytuł:</td>
                            <td>{{ rowW.title }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Podtytuł:</td>
                            <td>{{ rowW.subtitle }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Cena/miesiąc:</td>
                            <td>{{ rowW.monthlyPrice }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Opłata wstępna:</td>
                            <td>{{ rowW.entryFee }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Czas trwania w miesiącach:</td>
                            <td>{{ rowW.durationInMonths }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Właściwości:</td>
                            <td>
                                <ul>
                                    <li v-for="(property, index) in rowW.properties" :key="index">{{ property }}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Aktywność</td>
                            <td>{{ rowW.active ? "Aktywny" : "Nieaktywny" }}</td>
                        </tr>
                        </tbody>
                    </table>

                    <template #footer >
                        <div class="flex flex-row justify-end gap-8">
                            <UButton label="Przejdź do panelu oferty" @click="router.push({ name: 'admin-panel-sprzedaz-oferta-standard-id', params: { id: rowW.id } })" color="blue" icon="i-heroicons-pencil-square-20-solid"/>
                            <UButton label="Zamknij" @click="isOpen=false" color="blue" icon="i-material-symbols-cancel"/>
                        </div>
                    </template>
                </UCard>
            </UModal>

        </div>
        
        <div class="active-pass w-full flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <p class="text-slate-500">Specjalne karnety dostępne w systemie dla klientów.</p>

            <UTable :rows="offersSpecialAll" :columns="columns" @select="selectSpecial">
                <template #actions-data="{ row }" @click.stop>
                  <UDropdown :items="itemsSpecial(row)" @click.stop>
                    <UButton  color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                  </UDropdown>
                </template>
            </UTable>

            <UModal v-model="isOpenSpecial">
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <h3 class="font-medium text-lg">{{rowW ? rowW.title : 'nic'}}</h3>
                    </template>

                    <table class="table-auto">
                        <tbody>
                            
                        <tr>
                            <td class="font-bold pr-8 pb-2">Typ</td>
                            <td>{{ rowW.type }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">ID</td>
                            <td>{{ rowW.id }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Tytuł</td>
                            <td>{{ rowW.title }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Podtytuł</td>
                            <td>{{ rowW.subtitle }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Cena/miesiąc</td>
                            <td>{{ rowW.monthlyPrice }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Opłata wstępna</td>
                            <td>{{ rowW.entryFee }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Okres trwania (miesiące)</td>
                            <td>{{ rowW.durationInMonths }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Właściwości</td>
                            <td>
                                <ul>
                                    <li v-for="(property, index) in rowW.properties" :key="index">{{ property }}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Tekst oferty specjalnej</td>
                            <td>{{ rowW.specialOfferText }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Tekst na obramowaniu</td>
                            <td>{{ rowW.borderText }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Poprzednia cena</td>
                            <td>{{ rowW.previousPriceInfo }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Aktywność</td>
                            <td>{{ rowW.active ? "Aktywny" : "Nieaktywny" }}</td>
                        </tr>
                        </tbody>
                    </table>

                    <template #footer >
                        <div class="flex flex-row justify-end gap-8">
                            <UButton label="Przejdź do panelu oferty" @click="router.push({ name: 'admin-panel-sprzedaz-oferta-special-id', params: { id: rowW.id } })" color="blue" icon="i-heroicons-pencil-square-20-solid"/>
                            <UButton label="Zamknij" @click="isOpenSpecial=false" color="blue" icon="i-material-symbols-cancel"/>
                        </div>
                    </template>
                </UCard>
            </UModal>

        </div>
    </main>

    <div v-else>
        <p class="text-red-500">Brak uprawnień do przeglądania tej strony</p>
    </div>
    
</div>

</template>

<style scoped>



</style>