<script setup lang="ts">

// const onSubmit = (event: any) => {
//     console.log(event)
// }

import { format } from 'date-fns'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const store = useRegisterStore();

const email = ref('')
const password = ref('')
const repeatPassword = ref('')

const name = ref('')
const surname = ref('')

const date = ref<Date>();
const birthdate = computed(() => {
        return `${format(date.value, 'yyyy-MM-dd')}`
    })
    
const pesel = ref('')
const phoneNumber = ref('')
const city = ref('')
const streetName = ref('')
const buildingNumber = ref('')
const apartmentNumber = ref('')
const postalCode = ref('')

const registerStep = ref(1)
const flow = ref(['year', 'month', 'day']);
const maxDate = ref(currentDate.value)


const test = () => {
    console.log('test')
    console.log(birthdate.value)
}

const onSubmitFirstForm = () => {
    if(password.value !== repeatPassword.value){
        console.log('Hasła muszą być takie same')
    }else{
        console.log('Hasła są takie same')
        registerStep.value = 2
        console.log(email.value)
        store.memberToRegister = {
            ...store.memberToRegister,
            email: email.value,
            password: password.value
        }
    }
    // store.register()
}

const onSubmitSecondForm = () => {
    console.log('submit')
    store.memberToRegister = {
        ...store.memberToRegister,
        name: name.value,
        surname: surname.value,
        birthdate: birthdate.value,
        pesel: pesel.value,
        phoneNumber: phoneNumber.value,
        address: {
            city: city.value,
            streetName: streetName.value,
            buildingNumber: buildingNumber.value,
            apartmentNumber: apartmentNumber.value,
            postalCode: postalCode.value
        }
    }
    store.register()
}

</script>

<template>

    <header class="flex flex-row header-gradient w-1/2 h-14 justify-between items-center px-12 py-8 border border-white border-solid rounded-xl shadow-lg text-white absolute top-6 left-1/2 transform -translate-x-1/2">
        <img src="/public/images/logo-blue.svg" alt="logo" class="w-16 h-auto" />
        <NuxtLink to="/" class="btn-gradient text-white py-2 px-4 rounded rounded-2xl text-sm">Wróć na stronę główną</NuxtLink>
    </header>
    
    <!-- <UButton @click="test">test</UButton> -->

    <main class="flex flex-row w-[100%] float-right h-[100svh] justify-end">
        <div class="col1 flex flex-col justify-center gap-5 pr-40 ">
            <h1 class="text-3xl font-bold  text-[#203983]">Dołącz do nas!</h1>
            <h5 class="font-bold text-slate-500 text-base">Załóż swoje konto, aby cieszyć się ułatwieniami naszego systemu.</h5>

            <!-- TODO: validation -->
            <UForm v-if="registerStep===1" id="firstRegisterForm" class="space-y-4" :state="{}" @submit="onSubmitFirstForm">
                <UFormGroup label="Email">
                    <UInput v-model="email" type="text" placeholder="Twój adres email" icon="i-heroicons-envelope" />
                </UFormGroup>

                <UFormGroup label="Hasło">
                    <UInput v-model="password" type="password" placeholder="Twoje hasło" icon="i-heroicons-lock-closed" />
                </UFormGroup>

                <UFormGroup label="Powtórz hasło">
                    <UInput v-model="repeatPassword" type="password" placeholder="Powtórzone hasło" icon="i-heroicons-lock-closed" />
                </UFormGroup>

                <UButton type="submit" class="bg-[#203983] hover:bg-[#617F9B]">
                    Zarejestruj
                </UButton>
            </UForm>

            <UForm v-if="registerStep===2" id="secondRegisterForm" class="space-y-4 flex flex-col items-start" @submit="onSubmitSecondForm">
                
                <h2>Super poznajmy się bliżej!</h2>

                <div class="flex flex-row gap-2">
                    <UFormGroup label="Imię">
                        <UInput v-model="name" type="text" placeholder="Twoje Imię"  />
                    </UFormGroup>
                    
                    <UFormGroup label="Nazwisko">
                        <UInput v-model="surname" type="text" placeholder="Twoje Nazwisko" />
                    </UFormGroup>
                </div>
                
                <UFormGroup label="Data urodzenia">
                    <VueDatePicker v-model="date" :max-date="maxDate" :min-date="'1900'" :year-range="[1900, maxDate.getFullYear()]" prevent-min-max-navigation :enable-time-picker="false" :flow="flow" locale="pl" cancelText="anuluj" selectText="potwierdź" />
                </UFormGroup>
                

                <div class="flex flex-row gap-2">
                    <!-- TODO: hide arrows -->
                    <UFormGroup label="Numer telefonu">
                        <UInput v-model="phoneNumber" type="number" placeholder="Twój numer telefonu"  />
                    </UFormGroup>

                    <UFormGroup label="Pesel">
                        <UInput v-model="pesel" type="number" placeholder="Twój pesel"  />
                    </UFormGroup>
                </div>
                
                <div class="flex flex-row gap-2">
                    <UFormGroup label="Dane adresowe">
                        <UInput v-model="city" type="text" placeholder="Miasto"  />
                    </UFormGroup>
                    
                    <!-- NOT-TODO: ;)) 🤭🤟-->
                    <UFormGroup label="&nbsp;">
                        <UInput v-model="streetName" type="text" placeholder="Ulica"  />
                    </UFormGroup>
                </div>    

                <div class="flex flex-row gap-2">
                    <UFormGroup >
                        <UInput v-model="buildingNumber" type="text" placeholder="Numer budynku"  />
                    </UFormGroup>
                    
                    <UFormGroup >
                        <UInput v-model="apartmentNumber" type="text" placeholder="Numer mieszkania"  />
                    </UFormGroup>
                    
                    <UFormGroup >
                        <UInput v-model="postalCode" type="text" placeholder="Kod pocztowy"  />
                    </UFormGroup>
                </div>
                    
                <UButton type="submit" class="bg-[#203983] hover:bg-[#617F9B]">
                    Zakończ rejestrację i przejdź do swojego profilu
                </UButton>

                <UButton @click="registerStep=1" class="bg-[#203983] hover:bg-[#617F9B]">
                    Wróć do poprzedniego kroku
                </UButton>
                
            </UForm>

            
            <NuxtLink to="/login" class="text-slate-500"><h6>Posiadasz konto? <span class="text-[#203983] font-bold"> &nbsp;&nbsp; Zaloguj się</span></h6></NuxtLink>

        </div>
        <div class="col2 ">
            <img src="/public/images/big-logo-background.svg" alt="" srcset="" class="max-h-[100svh]">
        </div>
    </main>


</template>

<style scoped>
    .header-gradient{
        background-color: rgba(255, 255, 255, 1);
        background-image: linear-gradient(90deg, rgba(255, 255, 255, 1) 48%, rgba(231, 234, 241, 1) 100%);
    }
    .btn-gradient {
        background-color: rgba(32, 57, 131, 1);
        background-image: linear-gradient(49deg, rgba(32, 57, 131, 1) 0%, rgba(18, 33, 77, 1) 100%);
        color: white;
    }
    .btn-gradient:hover {
        background-color: rgb(63, 81, 134);
        background-image: linear-gradient(49deg, rgb(60, 79, 134) 0%, rgb(62, 79, 126) 100%);
        
    }

</style>