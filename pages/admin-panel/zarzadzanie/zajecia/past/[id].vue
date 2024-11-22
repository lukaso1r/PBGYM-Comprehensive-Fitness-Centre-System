<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import type { 
    GroupClassWithTrainer, EditableGroupClassData
} from '~/types'; 

const { createGroupClassWithTrainerObject } = useObjectFactory();

const route = useRoute();
const router = useRouter();

const groupClassesStore = useGroupClassesStore();
const trainerStore = useTrainerStore();

const toast = useToast();
const showEditGroupClassesModal = ref(false);
const id = ref(route.params.id);
const groupClassById = useState<GroupClassWithTrainer>(() => createGroupClassWithTrainerObject())

const date = ref<Date>(new Date (groupClassesStore.editableGroupClass.date));
const flow = ref<("year" | "month" | "calendar" | "time" | "minutes" | "hours" | "seconds")[]>([ "month", "calendar", "time"]);
const maxDate = ref(nextYearDate.value)
const dateFormatForPicker = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${year}-${month < 10 ? `0 ${month}` : month}-${day < 10 ? `0 ${day}` : day} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}

watch(date, (newValue) => {
    console.log('data przed iso', newValue);
    const offset = newValue.getTimezoneOffset() * 60000;
    groupClassesStore.editableGroupClass.date = new Date(newValue.getTime() - offset).toISOString().slice(0, -1);
    console.log('data po iso', groupClassesStore.editableGroupClass.date);

});

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
    await groupClassesStore.getGroupClassesMembers(groupClassById.value.id);
    console.log('groupClassById', groupClassById, "id", id.value)
})

const toggleEditGroupClasses = () => {
    showEditGroupClassesModal.value = !showEditGroupClassesModal.value;
    if(showEditGroupClassesModal.value) {
        groupClassesStore.editableGroupClass = {
            id: groupClassById.value.id,
            title: groupClassById.value.title,
            date: groupClassById.value.date,
            durationInMinutes: groupClassById.value.durationInMinutes,
            memberLimit: groupClassById.value.memberLimit,
            trainerEmail: groupClassById.value.trainer.email
        };
        trainerStore.getAllTrainers();
    }
}

const onSubmitEditClasses = async () => {
    const status = await groupClassesStore.putUpdateGroupClass();
    if(status) toggleEditGroupClasses();
}


</script>

<template>

<WorkerComponentsHeaderWorker />
<div class="flex flex-row bg-[#F5F7F8] items-start pb-10 min-h-screen">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>
    <main class="mt-4 flex flex-col flex-wrap items-start justify-start gap-8">
        <div class="members-panel-title w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Panel zarządzania zajęciami</h1>
            <p class="text-slate-500">Możesz z tego miejsca wyświetlić szczegóły dotyczące zajęć i edytować jej parametry</p>
        </div>

        <div class="group-class-details p-8 bg-white rounded-lg grid grid-cols-2 justify-center items-center lg:max-w-[79vw] lg:min-w-[79vw]" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="col-span-2 text-2xl font-bold text-center mb-4 bg-slate-200 py-2 shadow rounded border-2 border-gray-400">Zajęcia Archiwalne</h1>
            <div class="pr-8 flex flex-col gap-2">
                <div class="flex flex-row justify-start items-center col-span-2">
                    <h2 class="text-lg font-semibold pr-8">Szczegóły zajęć</h2>
                    <UButton label="Edytuj" @click="toggleEditGroupClasses()" color="blue" icon="i-material-symbols-edit" variant="ghost"/>
                </div>
                <div v-if="groupClassById.id!=0">
                    <p><strong>ID:</strong> {{ groupClassById.id }}</p>
                    <p><strong>Nazwa:</strong> {{ groupClassById.title }}</p>
                    <p><strong>Trener:</strong> {{ groupClassById.trainer.name }}</p>
                    <p><strong>Data:</strong> {{ dateWithTimeString(new Date(groupClassById.date)) }}</p>
                    <p><strong>Czas trwania:</strong> {{ groupClassById.durationInMinutes }} minut</p>
                    <p><strong>Limit uczestników:</strong> {{ groupClassById.memberLimit }}</p>
                    <p><strong>Liczba uczestników:</strong> {{ groupClassById.currentMemberCount }}</p>
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
                <div v-if="groupClassById.id!=0" class="trainer-details mt-4">
                    <div class="flex flex-row justify-start items-center col-span-2">
                        <h2 class="text-lg font-semibold pr-8">Szczegóły trenera</h2>
                        <UButton label="Przejdź do profilu trenera" :to="`/admin-panel/zarzadzanie/trenerzy/${groupClassById.trainer.email}`" color="blue" icon="i-material-symbols-person" variant="ghost"/>
                    </div>
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
            <CallendarComponentsGroupClassesCalendarForAdmin :groupClassesUpcoming="[]" :groupClassesHistory="[]" :singleClass="groupClassById"/>
        </div>

        <div class="members-panel-title w-max lg:max-w-[79vw] lg:min-w-[79vw] flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Zapisani klienci</h1>
            <p class="text-slate-500">Lista zapisanych klientów na zajęcia **WIP**</p>
        </div>

        <WorkerComponentsGroupClassesEnroledMembersList :groupClass="groupClassesStore.groupClassesMembers" />

    </main>
