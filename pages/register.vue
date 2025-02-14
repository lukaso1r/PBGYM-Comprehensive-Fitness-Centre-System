<script setup lang="ts">

import { format } from 'date-fns'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import type {  MemberToRegisterData } from '~/types'

const store = useRegisterStore()

const repeatPassword = ref('')
const memberToRegisterData = useState<MemberToRegisterData>(() => ({
    email: "",
    password: "",
    name: '',
    surname: '',
    birthdate: '',
    gender: '',
    pesel: '',
    phoneNumber: '',
    address: {
        city: '',
        streetName: '',
        buildingNumber: '',
        apartmentNumber: 0,
        postalCode: ''
    }
}))

const date = ref<Date>();
const birthdate = computed(() => {
    return date.value ? format(date.value, 'yyyy-MM-dd') : ""
})
const flow = ref<("year" | "month" | "calendar" | "time" | "minutes" | "hours" | "seconds")[]>(["year", "month", "calendar"]);
const maxDate = ref(currentDate.value)

const validGender = ref('valid')

const registerStep = ref(1)
// const registerStatus = computed(() => store.status)
const toast = useToast()

const onSubmitFirstForm = () => {
    if(validateEmail() || validatePassword() || validateGender() || memberToRegisterData.value.password === repeatPassword.value){
        console.log('Hasła są takie same')
        registerStep.value = 2
        console.log("defaultRegisterState.value.email",memberToRegisterData.value.email)
        store.memberToRegister = {
            ...store.memberToRegister,
        }
    }else{
        toast.add({ title: 'Podano niepoprawne dane' })
        alert('Podano niepoprawne dane')
    }
}

const onSubmitSecondForm = () => {
    console.log("memberToRegisterData.value",memberToRegisterData.value)
    console.log("date", date.value)
    if(!date.value){
        alert('Podaj datę urodzenia')
        return
    }
    store.memberToRegister = {
        ...memberToRegisterData.value,
        birthdate: birthdate.value
    }
    store.register()
    console.log("JSON.stringify(memberToRegister.value)",JSON.stringify(store.memberToRegister))
}

const validateEmail = (): boolean => {
    if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,8}$/.test(memberToRegisterData.value.email)) && memberToRegisterData.value.email !== '') {
        return false
    }
    return true
}

const validatePassword = () => {
    if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/.test(memberToRegisterData.value.password)) && memberToRegisterData.value.password !== '') {
        return false
    }
    return true
}

const validateGender = () => {
    if (memberToRegisterData.value.gender==='') {
        validGender.value = 'invalid'
        return true
    // biome-ignore lint/style/noUselessElse: <explanation>
    }else{
        validGender.value = 'valid'
        return false
    }
}

</script>

