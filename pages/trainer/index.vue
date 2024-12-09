<script lang="ts" setup>

import type { DefaultLoginData, TrainerData, TrainerOffer, TrainerWithOffers } from '~/types';

const loginStore = useLoginStore();
const trainerStore = useTrainerStore();
const groupClassesStore = useGroupClassesStore();
const statisticsStore = useStatisticsStore();

const defaultLoginData = useCookie<DefaultLoginData>('defaultLoginData');
const loggedTrainerData = useCookie<TrainerData>('loggedTrainerData');

const showTrainerOfferModalStatus = ref(false)

const polishTrainerTags = ref<string[]>([]);
    const clickedOffer = ref({} as TrainerOffer)

onMounted( async () => {
    polishTrainerTags.value = loggedTrainerData.value.trainerTags.map(tag => trainerTagTranslations[tag]);
    trainerStore.getTrainerOfferByEmail(loggedTrainerData.value.email);
    await groupClassesStore.getGroupClassesUpcomingByTrainerEmail(loggedTrainerData.value.email);
    await groupClassesStore.getGroupClassesHistoricalByTrainerEmail(loggedTrainerData.value.email);
    await statisticsStore.getMonthlyGroupClassesByTrainerEmail(loginStore.loggedTrainerData.email);
    await trainerStore.getTrainerByEmail(loggedTrainerData.value.email);
    
})

const showTrainerOfferModal = (offer: TrainerOffer, ) => {
    showTrainerOfferModalStatus.value = true
    clickedOffer.value = offer
}

const closeShowTrainerOfferModal = () => {
    showTrainerOfferModalStatus.value = false
    clickedOffer.value = {} as TrainerOffer
}

</script>

<template>

<HeaderTrainerProfile />

