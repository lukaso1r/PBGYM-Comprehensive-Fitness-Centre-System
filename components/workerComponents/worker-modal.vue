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

const save = () => {
    switch (prop.option) {
        case 'permissions':
        case 'personal':
            console.log('changeWorkerData')
            changeWorkerData();
            break;
        case 'login':
            console.log('login')
            changeWorkerPassowrd();
            break;
        default:
            console.log('default')
            break;
    }
};

const test = () => {
    console.log('test', prop.worker.permissions)
    prop.worker.permissions = ['Admin', 'Owner']
    // worker?.position==='Admin' || worker?.email === useCookie<LoggedWorkerData>('loggedWorkerData').value.email
    console.log('test', prop.worker.permissions)
}



</script>


<template>
    <UModal 
        :model-value="showSettingsModal"
        @update:model-value="value => emit('update:showSettingsModal', value)" 
        :ui="{
            base: 'flex flex-row sm:max-w-[79vw] sm:max-h-[90vh] overflow-x-hidden sm:w-auto sm:h-auto',
            rounded: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            body: {
                base: 'sm:max-w-[100vw] sm:max-h-[90vh]',
            },
        }"    
    >
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }" :class="{'min-h-[30rem]': option === 'permissions', 'h-auto': option !== 'permissions'}">
            <template #header>
                <Placeholder class="h-8" />
                <h3 class="font-bold text-lg">{{title}}</h3>
            </template>
            <div class="flex flex-row flex-wrap gap-10 h-[20rem] min-w-[25rem]">
                <table v-show="option==='permissions'" class="table-auto flex flex-col ">
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

                <table v-show="option=='personal'" class="table-auto flex flex-col">
                    <tbody class="border-spacing-y-3" style="border-spacing:20px!important">
                        <p class="font-medium pr-8 pb-4 pt-2">Ustawienia personalne:</p>
                        <tr>
                            <td class="font-normal pr-8 pb-2">Imię</td>
                            <td><UInput v-model="worker.name" /></td>
                        </tr>
                        <tr>
                            <td class="font-normal pr-8 pb-2">Nazwisko</td>
                            <td><UInput v-model="worker.surname" /></td>
                        </tr>
                        <tr>
                            <td class="font-normal pr-8 pb-2">Pesel</td>
                            <td><UInput v-model="worker.pesel" /></td>
                        </tr>
                        <tr>
                            <td class="font-normal pr-8 pb-2">Numer Dowodu</td>
                            <td><UInput v-model="worker.idCardNumber" /></td>
                        </tr>
                        <tr>
                            <td class="font-normal pr-8 pb-2">Email</td>
                            <td><UInput v-model="worker.email" /></td>
                        </tr>
                        <tr>
                            <td class="font-normal pr-8 pb-2">Telefon</td>
                            <td><UInput v-model="worker.phoneNumber" /></td>
                        </tr>
                    </tbody>
                </table>

                <table v-show="option==='personal'" class="table-auto flex flex-col  ">
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

                <div v-show="option==='login'" class="changePasswordContainer flex flex-col rounded-lg p-4 bg-white flex-nowrap gap-4">
                    <span class="font-semibold text-lg">Zmiana hasła</span>
                    <h3 class="[word-spacing:4px] font-medium">Użyj poniższego formularza aby zmienić hasło pracownika</h3>
                    <p class="font-light text-sm pt-3 flex flex-row justify-start items-center gap-4">
                        <UIcon name="i-heroicons-light-bulb" color="gray" class="w-10 h-10" /> 
                        jeżeli zmieniasz hasło innemu adminowi, bądź samemu sobie, musisz podać poprzednie hasło
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
                </div>

            </div>                      
            
            <template #footer >
                <Placeholder class="h-8" />
                <div class="flex flex-row justify-end gap-5">
                    <UButton label="Anuluj" @click="closeModal" color="gray" icon="i-material-symbols-cancel" />
                    <UButton label="Zapisz" @click="save" color="blue" icon="i-material-symbols-save" />
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