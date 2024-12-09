<script lang="ts" setup>

import type { TrainerData } from '~/types';

const trainerStore = useTrainerStore();

const loggedTrainerData = useCookie<TrainerData>('loggedTrainerData');
const groupClassesStore = useGroupClassesStore();


onMounted( async () => {
    trainerStore.getTrainerOfferByEmail(loggedTrainerData.value.email);
    await groupClassesStore.getGroupClassesUpcomingByTrainerEmail(loggedTrainerData.value.email);
    await groupClassesStore.getGroupClassesHistoricalByTrainerEmail(loggedTrainerData.value.email);
    
})

</script>

<template>

<HeaderTrainerProfile />
<div class="flex flex-row bg-[#F5F7F8] items-start pb-10 min-h-screen">
    <Trainer-navbar class="basis-1/5 max-w-[350px]  px-6" />
    <main class="basis-4/5 mt-4 flex flex-col flex-wrap items-start justify-start gap-8">
        
        <div class="members-panel-title w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Panel zajęć grupowych</h1>
            <p class="text-slate-500">Możesz z tego miejsca przeglądać zajęcia grupowe przyszłe i poprzednie oraz wyświetlać zapisanych na nich klientów</p>
        </div>

        <div class="calendarView flex flex-col w-full lg:max-w-[79vw] bg-white p-4 rounded-lg gap-2 col-span-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1); ">
            <h2 class="font-semibold text-lg">Twoje wszystkie zajęcia grupowe</h2>
            <CallendarComponentsGroupClassesCalendarForTrainer 
                :groupClassesUpcoming="groupClassesStore.groupClassesUpcomingByTrainerEmail" 
                :groupClassesHistory="groupClassesStore.groupClassesHistoricalByTrainerEmail"
                :trainerEmail="loggedTrainerData?.email"
            />
        </div>

        
    </main>
</div>



</template>

<style scoped>


</style>