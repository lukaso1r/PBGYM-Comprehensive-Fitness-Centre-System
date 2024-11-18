<script setup lang="ts">

import { format } from 'date-fns'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const groupClassesStore = useGroupClassesStore();
const trainerStore = useTrainerStore();

const allTrainersMailList = ref<string[]>([]);

const isAddClassesModalOpen = ref(false);

const date = ref<Date>(new Date (groupClassesStore.editableGroupClass.date));
const flow = ref<("year" | "month" | "calendar" | "time" | "minutes" | "hours" | "seconds")[]>(["year", "month", "calendar", "time", "minutes", "hours"]);
const maxDate = ref(nextYearDate.value)
const dateFormatForPicker = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${year}-${month < 10 ? `0 ${month}` : month}-${day < 10 ? `0 ${day}` : day} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}


const toggleAddNewClassModal = async () => {
    isAddClassesModalOpen.value = !isAddClassesModalOpen.value;
    if(isAddClassesModalOpen.value) {
        await trainerStore.getAllTrainers();
        allTrainersMailList.value = trainerStore.allTrainers.map((trainer) => trainer.email);
    }
}

const onSubmitAddNewGroupClasses = async () => {
    console.log('submit', groupClassesStore.editableGroupClass);
    await groupClassesStore.postNewGroupClass();
    toggleAddNewClassModal();
}

const changeClassTime = (operation: string, value: number) => {
    if(operation === 'add') {
        groupClassesStore.editableGroupClass.durationInMinutes += value
    } else {
        groupClassesStore.editableGroupClass.durationInMinutes = Math.max(0, groupClassesStore.editableGroupClass.durationInMinutes - value);
    }
}

watch(date, (newValue) => {
    groupClassesStore.editableGroupClass.date = newValue ? newValue.toISOString() : "";
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
        </div>
        
        <WorkerComponentsGroupClassesList :showButton="false"/>

        <UButton label="Dodaj zajęcia" @click="toggleAddNewClassModal()" color="blue" icon="i-material-symbols-add" />

    </main>

    <UModal 
        :model-value="isAddClassesModalOpen"
        :closable="true"
        @close="toggleAddNewClassModal()"
        :ui="{}"
    >
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
            <h3 class="font-bold text-lg">Formularz dodania nowego trenera</h3>
        </template>
        <div class="w-full">
            <div class="addNewGroupClasses flex flex-col rounded-lg px-4 bg-white w-full">
                <h3 class="[word-spacing:4px] font-medium pb-4">Użyj poniższego formularza aby dodać nowe zajęcia grupowe.</h3>
                <UForm class="grid grid-cols-2 gap-4 justify-start" :state="groupClassesStore.editableGroupClass" :validate="validateGroupClassData"  @submit="onSubmitAddNewGroupClasses">

                        <UFormGroup class="col-span-2" label="Tytuł zajęć" name="title" required>
                            <UInput v-model="groupClassesStore.editableGroupClass.title" type="string" placeholder="Tytuł zajęć" :value="groupClassesStore.editableGroupClass.title"  />
                        </UFormGroup>

                        <UFormGroup class="col-span-2" label="Data zajęć" name="date" required>
                            <VueDatePicker v-model="date" 
                                :max-date="maxDate" 
                                :min-date="currentDate"
                                :start-date="currentDate" 
                                :year-range="[currentDate.getFullYear(), nextYearDate.getFullYear()]" 
                                prevent-min-max-navigation 
                                :enable-time-picker="true" 
                                :flow="flow" 
                                hide-offset-dates
                                locale="pl" 
                                cancelText="anuluj" 
                                selectText="potwierdź" 
                                :format="dateFormatForPicker"
                            />
                        </UFormGroup>

                        <UFormGroup label="Długość zajęć w minutach" name="durationInMinutes" required>
                            <UInput v-model="groupClassesStore.editableGroupClass.durationInMinutes" type="number" placeholder="Długość zajęć w minutach" :value="groupClassesStore.editableGroupClass.durationInMinutes" />
                            <div class="flex flex-row gap-0 text-xs">
                                <UButton class="text-xs" label="+15min" @click="changeClassTime('add', 15)" color="blue" variant="ghost" />
                                <UButton class="text-xs" label="-15min" @click="changeClassTime('-', 15)" color="red" variant="ghost" />
                                <UButton class="text-xs" label="+10min" @click="changeClassTime('add', 10)" color="blue" variant="ghost" />
                                <UButton class="text-xs" label="-10min" @click="changeClassTime('-', 10)" color="red" variant="ghost" />
                            </div>
                        </UFormGroup>

                        <UFormGroup label="Maksymalna liczba uczestników" name="memberLimit" required>
                            <UInput v-model="groupClassesStore.editableGroupClass.memberLimit" type="number" placeholder="Maksymalna liczba uczestników" :value="groupClassesStore.editableGroupClass.memberLimit" />
                        </UFormGroup>

                        <UFormGroup class="col-span-2" label="Trener" name="trainerEmail" required>
                            <USelect v-model="groupClassesStore.editableGroupClass.trainerEmail" :options="allTrainersMailList" placeholder="Wybierz trenera" />
                        </UFormGroup>

                    <UButton  type="submit" color="blue" class="col-span-2 bg-[#203983] hover:bg-[#617F9B] text-center grid">
                        Dodaj nowego trenera
                    </UButton>

                </UForm>
            </div>
        </div>
        <template #footer>
            <div class="flex flex-row justify-end gap-5">
                <UButton label="Anuluj" @click="toggleAddNewClassModal()" color="gray" icon="i-material-symbols-cancel" />
            </div>
        </template>
    </UCard>
</UModal>
</div>


</template>

<style scoped>

</style>