<script setup lang="ts">
const statisticStore = useStatisticsStore();

onMounted(() => {
    statisticStore.getPaymentSumToday();
});
</script>


<template>
    <div class="fastInfoCard paymentSumToday blockCustom flex flex-col justify-between ">
        <div class="fastInfoCardInnerRow flex w-full gap-10 items-center  justify-between">
            <div v-if="statisticStore.paymentSumToday">
                <h3 class="text-gray-500 text-sm font-semibold tracking-wide pb-1">Dzisiejszy przychód </h3>
                <span class="font-bold text-lg">{{statisticStore.paymentSumToday.split(';')[0]}} zł</span>                    
            </div>
            <div class="flex flex-row justify-center place-items-center bg-blue-800  rounded-full p-1 aspect-square ">
                <UIcon name="i-material-symbols-attach-money" class="w-6 h-6 bg-white" />
            </div>
        </div>
        <div class=" flex w-full gap-2 text-gray-500" v-if="statisticStore.paymentSumToday">
            <span :class="statisticStore.paymentSumToday.split(';')[1][1]!=='-' ? 'text-green-500' : 'text-red-500'">{{statisticStore.paymentSumToday.split(';')[1]}}</span> niż wczoraj
        </div>
    </div>
</template>