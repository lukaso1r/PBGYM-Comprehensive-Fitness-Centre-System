<script setup lang="ts">

import type { 
    GroupClassWithTrainer, EditableGroupClassData
} from '~/types'; 

const { createGroupClassWithTrainerObject } = useObjectFactory();
const route = useRoute();
const router = useRouter();
const groupClassesStore = useGroupClassesStore();
const toast = useToast();


const id = ref(route.params.id);
const groupClassById = useState<GroupClassWithTrainer>(() => createGroupClassWithTrainerObject())



onMounted(async () => {
    await groupClassesStore.getGroupClassesUpcoming();
    groupClassById.value = groupClassesStore.groupClassesUpcoming.find((groupClass) => groupClass.id === Number(id.value)) || createGroupClassWithTrainerObject();
    if (!groupClassById.value.id) {
        await groupClassesStore.getGroupClassesHistorical();
        groupClassById.value = groupClassesStore.groupClassesHistorical.find((groupClass) => groupClass.id === Number(id.value)) || createGroupClassWithTrainerObject();
        if (groupClassById.value.id) {
            router.push(`/admin-panel/zarzadzanie/zajecia/past/${id.value}`);
            toast.add({title:'Zajęcia już się odbyły', description: 'Zajęcia o podanym id już się odbyły'});
        }else{
            toast.add({title:'Brak zajęć', description: 'Nie znaleziono zajęć o podanym id'});
        }
    }
    console.log('groupClassById', groupClassById, "id", id.value)
})




</script>

<template>

<WorkerComponentsHeaderWorker />
<div class="flex flex-row bg-[#F5F7F8] items-start pb-10 min-h-screen">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>
    <main class="basis-4/5 mt-4 flex flex-col flex-wrap items-start justify-start gap-8">
        
        <div class="members-panel-title w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Panel zarządzania zajęciami</h1>
            <p class="text-slate-500">Możesz z tego miejsca przeglądać i zarządzać zajęciami.</p>
        </div>
        
            <div class="group-class-details p-4 bg-white rounded-lg shadow-md">
                <h2 class="text-lg font-semibold mb-2">Szczegóły zajęć</h2>
                <div v-if="groupClassById.id!=0">
                    <p><strong>ID:</strong> {{ groupClassById.id }}</p>
                    <p><strong>Nazwa:</strong> {{ groupClassById.title }}</p>
                    <p><strong>Trener:</strong> {{ groupClassById.trainer.name }}</p>
                    <p><strong>Data:</strong> {{ groupClassById.date }}</p>
                </div>
                <div v-else>
                    
                    <USkeleton type="text" class="h-6 w-1/4 mb-2" />
                    <USkeleton type="text" class="h-4 w-1/2 mb-2" />
                    <USkeleton type="text" class="h-4 w-1/3 mb-2" />
                    <USkeleton type="text" class="h-4 w-1/4 mb-2" />
                    <USkeleton type="text" class="h-4 w-1/2 mb-2" />
                    <USkeleton type="text" class="h-4 w-1/3 mb-2" />
                    <USkeleton type="text" class="h-4 w-1/4 mb-2" />
                    <USkeleton type="text" class="h-4 w-1/2 mb-2" />
                </div>
    
                <div class="trainer-details p-4 bg-white rounded-lg shadow-md mt-4">
                    <h2 class="text-lg font-semibold mb-2">Szczegóły trenera</h2>
                    <p><strong>ID:</strong> {{ groupClassById.trainer.id }}</p>
                    <p><strong>Email:</strong> {{ groupClassById.trainer.email }}</p>
                    <p><strong>Imię:</strong> {{ groupClassById.trainer.name }}</p>
                    <p><strong>Nazwisko:</strong> {{ groupClassById.trainer.surname }}</p>
                    <p><strong>Telefon:</strong> {{ groupClassById.trainer.phoneNumber }}</p>
                    <p><strong>Opis:</strong> {{ groupClassById.trainer.description }}</p>
                    <p><strong>Płeć:</strong> {{ groupClassById.trainer.gender  }}</p>
                    <p><strong>Tagi trenera:</strong> {{ groupClassById.trainer.trainerTags.join(', ') }}</p>
                </div>
        </div>
        
        
    </main>
</div>



</template>

<style scoped>


</style>