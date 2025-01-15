<template>
    <footer class="text-white flex flex-row justify-between w-[100%] px-[10%] py-12 align-middle bg-[#001333] z-10" >
        <img src="/public/images/logo-white.svg" alt="">
        <div class="col2 flex flex-col justify-center">
            <h5 class="text-2xl font-bold pb-3 ">Oferta</h5>
            <ul>
                <li><NuxtLink to="/trenerzy-personalni">Trenerzy personalni</NuxtLink></li>
                <li><NuxtLink to="/zajecia-grupowe">Zajęcia grupowe</NuxtLink></li>
                <li><NuxtLink to="/#cennik">Cennik</NuxtLink></li>
            </ul>
        </div>
        <div class="col1 flex flex-col justify-center">
            <h5 class="text-2xl font-bold pb-3 ">O nas</h5>
            <ul>
                <li><NuxtLink to="/wpisy">Aktualności</NuxtLink></li>
            </ul>
        </div>
        <div class="col3  flex flex-col justify-center">
            <h5 class="text-2xl font-bold pb-3 ">Social Media</h5>
            <ul>
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Youtube</li>
            </ul>
        </div>
        <div class="col4 flex flex-col justify-center">
            <h5 class="text-2xl font-bold pb-3 ">Kontakt</h5>
            <ul class="">
                <li>Jabłonowa 11, Białystok</li>
                <li>hej@pbgym.pl</li>
                <li>tel: 123 654 879</li>
            </ul>
        </div>
    </footer>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
