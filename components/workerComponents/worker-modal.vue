<script setup lang="ts">

import type { Worker, ChangeWorkerPasswordData, LoggedWorkerData } from '~/types';

const prop = defineProps<{
    workerId: number,
    worker: Worker,
    showSettingsModal: boolean,
    title: string,
    option: string
}>();

const store = useWorkerStore()
const changePasswordState = useState<ChangeWorkerPasswordData>(() => ({email: '', oldPassword: '', newPassword: '', newPasswordRepeat: ''}))
const changeEmail = ref<string>('')
const workerPermissions = ref<string[]>(prop.worker?.permissions ? [...prop.worker.permissions] : []);


const emit = defineEmits(['update:showSettingsModal', 'close']);
const closeModal = () => {
  emit('close');
  emit('update:showSettingsModal', false); 
};

const changeWorkerData = async () => {
    console.log('saveWorkerData', prop.worker)
    try {
        await store.changeWorkerData(prop.worker)
        closeModal()
    } catch (error) {
        console.error('error', error)
    }
}

const changeWorkerPassowrd = async () => {
    console.log('savePasswordChange', toRaw(changePasswordState.value))
    changePasswordState.value.email = prop.worker.email
    try {
        if(validatePassword(changePasswordState.value.newPassword)){
           await store.changeWorkerPassowrd(toRaw(changePasswordState.value))
        }
        else{
            throw new Error('Hasło nie spełnia wymagań') 
        }
        closeModal()
    } catch (error) {
        console.error('error', error)
    }
}

const changeWorkerEmail = async () => {
    console.log('saveEmailChange', changeEmail.value)
    try {
        await store.changeWorkerEmail(prop.worker.email, changeEmail.value)
        closeModal()
    } catch (error) {
        console.error('error', error)
    }
}

const changeWorkerPermissions = async () => {
    console.log('saveWorkerPermissions', workerPermissions.value)
    try {
        await store.changeWorkerPermissions(prop.worker.position, workerPermissions.value, prop.worker.email)
        closeModal()
    } catch (error) {
        console.error('error', error)
    }
}

const save = () => {
    switch (prop.option) {
        case 'permissions':
            console.log('changeWorkerPermissions')
            changeWorkerPermissions();
            break;
        case 'personal':
            console.log('changeWorkerData')
            changeWorkerData();
            break;
        default:
            console.log('default')
            break;
    }
};

const test = () => {
    console.log('test: prop.worker', prop.worker)
    // worker?.position==='Admin' || worker?.email === useCookie<LoggedWorkerData>('loggedWorkerData').value.email
}



</script>


