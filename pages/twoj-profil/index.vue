<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import type { DefaultLoginData, LoggedMemberData, CreditCardData, MemberGymEntriesHistory, MemberPaymentHistory, ActiveMemberPass  } from "~/types";
import type { FormError, FormSubmitEvent } from '#ui/types'

const store = useLoginStore();
const paymentStore = usePaymentStore();
const loggedMemberStore = useLoggedMemberStore();
const passStore = usePassStore();
const groupClassesStore = useGroupClassesStore();
const statisticsStore = useStatisticsStore();

const defaultLoginData = useCookie<DefaultLoginData>('defaultLoginData');
const loggedMemberData = useCookie<LoggedMemberData>('loggedMemberData');

const selectedTrue = ref(false)
const selected = ref(true)
const showEditPaymentModal = ref(false)

const cardData = ref(<CreditCardData> {} as CreditCardData)
const entriesHistory = ref(<MemberGymEntriesHistory[]>[] as MemberGymEntriesHistory[])
const paymentHistory = ref(<MemberPaymentHistory[]>[] as MemberPaymentHistory[])
const activeMemberPass = ref(<ActiveMemberPass>{} as ActiveMemberPass)

const test = () => {
    console.log('test', entriesHistory.value )
    console.log('test2', paymentHistory.value )
    console.log('test3', activeMemberPass )
    if (!isObjectEmpty(activeMemberPass)) {
        console.log('activeMemberPass is an empty object');
    } else {
        console.log('activeMemberPass is not an empty object');
    }
    console.log('test4Karta', cardData.value )
}

onMounted(async () => {
    await paymentStore.getHiddenCreditCardInfo(loggedMemberData.value.email)
    await loggedMemberStore.getMemberMonthlyGymEntriesByEmail(loggedMemberData.value.email)
    await loggedMemberStore.getMemberPaymentsHistory(loggedMemberData.value.email)
    await loggedMemberStore.getMemberDailyGymMinutesByEmail(loggedMemberData.value.email)
    await passStore.getActiveMemberPass(loggedMemberData.value.email)
    await passStore.getMemberPassHistory(loggedMemberData.value.email)
    paymentHistory.value = loggedMemberStore.memberPaymentHistory
    entriesHistory.value = loggedMemberStore.memberGymEntriesHistory
    activeMemberPass.value = passStore.activeMemberPass
    cardData.value = paymentStore.cardData

});

const deletePaymentMethod = async () => {
    await paymentStore.deletePaymentMethod(loggedMemberData.value.email)
    paymentStore.getHiddenCreditCardInfo(loggedMemberData.value.email)
    cardData.value = paymentStore.cardData
}

const addNewPaymentMethod = async () => {
    await paymentStore.postPaymentMethod(loggedMemberData.value.email)
    paymentStore.getHiddenCreditCardInfo(loggedMemberData.value.email)
}

const validate = (data: CreditCardData) => {
    const errors: FormError<string>[] = []

    if (!data.cardNumber) errors.push({ path: 'cardNumber', message: 'Numer karty jest wymagany' })
    if (!data.expirationMonth) errors.push({ path: 'expirationMonth', message: 'Miesiąc ważności karty jest wymagany' })
    if (!data.expirationYear) errors.push({ path: 'expirationYear', message: 'Rok ważności karty jest wymagany' })
    if (!data.cvc) errors.push({ path: 'cvc', message: 'Kod CVC / CVV jest wymagany' })
    if (validateCardNumber(data.cardNumber) === false) errors.push({ path: 'cardNumber', message: 'Numer karty jest nieprawidłowy' })
    if (validateCardMonth(data.expirationMonth) === false) errors.push({ path: 'expirationMonth', message: 'Miesiąc ważności karty jest nieprawidłowy' })
    if (validateCardYear(data.expirationYear) === false) errors.push({ path: 'expirationYear', message: 'Rok ważności karty jest nieprawidłowy' })
    if (validateCardCVC(data.cvc) === false) errors.push({ path: 'cvc', message: 'Kod CVC / CVV jest nieprawidłowy' })
    return errors
}



</script>

