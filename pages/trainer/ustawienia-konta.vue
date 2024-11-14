<script setup lang="ts">
import type { TrainerData, DefaultLoginData, TrainerEntries, TrainerDataToEdit, TrainerOffer } from '~/types';
import { cloneDeep } from 'lodash';
import { format } from 'date-fns'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


const { createTrainerDataToEditObject } = useObjectFactory()

const trainerStore = useTrainerStore()
const loggedTrainerData = useCookie<TrainerData>('loggedTrainerData')

const changePasswordState = useState(() => ({oldPassword: '', newPassword: '', newPasswordRepeat: ''}))
const changeEmailState = useState(() => ({newEmail: ''}))
const trainerDataToEdit = ref<TrainerDataToEdit>(createTrainerDataToEditObject());

const date = ref<Date>(new Date (trainerStore.trainerData.birthdate));
const birthdate = computed(() => {
    return date.value ? format(date.value, 'yyyy-MM-dd') : ""
})
const flow = ref<("year" | "month" | "calendar" | "time" | "minutes" | "hours" | "seconds")[]>(["year", "month", "calendar"]);
const maxDate = ref(currentDate.value)

const validGender = ref('valid')

onMounted(() => {
    trainerStore.getTrainerByEmail(loggedTrainerData.value.email)
})

watch(
    () => trainerStore.trainerData,
    (newVal) => {
        trainerDataToEdit.value = cloneDeep(newVal);  
        date.value = new Date(newVal.birthdate);
    },
    { immediate: true }
);

const changeTrainerData = async () => {
    console.log('saveDataChange', toRaw(trainerDataToEdit.value))
    trainerDataToEdit.value.birthdate = birthdate.value;
    try {
        await trainerStore.putUpdateTrainer(trainerDataToEdit.value, loggedTrainerData.value.email)
        
    } catch (error) {
        console.error('error ustawienia', error)
    }
}

const changeTrainerPassword = async () => {
    console.log('savePasswordChange', toRaw(changePasswordState.value))
    try {
        if(validatePassword(changePasswordState.value.newPassword)){
           await trainerStore.putUpdateTrainerPassword(loggedTrainerData.value.email, changePasswordState.value.newPassword, changePasswordState.value.oldPassword)
        }
        else{
            throw new Error('Hasło nie spełnia wymagań') 
        }
    } catch (error) {
        console.error('error', error)
    }
}

const changeTrainerEmail = async () => {
    console.log('saveEmailChange', changeEmailState.value)
    try {
        await trainerStore.putUpdateTrainerEmail(loggedTrainerData.value.email, changeEmailState.value.newEmail)
    } catch (error) {
        console.error('error', error)
    }
}



const test = () => {
    console.log('test')
    
}

</script>

<template>

