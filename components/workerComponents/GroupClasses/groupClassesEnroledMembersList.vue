<script setup lang="ts">

import type {  } from '~/types';

const router = useRouter();

const groupClassesStore = useGroupClassesStore();

const props = defineProps([
    'groupClass'
])

const columns = [{
        key: 'id',
        label: 'Id'
    },
    {
        key: 'email',
        label: 'email'    
    },
    {
        key: 'name',
        label: 'Imię'
    },
    {
        key: 'surname',
        label: 'Nazwisko',
        
    }
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

<div class="active-pass w-full max-w-[79vw] flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
    <div class="flex flex-row justify-between align-middle">
        <p class="text-slate-500">Klienci zarejestrowani na zajęcia</p>
    </div>
    <UTable :rows="groupClass" :columns="columns" @select="select">
       
    </UTable>
</div>


<UModal v-model="isOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
            <h3 class="font-medium text-lg">
            </h3>
        </template>
        
        <template #footer >
            <div class="optionButtons flex flex-row justify-between">
                <div class="flex flex-row justify-end w-full gap-6">
                    
                    <UButton label="Zamknij" @click="isOpen=false" color="gray" icon="i-material-symbols-cancel"/>
                </div>
            </div>
            
        </template>
    </UCard>
</UModal>






</template>

<style scoped>


</style>