</div>

<UModal 
    :model-value="showEditGroupClassesModal"
    :closable="true"
    @close="toggleEditGroupClasses()"
    :ui="{}"
>
<UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
    <template #header>
        <h3 class="font-bold text-lg">Formularz edycji zajęć</h3>
    </template>
    <div class="w-full">
        <div class="addNewGroupClasses flex flex-col rounded-lg px-4 bg-white w-full">
            <h3 class="[word-spacing:4px] font-medium pb-4">Użyj poniższego formularza aby edytować zajęcia grupowe.</h3>
            <UForm class="grid grid-cols-2 gap-4 justify-start" :state="groupClassesStore.editableGroupClass" :validate="validateGroupClassData"  @submit="onSubmitEditClasses">
                <UFormGroup class="col-span-2" label="Tytuł zajęć" name="title" required>
                    <UInput v-model="groupClassesStore.editableGroupClass.title" type="string" placeholder="Tytuł zajęć" :value="groupClassesStore.editableGroupClass.title"  />
                </UFormGroup>
                <UFormGroup class="col-span-2" label="Data zajęć" name="date" required>
                    <VueDatePicker v-model="groupClassesStore.editableGroupClass.date" 
                        :max-date="maxDate" 
                        :min-date="new Date()"
                        :start-date="new Date()" 
                        :year-range="[new Date().getFullYear(), nextYearDate.getFullYear()]" 
                        prevent-min-max-navigation 
                        :enable-time-picker="true" 
                        :flow="flow" 
                        hide-offset-dates
                        locale="pl" 
                        cancelText="anuluj" 
                        selectText="potwierdź" 
                        :format="dateFormatForPicker"
                    />
                </UFormGroup>
                <UFormGroup class="col-span-2" label="Czas trwania zajęć" name="durationInMinutes" required>
                    <UInput v-model="groupClassesStore.editableGroupClass.durationInMinutes" type="number" placeholder="Czas trwania zajęć" :value="groupClassesStore.editableGroupClass.durationInMinutes"  />
                </UFormGroup>
                <UFormGroup class="col-span-2" label="Limit uczestników" name="memberLimit" required>
                    <UInput v-model="groupClassesStore.editableGroupClass.memberLimit" type="number" placeholder="Limit uczestników" :value="groupClassesStore.editableGroupClass.memberLimit"  />
                </UFormGroup>
                <UFormGroup class="col-span-2" label="Trener" name="trainerEmail" required>
                    <USelect v-model="groupClassesStore.editableGroupClass.trainerEmail" :options="trainerStore.allTrainers.map((trainer) => trainer.email)" placeholder="Wybierz trenera" />
                </UFormGroup>

                <UButton type="submit" label="Zapisz zmiany" color="blue" class="flex flex-row justify-center w-fit" />
            </UForm>
        </div>
    </div>
    <template #footer>
        <div class="flex flex-row justify-end gap-5">
            <UButton label="Anuluj" @click="toggleEditGroupClasses()" color="gray" icon="i-material-symbols-cancel" />
        </div>
    </template> 
</UCard>
</UModal>


</template>

<style scoped>


</style>