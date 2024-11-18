<script lang="ts" setup>

import type {  } from '~/types';

const trainerStore = useTrainerStore();
const loginStore = useLoginStore();


</script>

<template>

<HeaderTrainerProfile />
<div class="flex flex-row bg-[#F5F7F8] items-start pb-10 min-h-screen">
    <Trainer-navbar class="basis-1/5 max-w-[350px]  px-6" />
    <main class="basis-4/5 mt-4 flex flex-col flex-wrap items-start justify-start gap-8">
        
        <div class="offer flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start  gap-4" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <span class="font-semibold text-lg">Oferty trenera</span>
            <div class="flex flex-row gap-5 align-middle justify-start items-center">
                <UButton 
                    icon="i-ic-baseline-manage-search"
                    size="sm"
                    color="blue"
                    variant="solid"
                    label="Dodaj zajęcia"
                    :trailing="false"
                    to="/trainer/zajecia/dodaj"
                />
            </div>
        </div>

        
    </main>
</div>



</template>

<style scoped>


</style>