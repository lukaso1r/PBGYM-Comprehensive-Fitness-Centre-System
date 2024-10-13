<script setup lang="ts">
import type { EditableStandardOfferData } from '~/types'
import type { FormError, FormSubmitEvent } from '#ui/types'

const store = useOffersStore()

const newOfferData = useState<EditableStandardOfferData>(() => ({
    title: '',
    subtitle: '',
    monthlyPrice: 0,
    entryFee: 0,
    durationInMonths: 0,
    properties: [],
    active: false,
}));

const propertiesInput = ref('')

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
const addNewStandardOffer = async (event: FormSubmitEvent<any>) => {
    console.log('Dodawanie nowrgo karnetu', toRaw(event.data))
    await store.addStandardOffer(toRaw(event.data))
}
</script>

<template>

<workerComponents-header-worker></workerComponents-header-worker>
<div class="flex flex-row bg-[#F5F7F8] items-start pb-10">
    <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>

    <main class="min-h-screen content-start basis-4/5 mt-4 flex flex-col flex-wrap items-start justify-start gap-8">

        <div class="w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <h1 class="text-xl font-semibold">Formularz dodawania nowego karnetu</h1>
            <p class="text-slate-500">Możesz z tego miejsca dodać nowy karnet i skonfigurować jego najważniejsze opcje</p>
        </div>
        
        <div id="formAndPreview" class="flex flex-row flex-nowrap gap-8 w-full items-start">
            <div class="newPassForm w-1/2 flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <p class="text-slate-500">Dodaj nowy karnet</p>
                <!-- add new pass form -->
                <UForm :state="newOfferData" :validate="validate" class="space-y-4" @submit="addNewStandardOffer">  
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
                    <UButton type="submit">Dodaj ofertę</UButton>
                </UForm>
            </div>

            <div class="newPassPreview w-1/2 flex flex-col gap-8">
                <div class="w-fit flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <h3 class="text-xl font-semibold w-fit">Podgląd nowego karnetu:</h3>
                    <p class="text-slate-500 w-fit">Możesz tutaj zobaczyć w jaki sposób użytkownik zobaczy karnet</p>
                </div>
                <UCard class="w-max">
                    <template #header>
                        <h4 class="text-xl font-bold">{{newOfferData.title}}</h4>
                        <h6 class="text-sm pt-2">{{newOfferData.subtitle}}</h6>
                    </template>
                    <p><span class="text-6xl font-bold">{{newOfferData.monthlyPrice}}</span> zł / miesiąc</p>
                    <p class="text-slate-500 pt-3">Opłata aktywacyjna: {{newOfferData.entryFee}} zł</p>
                    <div class="list-pass mx-auto mt-7 pl-7" >
                        <ul class="list-disc" >
                            <li>Ważność karnetu: {{newOfferData.durationInMonths}} miesięcy</li>
                            <li v-for="(property, key) in newOfferData.properties" :key="key">{{property}}</li>
                        </ul>
                    </div>
                    <template #footer>
                        <div class="flex flex-column justify-center">
                            <UButton label="Wybierz ten plan" class="bg-[#f1f6ff] text-lg text-[#2878FF] font-bold px-6 py-2 hover:bg-[#bed5ff]" />
                        </div>
                    </template>
                </UCard>
            </div>
        </div>

    </main>
</div>

</template>

<style scoped>



</style>