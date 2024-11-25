<script setup lang="ts">

import type { TrainerWithOffers } from '~/types'

const trainerStore = useTrainerStore()

const showMoreTrainerOffers = ref(false)
const clickedTrainer = ref({} as TrainerWithOffers)

const showAllOffers = (trainer?: TrainerWithOffers) => {
    showMoreTrainerOffers.value = !showMoreTrainerOffers.value
    if(trainer  && showMoreTrainerOffers.value) {
        clickedTrainer.value = trainer
    } else {
        clickedTrainer.value = {} as TrainerWithOffers
    }
}

const closeAllTrainerOffers = () =>{
    showMoreTrainerOffers.value = false
    clickedTrainer.value = {} as TrainerWithOffers
}

onMounted( async () => {
    await trainerStore.getAllTrainersWithOffers()
})

</script>

<template>

    <header-user-profile></header-user-profile>

    <div class="flex bg-[#F5F7F8]">
        <user-profile-navbar class="basis-1/5 max-w-[350px]"></user-profile-navbar>
        <main class=" min-h-svh basis-4/5 -mt-4 flex flex-row flex-wrap justify-start gap-8 pb-10 items-start">
            
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
                                <img src="/images/worker/komar.jpg" class="rounded-full w-48" alt=""/>
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
                                        Zajęcia:
                                        <template v-if="trainer.trainerInfo.id!==clickedTrainer?.trainerInfo?.id">
                                            <div  v-for="(offer, index) in trainer.trainerOffers.slice(0, 3)" :key="index" class="w-fit bg-gray-50 rounded-lg px-3 py-2 flex items-center text-sm font-semibold text-blue-500 shadow">
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

        </main> 
    </div>


</template>

<style scoped>


</style>