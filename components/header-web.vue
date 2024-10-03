<script setup lang="ts">

import type { DefaultLoginData } from "~/types";

const userType = ref<string | undefined>(undefined);

onMounted(() => {
  const defaultLoginData = useCookie<DefaultLoginData>('defaultLoginData').value;
  userType.value = defaultLoginData?.userType || ''; // Ustawienie wartości po zamontowaniu komponentu
  console.log('useCookie(\'defaultLoginData\')', defaultLoginData);
  console.log('userType', userType.value);
});

const test = () => {
  console.log('test');
  console.log('userType in test:', userType.value);
}

</script>

<template>

  <header class="flex items-center justify-between px-16 py-4 bg-transparent text-neutral-700 absolute top-0 w-full z-99">
    
    <!-- <UButton @click="test">test</UButton> -->
    <!-- Logo -->
    <div class="flex items-center space-x-2">
      <img src="/images/header/logo.svg" alt="Logo" class="w-40" />
    </div>

    <!-- Menu -->
    <nav class="hidden md:flex space-x-20 font-medium ">
      <NuxtLink to="/o-nas" class="text-neutral-700 hover:text-gray-300">O nas</NuxtLink>
      <NuxtLink to="/treningi" class="text-neutral-700 hover:text-gray-300">Treningi</NuxtLink>
      <NuxtLink to="/zajecia-grupowe" class="text-neutral-700 hover:text-gray-300">Zajęcia Grupowe</NuxtLink>
      <NuxtLink to="/blog" class="text-neutral-700 hover:text-gray-300">Blog</NuxtLink>
      <NuxtLink to="/cennik" class="text-neutral-700 hover:text-gray-300">Cennik</NuxtLink>
    </nav>

    <!-- Button -->
    <div>
      <NuxtLink :to="userType ? userType==='Worker' ? '/admin-panel' : '/twoj-profil' : '/login'" class="btn-gradient text-white font-bold py-2 px-4 rounded">
        {{userType ? 'Twoje konto' : 'Zaloguj się lub zarejestruj'}}
      </NuxtLink>
<!-- 
      <NuxtLink :to="userType ? '/twoj-profil' : '/login'" class="btn-gradient text-white font-bold py-2 px-4 rounded">
        {{userType ? 'Twoje konto' : 'Zaloguj się lub zarejestruj'}}
      </NuxtLink> -->


    </div>
  </header>
  
  
</template>

<style scoped>
.btn-gradient {
  @apply bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded;
}

.btn-gradient:hover,
.btn-gradient:focus,
.btn-gradient:active,
.btn-gradient:visited {
  @apply bg-gradient-to-r from-blue-600 to-blue-800 shadow-md;
}

.btn-gradient:link,
.btn-gradient:visited {
  color: white; /* Ensuring text color remains white */
  text-decoration: none; /* Removing any text decoration */
}
</style>
