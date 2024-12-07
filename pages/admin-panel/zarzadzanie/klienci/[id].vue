<script lang="ts" setup>
import type { LoggedMemberData } from '~/types';

const route = useRoute();
const email = ref<string>(route.params.id as string);

const membersManagmentStore = useMembersManagmentStore();
const statisticsStore = useStatisticsStore();
const loginStore = useLoginStore();
const passStore = usePassStore();
const groupClassesStore = useGroupClassesStore();

const showMemberDataEditModal = ref(false);
const showPassDetailsModal = ref(false);
const showNewCreditCardForMemberModal = ref(false);
const enrolMemberToClassModal = ref(false);

const typeDataToEdit = ref('');
const paymentOptionAvailability = ref(false);

const editMemberData = (type: string) => {
    showMemberDataEditModal.value = true;
    typeDataToEdit.value = type;
}

onMounted( async () => {
    await membersManagmentStore.getMemberByEmail(email.value);
    await passStore.getMemberPassHistory(email.value);
    await passStore.getActiveMemberPass(email.value);
    await statisticsStore.getDailyGymMinutesByEmail(email.value);
    await statisticsStore.getFullPaymentHistoryByEmail(email.value);
    // await membersManagmentStore.getMemberPaymentHistoryByEmail(email.value);
    // await membersManagmentStore.getMemberGymEntriesHistoryByEmail(email.value);
    


    await groupClassesStore.getGroupClassesHistoricalForMember(email.value);
    await groupClassesStore.getGroupClassesUpcomingForMember(email.value);
    paymentOptionAvailability.value = await membersManagmentStore.getMemberPaymentOptionsStatus(email.value) ?? false;
});

onBeforeRouteLeave(() => {
    membersManagmentStore.clearData();
    passStore.clearData();
});

const buyPassForMember = async () => {
    console.log('buyPassForMember');
    paymentOptionAvailability.value = await membersManagmentStore.getMemberPaymentOptionsStatus(email.value) ?? false;
    showNewCreditCardForMemberModal.value = true;
}

const toggleEnrolMemberToClassModal = async () => {
    enrolMemberToClassModal.value = true;
    if(enrolMemberToClassModal){
        await groupClassesStore.getGroupClassesUpcoming()
    }
}

const checkCreditCardStatus = async () => {
    await membersManagmentStore.getMemberPaymentOptionsStatus(email.value);
    console.log('checkCreditCardStatus', membersManagmentStore.paymentOptionsStatus);
    return membersManagmentStore.paymentOptionsStatus
}

const test = () => {
    console.log('test', membersManagmentStore.paymentOptionsStatus);
}


</script>

