<script setup lang="ts">


</script>

<template>
    <header-user-profile></header-user-profile>
    <div class="flex bg-[#F5F7F8]">
        <user-profile-navbar class="basis-1/5 max-w-[350px]"></user-profile-navbar>
        <main class=" min-h-svh basis-4/5 -mt-4">
            <!-- TODO: fix shadow and hand written css to tailwind -->
            <div class="credit-card bg-[url('/images/twoj-profil/trump.jpg')] w-[35%] p-4 flex flex-col rounded-lg bg-no-repeat gap-9" style="box-shadow: 0px 0px 24px -12px rgba(66, 68, 90, 1);">
                <UIcon name="i-ic-baseline-wifi" class="text-white text-xl size-7"/>
                <p class="tracking-wide text-slate-50 font-semibold text-xl" style="word-spacing: 1.5rem; text-shadow: 1px 1px 4px black;">4562   1256 8752 9856</p>
                <div class="row flex place-content-between">
                    <div class="owner flex flex-col gap-2">
                        <span class="text-slate-200 font-medium" style="text-shadow: 1px 1px 1px black;">Właściciel karty</span>
                        <span class="text-slate-50 font-semibold" style="text-shadow: 1px 1px 4px black;">Komar Jakubowski</span>
                    </div>
                    <div class="expire flex flex-col gap-2">
                        <span class="text-slate-200 font-medium" style="text-shadow: 1px 1px 1px black;">Ważność</span>
                        <span class="text-slate-50 font-semibold" style="text-shadow: 1px 1px 4px black;">09/11</span>
                    </div>
                    
                </div>
            </div>
            <div class="active-pass"></div>
            <div class="active-subscription"></div>
            <div class="payment-methods"></div>
            <div class="documents"></div>
            <div class="user-information"></div>
            <div class="total-entrance-amount"></div>
            <div class="settings"></div>
        </main>
    </div>
   
</template>

<style scoped>


</style>