<script setup lang="ts">
import type {UserToLoginCredentials} from '~/types'

const store = useLoginStore();
const loginState = useState<UserToLoginCredentials>(() => ({email: "jan@member.com", password: "Haslo@123"}))
const toast = useToast()

const test = () => {
    console.log('test')
}

const onSubmitLogin = () => {
    if (loginState.value.email === '' || loginState.value.password === '') {
        toast.add({ title: 'Nie podano danych logowania' })
    }else{
        console.log('submit')
        store.userToLoginCredentials = {
            ...loginState.value
        }
        store.login()
    }
}

const validateEmail = () => {
    if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,8}$/.test(loginState.value.email)) && loginState.value.email !== '') {
        return false
    }
    return true
}

const fakeLogin = (email: string, password: string) => {
    loginState.value.email = email;
    loginState.value.password = password;

    onSubmitLogin()
}

</script>

<template>

    <header class="flex flex-row header-gradient w-1/2 h-14 justify-between items-center px-12 py-8 border border-white border-solid rounded-xl shadow-lg text-white absolute top-6 left-1/2 transform -translate-x-1/2">
        <img src="/public/images/logo-blue.svg" alt="logo" class="w-16 h-auto" />
        <NuxtLink to="/" class="btn-gradient text-white py-2 px-4 rounded rounded-2xl text-sm">Wróć na stronę główną</NuxtLink>
    </header>

    <main class="flex flex-row w-[100%] float-right h-[100svh] justify-end">
        <div class="col1 flex flex-col justify-center gap-5 pr-40">
            <h1 class="text-3xl font-bold  text-[#203983]">Dzień dobry!</h1>
            <h5 class="font-bold text-slate-500 text-base">Wprowadź adres mailowy i hasło aby się zalogować.</h5>

            <!-- TODO: create more optimal validation -->
            <UForm class="space-y-4" :state="loginState" @submit="onSubmitLogin">
                <UFormGroup label="Email" required :error="!validateEmail()">
                    <p v-show="!validateEmail()" class="text-red-500 py-1 text-sm">Wprowadź prawidłowy adres email</p>
                    <UInput v-model="loginState.email" type="email" placeholder="you@example.com" icon="i-heroicons-envelope" />
                </UFormGroup>

                <UFormGroup label="Hasło" required>
                    <UInput v-model="loginState.password" placeholder="Twoje hasło" icon="i-heroicons-lock-closed" type="password"/>
                </UFormGroup>

                <UButton type="submit" :disabled="!(loginState.password!='' && validateEmail())" class="bg-[#203983] hover:bg-[#617F9B]">
                    Zaloguj
                </UButton>
            </UForm>

            <div class="bg-slate-100 p-4 shadow-md">
                <h3 class="text-xl font-medium">W celu ułatwienia logowania</h3>
                <ul class="flex flex-col gap-4 pt-3">
                    <li class="flex flex-row gap-3 justify-between items-center border-2 p-2 border-gray-800 bg-white">
                        <p><span class="font-medium text-lg">Klient</span> <br /> Login: test1@member.com <br /> Hasło: 12345678</p>
                        <UButton @click="fakeLogin('test1@member.com', '12345678')" class="p-2" color="sky">Zaloguj</UButton>
                    </li>
                    <li class="flex flex-row gap-3 justify-between items-center border-2 p-2 border-gray-800 bg-white">
                        <p><span class="font-medium text-lg">Administrator</span> <br /> Login: admin@worker.com <br /> Hasło: 12345678</p>
                        <UButton @click="fakeLogin('admin@worker.com', '12345678')" class="p-2" color="sky">Zaloguj</UButton>
                    </li>
                </ul>
            </div>
            
            <NuxtLink to="/register" class="text-slate-500"><h6>Nie posiadasz konta? <span class="text-[#203983] font-bold"> &nbsp;&nbsp; Zarejestruj się</span></h6></NuxtLink>
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