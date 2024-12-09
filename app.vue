<script setup lang="ts"> 

useHead({
  htmlAttrs: {
    'data-theme': 'light' 
  }
});

definePageMeta({
  middleware: 'auth',
});

</script>

<template>
    <div>
        <NuxtPage />
        
        <UNotifications />
    </div>
  </template>