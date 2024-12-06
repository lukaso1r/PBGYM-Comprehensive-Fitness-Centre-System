<script setup lang="ts">

const router = useRouter()
const route = useRoute()

const store = useLoginStore();
const statisticsStore = useStatisticsStore();

onMounted(async () => {
    console.log(route.path)
    await statisticsStore.getPaymentSumToday()
    await statisticsStore.getPaymentSumMonthly()
    await statisticsStore.getPassesRegistrationsToday()
    await statisticsStore.getMemberRegistrationsToday()
    await statisticsStore.getGymEntriesToday()
})

const logout = () => {
    console.log('logout')
    store.logOut()
}


</script>

<template>

    <header class="w-full bg-[#203983] min-h-[12vh] pr-9 flex flex-col justify-center gap-6 py-3 pl-[20%]">

        <div class="systemRow w-full flex flex-row justify-between">
            <div class="col1">
                <!-- TODO: Display Breadcrumbs dynamicly  -->
                <UBreadcrumb
                    divider="/"
                    :links="[{ label: 'PBGYM', to: '/' }, { label: 'Panel pracownika', to: '/admin-panel'}]"
                />
            </div>
            <div class="col2">
                <UButton
                    class="bg-[#203983] hover:bg-[#617F9B]"
                    to="/admin-panel/ustawienia-konta"
                    icon="i-ic-baseline-settings"
                >
                    Ustawienia konta
                </UButton>

                <UButton
                    class="bg-[#203983] hover:bg-[#617F9B]"
                    @click="logout"
                    icon="i-ic-baseline-logout"
                >
                    Wyloguj
                </UButton>
            </div>
        </div>

        <div class="fastInformationRow w-full flex flex-row gap-7 py-3">

            <div class="fastInfoCard flex flex-col bg-white rounded-xl gap-4 py-3 px-5 justify-between ">
                <div class="fastInfoCardInnerRow flex w-full gap-10 items-center">
                    <div v-if="statisticsStore.paymentSumToday">
                        <h3 class="text-gray-500 text-sm font-semibold tracking-wide pb-1">Dzisiejszy przychód</h3>
                        <span class="font-bold text-lg">{{statisticsStore.paymentSumToday.split(';')[0]}} zł</span>                    
                    
                    </div>
                    <div class="flex flex-row justify-center place-items-center bg-blue-800  rounded-full p-1 aspect-square ">
                        <UIcon name="i-material-symbols-attach-money" class="w-6 h-6 bg-white" />
                    </div>
                </div>
                <div class=" flex w-full gap-2 text-gray-500" v-if="statisticsStore.paymentSumToday">
                    <span :class="statisticsStore.paymentSumToday.split(';')[1][1]!=='-' ? 'text-green-500' : 'text-red-500'">{{statisticsStore.paymentSumToday.split(';')[1]}}</span> niż wczoraj
                </div>
            </div>

            <div class="fastInfoCard flex flex-col bg-white rounded-xl gap-4 py-3 px-5 justify-between ">
                <div class="fastInfoCardInnerRow flex w-full gap-10 items-center">
                    <div v-if="statisticsStore.passesRegistrationsToday">
                        <h3 class="text-gray-500 text-sm font-semibold tracking-wide pb-1">Dzisiejsza sprzedaż karnetów</h3>
                        <span class="font-bold text-lg">{{ statisticsStore.passesRegistrationsToday.split(';')[0] }}</span>                    
                    </div>
                    <div class="flex flex-row justify-center place-items-center bg-red-600  rounded-full p-1 aspect-square ">
                        <UIcon name="i-material-symbols-play-pass" class="w-6 h-6 bg-white" />
                    </div>
                </div>
                <div class=" flex w-full gap-2 text-gray-500" v-if="statisticsStore.passesRegistrationsToday">
                    <span :class="statisticsStore.passesRegistrationsToday.split(';')[1][1] !== '-' ? 'text-green-500' : 'text-red-500'">{{statisticsStore.passesRegistrationsToday.split(';')[1]}}</span> niż wczoraj
                </div>
            </div>

            <div class="fastInfoCard flex flex-col bg-white rounded-xl gap-4 py-3 px-5 justify-between ">
                <div class="fastInfoCardInnerRow flex w-full gap-10 items-center">
                    <div v-if="statisticsStore.memberRegistrationsToday">
                        <h3 class="text-gray-500 text-sm font-semibold tracking-wide pb-1">Ogólny przyrost klientów</h3>
                        <span class="font-bold text-lg">{{ statisticsStore.memberRegistrationsToday.split(';')[0] }}</span>                    
                    </div>
                    <div class="flex flex-row justify-center place-items-center bg-green-500  rounded-full p-1 aspect-square ">
                        <UIcon name="i-ic-baseline-people" class="w-6 h-6 bg-white" />
                    </div>
                </div>
                <div v-if="statisticsStore.memberRegistrationsToday" class=" flex w-full gap-2 text-gray-500">
                    <span :class="statisticsStore.memberRegistrationsToday.split(';')[1][1] !== '-' ? 'text-green-500' : 'text-red-500'">{{statisticsStore.memberRegistrationsToday.split(';')[1]}}</span> niż wczoraj
                </div>
            </div>

            <div class="fastInfoCard flex flex-col bg-white rounded-xl gap-4 py-3 px-5 justify-between ">
                <div class="fastInfoCardInnerRow flex w-full gap-10 items-center">
                    <div v-if="statisticsStore.gymEntriesToday">
                        <h3 class="text-gray-500 text-sm font-semibold tracking-wide pb-1">Liczba wejść na siłownię dzisiaj</h3>
                        <span class="font-bold text-lg">{{statisticsStore.gymEntriesToday.split(';')[0]}}</span>                    
                    </div>
                    <div class="flex flex-row justify-center place-items-center bg-blue-800  rounded-full p-1 aspect-square ">
                        <UIcon name="i-material-symbols-directions-run" class="w-6 h-6 bg-white" />
                    </div>
                </div>
                <div class=" flex w-full gap-2 text-gray-500" v-if="statisticsStore.gymEntriesToday">
                    <span 
                        :class="{
                            'text-green-500': statisticsStore.gymEntriesToday.split(';')[1][1]!=='-',
                            'text-red-500': statisticsStore.gymEntriesToday.split(';')[1][1]==='-',
                            'text-slate-500': statisticsStore.gymEntriesToday.split(';')[1][2]==='0'
                        }"
                    >
                        {{statisticsStore.gymEntriesToday.split(';')[1]}}
                    </span> 
                    niż wczoraj
                    
                </div>
            </div>
        </div>    
    </header>
</template>

<style scoped>


.fastInfoCard {
    flex-basis: 25%;
}

.fastInfoCardInnerRow {
    justify-content: space-between;
}


</style>