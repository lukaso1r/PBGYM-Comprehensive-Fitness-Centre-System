<script setup lang="ts">


</script>

<template>
  <header class="flex items-center justify-between px-16 py-4 bg-transparent text-neutral-700 absolute top-0 w-full z-99">
    <!-- Logo -->
    <div class="flex items-center space-x-2">
      <img src="/images/header/logo.svg" alt="Logo" class="w-40" />
    </div>

    <!-- Menu -->
    <nav class="hidden md:flex space-x-20 ">
      <NuxtLink to="/o-nas" class="text-neutral-700 hover:text-gray-300">O nas</NuxtLink>
      <NuxtLink to="/treningi" class="text-neutral-700 hover:text-gray-300">Treningi</NuxtLink>
      <NuxtLink to="/zajecia-grupowe" class="text-neutral-700 hover:text-gray-300">Zajęcia Grupowe</NuxtLink>
      <NuxtLink to="/blog" class="text-neutral-700 hover:text-gray-300">Blog</NuxtLink>
      <NuxtLink to="/cennik" class="text-neutral-700 hover:text-gray-300">Cennik</NuxtLink>
    </nav>

    <!-- Button -->
    <div>
      <UButton class="btn-gradient text-white font-bold py-2 px-4 rounded">
        Zaloguj się lub załóż konto
      </UButton>
    </div>
  </header>
</template>


<style scoped>
/* Additional styles if needed */
    .btn-gradient{
        background: linear-gradient(45deg, #2878FF, #2C65C8);
    }
    .btn-gradient:hover{
        background: linear-gradient(20deg, #2C65C8, #2878FF);
        box-shadow:0px 0px 5px -2px rgba(66, 68, 90, 1);
    }
</style>
