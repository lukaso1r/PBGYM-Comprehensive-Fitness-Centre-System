<script setup lang="ts">
import type { Offer, LoggedMemberData } from '~/types';

const { buyNewPass } = usePassUtils();
const offersStore = useOffersStore();
const loggedMemberData = useCookie<LoggedMemberData>('loggedMemberData');
const toast = useToast();

const { data: offersData, pending } = await useAsyncData('offers', async () => {
    await offersStore.getOffersPublicActive();
    return offersStore.offersPublicActive;
});

const specialOffers = computed(() => offersData.value ? offersData.value.filter((offer: Offer) => offer.type === 'SPECIAL') : []);
const standardOffers = computed(() => offersData.value ? offersData.value.filter((offer: Offer) => offer.type === 'STANDARD') : []);

const showNewPassModal = ref(false);
const choosenPassId = ref(0);
const choosenPassType = ref('');
const choosenPassTitle = ref('');

const buyPass = (passId: number, passType: string, passTitle: string) => {
    toast.add({ title: 'Zakup karnetu', description: 'Kupno karnetu dostępne wkrótce' });
    choosenPassId.value = passId
    showNewPassModal.value = true
    choosenPassType.value = passType
    choosenPassTitle.value = passTitle

}

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

            <div class="offers-container flex flex-row items-center gap-8 w-full ">
                <template v-for="offer in specialOffers" :key="offer.id">
                    <div v-if="offer.type==='SPECIAL'" class="specialPass flex flex-row items-center">
                        <p class="verticalSpecialText text-blue-600 font-medium shadow-2xl" style="z-50">{{offer.borderText}}</p>
                        <UCard 
                            class="w-max z-0"
                            :ui="{shadow: 'shadow-2xl', ring: 'ring-[12px] ring-white dark:ring-gray-800', divide: 'divide-y divide-gray-200 dark:divide-gray-800', background: 'bg-blue-600 dark:bg-slate-200' }"
                        >
                            <template #header>
                                <h4 class="text-2xl font-bold text-white">{{offer.title}}</h4>
                                <h6 class=" pt-2 text-white text-lg">{{offer.subtitle}}</h6>
                            </template>
                            <p class="text-white"><span class="text-6xl font-bold text-white">{{offer.monthlyPrice}}</span> zł / miesiąc</p>
                            <p class="w-4/6 text-zinc-300 text-sm pt-2">{{ offer.previousPriceInfo }} </p>
                            <p class="pt-3 text-white">Opłata aktywacyjna: {{offer.entryFee}} zł</p>
                            <div class="list-pass mx-auto mt-7 pl-7 text-white" >
                                <ul class="list-disc text-white font-medium text-lg" >
                                    <li>Ważność karnetu: {{offer.durationInMonths}} miesięcy</li>
                                    <li v-for="(property, key) in offer.properties" :key="key">{{property}}</li>
                                </ul>
                            </div>
                            <p class="text-white text-lg font-medium mt-5">{{offer.specialOfferText}}</p>
                            <template #footer>
                                <div class="flex flex-column justify-center">
                                    <UButton 
                                        label="Wybierz ten plan" 
                                        class="bg-white text-lg text-[#2878FF] font-bold px-6 py-2 hover:bg-[#bed5ff]" 
                                        @click="buyPass(offer.id, offer.type, offer.title)"
                                    />
                                </div>
                            </template>
                        </UCard>
                    </div>
                    
                    <template v-for="offer in standardOffers" :key="offer.id">
                        <UCard v-if="offer.type==='STANDARD'" class="offer-card max-w-1/4 w-1/4 rounded-lg" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
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
                                <UButton 
                                    label="Wybierz ten plan" 
                                    class="bg-[#f1f6ff] text-lg text-[#2878FF] font-bold px-6 py-2 hover:bg-[#bed5ff]"
                                    @click="buyPass(offer.id, offer.type, offer.title)" 
                                />
                            </div>
                            </template>
                        </UCard>
                    </template>
                </template>
            </div>

            <BuyNewPassModal v-model:showNewPassModal="showNewPassModal" :memberEmail="loggedMemberData.email" :choosenPassId="choosenPassId"  :choosenPassTitle="choosenPassTitle"/>
        </main>
    </div>
   
</template>

<style scoped>

.verticalSpecialText{
    writing-mode: vertical-lr;
    text-orientation: upright;
    z-index: 50;
    background-color: white;
    border-radius: 15px 0 0 15px;
    padding: 10px 7px 10px 7px;
}

</style>