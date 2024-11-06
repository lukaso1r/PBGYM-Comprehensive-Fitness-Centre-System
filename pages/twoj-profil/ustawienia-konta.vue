<script setup lang="ts">
import type { ChangeEmailData, ChangeMemberDetailsData, LoggedMemberData } from '~/types'
import { format } from 'date-fns'

const loggedMemberData = useCookie<LoggedMemberData>('loggedMemberData')
const date = ref<Date>();
const birthdate = computed(() => {
    return date.value ? format(date.value, 'yyyy-MM-dd') : ""
})
const flow = ref<("year" | "month" | "calendar" | "time" | "minutes" | "hours" | "seconds")[]>(["year", "month", "calendar"]);
const maxDate = ref(currentDate.value)

const validGender = ref('valid')


const changePasswordState = useState(() => ({oldPassword: '', newPassword: '', newPasswordRepeat: ''}))
const changeEmailState = useState<ChangeEmailData>(() => ({newEmail: ''}))
const changeMemberDetailsState = useState<ChangeMemberDetailsData>(() => ({
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
}));

watchEffect(() => {
    if (loggedMemberData) {
        changeMemberDetailsState.value = {
            name: loggedMemberData.value.name,
            surname: loggedMemberData.value.surname,
            birthdate: loggedMemberData.value.birthdate,
            gender: loggedMemberData.value.gender,
            pesel: loggedMemberData.value.pesel,
            phoneNumber: loggedMemberData.value.phoneNumber,
            address: {
                city: loggedMemberData.value.address?.city || "",
                streetName: loggedMemberData.value.address?.streetName || "",
                buildingNumber: loggedMemberData.value.address?.buildingNumber || "",
                apartmentNumber: loggedMemberData.value.address?.apartmentNumber || 0,
                postalCode: loggedMemberData.value.address?.postalCode || ""
            }
        }
    }
});

const passwordStore = useChangePasswordStore()
const emailStore = useChangeEmailStore()
const memberDetailsStore = useChangeMemberDetailsStore()


const onSubmitChangePassword = () => {
    console.log('submit change passsword')
    passwordStore.changePasswordData = {
        oldPassword: changePasswordState.value.oldPassword,
        newPassword: changePasswordState.value.newPassword
    }
    passwordStore.changePassword()
}

const onSubmitChangeEmail = () => {
    console.log('submit change email')
    emailStore.changeEmailData = {
        newEmail: changeEmailState.value.newEmail
    }
    emailStore.changeEmail()
}

const onSubmitChangeMemberDetails = () => {
    console.log('submit change member details')
    memberDetailsStore.changeMemberDetailsData = {
        ...changeMemberDetailsState.value
    }
    memberDetailsStore.changeMemberDetails()
}

const validatePassword = () => {
    if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/.test(changePasswordState.value.newPassword)) && changePasswordState.value.newPassword !== '') {
        return false
    }
    return true
}

const test = () => {
    console.log('test')
    console.log("useCookie('loggedMemberData')", toRaw(useCookie('loggedMemberData').value))
    console.log("useCookie('defaultLoginData')", toRaw(useCookie('defaultLoginData').value))
    console.log("loggedMemberData", toRaw(loggedMemberData))
    console.log("changeMemberDetailsState", toRaw(changeMemberDetailsState.value))
}

</script>

<template>

