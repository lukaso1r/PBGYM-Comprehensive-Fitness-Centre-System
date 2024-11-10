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
        slot: 'checkoffer',
        color: 'cyan',
        class: 'py-4 hover:bg-cyan-100'
    },
    {
        label: 'Dokumenty *WIP*',
        icon: 'i-ic-round-collections-bookmark',
        defaultOpen: false,
        slot: 'checkoffer',
        color: 'red',
        variant: 'soft',
        class: 'py-4 hover:bg-red-100'
    }
]

const instructions = [
    {
        label: 'Instrukcje *WIP*',
        icon: 'i-ic-baseline-integration-instructions',
        defaultOpen: false,
        slot: 'insctruction',
        color:'purple',
        variant: 'soft',
        content: 'Lorem ipsum dolor sit amet',
        class: 'py-4 hover:bg-purple-100 '
        
    },
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
                <!-- TODO: change text color to black -->
                <UAccordion :items="items" size="sm" >
                    <template #checkoffer >
                        <NuxtLink to="/twoj-profil/oferty" >
                            <p class="hover:text-blue-500 hover:text-base transit pl-9">Sprawdź ofertę!</p>
                        </NuxtLink>
                    </template>
                </UAccordion>  
                <hr/>
                <UAccordion :items="instructions" color="primary"
                    variant="soft"
                    size="sm"
                    class="my-2"
                    >
                    <template #insctruction>
                        <div>
                            <p>Tu instrukcje</p>

                        </div>
                    </template>
                </UAccordion>  
                
            </div>
            
            
            

        </div>
    </nav>

</template>


<style scoped>
    /*TODO: Due to delays, some of the code was written in plain CSS rather than using correct Tailwind practices.  It gonna be changed later*/
    
  
</style>