<!-- <UButton @click="test">test</UButton> -->
<HeaderTrainerProfile />
<div class="flex bg-[#F5F7F8]">

    <Trainer-navbar class="basis-1/5 max-w-[350px] -mt-48 px-" />
    <main class=" min-h-svh basis-4/5 mt-4 flex flex-col items-start content-start justify-start gap-8 pb-10">

        <div class="members-panel-title w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Ustawienia kontra</h1>
            <p class="text-slate-500">Możesz z tego miejsca zarządzać danymi osobowymi oraz danymi logowania</p>
        </div>

        <div class="flex flex-row flex-wrap gap-8">
            <div class="changePasswordContainer flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <span class="font-semibold text-lg">Zmiana hasła</span>
                <p class="text-slate-500">Użyj poniższego formularza aby zmienić swoje hasło</p>

                 <UForm class="space-y-4" :state="changePasswordState" @submit="changeTrainerPassword">
                    <UFormGroup label="Stare hasło" required>
                        <UInput v-model="changePasswordState.oldPassword" type="password" placeholder="Twoje stare hasło" icon="i-heroicons-lock-closed" />
                    </UFormGroup>

                    <UFormGroup label="Nowe hasło" required :error="!validatePassword(changePasswordState.newPasswordRepeat)">
                        <p v-show="!validatePassword(changePasswordState.newPasswordRepeat)" class="text-red-500 py-1 text-sm">Hasło musi mieć conajmniej 8 znaków, w tym liczbę i znak specjalny</p>
                        <UInput v-model="changePasswordState.newPassword" type="password" placeholder="Twoje nowe hasło" icon="i-heroicons-lock-closed" />
                    </UFormGroup>

                    <UFormGroup label="Powtórz nowe hasło" required :error="!(changePasswordState.newPasswordRepeat===changePasswordState.newPassword)">
                        <p v-show="!(changePasswordState.newPasswordRepeat===changePasswordState.newPassword)" class="text-red-500 py-1 text-sm">Hasła muszą być takie same</p>
                        <UInput v-model="changePasswordState.newPasswordRepeat" type="password" placeholder="Twoje nowe hasło jeszcze raz" icon="i-heroicons-lock-closed" />
                    </UFormGroup>
                    <p class="text-gray-500">Uwaga po zmianie hasła zostaniesz wylogowany!</p>
                    <UButton type="submit"
                        color="blue"
                        :disabled="!validatePassword(changePasswordState.newPasswordRepeat) && !(changePasswordState.newPasswordRepeat===changePasswordState.newPassword)" 
                        class="bg-[#203983] hover:bg-[#617F9B]"
                    >
                        Zmień swoje hasło
                    </UButton>
                </UForm>
            </div>

            <div class="changeEmailContainer flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <span class="font-semibold text-lg">Zmiana adresu email</span>
                <p class="text-slate-500">Użyj poniższego formularza aby zmienić swój email.</p>
                
                <UForm class="space-y-4" :state="changeEmailState" @submit="changeTrainerEmail">
                    <UFormGroup label="Nowy adres email" required>
                        <UInput v-model="changeEmailState.newEmail" type="email" placeholder="Twój nowy adres email" icon="i-ic-baseline-mail-outline" />
                    </UFormGroup>
                    <p class="text-gray-500">Uwaga po zmianie adresu email zostaniesz wylogowany!</p>
                    <UButton type="submit" color="blue" :disabled="false" class="bg-[#203983] hover:bg-[#617F9B]">
                        Zmień swój adres email
                    </UButton>
                    
                </UForm>
            </div>

            <div class="changeMemberDetailsContainer flex flex-col w-full rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">    
                <span class="font-semibold text-lg">Zmiana danych personalnych</span>
                <p class="text-slate-500">Użyj poniższego formularza aby zmienić swoje dane personalne.</p>
                
                <UForm class="space-y-4 grid grid-cols-3 gap-5 items-end" :validate="validateTrainerToEditByTrainer" :state="trainerDataToEdit" @submit="changeTrainerData">
                    <UFormGroup label="Nowe imię" name="name" required>
                        <UInput v-model="trainerDataToEdit.name" type="string" placeholder="Twoje nowe imię" :value="trainerDataToEdit.name"  />
                    </UFormGroup>
    
                    <UFormGroup label="Nowe nazwisko"  name="surname" required>
                        <UInput v-model="trainerDataToEdit.surname" type="string" placeholder="Twój nowy numer telefonu" :value="trainerDataToEdit.surname"  />
                    </UFormGroup>

                    <UFormGroup label="Nowy pesel" name="pesel" required>
                        <UInput v-model="trainerDataToEdit.pesel" type="number" placeholder="Twój nowy pesel" :value="trainerDataToEdit.pesel"  />
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
                        <USelect v-model="trainerDataToEdit.gender" 
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
                        <UInput v-model="trainerDataToEdit.phoneNumber" type="number" placeholder="Twój nowy numer telefonu" :value="trainerDataToEdit.phoneNumber"  />
                    </UFormGroup>
    
                    <UFormGroup label="Nowe miasto" name="city" required>
                        <UInput v-model="trainerDataToEdit.address.city" type="text" placeholder="Twoje nowe miasto"  />
                    </UFormGroup>
    
                    <UFormGroup label="Nowa ulica" name="streetName" required>
                        <UInput v-model="trainerDataToEdit.address.streetName" type="text" placeholder="Twoja nowa ulica"  />
                    </UFormGroup>
    
                    <UFormGroup label="Nowy numer budynku" name="buildingNumber" required>
                        <UInput v-model="trainerDataToEdit.address.buildingNumber" type="text" placeholder="Twój nowy numer budynku"  />
                    </UFormGroup>
    
                    <UFormGroup label="Nowy numer mieszkania" name="apartmentNumber" required>
                        <UInput v-model="trainerDataToEdit.address.apartmentNumber" type="text" placeholder="Twój nowy numer mieszkania"  />
                    </UFormGroup>
    
                    <UFormGroup label="Nowy kod pocztowy" name="postalCode" required>
                        <UInput v-model="trainerDataToEdit.address.postalCode" type="text" placeholder="Twój nowy kod pocztowy"  />
                    </UFormGroup>

                    <UButton type="submit"  color="blue" class="bg-[#203983] hover:bg-[#617F9B] text-center grid">
                        Zapisz nowe dane
                    </UButton>
                    
                </UForm>
            </div>
        </div>
    </main>
</div>



</template>

<style scoped>



</style>