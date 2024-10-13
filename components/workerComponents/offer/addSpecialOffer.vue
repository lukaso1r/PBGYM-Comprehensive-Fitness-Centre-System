<script setup lang="ts">
import type { EditableSpecialOfferData } from '~/types'
import type { FormError, FormSubmitEvent } from '#ui/types'

const store = useOffersStore()

const newOfferData = useState<EditableSpecialOfferData>(() => ({
    title: '',
    subtitle: '',
    monthlyPrice: 0,
    entryFee: 0,
    durationInMonths: 0,
    properties: [''],
    active: false,
    specialOfferText: '',
    borderText: '',
    previousPriceInfo: '',
}));

const propertiesInput = ref('')

const validate = (data: EditableSpecialOfferData) => {
    const errors: FormError<string>[] = []

    if (!data.title) errors.push({ path: 'title', message: 'Tytuł jest wymagany' })
    if (!data.subtitle) errors.push({ path: 'subtitle', message: 'Podtytuł jest wymagany' })
    if (!data.monthlyPrice) errors.push({ path: 'monthlyPrice', message: 'Cena miesięczna jest wymagana' })
    if (!data.entryFee) errors.push({ path: 'entryFee', message: 'Opłata aktywacyjna jest wymagana' })
    if (!data.durationInMonths) errors.push({ path: 'durationInMonths', message: 'Okres trwania jest wymagany' })
    if (!propertiesInput.value || propertiesInput.value.length === 0 || newOfferData.value.properties.length > 6) errors.push({ path: 'properties', message: 'Cechy oferty są wymagane i może być ich maksymalnie 6' })
    if (!data.specialOfferText) errors.push({ path: 'specialOfferText', message: 'Tekst specjalnej oferty jest wymagany' })
    if(!data.borderText) errors.push({ path: 'borderText', message: 'Tekst na obramowaniu jest wymagany' }) 
    if(!data.previousPriceInfo) errors.push({ path: 'previousPriceInfo', message: 'Poprzednia cena jest wymagana' })

    return errors
}

const handlePropertiesInput = () => {
    newOfferData.value.properties = propertiesInput.value
        .split(/;|\n/)
        .map(item => item.trim())
        .filter(item => item.length > 0); 
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const addNewSpecialdOffer = async (event: FormSubmitEvent<any>) => {
    console.log('Dodawanie nowrgo karnetu', toRaw(event.data))
    await store.addSpecialOffer(toRaw(event.data))
}
</script>

<template>

    <div id="formAndPreview" class="flex flex-row flex-nowrap gap-8 w-full items-start">
        <div class="newPassForm w-1/2 flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
            <p class="text-slate-500">Dodaj nowy SPECJALNY karnet</p>
            <!-- add new pass form -->
            <UForm :state="newOfferData" :validate="validate" class="space-y-4" @submit="addNewSpecialdOffer">  
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
                <UFormGroup label="Tekst specjalnej oferty" name="specialOfferText" required>
                    <UInput v-model="newOfferData.specialOfferText" label="Podtytuł" placeholder="Wpisz podtytuł oferty" />
                </UFormGroup>
                <UFormGroup label="Aktywność" name="active">
                    <UCheckbox v-model="newOfferData.active" :label="newOfferData.active ? 'Aktywny' : 'Nieaktywny'" />
                </UFormGroup>
                <UFormGroup label="Tekst na obramowaniu" name="borderText">
                    <UInput v-model="newOfferData.borderText" label="Tekst na obramowaniu" placeholder="Wpisz tekst na obramowaniu" />
                </UFormGroup>
                <UFormGroup label="Poprzednia cena" name="previousPriceInfo">
                    <UInput v-model="newOfferData.previousPriceInfo" label="Poprzednia cena" placeholder="Wpisz poprzednią cenę" />
                </UFormGroup>
                <UButton color="blue" type="submit">Dodaj ofertę</UButton>
            </UForm>
        </div>

        <div class="newPassPreview w-1/2 flex flex-col gap-10">
            <div class="w-fit flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <h3 class="text-xl font-semibold w-fit">Podgląd nowego karnetu SPECJALNEGO:</h3>
                <p class="text-slate-500 w-fit">Możesz tutaj zobaczyć w jaki sposób użytkownik zobaczy karnet</p>
            </div>
            <div class="specialPass flex flex-row align-middle items-center ml-6">
                <p class="verticalSpecialText text-blue-600 font-medium shadow-2xl" style="z-50">{{newOfferData.borderText}}</p>
                <UCard class="w-max z-0"
                    :ui="{shadow: 'shadow-2xl', ring: 'ring-[12px] ring-white dark:ring-gray-800', divide: 'divide-y divide-gray-200 dark:divide-gray-800', background: 'bg-blue-600 dark:bg-slate-200' }"
                >
                    <template #header>
                        <h4 class="text-2xl font-bold text-white">{{newOfferData.title}}</h4>
                        <h6 class=" pt-2 text-white text-lg">{{newOfferData.subtitle}}</h6>
                    </template>
                    <p class="text-white"><span class="text-6xl font-bold text-white">{{newOfferData.monthlyPrice}}</span> zł / miesiąc</p>
                    <p class=" pt-3 text-white">Opłata aktywacyjna: {{newOfferData.entryFee}} zł</p>
                    <div class="list-pass mx-auto mt-7 pl-7 text-white" >
                        <ul class="list-disc text-white font-medium text-lg" >
                            <li>Ważność karnetu: {{newOfferData.durationInMonths}} miesięcy</li>
                            <li v-for="(property, key) in newOfferData.properties" :key="key">{{property}}</li>
                        </ul>
                    </div>
                    <p class="text-white text-lg font-medium mt-5">{{newOfferData.specialOfferText}}</p>
                    <template #footer>
                        <div class="flex flex-column justify-center">
                            <UButton label="Wybierz ten plan" class="bg-white text-lg text-[#2878FF] font-bold px-6 py-2 hover:bg-[#bed5ff]" />
                        </div>
                    </template>
                </UCard>
            </div>
        </div>
    </div>

</template>

<style scoped>

.verticalSpecialText{
    writing-mode: vertical-lr;
    text-orientation: upright;
    z-index: 50;
    background-color: white;
    border-radius: 15px 0 0 15px;
    padding: 10px 7px 10px 7px;
}


</style>