<script setup lang="ts">

import type { Worker, NewWorkerData, DefaultLoginData } from '~/types'
import { format } from 'date-fns'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const showAddWorkerModal = ref(false)
const option = ref('')
const store = useWorkerStore()


const newWorker = useState<NewWorkerData>(() => ({
  email: '',
  password: '',
  name: '',
  surname: '',
  birthdate: '',
  gender: '',
  pesel: '',
  phoneNumber: '',
  address: {
    city: '',
    streetName: '',
    buildingNumber: '',
    apartmentNumber: '',
    postalCode: ''
  },
  idCardNumber: '',
  position: '',
  permissions: []
}));

const repeatPassword = ref('')

const workerPermissions = ref<string[]>(newWorker.value.permissions ? [...newWorker.value.permissions] : []);

const date = ref<Date>();
const birthdate = computed(() => {
    return date.value ? format(date.value, 'yyyy-MM-dd') : ""
})
const flow = ref<("year" | "month" | "calendar" | "time" | "minutes" | "hours" | "seconds")[]>(["year", "month", "calendar"])
const maxDate = ref(currentDate.value)

const test = () => {
  console.log('test')
}

const closeModal = () => {
  showAddWorkerModal.value = false;
}

const toggleModal = (choosenOption: string) => {
    option.value = choosenOption;
    showAddWorkerModal.value = !showAddWorkerModal.value
    console.log('option', option.value)
};

const addNewWorker = () => {
  newWorker.value.birthdate = birthdate.value
  newWorker.value.permissions = workerPermissions.value
  console.log('addNewWorker', newWorker.value)
  // store.addNewWorker(toRaw(newWorker.value))
  // console.log('jwt', useCookie<DefaultLoginData>('defaultLoginData').value.jwt)
}

</script>

<template>
<workerComponents-header-worker></workerComponents-header-worker>

