<script lang="ts" setup>

import type { LoggedMemberData, ChangePasswordData, ChangeEmailData, TrainerData } from '~/types';
import { format } from 'date-fns'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { cloneDeep, takeRight } from 'lodash';
import { trainerTagTranslations } from '~/utils/trainerTagTranslations';

const props = defineProps<{
    showTrainerDataEditModal: boolean,
    typeDataToEdit: string,
    trainerByEmail: TrainerData
}>();

const emit = defineEmits(['update:showTrainerDataEditModal']);



const { createTrainerObject } = useObjectFactory();
const trainerStore = useTrainerStore();

const trainerDataToEdit = ref<TrainerData>(createTrainerObject());

const date = ref<Date>(new Date (props.trainerByEmail.birthdate));
const birthdate = computed(() => {
    return date.value ? format(date.value, 'yyyy-MM-dd') : ""
})
const flow = ref<("year" | "month" | "calendar" | "time" | "minutes" | "hours" | "seconds")[]>(["year", "month", "calendar"]);
const maxDate = ref(currentDate.value)

const validGender = ref('valid')
const isTrainerVisible = ref('false')
const trainerTags = ref<string[]>(props.trainerByEmail?.trainerTags ? [...props.trainerByEmail.trainerTags] : []);
const changePasswordState = ref<ChangePasswordData>({oldPassword: '', newPassword: ''});
const changeEmailState = ref<ChangeEmailData>({newEmail: ''});

const tagOptionsValue = Object.entries(trainerTagTranslations).map(([value, label]) => ({
    label,
    value,
}));

const selectedPolishTags = computed(() =>
    trainerTags.value.map(tag => trainerTagTranslations[tag] || tag)
);

watch (
    () => props.showTrainerDataEditModal,
    (newVal) => {
        if (newVal) {
            trainerDataToEdit.value = cloneDeep(props.trainerByEmail);
            date.value = new Date(props.trainerByEmail.birthdate);
            isTrainerVisible.value = props.trainerByEmail.visible ? 'true' : 'false';
            trainerTags.value = tagOptionsValue.filter(option => props.trainerByEmail.trainerTags.includes(option.value));
        } else{
            trainerDataToEdit.value = createTrainerObject();
            date.value = new Date();
            trainerTags.value = [];
        }
    }
)

watch(
    () => isTrainerVisible.value,
    (newVal) => {
        trainerDataToEdit.value.visible = newVal === 'true'
    }
)

watch (
    () => trainerTags.value,
    (newVal) => {
        trainerDataToEdit.value.trainerTags = newVal;
        console.log('trainerTags' , trainerTags.value.map(tag => tag));
    }
)

const onSubmitChangeTrainerData = async () => {
    trainerDataToEdit.value.birthdate = birthdate.value;
    trainerDataToEdit.value.trainerTags = trainerTags.value.map(tag => tag.value)
    console.log('trainerDataToEdit', trainerDataToEdit.value, props.trainerByEmail.email);
    await trainerStore.putUpdateTrainer(trainerDataToEdit.value, props.trainerByEmail.email);
    await trainerStore.getTrainerByEmail(props.trainerByEmail.email);
    closeshowTrainerDataEditModal();
}

const onSubmitUpdateTrainerPassword = async () => {
    console.log('changePasswordState', changePasswordState.value, props.trainerByEmail.email);
    await trainerStore.putUpdateTrainerPassword(props.trainerByEmail.email, changePasswordState.value.newPassword, changePasswordState.value.oldPassword);
    changePasswordState.value = {oldPassword: '', newPassword: ''};
    closeshowTrainerDataEditModal();
}

const onSubmitUpdateTrainerEmail = async () => {
    console.log('changeEmailState', changeEmailState.value, props.trainerByEmail.email);
    await trainerStore.putUpdateTrainerEmail(props.trainerByEmail.email, changeEmailState.value.newEmail);
    changeEmailState.value = {newEmail: ''};
    closeshowTrainerDataEditModal();
}

const closeshowTrainerDataEditModal = () => {
    trainerDataToEdit.value = props.trainerByEmail;
    emit('update:showTrainerDataEditModal', false);
}

const test = () => {
    console.log('test', trainerTags.value.map(tag => tag.value));
}



</script>

