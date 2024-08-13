<script setup lang="ts">

const changePasswordState = useState(() => ({oldPassword: '', newPassword: '', newPasswordRepeat: ''}))
const store = useChangePasswordStore()

const onSubmitChangePassword = () => {
    console.log('submit change passsword')
    store.changePasswordData = {
        oldPassword: changePasswordState.value.oldPassword,
        newPassword: changePasswordState.value.newPassword
    }
    store.changePassword()
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
}

</script>

<template>

<UButton @click="test">test</UButton>
<header-user-profile />
<div class="flex bg-[#F5F7F8]">
    <user-profile-navbar class="basis-1/5 max-w-[350px]"></user-profile-navbar>
    <main class=" min-h-svh basis-4/5 -mt-4 flex flex-row flex-wrap content-start justify-start gap-8 pb-10">
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
    </main>
</div>



</template>

<style scoped>



</style>