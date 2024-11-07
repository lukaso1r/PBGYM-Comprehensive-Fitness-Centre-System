<script lang="ts" setup>

import type { LoggedMemberData, ChangePasswordData, ChangeEmailData } from '~/types';
import { format } from 'date-fns'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { cloneDeep } from 'lodash';

const props = defineProps<{
    showMemberDataEditModal: boolean,
    typeDataToEdit: string,
    memberByEmail: LoggedMemberData
}>();

const emit = defineEmits(['update:showMemberDataEditModal']);


const membersManagmentStore = useMembersManagmentStore();
const changedPersonalMemberData = ref<LoggedMemberData>({} as LoggedMemberData);
const memberPasswordToChange = ref<ChangePasswordData>({} as ChangePasswordData);
const memberEmailToChange = ref<ChangeEmailData>({'newEmail': ''} as ChangeEmailData);

const date = ref<Date>(new Date (props.memberByEmail.birthdate));
const birthdate = computed(() => {
    return date.value ? format(date.value, 'yyyy-MM-dd') : ""
})
const flow = ref<("year" | "month" | "calendar" | "time" | "minutes" | "hours" | "seconds")[]>(["year", "month", "calendar"]);
const maxDate = ref(currentDate.value)

const validGender = ref('valid')

watch(
    () => props.memberByEmail,
    (newVal) => {
        changedPersonalMemberData.value = cloneDeep(newVal);  // Stworzenie głębokiej kopii
        date.value = new Date(newVal.birthdate);
    },
    { immediate: true }
);

const closeshowMemberDataEditModal = () => {
    changedPersonalMemberData.value = membersManagmentStore.memberByEmail;
    emit('update:showMemberDataEditModal', false);
}

const onSubmitChangeMemberDetails = async () => {
    console.log('changedPersonalMemberData', changedPersonalMemberData.value);
    membersManagmentStore.memberDataToChange = changedPersonalMemberData.value;
    membersManagmentStore.memberDataToChange.birthdate = birthdate.value;
    await membersManagmentStore.putMemberDetails(changedPersonalMemberData.value.email);
    membersManagmentStore.getMemberByEmail(changedPersonalMemberData.value.email);
    closeshowMemberDataEditModal();
}

const onSubmitChangeMemberPassword = async () => {
    console.log('memberPasswordToChange', memberPasswordToChange.value, props.memberByEmail.email);
    await membersManagmentStore.putMemberPassword(props.memberByEmail.email, memberPasswordToChange.value.newPassword);
    closeshowMemberDataEditModal();
}

const onSubmitChangeMemberEmail = async () => {
    console.log('memberEmailToChange', memberEmailToChange.value, props.memberByEmail.email);
    await membersManagmentStore.putMemberEmail(props.memberByEmail.email, memberEmailToChange.value.newEmail);
    closeshowMemberDataEditModal();
}

</script>

