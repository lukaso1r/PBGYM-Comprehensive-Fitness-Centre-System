<script setup lang="ts">

import type { Offer, LoggedWorkerData, EditableStandardOfferData } from '~/types'
import type { FormError, FormSubmitEvent } from '#ui/types'

// definePageMeta({
//   middleware: 'auth',
// });

const route = useRoute()
const router = useRouter()

const store = useOffersStore()
const offer = ref<Offer | null>(null)
const showEditOfferModal = ref(false)
const showDeleteOfferModal = ref(false)

const toast = useToast()

onMounted(async () => {
    await store.getOfferStandardAll()
    offer.value = store.offerStandardAll.find(offer => offer.id == route.params.id as unknown as number) || null;
});

//TODO: naprawić odświeżanie danych
watchEffect(() => {
    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    offer.value = store.offerStandardAll.find(offer => offer.id == route.params.id as unknown as number) || null;
});

const propertiesInput = ref('')
const previousTitle = ref('')

const newOfferData = useState<EditableStandardOfferData>(() => ({
    title: offer.value?.title || '',
    subtitle: offer.value?.subtitle || '',
    monthlyPrice: offer.value?.monthlyPrice || 0,
    entryFee: offer.value?.entryFee || 0,
    durationInMonths: offer.value?.durationInMonths || 0,
    properties: offer.value?.properties || [],
    active: offer.value?.active || false,
}));

watchEffect(() => {
  if (offer.value) {
    newOfferData.value = {
      title: offer.value.title || '',
      subtitle: offer.value.subtitle || '',
      monthlyPrice: offer.value.monthlyPrice || 0,
      entryFee: offer.value.entryFee || 0,
      durationInMonths: offer.value.durationInMonths || 0,
      properties: offer.value.properties || [],
      active: offer.value.active || false,
    };
    propertiesInput.value = offer.value.properties.join('; ');
    previousTitle.value = offer.value.title;
  }
});

const validate = (data: EditableStandardOfferData) => {
    const errors: FormError<string>[] = []

    if (!data.title) errors.push({ path: 'title', message: 'Tytuł jest wymagany' })
    if (!data.subtitle) errors.push({ path: 'subtitle', message: 'Podtytuł jest wymagany' })
    if (!data.monthlyPrice) errors.push({ path: 'monthlyPrice', message: 'Cena miesięczna jest wymagana' })
    if (!data.entryFee) errors.push({ path: 'entryFee', message: 'Opłata aktywacyjna jest wymagana' })
    if (!data.durationInMonths) errors.push({ path: 'durationInMonths', message: 'Okres trwania jest wymagany' })
    if (!propertiesInput.value || propertiesInput.value.length === 0) errors.push({ path: 'properties', message: 'Cechy oferty są wymagane' })

    return errors
}

