<script setup lang="ts">

const data = ref()

async function getOffers() {

    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsdWthc3pAdGVzMnQyLnBsIiwiaWF0IjoxNzIzMDY1MTk2LCJleHAiOjE3MjM2Njk5OTZ9.mbp20dDHFglv5FmpfXqBjiEOy-sUuT_rso-fqMq36B0"
    
    const response = await fetch('https://pbgym.onrender.com/offer/standard', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET',
    });
    data.value = response
    console.log(data)    
}

getOffers()


</script>

<template>
    <header-user-profile></header-user-profile>
    <div class="flex bg-[#F5F7F8]">
        <user-profile-navbar class="basis-1/5 max-w-[350px]"></user-profile-navbar>
        <main class=" min-h-svh basis-4/5">
            Oferta
            {{ data }}
        </main>
    </div>
   
</template>

<style scoped>


</style>