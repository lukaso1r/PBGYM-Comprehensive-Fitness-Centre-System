<script setup lang="ts">

const groupClassesStore = useGroupClassesStore();
const trainerStore = useTrainerStore();

const allTrainersMailList = ref<string[]>([]);

const isAddClassesModalOpen = ref(false);

const date = ref<Date>(new Date (groupClassesStore.editableGroupClass.date));

const toggleAddNewClassModal = async () => {
    isAddClassesModalOpen.value = !isAddClassesModalOpen.value;
    if(isAddClassesModalOpen.value) {
        await trainerStore.getAllTrainers();
        allTrainersMailList.value = trainerStore.allTrainers.map((trainer) => trainer.email);
    }
}

watch(date, (newValue) => {
    console.log('data przed iso', newValue);
    const offset = newValue.getTimezoneOffset() * 60000;
    groupClassesStore.editableGroupClass.date = new Date(newValue.getTime() - offset).toISOString().slice(0, -1);
    console.log('data po iso', groupClassesStore.editableGroupClass.date);

});





</script>

<template>

<WorkerComponentsHeaderWorker />
<div class="flex flex-row bg-[#F5F7F8] items-start pb-10 min-h-screen">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>
    <main class="basis-4/5 mt-4 flex flex-col flex-wrap items-start justify-start gap-8">
        
        <div class="members-panel-title w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Panel zarządzania zajęciami</h1>
            <p class="text-slate-500">Możesz z tego miejsca przeglądać i zarządzać zajęciami.</p>
            <UButton class="w-fit" label="Dodaj zajęcia" @click="toggleAddNewClassModal()" color="blue" icon="i-material-symbols-add" />

        </div>
        <WorkerComponentsGroupClassesAddGroupClasses v-model:isAddClassesModalOpen="isAddClassesModalOpen"/>
        <WorkerComponentsGroupClassesList :showButton="false"/>

        
        <CallendarComponentsGroupClassesCalendarForAdmin :group-classes="groupClassesStore.groupClassesUpcoming" />

        
    </main>


</div>




</template>

<style scoped>

</style>