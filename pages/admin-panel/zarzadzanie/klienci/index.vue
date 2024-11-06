<script lang="ts" setup>

</script>

<template>
    <workerComponents-header-worker></workerComponents-header-worker>

    <div class="flex flex-row bg-[#F5F7F8] items-start pb-10 min-h-screen">
      <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>

        <main class="basis-4/5 mt-4 flex flex-row flex-wrap items-start justify-start gap-8">
            <div class="members-panel-title w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <h1 class="text-xl font-semibold">Panel zarządzania klientami</h1>
                <p class="text-slate-500">Możesz z tego miejsca przeglądać i zarządzać klientami zarejestrowanymi w systemie.</p>
            </div>

            <WorkerComponentsMemberList />
            

            
        </main>

    </div>
</template>

<style scoped>

</style>