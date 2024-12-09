<script setup lang="ts">

import type { TrainerWithOffers, TrainerOffer } from '~/types'

const trainerStore = useTrainerStore()

const showMoreTrainerOffers = ref(false)
const clickedTrainer = ref({} as TrainerWithOffers)
const clicledTrainerForOffer = ref({} as TrainerWithOffers)
const clickedOffer = ref({} as TrainerOffer)
const showTrainerOfferModalStatus = ref(false)

const showAllOffers = (trainer?: TrainerWithOffers) => {
    showMoreTrainerOffers.value = !showMoreTrainerOffers.value
    if(trainer  && showMoreTrainerOffers.value) {
        clickedTrainer.value = trainer
    } else {
        clickedTrainer.value = {} as TrainerWithOffers
    }
}

const showTrainerOfferModal = (offer: TrainerOffer, trainer: TrainerWithOffers ) => {
    showTrainerOfferModalStatus.value = true
    clickedOffer.value = offer
    clicledTrainerForOffer.value = trainer
}

const closeAllTrainerOffers = () =>{
    showMoreTrainerOffers.value = false
    clickedTrainer.value = {} as TrainerWithOffers
}

const closeShowTrainerOfferModal = () => {
    showTrainerOfferModalStatus.value = false
    clickedOffer.value = {} as TrainerOffer
    clicledTrainerForOffer.value = {} as TrainerWithOffers
}

onMounted( async () => {
    await trainerStore.getAllTrainersWithOffers()
})

</script>

<template>

    <header-user-profile></header-user-profile>

    <div class="flex bg-[#F5F7F8]">
        <user-profile-navbar class="basis-1/5 max-w-[350px]"></user-profile-navbar>
        <main class=" min-h-svh basis-4/5 -mt-4 flex flex-col flex-wrap justify-start gap-8 pb-10 items-start">
            
            <div class="trainersTitle flex flex-col lg:w-full lg:max-w-[79vw] bg-white p-4 rounded-lg gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1); ">
                <h2 class="text-lg font-bold">Trenerzy personalni</h2>
                <p class="">Poznaj naszych trenerów personalnych i skorzystaj z ich oferty!</p>
            </div>

            <div class="trainersList flex flex-col lg:w-full lg:max-w-[79vw] bg-white p-4 rounded-lg gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1); ">
                <h2 class="text-lg font-bold">Lista trenerów</h2>
                <div class="trainersListGrid grid grid-cols-1 gap-8">
                    <div v-for="trainer in trainerStore.allTrainersWithOffers" :key="trainer.trainerInfo.id" :trainer="trainer">
                        <div class="trainer-card-info border-2 border-slate-300 rounded-lg">
                            <div class="trainer-card flex flex-row rounded-lg p-4 bg-white flex-nowrap gap-10 items-center ">
                                <img v-if="trainer.trainerInfo?.photo" :src="trainer.trainerInfo?.photo" alt="Podgląd zdjęcia" class="mt-2 lg:max-w-48 object-cover rounded" />
                                <span v-else>Brak zdjęcia</span>
                                <div>
                                    <h1 class="text-3xl font-semibold">{{trainer.trainerInfo?.name}} {{trainer.trainerInfo?.surname}}</h1>
                                    <p class="text-lg">Białystok PB-GYM</p>
                                    <hr class="mt-3 mb-3"/>
                                    <div class="flex flex-row gap-3">
                                        <div 
                                        v-for="tag in trainer.trainerInfo?.trainerTags.map(tag => trainerTagTranslations[tag])" 
                                        class="font-semibold bg-blue-500 text-white text-sm py-1 px-2 rounded">
                                            {{tag}}
                                        </div>
                                    </div>
                                    <p class="py-4">{{trainer.trainerInfo?.description}}</p>
                                    <div class="flex flex-row flex-wrap  gap-5 align-middle justify-start items-center">
                                        Oferta:
                                        <template v-if="trainer.trainerInfo.id!==clickedTrainer?.trainerInfo?.id">
                                            <div v-for="(offer, index)  in trainer.trainerOffers.slice(0, 3)" @click="showTrainerOfferModal(offer, trainer)" :key="index" class="w-fit bg-gray-50 rounded-lg px-3 py-2 flex items-center text-sm font-semibold text-blue-500 shadow cursor-pointer">
                                                {{offer.title}}
                                            </div>
                                        </template>
                                        <template v-if="showMoreTrainerOffers && clickedTrainer.trainerInfo.id===trainer.trainerInfo.id" >
                                            <div v-for="(offer, index) in clickedTrainer.trainerOffers" :key="index" class="w-fit bg-gray-50 rounded-lg px-3 py-2 flex items-center text-sm font-semibold text-blue-500 shadow">
                                                {{offer.title}}
                                            </div>
                                        </template>
                                        <div v-if="trainer.trainerOffers?.length > 3" class="w-fit">
                                            <UButton 
                                                v-if="!showMoreTrainerOffers"
                                                icon="i-material-symbols-pinch-outline-rounded"
                                                size="sm"
                                                color="blue"
                                                variant="ghost"
                                                label="Zobacz więcej"
                                                :trailing="false"
                                                @click="showAllOffers(trainer)"
                                            />
                                            <UButton 
                                                v-if="showMoreTrainerOffers"
                                                icon="i-material-symbols-pinch-zoom-in-outline-rounded"
                                                size="sm"
                                                color="blue"
                                                variant="ghost"
                                                label="Ukryj"
                                                :trailing="false"
                                                @click="closeAllTrainerOffers"
                                            />
                                        </div>
                                    </div>
                                    <hr class="mt-3 mb-3"/>
                                    <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Email: </span>{{trainer.trainerInfo?.email}}</p>
                                    <p class="font-semibold"><span class="text-slate-500 text-base font-normal pr-3">Telefon: </span>{{trainer.trainerInfo?.phoneNumber}}</p>
                                </div>
                                
                            </div>
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

                            <div class="flex flex-col gap-5" v-if="clicledTrainerForOffer?.trainerInfo?.email">
                                <h2 class="text-lg font-semibold">Skontaktuj się z trenerem, aby umówić się na zajęcia</h2>
                                <div class="flex flex-row gap-5 align-middle justify-start items-center">
                                    <div class="text-lg py-1 pr-2">
                                        <span class="text-slate-600">Email:</span> {{clicledTrainerForOffer.trainerInfo.email}}
                                    </div>
                                    <div class="text-lg py-1 px-2">
                                        <span class="text-slate-600">Telefon:</span> {{clicledTrainerForOffer.trainerInfo.phoneNumber}}
                                    </div>
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