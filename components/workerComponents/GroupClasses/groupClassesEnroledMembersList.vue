<script setup lang="ts">

import type { GroupClassMember, GroupClassWithTrainer } from '~/types';

const router = useRouter();

const groupClassesStore = useGroupClassesStore();

const props = defineProps<{
    groupClassMembers: GroupClassMember[],
    groupClassObj: GroupClassWithTrainer
}>();

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

const removeMemberFromClass = async () => {
    const status = await groupClassesStore.putRemoveMemberFromGroupClass(props.groupClassObj.id, selectedRow.value.email)
    if(status){
        groupClassesStore.getGroupClassesMembers(props.groupClassObj.id)
        isOpen.value = false
    }
}


</script>

<template>

<div class="active-pass w-full max-w-[79vw] flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
    <div class="flex flex-row justify-between align-middle">
        <p class="text-slate-500">Klienci zarejestrowani na zajęcia</p>
    </div>
    <UTable :rows="groupClassMembers" :columns="columns" @select="select">
       
    </UTable>
</div>


<UModal v-model="isOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
            <h3 class="font-bold text-lg">
                Zapisany klient -  
                <span class="text-sx text-slate-500 font-normal">{{selectedRow.name + " " + selectedRow.surname}}</span> 
            </h3>
        </template>
        <table>
            <tr>
                <td class="font-bold text-lg pr-4">Id: </td>
                <td>{{selectedRow.id}}</td>
            </tr>
            <tr>
                <td class="font-bold text-lg pr-4">Imię: </td>
                <td>{{selectedRow.name}}</td>
            </tr>
            <tr>
                <td class="font-bold text-lg pr-4">Nazwisko: </td>
                <td>{{selectedRow.surname}}</td>
            </tr>
            <tr>
                <td class="font-bold text-lg pr-4">Email: </td>
                <td>{{selectedRow.email}}</td>
            </tr>
        </table>
        <!-- TODO: WYPISZ Z ZAJĘĆ
        TODO: PRZEJDŹ DO PROFILU KLIENTA -->
        <template #footer >
            <div class="optionButtons flex flex-row justify-between">
                <div class="flex flex-row justify-end w-full gap-6">
                    <UButton label="Usuń z zajęć" @click="removeMemberFromClass()" color="red" icon="i-material-symbols-delete"/>
                    <UButton label="Przejdź do profilu" @click="router.push({name: 'admin-panel-zarzadzanie-klienci-id', params: {id: selectedRow.email}})" color="blue" icon="i-material-symbols-person"/>
                    <UButton label="Zamknij" @click="isOpen=false" color="gray" icon="i-material-symbols-cancel"/>
                </div>
            </div>
            
        </template>
    </UCard>
</UModal>






</template>

<style scoped>


</style>