const handlePropertiesInput = () => {
    newOfferData.value.properties = propertiesInput.value
        .split(/;|\n/)
        .map(item => item.trim())
        .filter(item => item.length > 0); 
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const updateStandardOffer = async (event: FormSubmitEvent<any>) => {
    console.log('Aktualizowanie karnetu', toRaw(event.data))
    await store.updateStandardOffer(toRaw(event.data), previousTitle.value)
}

const deleteOffer = async () => {
    console.log('Usuwanie karnetu', offer.value?.title)
    if(offer.value){
        await store.deleteOffer(offer.value.title)
        router.push('/admin-panel/sprzedaz/oferta')
        showDeleteOfferModal.value = false;
    }else{
        toast.add({title: 'Błąd usunięcia oferty, nie znaleziono tytułu'})
    } 
}

const closeModal = () => {
    showEditOfferModal.value = false;
    showDeleteOfferModal.value = false;
}

</script>

<template>
<workerComponents-header-worker></workerComponents-header-worker>
<div class="flex flex-row bg-[#F5F7F8] items-start pb-10">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>
  
    <!-- TODO: poprawić margines -->
    <main  v-if="checkPermission(['PASS_MANAGEMENT'])" class="min-h-screen content-start basis-4/5 mt-4 flex flex-row flex-wrap items-start justify-start gap-8">
        
        <div class="active-pass w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold"><span class="text-slate-500 text-base font-normal">Tytuł: </span>{{offer?.title}}</h1>
            <p class="font-semibold"><span class="text-slate-500 text-base font-normal">Podtytuł: </span>{{offer?.subtitle}}</p>
        </div>

        <div class="options w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-4  items-start" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <UButton
                icon="i-material-symbols-id-card-outline"
                size="sm"
                color="blue"
                variant="solid"
                label="Edytuj dane karnetu"
                @click="showEditOfferModal = true"
                v-show="useCookie<LoggedWorkerData>('loggedWorkerData').value.permissions.includes('PASS_MANAGEMENT') || useCookie<LoggedWorkerData>('loggedWorkerData').value.permissions.includes('ADMIN')"
            />
            <UButton
                icon="i-material-symbols-id-card-outline"
                size="sm"
                color="red"
                variant="solid"
                label="Usuń karnet"
                @click="showDeleteOfferModal = true"
                v-show="useCookie<LoggedWorkerData>('loggedWorkerData').value.permissions.includes('PASS_MANAGEMENT') || useCookie<LoggedWorkerData>('loggedWorkerData').value.permissions.includes('ADMIN')"
            />
            <UModal 
                v-model="showEditOfferModal"
                :closable="true"
                @close="closeModal"
                :ui="{ 
                base: 'min-h-[50vh] overflow-x-hidden min-w-[40vw]',
                }"
            >
                <UCard 
                    :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
                >
                    <template #header>
                        <h3 class="font-bold text-lg">Edytuj dane oferty</h3>
                    </template>

                    <UForm :state="newOfferData" :validate="validate" class="space-y-4" @submit="updateStandardOffer">  
                        <UFormGroup label="Tytuł" name="title" required>
                            <UInput v-model="newOfferData.title" label="Tytuł" placeholder="Wpisz tytuł oferty" />
                        </UFormGroup>
                        <UFormGroup label="Podtytuł" name="subtitle" required>
                            <UInput v-model="newOfferData.subtitle" label="Podtytuł" placeholder="Wpisz podtytuł oferty" />
                        </UFormGroup>
                        <UFormGroup label="Cena miesięczna" name="monthlyPrice" required>
                            <UInput v-model="newOfferData.monthlyPrice" label="Cena miesięczna" placeholder="Wpisz cenę miesięczną" >
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">PLN</span>
                                </template>
                            </UInput>
                        </UFormGroup>
                        <UFormGroup label="Opłata aktywacyjna" name="entryFee" required>
                            <UInput v-model="newOfferData.entryFee" label="Opłata aktywacyjna" placeholder="Wpisz opłatę aktywacyjną" >
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">PLN</span>
                                </template>
                            </UInput>
                        </UFormGroup>
                        <UFormGroup label="Okres trwania w miesiącach" name="durationInMonths" required>
                            <UInput v-model="newOfferData.durationInMonths" label="Okres trwania" placeholder="Wpisz okres trwania" >
                            <template #trailing>
                                <span class="text-gray-500 dark:text-gray-400 text-xs">Miesięcy</span>
                            </template>
                            </UInput>
                        </UFormGroup>
                        <UFormGroup label="Cechy oferty, maks 6 cech" name="properties" required>
                            <UTextarea 
                                v-model="propertiesInput" 
                                placeholder="Cechy oferty oddzielone enterem lub średnikiem ';' np. siłownia; basen; sauna" 
                                @update:model-value="handlePropertiesInput"
                            >
                            </UTextarea>
                        </UFormGroup>
                        <UFormGroup label="Aktywność" name="active">
                            <UCheckbox v-model="newOfferData.active" :label="newOfferData.active ? 'Aktywny' : 'Nieaktywny'" />
                        </UFormGroup>
                        <UButton type="submit" color="blue">Zapisz zmiany oferty</UButton>
                    </UForm>

                    <template #footer>
                        <div class="flex flex-row justify-end gap-5">
                            <UButton label="Anuluj" @click="closeModal" color="gray" icon="i-material-symbols-cancel" />
                        </div>
                    </template>
                </UCard>
            </UModal>

            <UModal 
                v-model="showDeleteOfferModal"
                :closable="true"
                @close="closeModal"
                :ui="{base: 'overflow-x-hidden min-w-[40vw]'}"
            >
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <h3 class="font-bold text-lg">Potwierdzenie usunięcia karnetu</h3>
                    </template>
                    <div class="flex flex-col gap-5 align-middle justify-start items-start h-full">
                        <p class="text-xl font-medium text-red-700">Czy na pewno chcesz usunąć karnet:</p>  
                        <p>{{offer?.title}}</p>
                        <UButton @click="deleteOffer" color="red">Usuń karnet</UButton>
                    </div>
                    <template #footer>
                        <div class="flex flex-row justify-end gap-5">
                            <UButton label="Anuluj" @click="closeModal" color="gray" icon="i-material-symbols-cancel" />
                        </div>
                    </template>
                </UCard>
            </UModal>
        

        </div>

        <div class="active-pass w-full flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <ul class="w-max">
                <li class="text-lg"><span class="text-slate-500 text-base pr-2">Id oferty: </span>{{offer?.id}}</li>
                <li class="text-lg"><span class="text-slate-500 text-base pr-2">Miesięczna cena oferty: </span>{{offer?.monthlyPrice}} zł</li>
                <li class="text-lg"><span class="text-slate-500 text-base pr-2">Opłata aktywacyjna: </span>{{offer?.entryFee}} zł</li>
                <li class="text-lg"><span class="text-slate-500 text-base pr-2">Okres trwania: </span>{{offer?.durationInMonths}} msc</li>
                <li class="text-lg flex flex-row flex-nowrap gap-2 items-center"><span class="text-slate-500 text-base">Cechy oferty: </span>
                    <div class="flex flex-row gap-2">
                        <li v-for="property in offer?.properties" :key="property" >{{property}}, </li>
                    </div>
                </li>
                <li :class="['text-lg', {'text-green-600': offer?.active, 'text-red-600': !offer?.active}]"><span class="text-slate-500 text-base pr-2">Aktywność: </span>{{offer?.active === true ? 'Aktywna' : 'Nieaktywna'}}</li>
                <li class="text-lg"><span class="text-slate-500 text-base pr-2">Typ oferty: </span>{{offer?.type}}</li>
            </ul>
        </div>

    </main> 

    <div v-else>
        <p class="text-red-500">Brak uprawnień do przeglądania tej strony</p>
    </div>

</div>
</template>

<style scoped>

</style>