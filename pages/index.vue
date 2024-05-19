<template>

    <header-web />

    <img src="/public/images/home-banner/blob1.svg" alt="" class="absolute left-0 top-0 -z-50">
    <img src="/public/images/home-banner/blob2.svg" alt="" class="absolute right-0 bottom-0 -z-50">
    <img src="/public/images/home-banner/blob3.svg" alt="" class="absolute top-[20%] left-[40%] -z-50">
    <img src="/public/images/home-banner/blob4.svg" alt="" class="absolute bottom-0 left-0 -z-50">

    <div class=" flex flex-row z-99 w-[90%] mx-auto mt-[6%] justify-center h-[100%]">
        <div class="btn-container flex flex-col gap-10 w-1/2 mt-[8%] pl-20">
            <h1 class="font-bold text-5xl">Miejsce gdzie Twoje cele stają się rzeczywistością!</h1>
            <p>Nasza misja to nie tylko budowanie sylwetki, ale również kształtowanie zdrowego stylu życia i pozytywnego nastawienia. </p>
            <div class="btn-container flex flex-row gap-4">
                <UButton label="Zobacz film o naszej siłowni" class="bg-[#f1f6ff] text-lg text-[#2878FF] font-bold px-6 py-2 hover:bg-[#bed5ff]" icon="i-ic-round-play-arrow" />
                <UButton label="Dowiedz się więcej" class="bg-[#2878FF] text-lg text-[#f1f6ff] font-bold px-6 py-2 hover:bg-[#2060cc]" icon="i-material-symbols-123"/>
            </div>
        </div>

        <div class="col2">
            <img src="/public/images/home-banner/Group 27.png" alt="" class="z-99 w-[90%]" >
        </div>
    </div>

    <div id="promo-section" class="my-[9%] mx-[15%] ">
        <div  class="bg-[#f1f6ff] text-lg text-[#2878FF] font-bold px-6 py-2 w-fit mx-auto tracking-widest rounded-lg ">Wszystko czego szukasz</div>
        <h2 class="font-bold text-4xl text-center py-5">Centrum fitness, Twój profil, sklep internetowy</h2>
        <p class="text-xl text-center py-1 pb-10">Nie musisz już się zastanawiać nad tym, jak kupisz karnet, gdzie zarejestrujesz się na zajęcia sportowe, czy gdzie kupisz produkty ułatwiające sportową przygodę. Wszystko znajdziesz w naszym systemie</p>
        <div id="list-benefits" class="flex flex-row gap-[20%] justify-center align-middle">
            <div class="benefit flex flex-row  justify-center items-center gap-2 ">
                <div class="icon-box flex flex-row  justify-center items-center bg-[#F1F6FF] rounded-md p-2">
                    <UIcon name="i-ic-outline-speed" class="bg-[#2878FF] size-9 " />
                </div>
                <h3>Szybka obsługa</h3>
            </div>
            <div class="benefit flex flex-row  justify-center items-center gap-2">
                <div class="icon-box flex flex-row  justify-center items-center bg-[#F1F6FF] rounded-md p-2">
                    <UIcon name="i-material-symbols-swipe-up-outline-rounded" class="bg-[#2878FF] size-9 "/>
                </div>
                <h3>Łatwe w użyciu</h3>
            </div>
            <div class="benefit flex flex-row  justify-center items-center gap-2">
                <div class="icon-box flex flex-row  justify-center items-center bg-[#F1F6FF] rounded-md p-2">
                    <UIcon name="i-ph-number-circle-one-fill" class="bg-[#2878FF] size-9 " />
                </div>
                <h3>Jedno miejsce</h3>
            </div>
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