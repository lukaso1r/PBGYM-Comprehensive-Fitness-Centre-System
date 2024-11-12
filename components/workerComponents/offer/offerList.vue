<script setup lang="ts">

const props = defineProps<{
    memberEmail: string,
}>();

const { buynewPassAsWorker } = usePassUtils();

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

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const itemsStandard = (row: any) => [
    [
        {
            label: 'Szczegóły',
            icon: 'i-heroicons-document-magnifying-glass-16-solid',
            click: () => select(row)
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

const test = () => {
    console.log('test getOfferStandardAll')
    offersStore.getOfferStandardAll();
}
</script>

<template>

    <div class="active-pass w-full flex flex-col rounded-lg p-4  bg-white flex-nowrap gap-2 mb-8" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
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
                        <tr v-for="(value, key) in rowW" :key="key">
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
    
    <div class="active-pass w-full flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
        <p class="text-slate-500">Specjalne karnety dostępne w systemie dla klientów.</p>

        <UTable :rows="offersSpecialAll" :columns="columns" @select="select">
            <template #actions-data="{ row }" @click.stop>
              <UDropdown :items="itemsSpecial(row)" @click.stop>
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
                        <tr v-for="(value, key) in rowW" :key="key">
                            <td class="font-bold pr-8 pb-2">{{ key }}</td>
                            <td>{{ value }}</td>
                        </tr>
                    </tbody>
                </table>

                <template #footer >
                    <div class="flex flex-row justify-end gap-6">
                        <UButton label="Kup karnet klientowi" @click="buynewPassAsWorker(memberEmail, rowW.id, 'admin@worker.com')" color="blue" icon="i-material-symbols-check"/>
                        <UButton label="Anuluj" @click="isOpen=false" color="gray" icon="i-material-symbols-cancel"/>
                    </div>
                </template>
            </UCard>
        </UModal>

    </div>

</template>

<style scoped>

</style>