<template>

    <WorkerComponentsHeaderWorker />
    
    <div class="flex flex-row bg-[#F5F7F8] items-start pb-10 min-h-screen">
      <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>
        <main class="basis-4/5 mt-4 grid grid-cols-4 items-start justify-start gap-8">

            <div class="members-panel-title col-span-4 w-full flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <h1 class="text-xl font-semibold">Panel zarządzania klientem</h1>
                <p class="text-slate-500">Możesz z tego miejsca przeglądać i zarządzać wybranym klientem.</p>
            </div>

            <div class="col-span-4 w-full grid grid-cols-3 gap-8">
                <div class="active-pass col-span-1 w-full flex flex-row rounded-lg p-4 bg-white flex-nowrap gap-10 items-center" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <div>
                        <h1 class="text-xl font-semibold"><span class="text-slate-500 text-base font-normal pr-3">
                            Klient: </span>
                            {{membersManagmentStore.memberByEmail?.name}} {{membersManagmentStore.memberByEmail?.surname}}</h1>
                        <p class="text-lg"><span class="text-slate-500 text-base pr-3">Id klienta: </span>{{membersManagmentStore.memberByEmail?.id}}</p>
                        
                        <hr class="mt-3 mb-3"/>
                        <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Email: </span>{{membersManagmentStore.memberByEmail?.email}}</p>
                        <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Telefon: </span>{{membersManagmentStore.memberByEmail?.phoneNumber}}</p>
                    </div>
                    <img src="/images/worker/komar.jpg" class="rounded-full w-32" alt=""/>
                </div>
        
                <div class="active-pass col-span-1 w-full flex flex-col rounded-lg p-4 bg-white flex-nowrap justify-between" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <ul>
                        <li class="text-lg"><span class="text-slate-500 text-base pr-3">Data urodzenia: </span>{{membersManagmentStore.memberByEmail?.birthdate}}</li>
                        <li class="text-lg"><span class="text-slate-500 text-base pr-3">Pesel: </span>{{membersManagmentStore.memberByEmail?.pesel}}</li>
                        <li class="text-lg">
                            <span class="text-slate-500 text-base pr-3">
                                Adres: </span>
                                {{membersManagmentStore.memberByEmail?.address?.city 
                                + ' ' 
                                + membersManagmentStore.memberByEmail?.address?.streetName 
                                + ' ' 
                                + membersManagmentStore.memberByEmail?.address?.buildingNumber 
                                + (membersManagmentStore.memberByEmail?.address?.apartmentNumber ? ('/' + membersManagmentStore.memberByEmail?.address?.apartmentNumber) : ' ') 
                                + ' ' 
                                +  membersManagmentStore.memberByEmail?.address?.postalCode }}
                        </li>
                        <li class="text-lg min-w-max mt-3">
                            <span class="text-slate-500 text-base pr-3">Aktywny karnet:</span>
                            {{ !isObjectEmpty(passStore.activeMemberPass) ? passStore.activeMemberPass.title : 'Brak' }} 
                            <br />
                            <UButton 
                                v-show="!isObjectEmpty(passStore.activeMemberPass)"
                                class="mt-2"
                                icon="i-material-symbols-id-card"
                                size="sm"
                                color="blue"
                                variant="solid"
                                label="Wyświetl szczegóły karnetu"
                                @click="showPassDetailsModal = true"
                            />
                            <UModal 
                                :model-value="showPassDetailsModal"
                                :closable="true"
                                @close="showPassDetailsModal = false"
                                :ui="{}"
                            >
                                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                                    <template #header>
                                        <h3 class="font-bold text-lg">Szczegóły aktywnego karnetu</h3>
                                    </template>
                                        <div class="flex flex-col gap-4">
                                            <p class="text-lg"><span class="text-slate-500 text-base pr-3">Id karnetu: </span>{{ passStore.activeMemberPass?.id }}</p>
                                            <p class="text-lg"><span class="text-slate-500 text-base pr-3">Nazwa karnetu: </span>{{ passStore.activeMemberPass?.title }}</p>
                                            <p class="text-lg"><span class="text-slate-500 text-base pr-3">Cena miesięczna: </span>{{ passStore.activeMemberPass?.monthlyPrice }} zł</p>
                                            <p class="text-lg"><span class="text-slate-500 text-base pr-3">Data rozpoczęcia: </span>{{ dateToString(passStore.activeMemberPass?.dateStart) }}</p>
                                            <p class="text-lg"><span class="text-slate-500 text-base pr-3">Data zakończenia: </span>{{ dateToString(passStore.activeMemberPass?.dateEnd) }}</p>
                                            <p class="text-lg"><span class="text-slate-500 text-base pr-3">Pozostało dni: </span>{{ daysLeft(new Date(passStore.activeMemberPass?.dateEnd)) }}</p>
                                            <p class="text-lg"><span class="text-slate-500 text-base pr-3">Data następnej płatności: </span>{{ passStore.activeMemberPass?.dateOfNextPayment }}</p>
                                        </div>
                                    <template #footer>
                                        <div class="flex flex-row justify-end gap-5">
                                            <UButton label="Anuluj" @click="showPassDetailsModal = false" color="gray" icon="i-material-symbols-cancel" />
                                        </div>
                                    </template>
                                </UCard>
                            </UModal>
                        </li>
                    </ul>
                </div>
        
                <div class="options col-span-1 w-full flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-4  items-start" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <UButton
                        icon="i-material-symbols-account-box"
                        size="sm"
                        color="blue"
                        variant="solid"
                        label="Edytuj dane personalne klienta"
                        @click="editMemberData('data')"
                    />
                    <UButton
                        icon="i-material-symbols-key"
                        size="sm"
                        color="blue"
                        variant="solid"
                        label="Edytuj dane logowania klienta"
                        @click="editMemberData('login')"
                    />
                    <UButton 
                        v-show="isObjectEmpty(passStore.activeMemberPass)"
                        icon="i-material-symbols-id-card"
                        size="sm"
                        color="blue"
                        variant="solid"
                        label="Kup karnet klientowi"
                        @click="buyPassForMember()"
                    />
                    <UButton 
                        icon="i-material-symbols-id-card"
                        size="sm"
                        color="blue"
                        variant="solid"
                        label="Sprawdź status karty kredytowej"
                        @click="checkCreditCardStatus()"
                    />
                    <WorkerComponentsMemberDataEditModal 
                        v-model:showMemberDataEditModal="showMemberDataEditModal"
                        :typeDataToEdit="typeDataToEdit"   
                        :memberByEmail="membersManagmentStore.memberByEmail" 
                    />

                    <WorkerComponentsBuyPassForMemberAddCreditCardForMember 
                        v-model:showNewCreditCardForMemberModal="showNewCreditCardForMemberModal"
                        :memberEmail="membersManagmentStore.memberByEmail?.email"
                    />
                </div>
            </div>

            <div class="memberClasses col-span-4 w-full flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2 " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <h1 class="text-xl font-semibold">Zapisy na zajęcia klienta</h1>
                <p class="text-slate-500 lg:mb-5">Możesz zobaczyć tutaj zobaczyć na jakie zajęcia zapisał się użytkownik i modyfikować zapisy.</p>

                <CallendarComponentsGroupClassesCalendarForAdmin 
                    :memberEmail="membersManagmentStore.memberByEmail?.email" 
                    :group-classes-upcoming="groupClassesStore.groupClassesUpcomingForMember" 
                    :group-classes-history="groupClassesStore.groupClassesHistoricalForMember"
                />

                <UButton class="w-fit mt-4" label="Zapisz klienta na zajęcia" color="blue" @click="toggleEnrolMemberToClassModal" icon="i-material-symbols-person-add"/>

                <!-- CREATE MODAL TO ENROL MEMBER TO CLASSES BUT CHECK IF MEMBER HAS CREDITCARD VALIABLE WHEN CLASSES START :o  -->
                <UModal 
                    :model-value="enrolMemberToClassModal"
                    :closable="true"
                    @close="enrolMemberToClassModal = false"
                    :ui="{}"
                >
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <h1 class="font-bold text-lg">Zapisz klienta na zajęcia</h1>
                    </template>
                    <div class="flex flex-col gap-4 lg:min-w-[40vw]">
                        <h2 class="font-medium">Wybierz zajęcia na które chcesz zapisać klienta</h2>
                        <CallendarComponentsGroupClassesCalendarForAdmin 
                            :group-classes-upcoming="groupClassesStore.groupClassesUpcoming"
                            :group-classes-history="[]"
                            :memberEmail="membersManagmentStore.memberByEmail.email"
                            :paymentOptionAvailability="paymentOptionAvailability"
                            :memberPassStatus="passStore.activeMemberPass"
                        />
                    </div>
                    <template #footer>
                        <div class="flex flex-row justify-end gap-5">
                            <UButton label="Anuluj" @click="enrolMemberToClassModal = false" color="gray" icon="i-material-symbols-cancel" />
                        </div>
                    </template>
                </UCard>
            </UModal>

            </div>

            <div class="stats col-span-4 w-full flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2 " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <h1 class="text-xl font-semibold">Statystyki</h1>
                <p class="text-slate-500">Możesz zobaczyć tutaj statystyki dotyczące klienta</p>
            </div>

            <div class="documents col-span-2 flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start gap-4" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <span class="font-semibold text-lg">Dokumenty</span>
                <ul class="flex flex-col gap-5 w-full justify-between ">
                    <h2 class="font-medium text-xl">Historia płatności</h2>
                    <template v-if="statisticsStore.fullPaymentListByEmail.length === 0">
                        <p>Brak historii płatności</p>
                    </template>
                    <li v-for="(payment, paymentId) in statisticsStore.fullPaymentListByEmail" :key="payment.id" class="flex flex-row w-full place-items-center">
                        <div class="document-name w-full pr-14 flex flex-col gap-1">
                            <h6 class="font-thin text-slate-500">#ID-{{payment.id}}</h6>
                            <h3 class="[word-spacing:5px] font-medium">
                                <span class="text-slate-500">Data:</span> {{dateWithTimeString(new Date(payment.dateTime))}} 
                                <span class="text-slate-500 pl-5">Kwota:</span> {{payment.amount}} zł</h3>
                        </div>
                    </li>
                    <hr class="w-full"/>
                    <h2 class="font-medium text-xl">Historia wejść na siłownię</h2>
                    <ul class="flex flex-col gap-5 w-full justify-between ">
                        <template v-if="!Object.values(statisticsStore.dailyGymMinutesByEmail).some(value => Number(value) > 0)">
                            <p>Brak historii wejść na siłownię</p>
                        </template>
                        <template v-else>
                            <li v-for="(minutes, date) in statisticsStore.dailyGymMinutesByEmail" :key="date" class="flex flex-row w-full place-items-center">
                                <template v-if="minutes>0">
                                    <div class="document-name w-full pr-14 flex flex-col gap-1">
                                        <h3 class="[word-spacing:5px] font-medium">{{dateToString(new Date(date))}} </h3>
                                    </div>
                                    <div class="flex flex-row gap-2 items-center pr-2">
                                        <UIcon name="i-heroicons-clock" class="w-5 h-5" />
                                        <p class="w-max">{{minutes}} min</p>
                                    </div>
                                </template>
                            </li>
                        </template>
                    </ul>
                    <hr class="w-full"/>
                    <h2 class="font-medium text-xl">Historia karnetów</h2>
                    <p v-if="passStore.memberPassHistory.length === 0" >Brak historii kanrnetów - karnet pojawi się w historii dopiero po wygaśnięciu</p>
                    <li v-for="pass in passStore.memberPassHistory" :key="pass.id" class="flex flex-row w-full place-items-center">
                        <div class="document-name w-full pr-14 flex flex-col gap-1">
                            <h3 class="[word-spacing:5px] font-medium">{{pass.title}} - {{pass.monthlyPrice}} zł</h3>
                            <h6 class="font-thin text-slate-500">#ID-{{pass.id}}</h6>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="w-full col-span-2 blankColSpan2">
            </div>

            <div class="w-full col-span-2">
                <WorkerComponentsStatisticsGymEntriesMonthlyByEmail :memberMail="membersManagmentStore.memberByEmail.email" />
            </div>
            <div class="w-full col-span-2">
                <WorkerComponentsStatisticsGroupClassesMonthlyByEmail :memberEmail="membersManagmentStore.memberByEmail.email"/>
            </div>
            <div class="w-full col-span-4">
                <WorkerComponentsStatisticsDailyGymMinutesByEmail :memberEmail="membersManagmentStore.memberByEmail.email"/>
            </div>


        </main>
        

    </div>
    membersManagmentStore.memberByEmail.email{{membersManagmentStore.memberByEmail.email}}

</template>

<style scoped>

</style>