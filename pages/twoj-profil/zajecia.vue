<script lang="ts" setup>

import type { LoggedMemberData, GroupClassWithTrainer } from '~/types'

const groupClassesStore = useGroupClassesStore()
const loggedMemberStore = useLoggedMemberStore()
const paymentStore = usePaymentStore()
const passStore = usePassStore()

const loggedMemberData = useCookie<LoggedMemberData>('loggedMemberData');

const clickedClasses = ref<GroupClassWithTrainer>()

const isClassDetailsModalOpen = ref(false)

onMounted( async () => {
    await groupClassesStore.getGroupClassesUpcoming()
    await groupClassesStore.getGroupClassesUpcomingForMember(loggedMemberData.value.email)
    await groupClassesStore.getGroupClassesHistoricalForMember(loggedMemberData.value.email)
    await paymentStore.getHiddenCreditCardInfo(loggedMemberData.value.email)
    await passStore.getActiveMemberPass(loggedMemberData.value.email)
})

const onClassClick = (groupClass: GroupClassWithTrainer) => {
    toggleDetailClassModal()
    if(groupClass){
        clickedClasses.value = groupClass;
    }
    console.log('onClassClick', groupClass);
}

const toggleDetailClassModal = () => {
    isClassDetailsModalOpen.value = !isClassDetailsModalOpen.value;
}

const enrolMemberToGroupClasses = async (email: string) =>{
    console.log('insine enrdol')
    if(clickedClasses.value?.id){
        await groupClassesStore.postEnrollMemberToGroupClass(clickedClasses.value?.id, email);
        clickedClasses.value = groupClassesStore.groupClassesUpcoming.find(groupClass => groupClass.id === clickedClasses.value?.id);

    }else{
        console.log('enrolMemberToGroupClasses', 'no class id');
    }
    console.log('enrolMemberToGroupClasses', email);
}

const removeMemberFromGroupClass = async (id: number, memberEmail: string) => {
    await groupClassesStore.putRemoveMemberFromGroupClass(id, memberEmail);
    clickedClasses.value = groupClassesStore.groupClassesUpcoming.find(groupClass => groupClass.id === clickedClasses.value?.id);
}

const columns = [
    {
        key: 'id',
        label: 'Id'
    },
    {
        key: 'title',
        label: 'Zajęcia'
    },
    {
        key: 'dateStart',
        label: 'Data'
    },
    {
        key: 'trainer',
        label: 'Trener'
    },
    {
        key: 'durationInMinutes',
        label: 'Czas trwania'
    }
]

</script>


<template>

<header-user-profile></header-user-profile>

