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
                <UButton label="Dowiedz się więcej" class="bg-[#2878FF] text-lg text-[#f1f6ff] font-bold px-6 py-2 hover:bg-[#2060cc]"/>
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

    <div id="list-benefits" class="flex flex-row gap-[7%] justify-center align-middle w-1/2 ml-[10%]">
        <div class="benefit flex flex-row  justify-center items-center gap-3">
            <div class="benefit-card">
                <UIcon name="i-ic-round-insert-chart" class="bg-[#2878FF] size-9 " />
            </div>
            <h3 class="text-base font-bold w-fit">Twoje sportowe statystyki</h3>
        </div>
        <div class="benefit flex flex-row  justify-center items-center gap-3">
            <div class="benefit-card">
                <UIcon name="i-ph-box-arrow-down-fill" class="bg-[#2878FF] size-9 "/>
            </div>
            <h3 class="text-base font-bold">Wszystkie dokumenty w jednym miejscu</h3>
        </div>
        <div class="benefit flex flex-row  justify-center items-center gap-3">
            <div class="benefit-card">
                <UIcon name="i-ic-baseline-add-chart" class="bg-[#2878FF] size-9 " />
            </div>
            <h3 class="text-base font-bold">Śledź swoje postępy!</h3>
        </div>
    </div>
    

    <div id="pricing-section" class="flex flex-col align-middle justify-center py-32 mx-[10%]  ">
        <h3 class="mb-7 text-4xl font-bold text-center">Cennik Karnetów</h3>
        <p class="text-center">Wielu naszych klientów podzieliło się pozytywną opinią o naszych usługach</p>
        <div id="price-list" class="flex flex-row gap-12 my-7">
            <UCard >
                <template #header>
                  <Placeholder class="h-8" />
                  <h4 class="text-xl font-bold">Karnet 1 Miesiąc - STUDENT</h4>
                </template>
                <Placeholder class="h-32" />
                <p> <span class="text-6xl font-bold">79</span> /miesiąc</p>
                <div class="list-pass mx-auto mt-7 pl-7" >
                    <ul class="list-disc" >
                        <li>dostęp do klubu w godzinach otwarcia</li>
                        <li>30 dni ważności</li>
                        <li>panel użytkownika online</li>
                        <li>konsultacja trenerska</li>
                        <li>dostęp do zajęć</li>
                        <li>udogodnienia klubowe</li>
                    </ul>
                </div>
                <template #footer>
                  <div class="flex flex-column justify-center">
                    <UButton label="Wybierz ten plan" class="bg-[#f1f6ff] text-lg text-[#2878FF] font-bold px-6 py-2 hover:bg-[#bed5ff]" />
                  </div>
                </template>
            </UCard>
            <UCard >
                <template #header>
                  <Placeholder class="h-8" />
                  <h4 class="text-xl font-bold">Karnet 1 Miesiąc - Normalny</h4>
                </template>
                <Placeholder class="h-32" />
                <p> <span class="text-6xl font-bold">85</span> /miesiąc</p>
                <div class="list-pass mx-auto mt-7 pl-7" >
                    <ul class="list-disc" >
                        <li>dostęp do klubu w godzinach otwarcia</li>
                        <li>30 dni ważności</li>
                        <li>panel użytkownika online</li>
                        <li>konsultacja trenerska</li>
                        <li>dostęp do zajęć</li>
                        <li>udogodnienia klubowe</li>
                    </ul>
                </div>
                <template #footer>
                  <div class="flex flex-column justify-center">
                    <UButton label="Wybierz ten plan" class="bg-[#f1f6ff] text-lg text-[#2878FF] font-bold px-6 py-2 hover:bg-[#bed5ff]" />
                  </div>
                </template>
            </UCard><UCard >
                <template #header>
                  <Placeholder class="h-8" />
                  <h4 class="text-xl font-bold">Karnet 12 Miesięcy - STUDENT</h4>
                </template>
                <Placeholder class="h-32" />
                <p> <span class="text-6xl font-bold">70</span> /miesiąc</p>
                <div class="list-pass mx-auto mt-7 pl-7" >
                    <ul class="list-disc" >
                        <li>dostęp do klubu w godzinach otwarcia</li>
                        <li>365 dni ważności</li>
                        <li>panel użytkownika online</li>
                        <li>konsultacja trenerska</li>
                        <li>dostęp do zajęć</li>
                        <li>udogodnienia klubowe</li>
                    </ul>
                </div>
                <template #footer>
                  <div class="flex flex-column justify-center">
                    <UButton label="Wybierz ten plan" class="bg-[#f1f6ff] text-lg text-[#2878FF] font-bold px-6 py-2 hover:bg-[#bed5ff]" />
                  </div>
                </template>
            </UCard><UCard >
                <template #header>
                  <Placeholder class="h-8" />
                  <h4 class="text-xl font-bold">Karnet 12 Miesięcy - Normalny</h4>
                </template>
                <Placeholder class="h-32" />
                <p> <span class="text-6xl font-bold">75</span> /miesiąc</p>
                <div class="list-pass mx-auto mt-7 pl-7" >
                    <ul class="list-disc" >
                        <li>dostęp do klubu w godzinach otwarcia</li>
                        <li>365 dni ważności</li>
                        <li>panel użytkownika online</li>
                        <li>konsultacja trenerska</li>
                        <li>dostęp do zajęć</li>
                        <li>udogodnienia klubowe</li>
                    </ul>
                </div>
                <template #footer>
                  <div class="flex flex-column justify-center">
                    <UButton label="Wybierz ten plan" class="bg-[#f1f6ff] text-lg text-[#2878FF] font-bold px-6 py-2 hover:bg-[#bed5ff]" />
                  </div>
                </template>
            </UCard>
        </div>
    </div>

    <div id="opinions" class="relative pb-32">
        <h3 class="mb-7 text-4xl font-bold text-center">Sprawdź co o nas mówią!</h3>
        <p class="text-center">Wielu naszych klientów podzieliło się pozytywną opinią o naszych usługach</p>
        <img class="absolute right-40 -top-20 -z-50" src="/public/images/home-opinions/apostrof-left.svg" alt="">
        <img class="absolute left-40 top-10 -z-50" src="/public/images/home-opinions/apostrof-right.svg" alt="">
        <div id="opinion-box" class="flex flex-row gap-[7%] justify-between mt-10 w-[80%] mx-auto">
            <UCard class="w-[30%] mt-12">
                <template #header>
                <Placeholder class="h-8" />
                <img src="/public/images/home-opinions/person1.png" alt="">
                </template>
            
                <Placeholder class="h-32" />
                <p>To miejsce zmieniło moje podejście do treningu. Wcześniej bałem się siłowni, ale tutaj czuję się komfortowo i doceniany. Trenerzy są profesjonalni i zawsze chętni do udzielenia pomocy. </p>
                <template #footer>
                <Placeholder class="h-8" />
                <p>--- Jan Kowalski</p>
                </template>
            </UCard>
            <UCard class="w-[30%] mb-12">
                <template #header>
                <Placeholder class="h-8" />
                <img src="/public/images/home-opinions/person2.png" alt="">
                </template>
            
                <Placeholder class="h-32" />
                <p>Jestem zachwycony tą siłownią! Sprzęt jest nowoczesny, sale są czyste, a trenerzy naprawdę zaangażowani w pomoc swoim podopiecznym. </p>
                <template #footer>
                <Placeholder class="h-8" />
                <p>--- Max Verstappen</p>
                </template>
            </UCard>
            <UCard class="w-[30%] mt-12">
                <template #header>
                <Placeholder class="h-8" />
                <img src="/public/images/home-opinions/person3.png" alt="">
                </template>
            
                <Placeholder class="h-32" />
                <p>Siłownia, która przekracza moje oczekiwania! Bardzo miło zaskoczyła mnie atmosfera - panuje tutaj przyjazna rywalizacja i wzajemne wsparcie. </p>
                <template #footer>
                <Placeholder class="h-8" />
                <p>--- Magdalena Maria Monika</p>
                </template>
            </UCard>
        </div>
    </div>

    <div id="history" class="relative flex flex-col justify-center align-middle gap-6 mt-6 pb-20">
        <img class="absolute z-0 -top-28 right-32" src="/public/images/home-history/avocado.svg" alt="">
        <img class="absolute z-0 -top-20 left-56" src="/public/images/home-history/avocado-left.svg" alt="">
        <img class="absolute z-0 top-20 left-1/3" src="/public/images/home-history/avocado-left.svg" alt="">
        <img class="absolute z-0 bottom-8 right-40" src="/public/images/home-history/avocado-left.svg" alt="">

        <UButton label="Zmień swoje życie, zacznij od siłowni!" class="z-10 bg-[#f1f6ff] text-lg text-[#2878FF] font-bold px-6 py-2 hover:bg-[#bed5ff] w-fit mx-auto" />
        <h3 class="z-10 mb-3 text-4xl font-bold text-center">Historie naszych podopiecznych</h3>
        <p class="z-10 text-center w-3/5 mx-auto">Dołącz do naszej społeczności i poczuj motywację, która pobudzi Cię do działania każdego dnia. Razem osiągniemy więcej niż kiedykolwiek moglibyśmy osiągnąć sami. </p>
        <div class="z-10 single-story flex flex-row justify-center w-2/3 mx-auto shadow-2xl rounded-[30px] overflow-hidden">
            <div class="col1 w-1/2 z-10">
                <img src="/public/images/home-history/image 32.png" alt="">
            </div>
            <div class="col2 w-1/2 flex flex-col justify-center gap-10 pl-9 pr-20 z-10 bg-white">
                <h5 class="font-bold text-gray-500 text-3xl z-10">--Kamil</h5>
                <p class="leading-relaxed z-10">Nasze środowisko motywacyjne, nowoczesne sprzęty treningowe i spersonalizowane podejście sprawiły, że nasz podopieczny przekroczył swoje własne oczekiwania i osiągnął cele, o których wcześniej tylko marzył. Jego historia jest dowodem na to, że siłownia to nie tylko miejsce do pracy nad ciałem, ale także platforma do osobistego rozwoju i przekraczania własnych granic.</p>
            </div>
        </div>
    </div>

    <footer-web/>
    

    




</template>

<script setup lang="ts">

    const scrollDown = () =>{
        const targetElement = document.querySelector('#promo-section'); 
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' }); 
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