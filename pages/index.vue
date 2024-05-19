<template>

    <header-web />

    <img src="/public/images/home-banner/blob1.svg" alt="" class="absolute left-0 top-0 -z-50">
    <img src="/public/images/home-banner/blob2.svg" alt="" class="absolute right-0 bottom-0 -z-50">
    <img src="/public/images/home-banner/blob3.svg" alt="" class="absolute top-[20%] left-[40%] -z-50">
    <img src="/public/images/home-banner/blob4.svg" alt="" class="absolute bottom-0 left-0 -z-50">

    <div class=" flex flex-row z-99 w-[90%] mx-auto align-middle justify-center min-h-[100vh]">
        <div class="btn-container flex flex-col gap-10 w-1/2 pl-20 align-middle justify-center">
            <h1 class="font-bold text-6xl leading-snug">Miejsce gdzie Twoje cele stają się rzeczywistością!</h1>
            <p>Nasza misja to nie tylko budowanie sylwetki, ale również kształtowanie zdrowego stylu życia i pozytywnego nastawienia. </p>
            <div class="btn-container flex flex-row gap-4">
                <UButton label="Zobacz film o naszej siłowni" class="bg-[#f1f6ff] text-lg text-[#2878FF] font-bold px-6 py-2 hover:bg-[#bed5ff]" icon="i-ic-round-play-arrow" />
                <UButton label="Dowiedz się więcej" class="bg-[#2878FF] text-lg text-[#f1f6ff] font-bold px-6 py-2 hover:bg-[#2060cc]" icon="i-material-symbols-123"/>
            </div>
        </div>

        <div class="col2 flex flex-col justify-center align-middle">
            <img src="/public/images/home-banner/Group 27.png" alt="" class="z-99 w-[90%]" >
        </div>
    </div>

    <div id="scrollDown" class="mx-auto w-fit -mt-20">
        <UButton @click="scrollDown" size="xl" class="size-[100px] mx-auto rounded-full animate-bounce" variant="ghost">
            <UIcon class="text-center mx-auto size-[50px]  bg-[#2878FF]" name="i-ic-baseline-arrow-circle-down" />
        </UButton>
    </div>


    <div id="promo-section" class="my-28 mx-[10%] ">
        <div class="bg-[#f1f6ff] text-lg text-[#2878FF] font-bold px-6 py-2 w-fit mx-auto tracking-widest rounded-lg ">Wszystko czego szukasz</div>
        <h2 class="font-bold text-4xl text-center py-5">Centrum fitness, Twój profil, sklep internetowy</h2>
        <p class="text-xl text-center py-1 pb-10">Nie musisz już się zastanawiać nad tym, jak kupisz karnet, gdzie zarejestrujesz się na zajęcia sportowe, czy gdzie kupisz produkty ułatwiające sportową przygodę. Wszystko znajdziesz w naszym systemie</p>
        <div id="list-benefits" class="flex flex-row gap-[20%] justify-center align-middle">
            <div class="benefit flex flex-row  justify-center items-center gap-3 ">
                <div class="benefit-card">
                    <UIcon name="i-ic-outline-speed" class="bg-[#2878FF] size-9 " />
                </div>
                <h3 class="text-lg font-bold">Szybka obsługa</h3>
            </div>
            <div class="benefit flex flex-row  justify-center items-center gap-3">
                <div class="benefit-card">
                    <UIcon name="i-material-symbols-swipe-up-outline-rounded" class="bg-[#2878FF] size-9 "/>
                </div>
                <h3 class="text-lg font-bold">Łatwe w użyciu</h3>
            </div>
            <div class="benefit flex flex-row  justify-center items-center gap-3">
                <div class="benefit-card">
                    <UIcon name="i-ph-number-circle-one-fill" class="bg-[#2878FF] size-9 " />
                </div>
                <h3 class="text-lg font-bold">Jedno miejsce</h3>
            </div>
        </div>
    </div>

    <div id="community" class="flex flex-row relative align-middle  ">

        <div id="community-flex" class="flex flex-row relative py-20">
            <div class="col1 pl-[10%] flex flex-col w-1/2 pr-40 justify-center">
                <div class="mb-4 bg-[#f1f6ff] text-lg text-[#2878FF] font-bold px-6 py-2 w-fit tracking-widest rounded-lg ">Siła w jedności</div>
                <h3 class="mb-7 text-4xl font-bold">Dołącz do naszej <br/> społeczności!</h3>
                <p>Dołącz do naszej społeczności i poczuj motywację, która pobudzi Cię do działania każdego dnia. Niech nasza siłownia stanie się Twoim drugim domem, gdzie nie tylko budujesz ciało, ale również rozwijasz umysł i duch. Razem osiągniemy więcej niż kiedykolwiek moglibyśmy osiągnąć sami. </p>
            </div>
            <div class="col2 align-middle flex flex-col justify-center">
                <div id="speach-bubble" class="mx-auto -mb-5 z-99">
                    <!-- TODO: fix emoji -->
                    <UIcon name="i-twemoji-sports-medal" class="mx-auto -mb-9 ml-6" />
                    <img class="mx-auto " src="/public/images/home-community/bubble.svg" alt="" srcset="">
                </div>  
                <img class="-z-40" src="/public/images/home-community/graph.png" alt="" srcset="">
            </div>
            <img class="absolute top-0 right-0 -z-50" src="/public/images/home-community/community-bubble.svg" alt="" srcset="">
        </div>
            
       

    </div>

    <div id="list-benefits" class="flex flex-row gap-[20%] justify-center align-middle w-1/2 ml-[10%]">
        <div class="benefit flex flex-row  justify-center items-center gap-3 ">
            <div class="benefit-card">
                <UIcon name="i-ic-outline-speed" class="bg-[#2878FF] size-9 " />
            </div>
            <h3 class="text-lg font-bold">Szybka obsługa</h3>
        </div>
        <div class="benefit flex flex-row  justify-center items-center gap-3">
            <div class="benefit-card">
                <UIcon name="i-material-symbols-swipe-up-outline-rounded" class="bg-[#2878FF] size-9 "/>
            </div>
            <h3 class="text-lg font-bold">Łatwe w użyciu</h3>
        </div>
        <div class="benefit flex flex-row  justify-center items-center gap-3">
            <div class="benefit-card">
                <UIcon name="i-ph-number-circle-one-fill" class="bg-[#2878FF] size-9 " />
            </div>
            <h3 class="text-lg font-bold">Jedno miejsce</h3>
        </div>
    </div>


</template>

<script setup lang="ts">

    const scrollDown = () =>{
        const targetElement = document.querySelector('#promo-section'); // Zastąp 'targetElement' ID elementu, do którego chcesz przewinąć stronę
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' }); // Przewijaj do elementu z efektem płynnego przewijania
        }
    }

</script>


<style scoped>

    body{
        width: 100%;
        margin: 0;
        padding: 0;
    }

    

</style>