<template>

    <header-user-profile></header-user-profile>

    <div class="flex bg-[#F5F7F8]">
        <user-profile-navbar class="basis-1/5 max-w-[350px]"></user-profile-navbar>
        <main class=" min-h-svh basis-4/5 -mt-4 grid grid-cols-2 justify-start gap-8 pb-10 items-start">
            <div class="flex flex-row gap-8 col-span-2">
                <!-- TODO: fix shadow and hand written css to tailwind -->
                <div v-if="!isObjectEmpty(paymentStore.cardData) && cardData.cardNumber!==''" class="credit-card aspect-[5/3] bg-[url('/images/twoj-profil/creditcardhappy.jpg')] bg-cover w-fit p-4 flex flex-col rounded-lg bg-no-repeat gap-9 bg-center" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1); ">
                    <UIcon name="i-ic-baseline-wifi" class="text-white text-xl size-7"/>
                    <p class="tracking-wide text-slate-50 font-semibold text-xl pr-20" style="word-spacing: 1.5rem; text-shadow: 1px 1px 4px black;">**** **** **** {{paymentStore.cardData.cardNumber?.slice(-4)}}</p>
                    <div class="row flex place-content-between">
                        <div class="owner flex flex-col gap-2">
                            <span class="text-slate-200 font-medium" style="text-shadow: 1px 1px 1px black;">Właściciel karty</span>
                            <span class="text-slate-50 font-semibold" style="text-shadow: 1px 1px 4px black;">{{ loggedMemberData?.name + " " + loggedMemberData?.surname}}</span>
                        </div>
                        <div class="expire flex flex-col gap-2">
                            <span class="text-slate-200 font-medium" style="text-shadow: 1px 1px 1px black;">Ważność</span>
                            <span class="text-slate-50 font-semibold" style="text-shadow: 1px 1px 4px black;">{{paymentStore.cardData.expirationMonth}}/{{ paymentStore.cardData.expirationYear }} </span>
                        </div>
                    </div>
                </div>
                <div v-else class="credit-card aspect-[5/3] bg-[#dbdbdb] bg-cover w-fit p-4 flex flex-col rounded-lg bg-no-repeat gap-9 bg-center" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1); ">
                    <UIcon name="i-ic-baseline-wifi" class="text-white text-xl size-7"/>
                    <p class=" text-slate-50 font-semibold text-xl" style="word-spacing: 0.6rem; text-shadow: 1px 1px 4px black;">Brak dodanej karty płatniczej</p>
                    <div class="row flex place-content-between">
                        <div class="owner flex flex-col gap-2">
                            <span class="text-slate-200 font-medium" style="text-shadow: 1px 1px 1px black;">Właściciel karty</span>
                            <span class="text-slate-50 font-semibold" style="text-shadow: 1px 1px 4px black;">X X</span>
                        </div>
                        <div class="expire flex flex-col gap-2">
                            <span class="text-slate-200 font-medium" style="text-shadow: 1px 1px 1px black;">Ważność</span>
                            <span class="text-slate-50 font-semibold" style="text-shadow: 1px 1px 4px black;">X/X</span>
                        </div>
                    </div>
                </div>

                <div class="active-pass flex flex-col rounded-lg p-4 max-w-[216px] bg-white max-h-[216px]" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <div v-if="!isObjectEmpty(activeMemberPass)" class="flex flex-col flex-nowrap items-center place-content-evenly h-full">
                        <img src="/images/twoj-profil/pass.svg" alt="" class="bg-[#203983] max-w-[25%] p-1 rounded">
                        <h3 class="text-center font-medium">
                            {{activeMemberPass.title}}
                        </h3>
                        <UDivider />
                        <p class="text-center font-bold">do {{dateToString(new Date (activeMemberPass.dateEnd))}}</p>
                    </div>
                    <div v-else class="flex flex-col place-content-evenly items-center h-full">
                        <img src="/images/twoj-profil/pass.svg" alt="" class="bg-[#203983] max-w-[25%] p-1 rounded">
                        <h3 class="text-center font-medium">
                            Brak aktywnego karnetu
                        </h3>
                        <UDivider />
                        <NuxtLink to="/twoj-profil/oferty" class="text-sky-600 hover:bg-gray-50 hover:text-blue-500 p-1 px-2 rounded" >Kup karnet</NuxtLink>  
                    </div>
                    
                </div>
                <!-- <div class="active-subscription flex flex-col rounded-lg p-4 max-w-[216px] bg-white max-h-[216px] flex-nowrap items-center  place-content-evenly " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <img src="/images/twoj-profil/gatorade.svg" alt="" class="bg-[#203983] max-w-[25%] p-1 rounded">
                    <h3 class="text-center font-medium">
                        GATORADE
                    </h3>
                    <h6 class="text-center text-xs text-slate-500" >Roczna subskrypcja GATORADE</h6>
                    <UDivider />
                    <p class="text-center font-bold">do 20.12.2024</p>
                </div> -->

                <div class="payment-methods flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start w-max gap-4 min-w-[30%]" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <span class="font-semibold text-lg">Metody płatności</span>
                    <div class="methods-container flex flex-row flex-wrap w-full">
                        <ul class="flex flex-row flex-nowrap place-items-center gap-2 justify-between w-full">
                            <li v-if="!isObjectEmpty(cardData)" class="flex flex-row flex-nowrap place-items-center gap-5 border-solid border-2 border-gray-400 py-1 px-3 rounded-xl" >
                                <img src="/images/twoj-profil/mastercard.svg" alt="mastercard" class="w-[50px] h-[50px]">
                                <p class="font-medium text-base" style="word-spacing: 0.6rem;">**** **** **** {{paymentStore.cardData.cardNumber?.slice(-4)}}</p>
                                <UButton
                                    icon="i-ic-baseline-create"
                                    size="sm"
                                    color="blue"
                                    variant="ghost"
                                    label=""
                                    :trailing="false"
                                    @click="showEditPaymentModal = true"
                                />
                            </li>
                            <li v-else class="flex flex-row flex-nowrap place-items-center gap-5 ">
                                <UButton
                                    icon="i-ic-outline-plus"
                                    size="sm"
                                    color="blue"
                                    variant="ghost"
                                    label="Dodaj metodę płatności"
                                    :trailing="false"
                                    @click="showEditPaymentModal = true"
                                />
                            </li>
                            <UModal 
                                v-model="showEditPaymentModal"
                                :closable="true"
                                @close="showEditPaymentModal = false"
                                :ui="{}"
                            >
                                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                                    <template #header>
                                    <h3 class="font-bold text-lg">Konfiguracja karty płatności</h3>
                                    </template>
                                    
                                    <div class="flex flex-row flex-wrap gap-12 px-9 justify-center">
                                        <div class="flex flex-col gap-8 justify-center w-96">
                                            <h4 class="text-lg font-medium leading-7 [word-spacing:5px] w-max max-w-96">
                                                <template v-if="!isObjectEmpty(cardData)">W celu zmiany danych karty, najpierw usuń obecną kartę, a następnie dodaj nową.</template>
                                                <template v-else>Dodaj nową kartę płatniczą</template>
                                            </h4>
                                            <p class="font-light text-sm pt-3 flex flex-row justify-start items-center gap-4 w-max max-w-96">
                                                <UIcon name="i-heroicons-light-bulb" color="gray" class="w-10 h-10" /> 
                                                Karta ta używana będzie do cyklicznych płatności za wykupione karnety.
                                            </p>
                                        </div>

                                        <div v-if="!isObjectEmpty(cardData)" class="flex flex-col w-96 items-center p-4">
                                            <div  class="credit-card w-max aspect-[5/3] bg-[url('/images/twoj-profil/creditcardhappy.jpg')] bg-cover p-4 flex flex-col rounded-lg bg-no-repeat gap-9 bg-center" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                                                <UIcon name="i-ic-baseline-wifi" class="text-white text-xl size-7"/>
                                                <p class="tracking-wide text-slate-50 font-semibold text-xl pr-10" style="word-spacing: 1.5rem; text-shadow: 1px 1px 4px black;">**** **** **** {{paymentStore.cardData.cardNumber?.slice(-4)}}</p>
                                                <div class="row flex place-content-between">
                                                    <div class="owner flex flex-col gap-2">
                                                        <span class="text-slate-200 font-medium" style="text-shadow: 1px 1px 1px black;">Właściciel karty</span>
                                                        <span class="text-slate-50 font-semibold" style="text-shadow: 1px 1px 4px black;">{{ loggedMemberData?.name + " " + loggedMemberData?.surname}}</span>
                                                    </div>
                                                    <div class="expire flex flex-col gap-2">
                                                        <span class="text-slate-200 font-medium" style="text-shadow: 1px 1px 1px black;">Ważność</span>
                                                        <span class="text-slate-50 font-semibold" style="text-shadow: 1px 1px 4px black;">{{paymentStore.cardData.expirationMonth}}/{{ paymentStore.cardData.expirationYear }} </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <UButton @click="deletePaymentMethod" class="w-fit mt-2 mx-auto flex justify-self-center" label="Usuń kartę" color="red" icon="" variant="ghost"/>
                                        </div>

                                        <div v-else class="flex flex-col w-96 items-center p-4">
                                            <UForm :state="paymentStore.newCardData" :validate="validate" class="space-y-4" @submit="addNewPaymentMethod">  
                                                <UFormGroup label="" name="cardNumber" required>
                                                    <UInput v-model="paymentStore.newCardData.cardNumber" label="cardNumber" placeholder="Numer Karty" />
                                                </UFormGroup>
                                                <UFormGroup label="" name="expirationMonth" required>
                                                    <UInput v-model="paymentStore.newCardData.expirationMonth" label="expirationMonth" placeholder="Miesiąc" />
                                                </UFormGroup>
                                                <UFormGroup label="" name="expirationYear" required>
                                                    <UInput v-model="paymentStore.newCardData.expirationYear" label="expirationYear" placeholder="Rok" />
                                                </UFormGroup>
                                                <UFormGroup label="" name="cvc" required>
                                                    <UInput v-model="paymentStore.newCardData.cvc" label="cvc" placeholder="Kod CVC / CVV" />
                                                </UFormGroup>
                                            
                                                <UButton type="submit" color="blue">Zapisz nową kartę płatniczą</UButton>
                                            </UForm>
                                        </div>
                                    </div>
                                        <template #footer>
                                        <div class="flex flex-row justify-end gap-5">
                                        <UButton label="Anuluj" @click="showEditPaymentModal = false" color="gray" icon="i-material-symbols-cancel" />
                                        </div>
                                    </template>
                                </UCard>
                            </UModal>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="calendarView flex flex-col w-full lg:max-w-[79vw] bg-white p-4 rounded-lg gap-2 col-span-2" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1); ">
                <h2 class="font-semibold text-lg">Twoje nadchodzące zajęcia grupowe</h2>
                <CallendarComponentsGroupClassesCalendarForMember 
                    :groupClassesUpcoming="groupClassesStore.groupClassesUpcomingForMember" 
                    :memberEmail="loggedMemberData.email" 
                    :groupClassesUpcomingForMember="groupClassesStore.groupClassesUpcomingForMember"
                    :paymentOptionAvailability="paymentStore.cardData ? true : false"
                    :memberPassStatus="passStore.activeMemberPass"
                />
                <UButton 
                    label="Zobacz wszystkie zajęcia" 
                    color="blue" 
                    icon="i-material-symbols-add" 
                    :to="'/twoj-profil/zajecia'"
                    class="w-fit"
                />
            </div>

            <div class="entriesHistory flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start gap-4" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <span class="font-semibold text-lg">Historia wejść</span>
                <ul class="flex flex-col gap-5 w-full justify-between ">
                    <template v-if="!Object.values(loggedMemberStore.memberDailyGymMinutesByEmail).some(value => Number(value) > 0)">Brak historii wejść</template>
                    <li v-for="(minutes, date) in loggedMemberStore.memberDailyGymMinutesByEmail" :key="date" class="flex flex-row w-full place-items-center">
                        <template v-if="minutes>0">
                            <div class="document-name w-full pr-14 flex flex-col gap-1">
                                <h3 class="[word-spacing:5px] font-medium">{{dateToString(new Date(date))}} </h3>
                            </div>
                            <div class="flex flex-row gap-2 items-center pr-2">
                                <UIcon name="i-heroicons-clock" class="w-5 h-5" />
                                <p class="w-max">{{minutes}} min</p>
                            </div>
                        </template>
                    </li>
                </ul>
            </div>

            <div class="groupClassesHistory flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start gap-4" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <span class="font-semibold text-lg">Historia zajęć grupowych **WIP**</span>
                <ul class="flex flex-col gap-5 w-full justify-between ">
                    <UButton @click="statisticsStore.getGroupClassesMonthlyByEmail(loggedMemberData.email)" label="Odśwież" variant="ghost" color="blue" icon="i-material-symbols-refresh" />
                    {{ statisticsStore.groupClassesMonthlyByEmail }}
                </ul>
            </div>

            <div class="documents flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start gap-4" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <span class="font-semibold text-lg">Dokumenty ***WIP***</span>
                <ul class="flex flex-col gap-5 w-full justify-between ">
                    <li v-for="(payment, paymentId) in paymentHistory" :key="payment.id" class="flex flex-row w-full place-items-center">
                        <div class="document-name w-full pr-14 flex flex-col gap-1">
                            <h3 class="[word-spacing:5px] font-medium">{{dateToString(new Date(payment.dateTime))}} - {{payment.amount}} zł tu title</h3>
                            <h6 class="font-thin text-slate-500">#ID-{{payment.id}}</h6>
                        </div>
                        <UButton
                            icon="i-ic-baseline-insert-drive-file"
                            size="sm"
                            color="blue"
                            variant="ghost"
                            label="PDF"
                            :trailing="false"
                        />
                    </li>
                </ul>
            </div>

            <div class="user-information flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start gap-4" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                <span class="font-semibold text-lg">Informacje</span>
                <div class="information-container w-full bg-slate-50 py-3 px-5 flex flex-col rounded-xl">
                    <div class="inf-row-title flex flex-row justify-between items-center">
                        <span class="font-medium " style="word-spacing: 0.7rem;">{{ loggedMemberData?.name }}  {{ loggedMemberData?.surname}}</span>
                        <UButton
                            icon="i-ic-baseline-create"
                            size="sm"
                            color="blue"
                            variant="ghost"
                            label=""
                            :trailing="false"
                            :to="'/twoj-profil/ustawienia-konta'"
                        />
                    </div>
                    <div class="inf-row-info">
                        <ul class="flex flex-col gap-1 py-3">
                            <li>
                                <span class="font-medium text-gray-500 pr-3">Adres Email:</span> {{loggedMemberData?.email}}
                            </li>
                            <li>
                                <span class="font-medium text-gray-500 pr-3">Miasto:</span> {{loggedMemberData?.address?.city}}
                            </li>
                            <li>
                                <span class="font-medium text-gray-500 pr-3">Ulica:</span> {{loggedMemberData?.address?.streetName}}
                            </li>
                            <li>
                                <span class="font-medium text-gray-500 pr-3">Numer budynku:</span> {{loggedMemberData?.address?.buildingNumber}}
                            </li>
                            <li>
                                <span class="font-medium text-gray-500 pr-3">Numer mieszkania:</span> {{loggedMemberData?.address?.apartmentNumber}}
                            </li>
                            <li>
                                <span class="font-medium text-gray-500 pr-3"> Kod pocztowy:</span> {{loggedMemberData?.address?.postalCode}}
                            </li>
                            <li>
                                <span class="font-medium text-gray-500 pr-3">Rok urodzenia:</span> {{ loggedMemberData?.birthdate }} 
                            </li>
                            <li>
                                <span class="font-medium text-gray-500 pr-3"> Pesel:</span> {{loggedMemberData?.pesel}}
                            </li>
                            <li>
                                <span class="font-medium text-gray-500 pr-3">Typ konta:</span> {{ defaultLoginData?.userType==='Member' ? "Członek" : "Trener" }}
                            </li>
                            <li>
                                <!-- TODO: add endpoint for getting active pass -->
                                <span class="font-medium text-gray-500 pr-3">Aktywny karnet:</span> karnet OPEN 12 msc - STUDENT
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <div class="flex flex-col flex-nowrap place-items-start justify-start gap-8">
                <div class="total-entrance-amount flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start w-[100%] gap-4" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <span class="font-semibold text-lg">Tu będą wykresy ***TODO***</span>
                    <img src="/images/twoj-profil/chart.jpg" alt="" srcset="">
                    <p>Chyba stąd: <a href="ui.shadcn.com/charts" class="text-blue-800">ui.shadcn.com/charts</a></p>
                </div>

                <div class="settings flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start w-[100%] gap-4" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
                    <span class="font-semibold text-lg">A tu ustawienia ***TODO***</span>
                    <div class="flex flex-col">
                        <span class="font-semibold text-sm text-slate-600">Konto</span>
                        <div class="flex flex-row items-center gap-4 p-3">
                            <UToggle size="md" v-model="selected" />
                            <p>Powiadamiaj mnie o zmianach w regulaminie</p>
                        </div>
                        <div class="flex flex-row items-center gap-4 p-3">
                            <UToggle size="md"  v-model="selected"/>
                            <p>Zapisz mnie na Newsletter</p>
                        </div>
                    </div>
                    <div>
                        <span class="font-semibold text-sm text-slate-600">System</span>
                        <div class="flex flex-row items-center gap-4 p-3">
                            <UToggle size="md" v-model="selectedTrue" />
                            <p>Zgadzam się na wykorzystanie moich statystyk w celach marketingowych</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </main>
    </div>
   
</template>

<style scoped>


</style>