<template>
    <UModal 
        :model-value="showTrainerDataEditModal"
        :closable="true"
        @close="closeshowTrainerDataEditModal"
        :ui="{}"
        >
        <UCard v-show="typeDataToEdit==='personal'" :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <h3 class="font-bold text-lg">Formularz zmiany danych personalnych trenera</h3>
            </template>
            <div class="w-full">
                <div class="changeMemberDetailsContainer flex flex-col rounded-lg px-4 bg-white w-full">
                    <h3 class="[word-spacing:4px] font-medium pb-4">Użyj poniższego formularza aby zmienić dane trenera.</h3>
                    <UForm class="flex flex-col gap-4 justify-start" :state="trainerDataToEdit" :validate="validateTrainerPersonalData"  @submit="onSubmitChangeTrainerData">
                        <div class="grid grid-cols-3 gap-5 items-end p-6 border-2" >

                            <h4 class="col-span-3 text-xl font-semibold">Dane personalne</h4>

                            <UFormGroup label="Nowe imię" name="name" required>
                                <UInput v-model="trainerDataToEdit.name" type="string" placeholder="Twoje nowe imię" :value="trainerDataToEdit.name"  />
                            </UFormGroup>
            
                            <UFormGroup label="Nowe nazwisko"  name="surname" required>
                                <UInput v-model="trainerDataToEdit.surname" type="string" placeholder="Twój nowy numer telefonu" :value="trainerDataToEdit.surname"  />
                            </UFormGroup>
        
                            <UFormGroup label="Nowy pesel" name="pesel" required>
                                <UInput v-model="trainerDataToEdit.pesel" type="number" placeholder="Twój nowy pesel" :value="trainerDataToEdit.pesel"  />
                            </UFormGroup>
            
                            <UFormGroup label="Data urodzenia" name="birthdate"  required>
                                <VueDatePicker v-model="date" 
                                    :max-date="maxDate" 
                                    :min-date="'1900'" 
                                    :year-range="[1900, maxDate.getFullYear()]" 
                                    prevent-min-max-navigation 
                                    :enable-time-picker="false" 
                                    :flow="flow" 
                                    locale="pl" 
                                    cancelText="anuluj" 
                                    selectText="potwierdź" 
                                />
                            </UFormGroup>
            
                            <UFormGroup label="Płeć" name="gender" required>
                                <USelect v-model="trainerDataToEdit.gender" 
                                :options="[
                                    { label: 'Kobieta', value: 'FEMALE' },
                                    { label: 'Mężczyzna', value: 'MALE' },
                                    { label: 'Inne', value: 'OTHER' }
                                ]" 
                                :required="true"
                                :style="{
                                    borderColor: validGender === 'invalid' ? 'red' : 'transparent',
                                    borderWidth: validGender === 'invalid' ? '1px' : '0px',
                                    borderStyle: 'solid',
                                    borderRadius: '5px',
                                }"
                                >
                                </USelect>
                                <p v-show="validGender==='invalid'" class="mt-2 text-red-500 dark:text-red-400 text-sm">Wymagane</p>
                            </UFormGroup>
            
                            <UFormGroup label="Nowy numer telefonu" name="phoneNumber" required>
                                <UInput v-model="trainerDataToEdit.phoneNumber" type="number" placeholder="Twój nowy numer telefonu" :value="trainerDataToEdit.phoneNumber"  />
                            </UFormGroup>
            
                            <UFormGroup label="Nowe miasto" name="city" required>
                                <UInput v-model="trainerDataToEdit.address.city" type="text" placeholder="Twoje nowe miasto"  />
                            </UFormGroup>
            
                            <UFormGroup label="Nowa ulica" name="streetName" required>
                                <UInput v-model="trainerDataToEdit.address.streetName" type="text" placeholder="Twoja nowa ulica"  />
                            </UFormGroup>
            
                            <UFormGroup label="Nowy numer budynku" name="buildingNumber" required>
                                <UInput v-model="trainerDataToEdit.address.buildingNumber" type="text" placeholder="Twój nowy numer budynku"  />
                            </UFormGroup>
            
                            <UFormGroup label="Nowy numer mieszkania" name="apartmentNumber" required>
                                <UInput v-model="trainerDataToEdit.address.apartmentNumber" type="text" placeholder="Twój nowy numer mieszkania"  />
                            </UFormGroup>
            
                            <UFormGroup label="Nowy kod pocztowy" name="postalCode" required>
                                <UInput v-model="trainerDataToEdit.address.postalCode" type="text" placeholder="Twój nowy kod pocztowy"  />
                            </UFormGroup>
                        </div>

                        <div class="grid grid-cols-3 gap-5 pt-8 items-end  p-6 border-2" >
                            <h4 class="col-span-3 text-xl font-semibold">Dane trenerskie</h4>

                            <UFormGroup class="col-span-3" label="Nowy opis" name="description" required>
                                <UTextarea v-model="trainerDataToEdit.description" type="textarea" placeholder="Nowy opis trenera"  />
                            </UFormGroup>

                            <UFormGroup label="Status aktywności" name="visible" required>
                                <USelect v-model="isTrainerVisible" 
                                :options="[
                                    { label: 'Widoczny', value: true },
                                    { label: 'Nieaktywny', value: false }
                                ]" 
                                :required="true"
                                >
                                </USelect>
                            </UFormGroup>

                            <UFormGroup class="col-span-3 flex flex-col gap-2" label="Tagi trenera" name="trainerTags" required>
                                <USelectMenu 
                                        v-model="trainerTags" 
                                        :options="tagOptionsValue"
                                        multiple 
                                        placeholder="Wybierz tagi"  
                                        searchable
                                        searchable-placeholder="Wyszukaj tagi" 
                                    >
                                        <template #label>
                                            <span v-if="trainerTags.length" >{{ selectedPolishTags.map(tag => tag.label ?? tag).join(', ') }}</span>
                                            <span v-else>Wybierz tagi trenera</span>
                                        </template>
                                        <template #option-empty="{ query }">
                                            <q>{{ query }}</q> nie znaleziono takiego uprawnienia
                                        </template>
                                </USelectMenu>
                            </UFormGroup>
                        </div>

                        <UButton type="submit" color="blue" class="bg-[#203983] hover:bg-[#617F9B] text-center grid">
                            Zapisz nowe dane
                        </UButton>
                        
                    </UForm>
                </div>
            </div>
            <template #footer>
                <div class="flex flex-row justify-end gap-5">
                    <UButton label="Anuluj" @click="closeshowTrainerDataEditModal" color="gray" icon="i-material-symbols-cancel" />
                </div>
            </template>
        </UCard>
        <UCard v-show="typeDataToEdit==='login'" :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <h3 class="font-bold text-lg">Formularz zmiany danych logowania trenera</h3>
            </template>
            <div class="w-full">
                <div class="changeMemberDetailsContainer flex flex-row gap-8 rounded-lg p-4 bg-white w-full">
                    <div class="flex flex-col gap-2 p-4 border-2">
                        <h3 class="[word-spacing:4px] font-medium">Użyj poniższego formularza aby zmienić hasło.</h3>
                        <UForm class="space-y-4" :state="changePasswordState" @submit="onSubmitUpdateTrainerPassword">
                            <UFormGroup label="Nowe hasło" required>
                                <UInput v-model="changePasswordState.newPassword" type="password" placeholder="Nowe hasło" icon="i-heroicons-lock-closed" />
                            </UFormGroup>
                            <UButton label="Zapisz hasło" type="submit" color="blue" icon="i-material-symbols-save" />
                        </UForm>
                    </div>
                    <div class="flex flex-col gap-2 p-4 border-2">
                        <h3 class="[word-spacing:4px] font-medium">Użyj poniższego formularza aby zmienić email.</h3>
                        <UForm class="space-y-4" :state="changeEmailState" @submit="onSubmitUpdateTrainerEmail">
                            <UFormGroup label="Nowy adres email" required>
                                <UInput v-model="changeEmailState.newEmail" type="email" placeholder="Nowy email" icon="i-heroicons-envelope" />
                            </UFormGroup>
                            <UButton label="Zapisz email" type="submit" color="blue" icon="i-material-symbols-save" />
                        </UForm>
                    </div>
                    
                </div>
            </div>
            <template #footer>
                <div class="flex flex-row justify-end gap-5">
                    <UButton label="Anuluj" @click="closeshowTrainerDataEditModal" color="gray" icon="i-material-symbols-cancel" />
                </div>
            </template>
        </UCard>
    </UModal>
</template>

<style scoped>

</style>
                