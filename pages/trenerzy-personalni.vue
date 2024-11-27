<script lang="ts" setup>

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

<header-web />

<div class="container mx-auto px-4 py-8 lg:w-3/4 min-h-[68svh]">
    <img class="absolute top-0 right-0 -z-50" src="/public/images/home-community/community-bubble.svg" alt="" srcset="">
    
    <div id=" promo-section" class="mt-28 mx-[7%]">
        <div id="onas" class="bg-[#f1f6ff] text-lg text-[#2878FF] font-bold px-6 py-2 w-fit mx-auto tracking-widest rounded-lg ">Trenerzy personalni</div>
        <h2 class="font-bold text-4xl text-center py-5">Indywidualne treningi dopasowane do twoich potrzeb</h2>
        <p class="text-xl text-center py-1 pb-10">Trenerzy personalni, którzy zmotywują Cię do działania i osiągania więcej!</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8 items-start pb-14">
        <img src="/public/images/home-banner/blob1.svg" alt="" class="absolute left-0 top-0 -z-50">
        <div class="col-span-3 rounded-xl " >
            <div class="trainersListGrid grid grid-cols-1 gap-8">
                <div v-for="trainer in trainerStore.allTrainersWithOffers" :key="trainer.trainerInfo.id" :trainer="trainer">
                    <div class="trainer-card-info border-2 border-slate-300 rounded-lg shadow-lg">
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
                                    Oferty trenera:
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

    </div>
    <div class="relative ">
        <img src="/public/images/home-banner/blob4.svg" alt="" class="absolute left-0 bottom-50 -z-50">
    </div>
</div>

<footer-web/>

</template>


<style scoped>


</style>