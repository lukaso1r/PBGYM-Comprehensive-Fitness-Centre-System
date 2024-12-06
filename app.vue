<script setup lang="ts"> 

useHead({
  htmlAttrs: {
    'data-theme': 'light' // Dodaj niestandardowy atrybut, aby wskazać tryb jasny
  }
});

</script>

<template>
    <div>
        <NuxtPage />
        <!-- TODO: przykrywa pozostałe elementy strony czyniąc je nieklikalnymi -->
        <UNotifications />
    </div>
  </template>