<template>
    
    <UModal 
        :model-value="showSettingsModal"
        @update:model-value="value => emit('update:showSettingsModal', value)" 
        :ui="{
            base: 'flex flex-row sm:max-w-[90%] max-w-[90%] sm:max-h-[94vh] overflow-x-hidden sm:w-auto sm:h-auto',
            rounded: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            body: {
                base: 'sm:max-w-[100vw] sm:max-h-[90vh]',
            },
        }"    
    >
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }" :class="{'min-h-[30rem] min-w-[25rem]': option === 'permissions', 'h-full w-fit': option !== 'permissions'}">
            <template #header>
                <Placeholder class="h-8" />
                <h3 class="font-bold text-lg">{{title}}</h3>
            </template>

                <table v-show="option==='permissions'" class="table-auto flex flex-col min-h-[30rem]">
                    <tbody class="border-spacing-y-3" style="border-spacing:20px!important">
                        <p class="font-medium pr-8 pb-2 pt-4">Ustawienia pracownicze:</p>
                        <tr>
                            <td class="font-normal pr-8 pb-2 pt-2">Pozycja</td>
                            <td><UInput v-model="worker.position" /></td>
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

                <div v-show="option=='personal'" class="changePersonalData flex flex-row gap-16">
                    <table class="table-auto flex flex-col">
                        <tbody class="border-spacing-y-3" style="border-spacing:20px!important">
                            <p class="font-medium pr-8 pb-4 pt-2">Ustawienia personalne:</p>
                            <tr>
                                <td class="font-normal pr-8 pb-2">Imię</td>
                                <td><UInput v-model="worker.name" disabled/></td>
                            </tr>
                            <tr>
                                <td class="font-normal pr-8 pb-2">Nazwisko</td>
                                <td><UInput v-model="worker.surname" disabled/></td>
                            </tr>
                            <tr>
                                <td class="font-normal pr-8 pb-2">Pesel</td>
                                <td><UInput v-model="worker.pesel" disabled/></td>
                            </tr>
                            <tr>
                                <td class="font-normal pr-8 pb-2">Numer Dowodu</td>
                                <td><UInput v-model="worker.idCardNumber" disabled/></td>
                            </tr>
                            <tr>
                                <td class="font-normal pr-8 pb-2">Telefon</td>
                                <td><UInput v-model="worker.phoneNumber" /></td>
                            </tr>
                        </tbody>
                    </table>
    
                    <table class="table-auto flex flex-col  ">
                        <tbody class="border-spacing-y-3" style="border-spacing:20px!important">
                            <p class="font-medium pr-8 pb-4 pt-2">Adres:</p>
                            <tr>
                                <td class="font-normal pr-8 pb-2">Miasto</td>
                                <td><UInput v-model="worker.address.city" /></td>
                            </tr>
                            <tr>
                                <td class="font-normal pr-8 pb-2">Ulica</td>
                                <td><UInput v-model="worker.address.streetName" /></td>
                            </tr>
                            <tr>
                                <td class="font-normal pr-8 pb-2">Numer budynku</td>
                                <td><UInput v-model="worker.address.buildingNumber" /></td>
                            </tr>
                            <tr>
                                <td class="font-normal pr-8 pb-2">Numer mieszkania</td>
                                <td><UInput v-model="worker.address.apartmentNumber" /></td>
                            </tr>
                            <tr>
                                <td class="font-normal pr-8 pb-2">Kod pocztowy</td>
                                <td><UInput v-model="worker.address.postalCode" /></td>
                            </tr>                                
                        </tbody>
                    </table>
                </div>

                <div v-show="option==='login'" class="changeLoginDataContainer flex flex-row rounded-lg p-4 bg-white flex-nowrap gap-10 w-[60rem]">
                    <div class="changePasswordContainer flex flex-col rounded-lg p-4 flex-wrap gap-4 w-1/2 border-slate-200 border-2"> 
                        <span class="font-semibold text-lg">Zmiana hasła</span>
                        <h3 class="[word-spacing:4px] font-medium">Użyj poniższego formularza aby zmienić hasło pracownika</h3>
                        <p class="font-light text-sm pt-3 flex flex-row justify-start items-center gap-4">
                            <UIcon name="i-heroicons-light-bulb" color="gray" class="w-10 h-10" /> 
                            jeżeli zmieniasz hasło innemu adminowi, bądź samemu sobie, musisz podać poprzednie hasło.
                        </p>
                        <UForm class="space-y-4" :state="changePasswordState" @submit="save">
                            <UFormGroup v-show="worker?.position==='Owner' || worker?.position==='Admin' || worker?.email === useCookie<LoggedWorkerData>('loggedWorkerData').value.email" label="Stare hasło - tylko w przypadku zmiany hasła dla administratora" >
                                <UInput v-model="changePasswordState.oldPassword" type="password" placeholder="Stare hasło" icon="i-heroicons-lock-closed" />
                            </UFormGroup>
                            <UFormGroup label="Nowe hasło" required>
                                <UInput v-model="changePasswordState.newPassword" type="password" placeholder="Nowe hasło" icon="i-heroicons-lock-closed" />
                            </UFormGroup>
                            <UFormGroup label="Powtórz nowe hasło" required :error="!(changePasswordState.newPasswordRepeat===changePasswordState.newPassword)">
                                <p v-show="!(changePasswordState.newPasswordRepeat===changePasswordState.newPassword)" class="text-red-500 py-1 text-sm">Hasła muszą być takie same</p>
                                <UInput v-model="changePasswordState.newPasswordRepeat" type="password" placeholder="Nowe hasło jeszcze raz" icon="i-heroicons-lock-closed" />
                            </UFormGroup>
                        </UForm>
                        <div class="flex flex-row justify-end">
                            <UButton label="Zapisz hasło" @click="changeWorkerPassowrd" color="blue" icon="i-material-symbols-save" />
                        </div>
                    </div>

                    <div class="changeEmailContainer flex flex-col rounded-lg p-4 flex-wrap gap-4 w-1/2 border-slate-200 border-2"> 
                        <span class="font-semibold text-lg">Zmiana adresu email</span>
                        <h3 class="[word-spacing:4px] font-medium">Użyj poniższego formularza aby zmienić adres email pracownika</h3>
                        <p v-show="worker.email === useCookie<LoggedWorkerData>('loggedWorkerData').value.email" class="font-light text-sm pt-3 flex flex-row justify-start items-center gap-4">
                            <UIcon name="i-heroicons-light-bulb" color="gray" class="w-[23px] h-10" /> 
                            Zmieniasz email samemu sobie zostaniesz wylogowany.
                        </p>
                        <div>
                            <UFormGroup label="Nowy adres email" required :error="!(changePasswordState.newPasswordRepeat===changePasswordState.newPassword)">
                                <UInput v-model="changeEmail" type="email" placeholder="Nowy email" icon="i-heroicons-envelope" />
                            </UFormGroup>
                        </div>
                        <div class="flex flex-row justify-end">
                            <UButton label="Zapisz email" @click="changeWorkerEmail" color="blue" icon="i-material-symbols-save" />
                        </div>
                    </div>
                </div>

            
            <template #footer >
                <Placeholder class="h-8" />
                <div class="flex flex-row justify-end gap-5">
                    <UButton label="Anuluj" @click="closeModal" color="gray" icon="i-material-symbols-cancel" />
                    <UButton label="Zapisz zmiany" @click="save" color="blue" icon="i-material-symbols-save" />
                </div>
            </template>
        </UCard>
    </UModal>
             

</template>

<style scoped>

tr>td{
    padding: 5px 0 5px 30px;
}

</style>