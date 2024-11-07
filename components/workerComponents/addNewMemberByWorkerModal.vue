<script lang="ts" setup>

import type { LoggedMemberData, ChangePasswordData, ChangeEmailData, MemberToRegisterData } from '~/types';
import { format } from 'date-fns'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps<{
    showAddNewMemberByWorkerModal: boolean,
}>();

const emit = defineEmits(['update:showAddNewMemberByWorkerModal']);

const membersManagmentStore = useMembersManagmentStore();

const closeShowAddNewMemberByWorkerModal = () => {
    emit('update:showAddNewMemberByWorkerModal', false);
}

const date = ref<Date>();
const birthdate = computed(() => {
    return date.value ? format(date.value, 'yyyy-MM-dd') : ""
})
const flow = ref<("year" | "month" | "calendar" | "time" | "minutes" | "hours" | "seconds")[]>(["year", "month", "calendar"]);
const maxDate = ref(currentDate.value)

const validGender = ref('valid')

const onSubmitRegisterMemberByWorker = async () => {
    membersManagmentStore.memberToRegister.birthdate = birthdate.value
    console.log('membersManagmentStore.memberToRegister', membersManagmentStore.memberToRegister)
    await membersManagmentStore.postRegisterNewMember()
    closeShowAddNewMemberByWorkerModal()
}

</script>

<template>
<UModal 
    :model-value="showAddNewMemberByWorkerModal"
    :closable="true"
    @close="closeShowAddNewMemberByWorkerModal"
    :ui="{}"
    >
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
            <h3 class="font-bold text-lg">Formularz dodania nowego klienta</h3>
        </template>
        <span class="font-semibold text-lg">Dodanie nowego klienta do systemu</span>
        <h3 class="[word-spacing:4px] font-medium">Użyj poniższego formularza aby dodać nowego klienta.</h3>

        <UForm class="grid grid-cols-3 gap-5 pt-8 items-end" :state="membersManagmentStore.memberToRegister" :validate="validateMemberToRegister" @submit="onSubmitRegisterMemberByWorker">
            <UFormGroup label="Email" name="email" required>
                <UInput v-model="membersManagmentStore.memberToRegister.email" type="string" placeholder="Email klienta" :value="membersManagmentStore.memberToRegister.email"  />
            </UFormGroup>
            
            <UFormGroup label="Hasło" name="password" required>
                <UInput v-model="membersManagmentStore.memberToRegister.password" type="string" placeholder="Hasło klienta" :value="membersManagmentStore.memberToRegister.password"  />
            </UFormGroup>

            <UFormGroup label="Imię" name="name" required>
                <UInput v-model="membersManagmentStore.memberToRegister.name" type="string" placeholder="Imię klienta" :value="membersManagmentStore.memberToRegister.name"  />
            </UFormGroup>

            <UFormGroup label="Nazwisko"  name="surname" required>
                <UInput v-model="membersManagmentStore.memberToRegister.surname" type="string" placeholder="Numer telefonu klienta" :value="membersManagmentStore.memberToRegister.surname"  />
            </UFormGroup>

            <UFormGroup label="Pesel" name="pesel" required>
                <UInput v-model="membersManagmentStore.memberToRegister.pesel" type="number" placeholder="Pesel klienta" :value="membersManagmentStore.memberToRegister.pesel"  />
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
                <USelect v-model="membersManagmentStore.memberToRegister.gender" 
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

            <UFormGroup label="Numer telefonu" name="phoneNumber" required>
                <UInput v-model="membersManagmentStore.memberToRegister.phoneNumber" type="number" placeholder="Numer telefonu klienta" :value="membersManagmentStore.memberToRegister.phoneNumber"  />
            </UFormGroup>

            <UFormGroup label="Nowe miasto" name="city" required>
                <UInput v-model="membersManagmentStore.memberToRegister.address.city" type="text" placeholder="Miasto klienta"  />
            </UFormGroup>

            <UFormGroup label="Nowa ulica" name="streetName" required>
                <UInput v-model="membersManagmentStore.memberToRegister.address.streetName" type="text" placeholder="Ulica klienta"  />
            </UFormGroup>

            <UFormGroup label="Nowy numer budynku" name="buildingNumber" required>
                <UInput v-model="membersManagmentStore.memberToRegister.address.buildingNumber" type="text" placeholder="Numer budynku klienta"  />
            </UFormGroup>

            <UFormGroup label="Nowy numer mieszkania" name="apartmentNumber" required>
                <UInput v-model="membersManagmentStore.memberToRegister.address.apartmentNumber" type="text" placeholder="Numer mieszkania klienta"  />
            </UFormGroup>

            <UFormGroup label="Nowy kod pocztowy" name="postalCode" required>
                <UInput v-model="membersManagmentStore.memberToRegister.address.postalCode" type="text" placeholder="Kod pocztowy klienta"  />
            </UFormGroup>

            <UButton type="submit" color="blue" class="bg-[#203983] hover:bg-[#617F9B] text-center grid">
                Zapisz nowe dane
            </UButton>
            
            {{ membersManagmentStore.memberToRegister }}
        </UForm>








        <template #footer>
            <div class="flex flex-row justify-end gap-5">
                <UButton label="Anuluj" @click="closeShowAddNewMemberByWorkerModal" color="gray" icon="i-material-symbols-cancel" />
            </div>
        </template>
    </UCard>
</UModal>

</template>

<style scoped>

</style>