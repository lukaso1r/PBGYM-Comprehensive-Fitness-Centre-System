<script setup lang="ts">

const items = [
    {
        label: 'Sprawdź ofertę',
        icon: 'i-ic-round-local-offer',
        defaultOpen: false,
        slot: 'checkoffer',
        color: 'orange',
        class: 'py-4 hover:bg-orange-100'        
    },
    {
        label: 'Zajęcia *WIP*',
        icon: 'i-ic-outline-sports-kabaddi',
        defaultOpen: false,
        slot: 'checkGroupClasses',
        color: 'cyan',
        class: 'py-4 hover:bg-cyan-100'
    },
    {
        label: 'Trenerzy',
        icon: 'i-ic-baseline-emoji-people',
        defaultOpen: false,
        slot: 'checkoffer',
        color: 'green',
        class: 'py-4 hover:bg-green-100',
        to: '/twoj-profil/zajecia'
    },
    {
        label: 'Twoje statystyki',
        icon: 'i-ic-round-collections-bookmark',
        defaultOpen: false,
        slot: 'yourStats',
        color: 'red',
        variant: 'soft',
        class: 'py-4 hover:bg-red-100'
    }
]



</script>

<template>

    <nav class="px-6 -mt-[5%]">
        <div class="bg-white px-4 py-4 rounded-2xl flex flex-col gap-y-3 ">
            <NuxtLink to="/"><img class="max-w-[80%] my-0 mx-auto " src="/images/logo-blue.svg"/></NuxtLink>
            <hr/>
            <div class="navigationContainer flex flex-col gap-y-0">
                <UButton  class="w-full py-4 " to="/twoj-profil" icon="i-ic-sharp-home" variant="ghost" color="blue">
                    Kokpit
                </UButton>
                <UButton  class="w-full py-4 " to="/twoj-profil/oferty" icon="i-ic-round-local-offer" variant="ghost" color="orange">
                    Oferta karnetów
                </UButton>
                <UButton  class="w-full py-4 " to="/twoj-profil/zajecia" icon="i-ic-outline-sports-kabaddi" variant="ghost" color="cyan">
                    Zajęcia grupowe
                </UButton>
                <UButton  class="w-full py-4 " to="/twoj-profil/trenerzy" icon="i-ic-baseline-emoji-people" variant="ghost" color="green">
                    Trenerzy personalni
                </UButton>
                <UButton  class="w-full py-4 " to="/twoj-profil/statystyki" icon="i-material-symbols-query-stats" variant="ghost" color="red">
                    Twoje statystyki
                </UButton>
               
                 
                
            </div>
            
            
            

        </div>
    </nav>

</template>


<style scoped>
    /*TODO: Due to delays, some of the code was written in plain CSS rather than using correct Tailwind practices.  It gonna be changed later*/
    
  
</style>