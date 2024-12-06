<script lang="ts" setup>

const groupClassesStore = useGroupClassesStore()

onMounted(() => {
  groupClassesStore.getGroupClassesHistorical()
  groupClassesStore.getGroupClassesUpcoming()
})

const getClasses = () => {
  groupClassesStore.getGroupClassesHistorical()
  groupClassesStore.getGroupClassesUpcoming()
}


</script>

<template>
<div class="grid grid-cols-1 p-8 mx-auto gap-8">
    <h1>Test Page</h1>
    <UButton @click="getClasses">Get Classes - refresh</UButton>

    <div>
        <h2>Historical Classes - https://pbgym.onrender.com/groupClasses/historical</h2>
        <div v-for="groupClass in groupClassesStore.groupClassesHistorical" :key="groupClass.id">
            <p class="py-1 border-2 border-black">{{ groupClass }}</p>
        </div>
    </div>

    <div>
        <h2>Upcoming Classes - https://pbgym.onrender.com/groupClasses/upcoming</h2>
        <div v-for="groupClass in groupClassesStore.groupClassesUpcoming" :key="groupClass.id">
            <p class="py-1 border-2 border-black">{{ groupClass }}</p>
        </div>
    </div>
</div>
    


</template>