<div class="flex flex-row bg-[#F5F7F8] items-start pb-10">
  <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>

  <!-- TODO: poprawić margines -->
  <main class="basis-4/5 mt-4 flex flex-row flex-wrap items-start justify-start gap-8">

    <div class="active-pass w-max flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
      <h1 class="text-xl font-semibold">Panel zarządzania pracownikami</h1>
      <p class="text-slate-500">Możesz z tego miejsca przeglądać i zarządzać pracownikami zarejestrowanymi w systemie.</p>
    </div>

    <WorkerComponentsWorkerList :showButton="false"/>

    <UButton color="blue" icon="i-heroicons-user-plus" size="md" @click="toggleModal">Dodaj pracownika</UButton>
    <UButton @click="test" size="md">test</UButton> 

    <UModal 
          v-model="showAddWorkerModal"
          :title="option === 'edit' ? 'Edytuj pracownika' : 'Dodaj pracownika'"
          :closable="true"
          @close="closeModal"
          :ui="{ 
            base: 'flex flex-row min-h-[50vh] sm:max-w-[91%] max-w-[90%] overflow-x-hidden sm:w-auto sm:h-auto',
          }"
    >
      <UCard 
        :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
      >
        <template #header>
          <Placeholder class="h-8" />
          <h3 class="font-bold text-lg">Dodaj nowego pracownika</h3>
        </template>

      <UForm :state="newWorker" class="space-y-4" @submit="addNewWorker">  
        <div class="flex flex-col gap-4 border-slate-200 border-2 py-4 px-4">
          <h4 class="font-semibold">Dane logowania</h4>
          <div class="flex flex-row gap-4">
            <UFormGroup label="Email" name="email" required>
              <UInput v-model="newWorker.email" />
            </UFormGroup>
        
            <UFormGroup label="Hasło" name="password" required>
              <UInput v-model="newWorker.password" type="password" />
            </UFormGroup>

            <UFormGroup label="Powtórz hasło" name="password" required>
              <UInput v-model="repeatPassword" type="password" />
            </UFormGroup>
          </div>
        </div>
        
        <div class="flex flex-col gap-4 border-slate-200 border-2 py-4 px-4">
          <h4 class="font-semibold">Dane osobowe</h4>
          <div class="flex flex-row gap-4">
            <UFormGroup label="Imię" name="name" required>
              <UInput v-model="newWorker.name" />
            </UFormGroup>
            <UFormGroup label="Nazwisko" name="surname" required>
              <UInput v-model="newWorker.surname" />
            </UFormGroup>   
            <UFormGroup label="Płeć" name="" required>
              <USelect v-model="newWorker.gender" 
                :options="[
                  { label: 'Kobieta', value: 'FEMALE' },
                  { label: 'Mężczyzna', value: 'MALE' },
                  { label: 'Inne', value: 'OTHER' }
                ]" 
              />
            </UFormGroup>
          </div>
          <div class="flex flex-row gap-4">
            <UFormGroup label="Pesel" name="pesel" required>
              <UInput v-model="newWorker.pesel" type="number"/>
            </UFormGroup>
            <UFormGroup label="Numer dowodu" name="idCardNumber" required>
              <UInput v-model="newWorker.idCardNumber" type="string"/>
            </UFormGroup>
            <UFormGroup label="Data urodzenia"  required>
              <VueDatePicker 
                          v-model="date"
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
          </div>
        </div>

        <div class="flex flex-col gap-4 border-slate-200 border-2 py-4 px-4">
          <h4 class="font-semibold">Dane kontaktowe</h4>
          <div class="flex flex-row gap-4">
            <UFormGroup label="Numer telefonu" name="phoneNumber" required>
              <UInput v-model="newWorker.phoneNumber" type="number"/>
            </UFormGroup>
            <UFormGroup label="Adres email" name="email" required>
              <UInput v-model="newWorker.email" type="email"/>
            </UFormGroup>
          </div>
        </div>

        <div class="flex flex-col gap-4 border-slate-200 border-2 py-4 px-4">
          <h4 class="font-semibold">Adres</h4>
          <div class="flex flex-row gap-4">
            <UFormGroup label="Miasto" name="city" required>
              <UInput v-model="newWorker.address.city" />
            </UFormGroup>
            <UFormGroup label="Ulica" name="street" required>
              <UInput v-model="newWorker.address.streetName" />
            </UFormGroup>
          </div>
          <div class="flex flex-row gap-4">
            <UFormGroup label="Numer budynku" name="houseNumber" required>
              <UInput v-model="newWorker.address.buildingNumber" />
            </UFormGroup>
            <UFormGroup label="Numer mieszkania" name="apartmentNumber">
              <UInput v-model="newWorker.address.apartmentNumber" />
            </UFormGroup>
            <UFormGroup label="Kod pocztowy" name="postalCode" required>
              <UInput v-model="newWorker.address.postalCode" />
            </UFormGroup>
          </div>
        </div>

        <div class="flex flex-col gap-4 border-slate-200 border-2 py-4 px-4">
          <table class="table-auto flex flex-col min-h-[20rem]">
            <tbody class="border-spacing-y-3" style="border-spacing:20px!important">
              <p class="font-semibold pr-8 pb-2 ">Ustawienia pracownicze:</p>
              <tr>
                  <td class="font-normal pr-8 pb-2 pt-2">Pozycja</td>
                  <td>
                    <UFormGroup  name="position">
                        <UInput v-model="newWorker.position"/>
                    </UFormGroup>
                  </td>
              </tr>
              <tr>
                  <td class="font-normal pr-8 pb-2 pt-2">Uprawnienia</td>
                  <td class="w-[40rem]">
                      <USelectMenu 
                          v-model="workerPermissions" 
                          :options="store.permissionList" 
                          multiple 
                          placeholder="Wybierz uprawnienia"  
                          searchable
                          searchable-placeholder="Wyszukaj uprawnienie" 
                      >
                          <template #label>
                              <span v-if="workerPermissions.length" >{{ workerPermissions.join(', ') }}</span>
                              <span v-else>Wybierz uprawnienia</span>
                          </template>
                          <template #option-empty="{ query }">
                              <q>{{ query }}</q> nie znaleziono takiego uprawnienia
                            </template>
                      </USelectMenu>
                  </td>
              </tr>
            </tbody>
          </table>
        </div>

      </UForm>

        <template #footer>
          <Placeholder class="h-8" />
          <div class="flex flex-row justify-end gap-5">
            <UButton label="Anuluj" @click="closeModal" color="gray" icon="i-material-symbols-cancel" />
            <UButton label="Dodaj pracownika" @click="addNewWorker" color="blue" icon="i-material-symbols-save" />
          </div>
        </template>
      </UCard>
    </UModal>
  </main>
</div>

</template>

<style scoped>



</style>