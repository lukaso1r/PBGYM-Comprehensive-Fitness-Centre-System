<script setup lang="ts">

import { format } from 'date-fns'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { trainerTagTranslations } from '~/utils/trainerTagTranslations';

const registerStore = useRegisterStore();
const trainerStore = useTrainerStore();
const router = useRouter();

const test = () => {
    console.log('test')
    alert('add trainer modal')
}

const date = ref<Date>(new Date (registerStore.trainerToRegister.birthdate));
const birthdate = computed(() => {
    return date.value ? format(date.value, 'yyyy-MM-dd') : ""
})
const flow = ref<("year" | "month" | "calendar" | "time" | "minutes" | "hours" | "seconds")[]>(["year", "month", "calendar"]);
const maxDate = ref(currentDate.value)

const validGender = ref('valid')
const showAddNewTrainerModal = ref(false);

const onSubmitAddNewTrainer = async () => {
    registerStore.trainerToRegister.birthdate = birthdate.value;
    console.log('trainer to add', registerStore.trainerToRegister);
    await registerStore.registerTrainer();
    trainerStore.getAllTrainers()
    closeAddNewTrainerModal();

}

const closeAddNewTrainerModal = () => {
    showAddNewTrainerModal.value = false;
}

</script>

<template>

<WorkerComponentsHeaderWorker />
<div class="flex flex-row bg-[#F5F7F8] items-start pb-10 min-h-screen">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>
    <main class="basis-4/5 mt-4 flex flex-col flex-wrap items-start justify-start gap-8">
        
        <div class="members-panel-title w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Panel zarządzania trenerami</h1>
            <p class="text-slate-500">Możesz z tego miejsca przeglądać i zarządzać trenerami.</p>
        </div>
        
        <WorkerComponentsTrainersList :showButton="false"/>

        <UButton label="Dodaj trenera" @click="showAddNewTrainerModal = true" color="blue" icon="i-material-symbols-add" />

    </main>
</div>

<UModal 
    :model-value="showAddNewTrainerModal"
    :closable="true"
    @close="closeAddNewTrainerModal"
    :ui="{}"
    >
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
            <h3 class="font-bold text-lg">Formularz dodania nowego trenera</h3>
        </template>
        <div class="w-full">
            <div class="changeMemberDetailsContainer flex flex-col rounded-lg px-4 bg-white w-full">
                <h3 class="[word-spacing:4px] font-medium pb-4">Użyj poniższego formularza aby dodać nowego trenera.</h3>
                <UForm class="flex flex-col gap-4 justify-start" :state="registerStore.trainerToRegister" :validate="validateTrainerToRegister"  @submit="onSubmitAddNewTrainer">
                    <div class="grid grid-cols-3 gap-5 items-end p-6 border-2" >

                        <h4 class="col-span-3 text-xl font-semibold">Dane personalne</h4>

                        <UFormGroup label="Nowe imię" name="name" required>
                            <UInput v-model="registerStore.trainerToRegister.name" type="string" placeholder="Twoje nowe imię" :value="registerStore.trainerToRegister.name"  />
                        </UFormGroup>
        
                        <UFormGroup label="Nowe nazwisko"  name="surname" required>
                            <UInput v-model="registerStore.trainerToRegister.surname" type="string" placeholder="Twój nowy numer telefonu" :value="registerStore.trainerToRegister.surname"  />
                        </UFormGroup>
    
                        <UFormGroup label="Nowy pesel" name="pesel" required>
                            <UInput v-model="registerStore.trainerToRegister.pesel" type="number" placeholder="Twój nowy pesel" :value="registerStore.trainerToRegister.pesel"  />
                        </UFormGroup>
        
                        <UFormGroup label="Data urodzenia" name="birthdate"  required>
                            <VueDatePicker v-model="date" 
                                :max-date="maxDate" 
                                :min-date="'1900'" 
                                :year-range="[1900, maxDate.getFullYear()]" 
                                prevent-min-max-navigation 
                                :enable-time-picker="false" 
                                :flow="flow" 
                                locale="pl" 
                                cancelText="anuluj" 
                                selectText="potwierdź" 
                            />
                        </UFormGroup>
        
                        <UFormGroup label="Płeć" name="gender" required>
                            <USelect v-model="registerStore.trainerToRegister.gender" 
                            :options="[
                                { label: 'Kobieta', value: 'FEMALE' },
                                { label: 'Mężczyzna', value: 'MALE' },
                                { label: 'Inne', value: 'OTHER' }
                            ]" 
                            :required="true"
                            :style="{
                                borderColor: validGender === 'invalid' ? 'red' : 'transparent',
                                borderWidth: validGender === 'invalid' ? '1px' : '0px',
                                borderStyle: 'solid',
                                borderRadius: '5px',
                            }"
                            >
                            </USelect>
                            <p v-show="validGender==='invalid'" class="mt-2 text-red-500 dark:text-red-400 text-sm">Wymagane</p>
                        </UFormGroup>
        
                        <UFormGroup label="Nowy numer telefonu" name="phoneNumber" required>
                            <UInput v-model="registerStore.trainerToRegister.phoneNumber" type="number" placeholder="Twój nowy numer telefonu" :value="registerStore.trainerToRegister.phoneNumber"  />
                        </UFormGroup>
        
                        <UFormGroup label="Nowe miasto" name="city" required>
                            <UInput v-model="registerStore.trainerToRegister.address.city" type="text" placeholder="Twoje nowe miasto"  />
                        </UFormGroup>
        
                        <UFormGroup label="Nowa ulica" name="streetName" required>
                            <UInput v-model="registerStore.trainerToRegister.address.streetName" type="text" placeholder="Twoja nowa ulica"  />
                        </UFormGroup>
        
                        <UFormGroup label="Nowy numer budynku" name="buildingNumber" required>
                            <UInput v-model="registerStore.trainerToRegister.address.buildingNumber" type="text" placeholder="Twój nowy numer budynku"  />
                        </UFormGroup>
        
                        <UFormGroup label="Nowy numer mieszkania" name="apartmentNumber" required>
                            <UInput v-model="registerStore.trainerToRegister.address.apartmentNumber" type="text" placeholder="Twój nowy numer mieszkania"  />
                        </UFormGroup>
        
                        <UFormGroup label="Nowy kod pocztowy" name="postalCode" required>
                            <UInput v-model="registerStore.trainerToRegister.address.postalCode" type="text" placeholder="Twój nowy kod pocztowy"  />
                        </UFormGroup>
                    </div>

                    <div class="grid grid-cols-2 gap-8 border-2 p-6">

                        <h4 class="col-span-3 text-xl font-semibold">Dane logowania</h4>
                        
                        <UFormGroup label="Nowy email" name="email" required>
                            <UInput v-model="registerStore.trainerToRegister.email" type="email" placeholder="Twój nowy email" />
                        </UFormGroup>

                        <UFormGroup label="Nowe hasło" name="password" required>
                            <UInput v-model="registerStore.trainerToRegister.password" type="password" placeholder="Twoje nowe hasło" />
                        </UFormGroup>
                        
                    </div>

                    <UButton type="submit" color="blue" class="bg-[#203983] hover:bg-[#617F9B] text-center grid">
                        Dodaj nowego trenera
                    </UButton>
                    
                </UForm>
            </div>
        </div>
        <template #footer>
            <div class="flex flex-row justify-end gap-5">
                <UButton label="Anuluj" @click="closeAddNewTrainerModal" color="gray" icon="i-material-symbols-cancel" />
            </div>
        </template>
    </UCard>
</UModal>


</template>

<style scoped>


</style>