<div class="flex bg-[#F5F7F8]">
    <user-profile-navbar class="basis-1/5 max-w-[350px]"></user-profile-navbar>
    <main class=" min-h-svh basis-4/5 -mt-4 flex flex-row flex-wrap justify-start gap-8 pb-10 items-start">
        
        <div class="calendarView flex flex-col lg:w-full lg:max-w-[79vw] bg-white p-4 rounded-lg gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1); ">
            <h2 class="text-2xl font-bold">Wszystkie nadchodzące zajęcia grupowe</h2>
            <CallendarComponentsGroupClassesCalendarForMember 
                :groupClassesUpcoming="groupClassesStore.groupClassesUpcoming" 
                :memberEmail="loggedMemberData.email" 
                :groupClassesUpcomingForMember="groupClassesStore.groupClassesUpcomingForMember"
                :paymentOptionAvailability="paymentStore.cardData ? true : false"
                :memberPassStatus="passStore.activeMemberPass"
            />
        </div>

        <div class="available-classes flex flex-col lg:w-full lg:max-w-[79vw] bg-white p-4 rounded-lg gap-8" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1); ">
            <h2 class="text-2xl font-bold">Wszystkie nadchodzące zajęcia grupowe widok siatki</h2>
            <div class="grid grid-cols-3 gap-8">
                <div v-if="groupClassesStore.groupClassesUpcoming.length===0">Brak nadchodzących zajęć</div>
                <template v-for="groupClass in groupClassesStore.groupClassesUpcoming" :key="groupClass.id">
                    <div class="border-[2px] border-gray-300 rounded py-4 pl-4 pr-4 flex flex-col shadow bg" 
                        :class="{'bg-blue-100': groupClassesStore.groupClassesUpcomingForMember.map((upcomingClass) => upcomingClass.id).includes(groupClass.id)}"
                        
                        >
                        <div class="trainerImage w-full pb-3 m-0 grid grid-cols-3 gap-4 relative">
                            <p class="absolute -top-2 -right-1 text-blue-600 font-semibold" v-if="groupClassesStore.groupClassesUpcomingForMember.map((upcomingClass) => upcomingClass.id).includes(groupClass.id)">Zapisano!</p>
                            <img class="rounded-[10%] col-span-1" src="/public/images/trainer.jpg" />
                            <div class="w-full col-span-2 flex flex-col justify-center">
                                <p class="font-medium text-slate-500">Trener: <span class="font-normal text-base text-black">{{ groupClass.trainer.name }} {{ groupClass.trainer.surname }}</span></p>
                                <p class="font-medium text-slate-500">Data: <span class="font-normal text-base text-black">{{ dateToString(new Date(groupClass.dateStart)) }}</span></p>
                                <p class="font-medium text-slate-500">Godzina: <span class="font-normal text-base text-black">{{ dateToTimeString(new Date(groupClass.dateStart)) }}</span></p>
                            </div>
                        </div>
                        <p class="font-medium text-slate-500 py-2">Zajęcia: <span class="font-normal text-base text-black">{{ groupClass.title }}</span></p>
                        <div class="flex flex-row justify-between items-center">
                            <div class="groupClassInfo w-fit flex flex-col">
                                <p class="font-medium text-slate-500">Zajęte miejsca: <span class="font-normal text-base text-black">{{ groupClass.currentMemberCount }}</span></p>
                                <p class="font-medium text-slate-500">Limit miejsc: <span class="font-normal text-base text-black">{{ groupClass.memberLimit }}</span></p>
                            </div>
                            <UButton @click="onClassClick(groupClass)" label="Sprawdź szczegóły" color="blue" variant="solid" class="w-fit"></UButton>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <div class="flex flex-col lg:w-full lg:max-w-[79vw] bg-white p-4 rounded-lg gap-8" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1); ">
            <h2 class="text-2xl font-bold">Historia zajęć w których uczestniczyłeś</h2>
            <div class="">
                <UTable :rows="groupClassesStore.groupClassesHistoricalForMember" :columns="columns">
                    <template #date-data="{ row }">
                        <!-- <span>{{row ? dateToString(new Date(row.passDateEnd)) : ''}}</span> -->
                         {{ dateWithTimeString(new Date(row.date)) }}
                    </template>
                    <template #trainer-data="{ row }">
                        <span>{{row.trainer.name}} {{row.trainer.surname}}</span>
                    </template>
                    <template #durationInMinutes-data="{ row }">
                        <span>{{row.durationInMinutes}} minut</span>
                    </template>
                    <template #dateStart-data="{ row }">
                        <span>{{dateWithTimeString(new Date(row.dateStart))}}</span>
                    </template>
                    <template #empty-state="{ row }">
                        <span>Nie brano udziału w zajęciach</span>
                    </template>

                </UTable>
            </div>
        </div>
                    
    </main>

    <UModal 
        :model-value="isClassDetailsModalOpen"
        :closable="true"
        @close="toggleDetailClassModal()"
        :ui="{}"
    >
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <h3 class="[word-spacing:4px] font-medium w-full text-lg">Informacje o wybranych zajęciach.</h3>
            </template>
            <div class="w-full" v-if="clickedClasses">
                <div class="addNewGroupClasses flex flex-col rounded-lg px-2 bg-white w-full items-center">
                    <h3 class="font-bold text-2xl pb-3">{{clickedClasses?.title ?? ""}}</h3>
                    <h5 class="font-medium text-xl pb-5">{{dateWithTimeString(new Date(clickedClasses.dateStart))}}</h5>
                    <div class="trainerInfo flex justify-start flex-col w-fit items-center shadow px-5 py-4 border-2 border-slate-400 rounded-lg mb-4">
                        <div class="trainerImage w-fit lg:max-w-[40vw] m-0 flex flex-row gap-12">
                            <img class="rounded-[10%] lg:max-w-[230px] w-full" src="/public/images/trainer.jpg" />
                            <div class="w-fit flex flex-col justify-center">
                                <p class="font-medium text-slate-500 text-2xl pb-3">Trener: <span class="font-normal text-3xl text-black">{{ clickedClasses?.trainer.name }} {{ clickedClasses?.trainer.surname }}</span></p>
                                <p class="font-medium text-slate-500 text-xl">Telefon: <span class="font-normal text-base text-black">{{ clickedClasses?.trainer.phoneNumber }}</span></p>
                                <p class="font-medium text-slate-500 text-xl">Email: <span class="font-normal text-base text-black">{{ clickedClasses?.trainer.email }}</span></p>
                                <UButton :to="'/twoj-profil/trener/' + clickedClasses?.trainer.id" label="Zobacz profil trenera" color="blue" variant="soft" class="w-fit mt-5"></UButton>
                            </div>
                        </div>
                    </div>
                    <table>
                        <tr class="pb-2">
                            <td class="font-bold pr-8">Obecna liczba uczestników:</td>
                            <td>{{ clickedClasses?.currentMemberCount }}</td>
                        </tr>
                        <tr class="pb-2">
                            <td class="font-bold pr-8">Maksymalna liczba uczestników:</td>
                            <td>{{ clickedClasses?.memberLimit }}</td>
                        </tr>
                        <tr class="pb-2">
                            <td class="font-bold pr-8">Czas trwania zajęć:</td>
                            <td>{{ clickedClasses?.durationInMinutes }} minut</td>
                        </tr>
                    </table>
                </div>
                <div v-if="clickedClasses" class="flex flex-row items-center gap-8 px-4 justify-end">
                    <div v-if="!groupClassesStore.groupClassesUpcomingForMember.map((upcomingClass) => upcomingClass.id).includes(clickedClasses.id)" class="flex flex-row items-center gap-8 pt-10 px-4">
                        <p class=""><span class="text-xl text-slate-500">Status:</span> Możesz zapisać się na zajęcia</p>
                        <UButton 
                            @click.stop="enrolMemberToGroupClasses(loggedMemberData.email)" 
                            label="Zapisz się na zajęcia" 
                            color="blue" 
                            icon="i-material-symbols-add" 
                            :disabled="clickedClasses.currentMemberCount >= clickedClasses.memberLimit || !paymentStore.cardData ? true : false || isObjectEmpty(passStore.activeMemberPass)"
                        />
                    </div>
                    <div v-else class="flex flex-row items-center gap-8 pt-10 px-4">
                        <p class=""><span class="text-xl text-slate-500">Status:</span> Zarezerwowano na zajęcia, zobaczysz je w swoim profilu głównym</p>
                        <UButton 
                            @click.stop="removeMemberFromGroupClass(clickedClasses.id, loggedMemberData.email)" 
                            label="Anuluj rezerwację zajęć" 
                            color="red" 
                            icon="i-material-symbols-delete" 
                        />
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="flex flex-row justify-end gap-5">
                    <UButton label="Zamknij" @click="toggleDetailClassModal()" color="gray" icon="i-material-symbols-cancel" />
                </div>
            </template>
        </UCard>
    </UModal>
</div>
</template>

<style scoped>

</style>