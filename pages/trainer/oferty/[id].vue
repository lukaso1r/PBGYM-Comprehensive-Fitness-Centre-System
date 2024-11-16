<script lang="ts" setup>

import type { TrainerOffer } from '~/types';

const route = useRoute();
const trainerStore = useTrainerStore();
const loginStore = useLoginStore();

const offerDataById = ref<TrainerOffer>({} as TrainerOffer)
const showDeleteOfferModal = ref(false)

onMounted(async () => {
    await trainerStore.getTrainerOfferByEmail(loginStore.loggedTrainerData.email);
    offerDataById.value = trainerStore.trainerOffersByEmail.find((offer: TrainerOffer) => offer.id == route.params.id as unknown as number) || {} as TrainerOffer
})

const submitOfferChane = async () => {
    await trainerStore.putUpdateTrainerOffer(offerDataById.value, loginStore.loggedTrainerData.email);
}

const deleteTrainerOffer = async () => {
    console.log('deleteTrainerOffer', offerDataById.value.id)
    await trainerStore.deleteTrainerOffer(loginStore.loggedTrainerData.email, offerDataById.value.id as unknown as number);
}

const toggleShowDeleteOfferModal = () => {
    showDeleteOfferModal.value = !showDeleteOfferModal.value
}
</script>

<template>

<HeaderTrainerProfile />

<div class="flex flex-row bg-[#F5F7F8] items-start pb-10 min-h-screen">
    <Trainer-navbar class="basis-1/5 max-w-[350px]  px-6" />
    <main class="basis-4/5 mt-4 flex flex-col flex-wrap items-start justify-start gap-8">
        <div class="members-panel-title w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold"><span class="font-medium pr-2">Oferta:</span> {{offerDataById.title}} </h1>
            <p class="text-slate-500">Możesz z tego miejsca przeglądać szczegóły i zarządzać wykonywaną usługą.</p>
        </div>

        <div class="flex flex-row flex-wrap gap-8" >
            <div class="flex flex-row flex-nowrap gap-8 items-start">
                <div class="total-entrance-amount flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start basis-3/5 gap-4" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <span class="font-semibold text-lg">Tu będą wykresy ***TODO***</span>
                <img src="/images/twoj-profil/chart.jpg" alt="" srcset="">
                <p>Chyba stąd: <a href="ui.shadcn.com/charts" class="text-blue-800">ui.shadcn.com/charts</a></p>
                </div>
        
                <div class="total-entrance-amount flex flex-col rounded-lg p-4 gap-4 basis-2/5 bg-white justify-end bg-cover bg-right-bottom " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <span class="font-semibold text-lg">Tu będą diagramy ***TODO***</span>
                    <img src="/images/worker/diagram.jpg" alt="" srcset="">
                </div>  
            </div>
        </div>

        <div class="changeOfferDataContainer flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2 col-span-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <span class="font-semibold text-lg">Zmiana danych oferty</span>
            <p class="text-slate-500">Użyj poniższego formularza aby zmienić dane swojej oferty</p>

             <UForm class="space-y-4 grid grid-cols-3 gap-x-6 items-end" :state="offerDataById" @submit="submitOfferChane">
                <UFormGroup label="Nazwa oferty" required>
                    <UInput v-model="offerDataById.title" type="text" placeholder="Nazwa oferty" />
                </UFormGroup>

                <UFormGroup label="Cena oferty" required>
                    <UInput v-model="offerDataById.price" placeholder="Cena oferty" type="number" />
                </UFormGroup>

                <UFormGroup label="Ilość spotkań" required>
                    <UInput v-model="offerDataById.trainingSessionCount" placeholder="Ilość spotkań" type="number" />
                </UFormGroup>

                <UFormGroup label="Długość jednego spotkania w minutach" required>
                    <UInput v-model="offerDataById.trainingSessionDurationInMinutes" placeholder="Długość jednego spotkania w minutach" type="number" />
                </UFormGroup>

                <UFormGroup label="Widoczność oferty" required>
                    <USelect v-model="offerDataById.visible" :options="[{label: 'Aktywna', value: true}, {label: 'Nieaktywna', value: false}]"/>
                </UFormGroup>

                <UButton type="submit"
                    color="blue"
                    class="bg-[#203983] hover:bg-[#617F9B] mx-auto px-5"
                >
                    Zmień ustawienia oferty
                </UButton>

            </UForm>
        </div>

        <UButton class="deleteOffer" @click="toggleShowDeleteOfferModal()" icon="i-heroicons-trash-20-solid" color="red" variant="solid" label="Usuń ofertę" />
        <UModal v-model="showDeleteOfferModal">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <h3 class="font-medium text-lg">Czy na pewno chcesz usunąć ofertę:</h3>
                </template>
                <table class="table-auto">
                    <tbody>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Tytuł</td>
                            <td>{{ offerDataById.title }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Cena</td>
                            <td>{{ offerDataById.price }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Ilość spotkań</td>
                            <td>{{ offerDataById.trainingSessionCount }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Długość jednego spotkania w minutach</td>
                            <td>{{ offerDataById.trainingSessionDurationInMinutes }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pr-8 pb-2">Widoczność oferty</td>
                            <td>{{ offerDataById.visible ? 'Tak' : 'Nie' }}</td>
                        </tr>
                    </tbody>
                </table>
                <UButton @click="deleteTrainerOffer" color="red" class="mt-5 hover:bg-red-800 mx-auto px-5" icon="i-material-symbols-delete-forever">
                    Potwierdzam usunięcie oferty
                </UButton>
                <template #footer >
                    <div class="flex flex-row justify-end">
                        <UButton label="Zamknij" @click="showDeleteOfferModal = false" color="blue" icon="i-material-symbols-cancel"/>
                    </div>
                </template>
            </UCard>
        </UModal>
    </main>
</div>



</template>
<style scoped>

</style>