<script setup lang="ts">

const trainerStore = useTrainerStore();
const loginStore = useLoginStore();

onMounted(() => {
    trainerStore.getTrainerOfferByEmail(loginStore.loggedTrainerData.email);
})

</script>

<template>
<HeaderTrainerProfile />

<div class="flex flex-row bg-[#F5F7F8] items-start pb-10 min-h-screen">
    <Trainer-navbar class="basis-1/5 max-w-[350px]  px-6" />
    <main class="basis-4/5 mt-4 flex flex-row flex-wrap items-start justify-start gap-8">
        <div class="members-panel-title w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1>Twoja oferta **WIP**</h1>
            <pre>{{trainerStore.trainerOffersByEmail}}</pre>
        </div>
    </main>
</div>  


</template>

<style scoped>



</style>