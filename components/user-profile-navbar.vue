<script setup lang="ts">

const items = [
    {
        label: 'Sprawdź ofertę',
        icon: 'i-ic-round-local-offer',
        defaultOpen: false,
        slot: 'checkoffer',
    },
    {
        label: 'Zajęcia',
        icon: 'i-ic-outline-sports-kabaddi',
        defaultOpen: false,
        slot: 'checkoffer',
    },
    {
        label: 'Trenerzy',
        icon: 'i-ic-baseline-emoji-people',
        defaultOpen: false,
        slot: 'checkoffer',
    },
    {
        label: 'Dokumenty',
        icon: 'i-ic-round-collections-bookmark',
        defaultOpen: false,
        slot: 'checkoffer',
    }
]

const instructions = [
    {
        label: 'Instrukcje',
        icon: 'i-ic-baseline-integration-instructions',
        defaultOpen: false,
        slot: 'insctruction'
    }
]

</script>

<template>

    <nav class="px-6 -mt-[5%]">
        <div class="bg-white px-4 rounded-2xl">
            <NuxtLink to="/twoj-profil"><img class="max-w-full" src="/images/logo-blue.svg"/></NuxtLink>
            <hr/>
            <UButton
                class="bg-[#203983] hover:bg-[#617F9B]"
                to="/twoj-profil"
                icon="i-ic-sharp-home"
            >
                Kokpit
            </UButton>
            <UAccordion :items="items" color="white">
                <template #checkoffer >
                    <div>
                        <p>Sprawdź ofertę!</p>

                    </div>
                </template>
            </UAccordion>  
            <hr/>
            <UAccordion :items="instructions" color="white">
                <template #insctruction>
                    <div>
                        <p>Tu instrukcje</p>

                    </div>
                </template>
            </UAccordion>  
            

        </div>
    </nav>

</template>


<style scoped>
    
</style>