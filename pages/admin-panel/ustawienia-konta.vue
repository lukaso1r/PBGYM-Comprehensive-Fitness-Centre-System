<script setup lang="ts">
import type { ChangeEmailData, ChangeWorkerPasswordData, LoggedWorkerData, Worker } from '~/types'

const store = useWorkerStore()
const loggedWorkerData = useCookie<LoggedWorkerData>('loggedWorkerData')

const changePasswordState = useState<ChangeWorkerPasswordData>(() => ({email: '', oldPassword: '', newPassword: '', newPasswordRepeat: ''}))
const changeEmailState = useState<ChangeEmailData>(() => ({newEmail: ''}))

const changeWorkerData = async () => {
    console.log('saveWorkerData', loggedWorkerData)
    try {
        await store.changeWorkerData(loggedWorkerData.value)
        
    } catch (error) {
        console.error('error ustawienia', error)
    }
}

const changeWorkerPassowrd = async () => {
    console.log('savePasswordChange', toRaw(changePasswordState.value))
    changePasswordState.value.email = loggedWorkerData.value.email
    try {
        if(validatePassword(changePasswordState.value.newPassword)){
           await store.changeWorkerPassowrd(toRaw(changePasswordState.value))
        }
        else{
            throw new Error('Hasło nie spełnia wymagań') 
        }
    } catch (error) {
        console.error('error', error)
    }
}

const changeWorkerEmail = async () => {
    console.log('saveEmailChange', changeEmailState.value)
    try {
        await store.changeWorkerEmail(loggedWorkerData.value.email, changeEmailState.value.newEmail)
    } catch (error) {
        console.error('error', error)
    }
}



const test = () => {
    console.log('test')
    console.log("useCookie('loggedMemberData')", toRaw(useCookie('loggedMemberData').value))
    console.log("useCookie('defaultLoginData')", toRaw(useCookie('defaultLoginData').value))
    console.log("loggedMemberData", toRaw(loggedWorkerData))
    // console.log("changeMemberDetailsState", toRaw(changeMemberDetailsState.value))
}

</script>

<template>

<!-- <UButton @click="test">test</UButton> -->
<WorkerComponentsHeaderWorker/>
<div class="flex bg-[#F5F7F8]">

    <WorkerComponentsNavabarWorker class="basis-1/5 max-w-[350px] -mt-48 px-6"></WorkerComponentsNavabarWorker>
    <main class=" min-h-svh basis-4/5 mt-4 flex flex-row flex-wrap items-start content-start justify-start gap-8 pb-10">
        <div class="changePasswordContainer flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-4">
            <span class="font-semibold text-lg">Zmiana hasła</span>
            <h3 class="[word-spacing:4px] font-medium">Użyj poniższego formularza aby zmienić swoje hasło</h3>

            <UForm class="space-y-4" :state="changePasswordState" @submit="changeWorkerPassowrd">
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

                <UButton type="submit"
                    color="blue"
                    :disabled="!validatePassword(changePasswordState.newPasswordRepeat) && !(changePasswordState.newPasswordRepeat===changePasswordState.newPassword)" 
                    class="bg-[#203983] hover:bg-[#617F9B]"
                >
                    Zmień swoje hasło
                </UButton>
            </UForm>
        </div>

        <div class="changeEmailContainer flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-4"
            v-show="loggedWorkerData?.permissions.includes('ADMIN')"
        >
            <span class="font-semibold text-lg">Zmiana adresu email</span>
            <h3 class="[word-spacing:4px] font-medium">Użyj poniższego formularza aby zmienić swój email.</h3>
            
            <UForm class="space-y-4" :state="changeEmailState" @submit="changeWorkerEmail">
                <UFormGroup label="Nowy adres email" required>
                    <UInput v-model="changeEmailState.newEmail" type="email" placeholder="Twój nowy adres email" icon="i-ic-baseline-mail-outline" />
                </UFormGroup>
                <p class="text-gray-500">Uwaga po zmianie adresu email zostaniesz wylogowany!</p>
                <UButton type="submit" color="blue" :disabled="false" class="bg-[#203983] hover:bg-[#617F9B]">
                    Zmień swój adres email
                </UButton>
                
            </UForm>
        </div>

        <div class="changeMemberDetailsContainer flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-4"
            v-show="loggedWorkerData?.permissions.includes('ADMIN')"
        >    
            <span class="font-semibold text-lg">Zmiana danych adresowych</span>
            <h3 class="[word-spacing:4px] font-medium">Użyj poniższego formularza aby zmienić swoje dane adresowe.</h3>
            
            <UForm class="space-y-4" :state="loggedWorkerData" @submit="changeWorkerData">
                <UFormGroup label="Nowy numer telefonu" required>
                    <UInput v-model="loggedWorkerData.phoneNumber" type="number" placeholder="Twój nowy numer telefonu" :value="loggedWorkerData.phoneNumber" icon="i-ic-baseline-mail-outline" />
                </UFormGroup>

                <UFormGroup label="Nowe miasto" required>
                    <UInput v-model="loggedWorkerData.address.city" type="text" placeholder="Twoje nowe miasto" icon="i-ic-baseline-mail-outline" />
                </UFormGroup>

                <UFormGroup label="Nowa ulica" required>
                    <UInput v-model="loggedWorkerData.address.streetName" type="text" placeholder="Twoja nowa ulica" icon="i-ic-baseline-mail-outline" />
                </UFormGroup>

                <UFormGroup label="Nowy numer budynku" required>
                    <UInput v-model="loggedWorkerData.address.buildingNumber" type="text" placeholder="Twój nowy numer budynku" icon="i-ic-baseline-mail-outline" />
                </UFormGroup>

                <UFormGroup label="Nowy numer mieszkania" required>
                    <UInput v-model="loggedWorkerData.address.apartmentNumber" type="text" placeholder="Twój nowy numer mieszkania" icon="i-ic-baseline-mail-outline" />
                </UFormGroup>

                <UFormGroup label="Nowy kod pocztowy" required>
                    <UInput v-model="loggedWorkerData.address.postalCode" type="text" placeholder="Twój nowy kod pocztowy" icon="i-ic-baseline-mail-outline" />
                </UFormGroup>

                <p class="text-gray-500">Uwaga po pomyślnej zmianie danych zostaniesz wylogowany!</p>
                <UButton type="submit" color="blue" :disabled="false" class="bg-[#203983] hover:bg-[#617F9B]">
                    Zapisz nowe dane
                </UButton>
                
            </UForm>
        </div>

    </main>
</div>



</template>

<style scoped>



</style>