<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps<{
    isAddClassesModalOpen: boolean,
    clickedDate?: Date,
    trainerEmail?: string
}>();

const emit = defineEmits(['update:isAddClassesModalOpen']);

const groupClassesStore = useGroupClassesStore();
const trainerStore = useTrainerStore();

const allTrainersMailList = ref<string[]>([]);

const isAddClassesModalOpen = ref(false);

const date = ref<Date>(new Date (groupClassesStore.editableGroupClass.dateStart));
const flow = ref<("year" | "month" | "calendar" | "time" | "minutes" | "hours" | "seconds")[]>([ "month", "calendar", "time"]);
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
    emit('update:isAddClassesModalOpen', false);
}

watch (() => props.clickedDate, (newValue) => {
    if(newValue) {
        date.value = newValue;
        flow.value = ["time"];
    }
});

watch(() => props.isAddClassesModalOpen, (newValue) => {
    isAddClassesModalOpen.value = newValue;
    if(isAddClassesModalOpen.value) {
        trainerStore.getAllTrainers();
        allTrainersMailList.value = trainerStore.allTrainers.map((trainer) => trainer.email);
    }
});

watch(() => props.trainerEmail, (newValue) => {
    if(newValue) {
        groupClassesStore.editableGroupClass.trainerEmail = newValue;
        console.log('trainerEmail został podany w props: ', newValue);
    }
});

const onSubmitAddNewGroupClasses = async () => {
    console.log('submit', groupClassesStore.editableGroupClass);
    const status = await groupClassesStore.postNewGroupClass();
    if(status) toggleAddNewClassModal();
}

const changeClassTime = (operation: string, value: number) => {
    if(operation === 'add') {
        groupClassesStore.editableGroupClass.durationInMinutes += value
    } else {
        groupClassesStore.editableGroupClass.durationInMinutes = Math.max(0, groupClassesStore.editableGroupClass.durationInMinutes - value);
    }
}

watch(date, (newValue) => {
    console.log('data przed iso', newValue);
    const offset = newValue.getTimezoneOffset() * 60000;
    groupClassesStore.editableGroupClass.dateStart = new Date(newValue.getTime() - offset).toISOString().slice(0, -1);
    console.log('data po iso', groupClassesStore.editableGroupClass.dateStart);

});

</script>

<template>

<UModal 
    :model-value="isAddClassesModalOpen"
    :closable="true"
    @close="toggleAddNewClassModal()"
    :ui="{}"
>
<UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
    <template #header>
        <h3 class="font-bold text-lg">Formularz dodania nowych zajęć</h3>
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
                        :min-date="new Date()"
                        :start-date="new Date()" 
                        :year-range="[new Date().getFullYear(), nextYearDate.getFullYear()]" 
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
                    <USelect v-model="groupClassesStore.editableGroupClass.trainerEmail" :options="trainerStore.allTrainers.map((trainer) => trainer.email)" placeholder="Wybierz trenera" />
                    <UButton class="text-xs" label="Odśwież listę trenerów" @click="trainerStore.getAllTrainers()" color="blue" variant="ghost" />
                </UFormGroup>

                <UButton  type="submit" color="blue" class="col-span-2 bg-[#203983] hover:bg-[#617F9B] text-center grid">
                    Dodaj nowe zajęcia
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

</template>