<template>

    <header class="flex flex-row header-gradient w-1/2 h-14 justify-between items-center px-12 py-8 border border-white border-solid rounded-xl shadow-lg text-white absolute top-6 left-1/2 transform -translate-x-1/2">
        <img src="/public/images/logo-blue.svg" alt="logo" class="w-16 h-auto" />
        <NuxtLink to="/" class="btn-gradient text-white py-2 px-4 rounded-2xl text-sm">Wróć na stronę główną</NuxtLink>
    </header>
    
    <!-- <UButton @click="test">test</UButton> -->

    <main class="flex flex-row w-[100%] float-right h-[100svh] justify-end">
        <div class="col1 flex flex-col justify-center gap-5 pr-20 ">
            <h1 class="text-3xl font-bold  text-[#203983]">Dołącz do nas!</h1>
            <h5 class="font-bold text-slate-500 text-base" 
                v-html="registerStep === 1 
                ? 'Załóż swoje konto, aby cieszyć się ułatwieniami naszego systemu.' 
                : 'Świetnie, podaj teraz swoje dane personalne,<br /> aby w pełni skorzystać z naszego systemu'"
            ></h5>

            <!-- TODO: create more optimal validation -->
            <UForm v-if="registerStep===1" id="firstRegisterForm" class="space-y-4" :state="memberToRegisterData" @submit="onSubmitFirstForm">
                <UFormGroup label="Email" required :error="!validateEmail()" name="email">
                    <p v-show="!validateEmail()" class="text-red-500 py-1 text-sm">Wprowadź prawidłowy adres email</p>
                    <UInput v-model="memberToRegisterData.email" type="text" placeholder="Twój adres email" icon="i-heroicons-envelope" />
                </UFormGroup>

                <UFormGroup label="Hasło" required :error="!validatePassword()" name="password">
                    <p v-show="!validatePassword()" class="text-red-500 py-1 text-sm">Hasło musi mieć conajmniej 8 znaków, w tym liczbę i znak specjalny</p>
                    <UInput v-model="memberToRegisterData.password" type="password" placeholder="Twoje hasło" icon="i-heroicons-lock-closed" />
                </UFormGroup>

                <UFormGroup label="Powtórz hasło" required :error="memberToRegisterData.password!==repeatPassword" name="repeatPassword">
                    <UInput v-model="repeatPassword" type="password" placeholder="Powtórzone hasło" icon="i-heroicons-lock-closed" />
                </UFormGroup>

                <UButton type="submit" class="bg-[#203983] hover:bg-[#617F9B] disabled:bg-gray-400" :disabled="!(memberToRegisterData.password===repeatPassword) || !validatePassword() || !validateEmail() || memberToRegisterData.password.length===0 || memberToRegisterData.email.length===0">
                    Zarejestruj
                </UButton>
            </UForm>

            <UForm v-if="registerStep===2" id="secondRegisterForm" class="space-y-4 flex flex-col items-start" :state="memberToRegisterData" @submit="onSubmitSecondForm" :validate="validateMemberToRegister">
                <div class="flex flex-row gap-2">
                    <UFormGroup label="Imię" name="name" required >
                        <UInput v-model="memberToRegisterData.name" type="text" placeholder="Twoje Imię"  />
                    </UFormGroup>
                    
                    <UFormGroup label="Nazwisko"  required name="surname">
                        <UInput v-model="memberToRegisterData.surname" type="text" placeholder="Twoje Nazwisko" />
                    </UFormGroup>

                    <UFormGroup label="Płeć" name="gender" required>
                        <USelect v-model="memberToRegisterData.gender" 
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
                </div>
                
                <UFormGroup label="Data urodzenia"  required>
                    <VueDatePicker v-model="date" :max-date="maxDate" :min-date="'1900'" :year-range="[1900, maxDate.getFullYear()]" prevent-min-max-navigation :enable-time-picker="false" :flow="flow" locale="pl" cancelText="anuluj" selectText="potwierdź" />
                </UFormGroup>

                <div class="flex flex-row gap-2">
                    <!-- TODO: hide arrows -->
                    <UFormGroup label="Numer telefonu" required name="phoneNumber">
                        <UInput v-model="memberToRegisterData.phoneNumber" type="number" placeholder="Twój numer telefonu"  />
                    </UFormGroup>

                    <UFormGroup label="Pesel"  required name="pesel">
                        <UInput v-model="memberToRegisterData.pesel" type="number" placeholder="Twój pesel"  />
                    </UFormGroup>
                </div>
                
                <div class="flex flex-row gap-2">
                    <UFormGroup label="Dane adresowe"  required name="city">
                        <UInput v-model="memberToRegisterData.address.city" type="text" placeholder="Miasto"  />
                    </UFormGroup>
                    
                    <!-- NOT-TODO: ;)) 🤭🤟-->
                    <UFormGroup label="&nbsp;" name="streetName">
                        <UInput v-model="memberToRegisterData.address.streetName" type="text" placeholder="Ulica"  />
                    </UFormGroup>
                </div>    

                <div class="flex flex-row gap-2">
                    <UFormGroup name="buildingNumber">
                        <UInput v-model="memberToRegisterData.address.buildingNumber" type="text" placeholder="Numer budynku"  />
                    </UFormGroup>
                    
                    <UFormGroup name="apartmentNumber">
                        <UInput v-model="memberToRegisterData.address.apartmentNumber" type="text" placeholder="Numer mieszkania"   />
                    </UFormGroup>
                    
                    <UFormGroup name="postalCode">
                        <UInput v-model="memberToRegisterData.address.postalCode" type="text" placeholder="Kod pocztowy"  />
                    </UFormGroup>
                </div>
                    
                <UButton type="submit" class="bg-[#203983] hover:bg-[#617F9B]">
                    Zakończ rejestrację i przejdź do swojego profilu
                </UButton>

                <UButton @click="registerStep=1" class="text-[#203983]" variant="ghost" color="sky" icon="i-ic-sharp-keyboard-backspace">
                    Wróć do poprzedniego kroku
                </UButton>
            </UForm>
            
            <NuxtLink v-show="registerStep===1" to="/login" class="text-slate-500"><h6>Posiadasz konto? <span class="text-[#203983] font-bold"> &nbsp;&nbsp; Zaloguj się</span></h6></NuxtLink>

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