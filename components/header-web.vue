<script setup lang="ts">

import type { DefaultLoginData } from "~/types";

const userType = ref<string | undefined>(undefined);

const statisticsStore = useStatisticsStore();

onMounted(() => {
  const defaultLoginData = useCookie<DefaultLoginData>('defaultLoginData').value;
  userType.value = defaultLoginData?.userType || ''; 
  console.log('useCookie(\'defaultLoginData\')', defaultLoginData);
  console.log('userType', userType.value);
  statisticsStore.getLiveMemberCount();
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
    <div class="flex flex-col gap-3 items-center space-x-2">
      <img src="/images/header/logo.svg" alt="Logo" class="w-40" />
      <!-- <p v-if="statisticsStore.liveMemberCount!==null" class="text-sm font-light text-slate-500">Liczba osób w obiekcie: <span class="text-sky-600">{{statisticsStore.liveMemberCount}}</span> </p> -->

    </div>
    

    <!-- Menu -->
    <nav class="hidden md:flex space-x-20 font-medium ">
      <NuxtLink to="/#onas" class="text-neutral-700 hover:text-gray-300">O nas</NuxtLink>
      <NuxtLink to="/trenerzy-personalni" class="text-neutral-700 hover:text-gray-300">Trenerzy personalni</NuxtLink>
      <NuxtLink to="/zajecia-grupowe" class="text-neutral-700 hover:text-gray-300">Zajęcia grupowe</NuxtLink>
      <NuxtLink to="/#cennik" class="text-neutral-700 hover:text-gray-300">Cennik</NuxtLink>
      <NuxtLink to="/wpisy" class="text-neutral-700 hover:text-gray-300">Aktualności</NuxtLink>
    </nav>

    <!-- Button -->
    <div class="flex flex-col items-center gap-2">
      <NuxtLink :to="userType ? userType==='Worker' ? '/admin-panel' : userType==='Trainer' ? '/trainer' : userType==='Member' ? '/twoj-profil' : '/login' : '/login'" class="btn-gradient text-white font-bold py-2 px-4 rounded w-fit">
        {{userType ? 'Twoje konto' : 'Zaloguj się lub zarejestruj'}}
      </NuxtLink>
      <p v-if="statisticsStore.liveMemberCount!==null" class="text-sm font-light text-slate-500">Liczba osób w obiekcie: <span class="text-sky-600">{{statisticsStore.liveMemberCount}}</span> </p>

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
