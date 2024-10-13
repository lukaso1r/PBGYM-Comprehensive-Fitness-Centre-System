<script setup lang="ts">

import type { Offer } from '~/types';

const offersStore = useOffersStore();

const { data: offersData, pending } = await useAsyncData('offers', async () => {
    await offersStore.getOffersPublicActive();
    return offersStore.offersPublicActive;
});

</script>

<template>
    <header-user-profile></header-user-profile>
    <div class="flex bg-[#F5F7F8]">
        <user-profile-navbar class="basis-1/5 max-w-[350px]"></user-profile-navbar>
        <main class="min-h-svh basis-4/5 -mt-4 pr-10 flex flex-row flex-wrap content-start justify-start gap-8 pb-10">

            <!-- <UButton @click="getOffersFromStore">test</UButton> -->
        
            <div class="active-pass w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <h1 class="text-xl font-semibold">Aktualna oferta karnetów</h1>
                <p class="text-slate-500">Wybierz karnet, który najlepiej odpowiada Twoim potrzebom</p>
            </div>

            <div class="offers-container flex flex-row items-baseline gap-8 w-full ">
                <UCard v-for="offer in offersData" :key="offer.id" class="offer-card max-w-1/4 w-1/4 rounded-lg" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <template #header>
                        <h4 class="text-xl font-bold">{{offer.title}}</h4>
                    </template>
                    <p><span class="text-6xl font-bold">{{offer.monthlyPrice}}</span> /miesiąc</p>
                    <div class="list-pass mx-auto mt-7 pl-7" >
                        <ul class="list-disc" >
                            <li v-for="(property, index) in offer.properties" :key="index">
                                {{property}}
                            </li>
                        </ul>
                    </div>
                    <template #footer>
                    <div class="flex flex-column justify-center">
                        <UButton label="Wybierz ten plan" class="bg-[#f1f6ff] text-lg text-[#2878FF] font-bold px-6 py-2 hover:bg-[#bed5ff]" />
                    </div>
                    </template>
                </UCard>
            </div>
        </main>
    </div>
   
</template>

<style scoped>


</style>