<div class="flex flex-row bg-[#F5F7F8] items-start pb-10 min-h-screen">
    <Trainer-navbar class="basis-1/5 max-w-[350px]  px-6" />
    <main class="basis-4/5 mt-4 grid grid-cols-2 items-start justify-start gap-8">
        
        <div class="members-panel-title col-span-2 flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Twój panel trenera</h1>
            <p class="text-slate-500">Możesz z tego miejsca przeglądać i zarządzać wykonywanymi usługami.</p>
        </div>

        <div class="trainer-card-info col-span-2">
            <div class="trainer-card flex flex-row rounded-lg p-4 bg-white flex-nowrap gap-10 items-center" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <img v-if="trainerStore?.trainerData.photo" :src="trainerStore?.trainerData.photo" alt="Podgląd zdjęcia" class="mt-2 lg:max-w-48 object-cover rounded" />
                <span v-else>Brak zdjęcia</span>
                <div>
                    <h1 class="text-3xl font-semibold">{{loggedTrainerData?.name}} {{loggedTrainerData?.surname}}</h1>
                    <p class="text-lg">Białystok PB-GYM</p>
                    <hr class="mt-3 mb-3"/>
                    <div class="flex flex-row gap-3">
                        <div 
                        v-for="tag in polishTrainerTags" 
                        class="font-semibold bg-blue-500 text-white text-sm py-1 px-2 rounded">
                            {{tag}}
                        </div>
                    </div>
                    <p class="py-4">{{loggedTrainerData?.description}}</p>
                    <div class="flex flex-row gap-5 align-middle justify-start items-center">
                        Oferty:
                        <div v-for="(offer, index) in trainerStore.trainerOffersByEmail.slice(0, 3)" :key="index" @click="showTrainerOfferModal(offer)" class="w-fit bg-gray-50 rounded-lg px-3 py-2 flex items-center text-sm font-semibold text-blue-500 shadow cursor-pointer">
                            {{offer.title}}
                        </div>
                        <div v-if="trainerStore.trainerOffersByEmail?.length > 3" class="w-fit bg-gray-50 rounded-lg px-3 py-2 flex items-center text-sm font-semibold text-blue-500 shadow">
                            ...
                        </div>
                        <UButton 
                            icon="i-ic-baseline-manage-search"
                            size="sm"
                            color="blue"
                            variant="ghost"
                            label="Zobacz więcej"
                            :trailing="false"
                            :to="'/trainer/oferty'"
                        />
                    </div>
                    <hr class="mt-3 mb-3"/>
                    <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Email: </span>{{loggedTrainerData?.email}}</p>
                    <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Telefon: </span>{{loggedTrainerData?.phoneNumber}}</p>
                    <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Aktywność: </span>{{loggedTrainerData?.visible ? 'Widoczny' : 'Niewidoczny'}}</p>
                </div>
                
            </div>
        </div> 

      
        <div class="calendarView  flex flex-col w-full  bg-white p-4 rounded-lg gap-2 col-span-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1); ">
            <h2 class="font-semibold text-lg">Twoje nadchodzące zajęcia grupowe</h2>
            <CallendarComponentsGroupClassesCalendarForTrainer 
                :groupClassesUpcoming="groupClassesStore.groupClassesUpcomingByTrainerEmail" 
                :groupClassesHistory="[]"
                :trainerEmail="loggedTrainerData?.email"
            />
            <UButton 
                label="Zobacz wszystkie zajęcia" 
                color="blue" 
                icon="i-material-symbols-add" 
                :to="'/trainer/zajecia'"
                class="w-fit"
            />
        </div>
        
        <WorkerComponentsStatisticsMonthlyGroupClassesByTrainerEmail :trainerMail="loggedTrainerData?.email" />

        
        <div class="information-section col-span-1 grid gap-8">    
            <div class="user-information flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start basis-3/5 gap-4" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <span class="font-semibold text-lg">Informacje</span>
                <div class="information-container w-full bg-slate-50 py-3 px-5 flex flex-col rounded-xl">
                    <div class="inf-row-title flex flex-row justify-between items-center">
                        <span class="font-medium " style="word-spacing: 0.7rem;">{{ loggedTrainerData?.name }}  {{ loggedTrainerData?.surname}}</span>
                        <UButton
                            icon="i-ic-baseline-create"
                            size="sm"
                            color="blue"
                            variant="ghost"
                            label=""
                            :trailing="false"
                            :to="'/trainer/ustawienia-konta'"
                        />
                    </div>
                    <div class="inf-row-info">
                        <ul class="flex flex-col gap-1 py-3">
                            <li>
                                <span class="font-medium text-gray-500 pr-3">Adres Email:</span> {{loggedTrainerData?.email}}
                            </li>
                            <li>
                                <span class="font-medium text-gray-500 pr-3">Miasto:</span> {{loggedTrainerData?.address?.city}}
                            </li>
                            <li>
                                <span class="font-medium text-gray-500 pr-3">Ulica:</span> {{loggedTrainerData?.address?.streetName}}
                            </li>
                            <li>
                                <span class="font-medium text-gray-500 pr-3">Numer budynku:</span> {{loggedTrainerData?.address?.buildingNumber}}
                            </li>
                            <li>
                                <span class="font-medium text-gray-500 pr-3">Numer mieszkania:</span> {{loggedTrainerData?.address?.apartmentNumber}}
                            </li>
                            <li>
                                <span class="font-medium text-gray-500 pr-3"> Kod pocztowy:</span> {{loggedTrainerData?.address?.postalCode}}
                            </li>
                            <li>
                                <span class="font-medium text-gray-500 pr-3">Rok urodzenia:</span> {{ loggedTrainerData?.birthdate }} 
                            </li>
                            <li>
                                <span class="font-medium text-gray-500 pr-3"> Pesel:</span> {{loggedTrainerData?.pesel}}
                            </li>
                            <li>
                                <span class="font-medium text-gray-500 pr-3">Typ konta:</span> {{ defaultLoginData?.userType==='Member' ? "Członek" : "Trener" }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div> 

        
        <UModal 
        :model-value="showTrainerOfferModalStatus"
        :closable="true"
        @close="closeShowTrainerOfferModal"
        :ui="{}"
    >
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <h3 class="font-bold text-lg">Wybrana oferta trenera</h3>
            </template>

            <template #default>
                <div class="flex flex-col gap-5 px-5 ">
                    <h1 class="text-xl font-medium">{{clickedOffer.title}}</h1>
                    <div class="flex flex-row gap-5 align-middle justify-start items-center">
                        <div class="text-lg py-1 pr-2">
                            <span class="text-slate-600">Cena:</span> {{clickedOffer.price}} zł
                        </div>
                        <div class="text-lg py-1 px-2">
                            <span class="text-slate-600">Ilość sesji:</span> {{clickedOffer.trainingSessionCount}} 
                        </div>
                        <div class="text-lg py-1 px-2">
                            <span class="text-slate-600">Czas trwania sesji:</span> {{clickedOffer.trainingSessionDurationInMinutes}} min
                        </div> 
                    </div>
                </div>
            </template>
            
            <template #footer>
                <div class="flex flex-row justify-end gap-5">
                    <UButton label="Zamknij" @click="closeShowTrainerOfferModal" color="gray" icon="i-material-symbols-cancel" />
                </div>
            </template>
        </UCard>
    </UModal>



    </main>
</div>
</template>

<style scoped>

</style>