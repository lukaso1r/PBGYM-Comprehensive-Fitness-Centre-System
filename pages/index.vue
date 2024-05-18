<template>

    <header-web />

    <img src="/public/images/home-banner/blob1.svg" alt="" class="absolute left-0 top-0 -z-50">
    <img src="/public/images/home-banner/blob2.svg" alt="" class="absolute right-0 bottom-0 -z-50">
    <img src="/public/images/home-banner/blob3.svg" alt="" class="absolute top-[20%] left-[40%] -z-50">
    <img src="/public/images/home-banner/blob4.svg" alt="" class="absolute bottom-0 left-0 -z-50">

    <div class=" flex flex-row z-99 w-[90%] mx-auto mt-[6%] justify-center">
        <div class="btn-container flex flex-col gap-10 w-1/2 mt-[8%] pl-20">
            <h1 class="font-bold text-5xl">Miejsce gdzie Twoje cele stają się rzeczywistością!</h1>
            <h2>Nasza misja to nie tylko budowanie sylwetki, ale również kształtowanie zdrowego stylu życia i pozytywnego nastawienia. </h2>
            <div class="btn-container flex flex-row gap-4">
                <UButton label="Zobacz film o naszej siłowni" class="bg-[#f1f6ff] text-lg text-[#2878FF] font-bold px-6 py-2 hover:bg-[#bed5ff]" />
                <UButton label="Dowiedz się więcej" class="bg-[#2878FF] text-lg text-[#f1f6ff] font-bold px-6 py-2 hover:bg-[#2060cc]"/>
            </div>
        </div>

        <div class="col2">
            <img src="/public/images/home-banner/Group 27.png" alt="" class="z-99 w-[90%]" >
        </div>
    </div>
    


</template>

<script setup lang="ts">
// f1f6ff


</script>


<style scoped>

    body{
        width: 100%;
        margin: 0;
        padding: 0;
    }

    

</style>