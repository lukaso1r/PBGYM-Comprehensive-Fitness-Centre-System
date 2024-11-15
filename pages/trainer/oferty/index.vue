<script setup lang="ts">

const trainerStore = useTrainerStore();
const loginStore = useLoginStore();

onMounted(() => {
    trainerStore.getTrainerOfferByEmail(loginStore.loggedTrainerData.email);
})

const columns = [
    {
        key: 'id',
        label: 'Id'
    },
    {
        key: 'title',
        label: 'tytuł'
    },
    {
        key: 'price',
        label: 'Cena'
    },
    {
        key: 'trainingSessionCount',
        label: 'Ilość sesji'
    },
    {
        key: 'trainingSessionDurationInMinutes',
        label: 'Czas trwania sesji'
    },
    {
        key: 'visible',
        label: 'Widoczność',
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
            to: { name: 'trainer-oferty-id', params: { id: row.id } }
        }
    ], 
    [
        {
            label: 'Deaktywuj WIP',
            icon: 'i-ic-baseline-cancel'
        }
    ]
]



</script>

<template>
<HeaderTrainerProfile />

<div class="flex flex-row bg-[#F5F7F8] items-start pb-10 min-h-screen">
    <Trainer-navbar class="basis-1/5 max-w-[350px]  px-6" />
    <main class="basis-4/5 mt-4 flex flex-row flex-wrap items-start justify-start gap-8">
        <div class="members-panel-title w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1>Twoje oferty **WIP**</h1>
        </div>
        <div class="active-pass w-full flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <UTable :rows="trainerStore.trainerOffersByEmail" :columns="columns" @select="select">
                <template #actions-data="{ row }" @click.stop>
                    <UDropdown :items="items(row)" @click.stop>
                        <UButton  color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </UDropdown>
                </template>
                <template #visible-data="{ row }">
                    <span v-if="row.visible" class="text-green-500">Tak</span>
                    <span v-else class="text-red-500">Nie</span>
                </template>
            </UTable>
            <UModal v-model="isOpen">
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <h3 class="font-medium text-lg">{{selectedRow ? selectedRow.title : 'nic'}}</h3>
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



    </main>
</div>  


</template>

<style scoped>



</style>