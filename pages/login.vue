<script setup lang="ts">

const email = ref('')
const password = ref('')
const store = useLoginStore();

const test = () => {
    console.log('test')
}

const toast = useToast()

const onSubmitLogin = () => {
    if (validateEmail() || validatePassword()) {
        toast.add({ title: 'Nie podano danych logowania' })
    }else{
        console.log('submit')
        store.memberToLogin = {
            email: email.value,
            password: password.value
        }
        store.login()
    }
}

const validateEmail = () => {
    if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,8}$/.test(email.value)) && email.value !== '') {
        return false
    }
    return true
}

const validatePassword = () => {
    if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/.test(password.value)) && password.value !== '') {
        return false
    }
    return true
}

</script>

<template>

    <header class="flex flex-row header-gradient w-1/2 h-14 justify-between items-center px-12 py-8 border border-white border-solid rounded-xl shadow-lg text-white absolute top-6 left-1/2 transform -translate-x-1/2">
        <img src="/public/images/logo-blue.svg" alt="logo" class="w-16 h-auto" />
        <NuxtLink to="/" class="btn-gradient text-white py-2 px-4 rounded rounded-2xl text-sm">Wróć na stronę główną</NuxtLink>
    </header>

    <!-- <UButton @click="test">test</UButton> -->

    <main class="flex flex-row w-[100%] float-right h-[100svh] justify-end">
        <div class="col1 flex flex-col justify-center gap-5 pr-40">
            <h1 class="text-3xl font-bold  text-[#203983]">Dzień dobry!</h1>
            <h5 class="font-bold text-slate-500 text-base">Wprowadź adres mailowy i hasło aby się zalogować.</h5>

            <!-- TODO: create more optimal validation -->
            <UForm class="space-y-4" @submit="onSubmitLogin">
                <UFormGroup label="Email" required :error="!validateEmail()">
                    <p v-show="!validateEmail()" class="text-red-500 py-1 text-sm">Wprowadź prawidłowy adres email</p>
                    <UInput v-model="email" type="email" placeholder="you@example.com" icon="i-heroicons-envelope" />
                </UFormGroup>

                <UFormGroup label="Hasło" required :error="!validatePassword()">
                    <p v-show="!validatePassword()" class="text-red-500 py-1 text-sm">Hasło musi mieć conajmniej 8 znaków, w tym liczbę i znak specjalny</p>
                    <UInput v-model="password" placeholder="Twoje hasło" icon="i-heroicons-lock-closed" />
                </UFormGroup>

                <UButton type="submit" :disabled="!(validatePassword() && validateEmail())" class="bg-[#203983] hover:bg-[#617F9B]">
                    Zaloguj
                </UButton>
            </UForm>
            
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