<template>
<UModal 
    :model-value="showMemberDataEditModal"
    :closable="true"
    @close="closeshowMemberDataEditModal"
    :ui="{}"
    >
    <UCard v-show="typeDataToEdit==='data'"  :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
            <h3 class="font-bold text-lg">Formularz zmiany danych personalnych</h3>
        </template>
        <div class="w-full">
            <!-- <pre>{{memberByEmail}}</pre> -->
            <div class="changeMemberDetailsContainer grid rounded-lg p-4 bg-white w-full">
                <span class="font-semibold text-lg">Zmiana danych personalnych</span>
                <h3 class="[word-spacing:4px] font-medium">Użyj poniższego formularza aby zmienić swoje dane personalne.</h3>
                
                <UForm class="grid grid-cols-3 gap-5 pt-8 items-end" :state="changedPersonalMemberData" :validate="validateMemberData" @submit="onSubmitChangeMemberDetails">
                    <UFormGroup label="Nowe imię" name="name" required>
                        <UInput v-model="changedPersonalMemberData.name" type="string" placeholder="Twoje nowe imię" :value="changedPersonalMemberData.name"  />
                    </UFormGroup>
    
                    <UFormGroup label="Nowe nazwisko"  name="surname" required>
                        <UInput v-model="changedPersonalMemberData.surname" type="string" placeholder="Twój nowy numer telefonu" :value="changedPersonalMemberData.surname"  />
                    </UFormGroup>

                    <UFormGroup label="Nowy pesel" name="pesel" required>
                        <UInput v-model="changedPersonalMemberData.pesel" type="number" placeholder="Twój nowy pesel" :value="changedPersonalMemberData.pesel"  />
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
                        <USelect v-model="changedPersonalMemberData.gender" 
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
                        <UInput v-model="changedPersonalMemberData.phoneNumber" type="number" placeholder="Twój nowy numer telefonu" :value="changedPersonalMemberData.phoneNumber"  />
                    </UFormGroup>
    
                    <UFormGroup label="Nowe miasto" name="city" required>
                        <UInput v-model="changedPersonalMemberData.address.city" type="text" placeholder="Twoje nowe miasto"  />
                    </UFormGroup>
    
                    <UFormGroup label="Nowa ulica" name="streetName" required>
                        <UInput v-model="changedPersonalMemberData.address.streetName" type="text" placeholder="Twoja nowa ulica"  />
                    </UFormGroup>
    
                    <UFormGroup label="Nowy numer budynku" name="buildingNumber" required>
                        <UInput v-model="changedPersonalMemberData.address.buildingNumber" type="text" placeholder="Twój nowy numer budynku"  />
                    </UFormGroup>
    
                    <UFormGroup label="Nowy numer mieszkania" name="apartmentNumber" required>
                        <UInput v-model="changedPersonalMemberData.address.apartmentNumber" type="text" placeholder="Twój nowy numer mieszkania"  />
                    </UFormGroup>
    
                    <UFormGroup label="Nowy kod pocztowy" name="postalCode" required>
                        <UInput v-model="changedPersonalMemberData.address.postalCode" type="text" placeholder="Twój nowy kod pocztowy"  />
                    </UFormGroup>
    
                    <UButton type="submit" color="blue" class="bg-[#203983] hover:bg-[#617F9B] text-center grid">
                        Zapisz nowe dane
                    </UButton>
                    
                </UForm>
            </div>
        </div>

        <template #footer>
            <div class="flex flex-row justify-end gap-5">
                <UButton label="Anuluj" @click="closeshowMemberDataEditModal" color="gray" icon="i-material-symbols-cancel" />
            </div>
        </template>
    </UCard>

    <UCard v-show="typeDataToEdit==='login'"  :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
            <h3 class="font-bold text-lg">Formularz zmiany danych logowania</h3>
        </template>

        <span class="font-semibold text-lg">Zmiana danych logowania</span>
        <h3 class="[word-spacing:4px] font-medium">Użyj poniższego formularza aby zmienić dane logowania klienta.</h3>
        
        <UForm class="grid grid-cols-3 gap-5 pt-8 items-end" :state="memberPasswordToChange" @submit="onSubmitChangeMemberPassword">
            <UFormGroup label="Nowe hasło" name="password" required>
                <UInput v-model="memberPasswordToChange.newPassword" type="string" placeholder="Nowe hasło klienta" :value="memberPasswordToChange.newPassword"  />
            </UFormGroup>
        
            <UButton type="submit" color="blue" class="bg-[#203983] hover:bg-[#617F9B] text-center grid" :disabled="!validatePassword(memberPasswordToChange.newPassword)">
                Zapisz nowe hasło
            </UButton>
        </UForm>

        <UForm class="grid grid-cols-3 gap-5 pt-8 items-end" :state="memberEmailToChange" @submit="onSubmitChangeMemberEmail">
            <UFormGroup label="Nowy email" name="email" required>
                <UInput v-model="memberEmailToChange.newEmail" type="string" placeholder="Nowy email klienta" :value="memberEmailToChange.newEmail"  />
            </UFormGroup>
        
            <UButton 
                type="submit" 
                color="blue" 
                class="bg-[#203983] hover:bg-[#617F9B] text-center grid" 
                :disabled="!validateEmail(memberEmailToChange.newEmail) || memberEmailToChange.newEmail===''">
                Zapisz nowy email
            </UButton>
        </UForm>

        

        <template #footer>
            <div class="flex flex-row justify-end gap-5">
                <UButton label="Anuluj" @click="closeshowMemberDataEditModal" color="gray" icon="i-material-symbols-cancel" />
            </div>
        </template>
    </UCard>
</UModal>
</template>

<style scoped>

</style>