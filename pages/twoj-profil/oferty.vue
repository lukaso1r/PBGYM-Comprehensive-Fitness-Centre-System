<script setup lang="ts">

const data = ref()
const offersStore = useOffersStore()

const test = async () => {
    data.value = await offersStore.getOffers()
    console.log(data)
}


</script>

<template>
    <header-user-profile></header-user-profile>
    <div class="flex bg-[#F5F7F8]">
        <user-profile-navbar class="basis-1/5 max-w-[350px]"></user-profile-navbar>
        <main class=" min-h-svh basis-4/5">
            <UButton @click="test">test</UButton>
            Oferta
            {{ data }}
        </main>
    </div>
   
</template>

<style scoped>


</style>