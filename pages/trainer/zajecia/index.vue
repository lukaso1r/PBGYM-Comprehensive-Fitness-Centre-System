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
        
        <div class="trainer-card-info">
            
            <h1>Zajęcia</h1>
            <p>W tym miejscu możesz zarządzać swoimi zajęciami</p>
            <div class="flex flex-row gap-5 align-middle justify-start items-center">
                <UButton 
                    icon="i-ic-baseline-manage-search"
                    size="sm"
                    color="blue"
                    variant="ghost"
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