<script setup lang="ts">

import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}

</script>

<template>

    <header class="flex flex-row header-gradient w-1/2 h-14 justify-between items-center px-12 py-8 border border-white border-solid rounded-xl shadow-lg text-white absolute top-6 left-1/2 transform -translate-x-1/2">
        <img src="/public/images/logo-blue.svg" alt="logo" class="w-16 h-auto" />
        <NuxtLink to="/index.vue" class="btn-gradient text-white py-2 px-4 rounded rounded-2xl text-sm">Wróć na stronę główną</NuxtLink>
    </header>

    <main class="flex flex-row w-[80%] float-right h-[100svh]">
        <div class="col1 flex flex-col justify-center">
            <h1 class="text-2xl font-bold  text-[#203983]">Dzień dobry!</h1>
            <h5 class="text-xl font-bold text-[rgb(63, 81, 134)]">Wprowadź adres mailowy i hasło aby się zalogować.</h5>

            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Email" name="email">
                  <UInput v-model="state.email" />
                </UFormGroup>
            
                <UFormGroup label="Password" name="password">
                  <UInput v-model="state.password" type="password" />
                </UFormGroup>
            
                <UButton type="submit">
                  Submit
                </UButton>
            </UForm>

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