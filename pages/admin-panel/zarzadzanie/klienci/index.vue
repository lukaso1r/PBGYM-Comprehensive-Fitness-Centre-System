<script lang="ts" setup>

const showAddNewMemberByWorkerModal = ref(false)

</script>

<template>
    <workerComponents-header-worker></workerComponents-header-worker>

    <div class="flex flex-row bg-[#F5F7F8] items-start pb-10 min-h-screen">
      <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>
 
        <main  v-if="checkPermission(['MEMBER_MANAGEMENT'])"  class="basis-4/5 mt-4 flex flex-row flex-wrap items-start justify-start gap-8">
            <div class="members-panel-title w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <h1 class="text-xl font-semibold">Panel zarządzania klientami</h1>
                <p class="text-slate-500">Możesz z tego miejsca przeglądać i zarządzać klientami zarejestrowanymi w systemie.</p>
            </div>

            <WorkerComponentsMemberList />
            
            <UButton 
                color="blue"
                class=" hover:bg-[#617F9B] text-center"
                @click="showAddNewMemberByWorkerModal = true"
            >   
                Dodaj klienta
            </UButton>
            <WorkerComponentsAddNewMemberByWorkerModal v-model:showAddNewMemberByWorkerModal="showAddNewMemberByWorkerModal"/>
            
        </main>
        <div v-else>
            <p class="text-red-500">Brak uprawnień do przeglądania tej strony</p>
        </div>

    </div>
</template>

<style scoped>

</style>