<!-- <UButton @click="test">test</UButton> -->
<header-user-profile />
<div class="flex bg-[#F5F7F8]">
    <user-profile-navbar class="basis-1/5 max-w-[350px]"></user-profile-navbar>
    <main class=" min-h-svh basis-4/5 -mt-4 flex flex-row flex-wrap items-start content-start justify-start gap-8 pb-10">
        <div class="changePasswordContainer flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-4">
            <span class="font-semibold text-lg">Zmiana hasła</span>
            <h3 class="[word-spacing:4px] font-medium">Użyj poniższego formularza aby zmienić swoje hasło</h3>
            <UForm class="space-y-4" :state="changePasswordState" @submit="onSubmitChangePassword">
                <UFormGroup label="Stare hasło" required>
                    <UInput v-model="changePasswordState.oldPassword" type="password" placeholder="Twoje stare hasło" icon="i-heroicons-lock-closed" />
                </UFormGroup>

                <UFormGroup label="Nowe hasło" required :error="!validatePassword()">
                    <p v-show="!validatePassword()" class="text-red-500 py-1 text-sm">Hasło musi mieć conajmniej 8 znaków, w tym liczbę i znak specjalny</p>
                    <UInput v-model="changePasswordState.newPassword" type="password" placeholder="Twoje nowe hasło" icon="i-heroicons-lock-closed" />
                </UFormGroup>

                <UFormGroup label="Powtórz nowe hasło" required :error="!(changePasswordState.newPasswordRepeat===changePasswordState.newPassword)">
                    <p v-show="!(changePasswordState.newPasswordRepeat===changePasswordState.newPassword)" class="text-red-500 py-1 text-sm">Hasła muszą być takie same</p>
                    <UInput v-model="changePasswordState.newPasswordRepeat" type="password" placeholder="Twoje nowe hasło jeszcze raz" icon="i-heroicons-lock-closed" />
                </UFormGroup>

                <UButton type="submit" color="blue" :disabled="!validatePassword() && !(changePasswordState.newPasswordRepeat===changePasswordState.newPassword)" class="bg-[#203983] hover:bg-[#617F9B]">
                    Zmień swoje hasło
                </UButton>
            </UForm>
        </div>

        <div class="changeEmailContainer flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-4">
            <span class="font-semibold text-lg">Zmiana adresu email</span>
            <h3 class="[word-spacing:4px] font-medium">Użyj poniższego formularza aby zmienić swój email.</h3>
            
            <UForm class="space-y-4" :state="changePasswordState" @submit="onSubmitChangeEmail">
                <UFormGroup label="Nowy adres email" required>
                    <UInput v-model="changeEmailState.newEmail" type="email" placeholder="Twój nowy adres email" icon="i-ic-baseline-mail-outline" />
                </UFormGroup>
                <p class="text-gray-500">Uwaga po zmianie adresu email zostaniesz wylogowany!</p>
                <UButton type="submit" color="blue" :disabled="!validatePassword() && !(changePasswordState.newPasswordRepeat===changePasswordState.newPassword)" class="bg-[#203983] hover:bg-[#617F9B]">
                    Zmień swój adres email
                </UButton>
                
            </UForm>
        </div>

        <div class="changeMemberDetailsContainer flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-4">
            <span class="font-semibold text-lg">Zmiana danych personalnych</span>
            <h3 class="[word-spacing:4px] font-medium">Użyj poniższego formularza aby zmienić swoje dane personalne.</h3>
            
            <UForm class="space-y-4" :state="changeMemberDetailsState" @submit="onSubmitChangeMemberDetails">
                <UFormGroup label="Nowe imię" required>
                    <UInput v-model="changeMemberDetailsState.name" type="string" placeholder="Twóoje nowe imię" :value="changeMemberDetailsState.name"  />
                </UFormGroup>

                <UFormGroup label="Nowe nazwisko" required>
                    <UInput v-model="changeMemberDetailsState.surname" type="string" placeholder="Twój nowy numer telefonu" :value="changeMemberDetailsState.surname"  />
                </UFormGroup>

                <UFormGroup label="Data urodzenia"  required>
                    <VueDatePicker v-model="date" :max-date="maxDate" :min-date="'1900'" :year-range="[1900, maxDate.getFullYear()]" prevent-min-max-navigation :enable-time-picker="false" :flow="flow" locale="pl" cancelText="anuluj" selectText="potwierdź" />
                </UFormGroup>

                <UFormGroup label="Płeć" name="gender" required>
                    <USelect v-model="changeMemberDetailsState.gender" 
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

                <UFormGroup label="Nowy numer telefonu" required>
                    <UInput v-model="changeMemberDetailsState.phoneNumber" type="number" placeholder="Twój nowy numer telefonu" :value="changeMemberDetailsState.phoneNumber"  />
                </UFormGroup>

                <UFormGroup label="Nowe miasto" required>
                    <UInput v-model="changeMemberDetailsState.address.city" type="text" placeholder="Twoje nowe miasto"  />
                </UFormGroup>

                <UFormGroup label="Nowa ulica" required>
                    <UInput v-model="changeMemberDetailsState.address.streetName" type="text" placeholder="Twoja nowa ulica"  />
                </UFormGroup>

                <UFormGroup label="Nowy numer budynku" required>
                    <UInput v-model="changeMemberDetailsState.address.buildingNumber" type="text" placeholder="Twój nowy numer budynku"  />
                </UFormGroup>

                <UFormGroup label="Nowy numer mieszkania" required>
                    <UInput v-model="changeMemberDetailsState.address.apartmentNumber" type="text" placeholder="Twój nowy numer mieszkania"  />
                </UFormGroup>

                <UFormGroup label="Nowy kod pocztowy" required>
                    <UInput v-model="changeMemberDetailsState.address.postalCode" type="text" placeholder="Twój nowy kod pocztowy"  />
                </UFormGroup>



                <p class="text-gray-500">Uwaga po pomyślnej zmianie danych zostaniesz wylogowany!</p>
                <UButton type="submit" color="blue" :disabled="!validatePassword() && !(changePasswordState.newPasswordRepeat===changePasswordState.newPassword)" class="bg-[#203983] hover:bg-[#617F9B]">
                    Zapisz nowe dane
                </UButton>
                
            </UForm>
        </div>

    </main>
</div>



</template>

<style scoped>



</style>