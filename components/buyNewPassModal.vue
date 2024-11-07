<script setup lang="ts">
import type { Offer } from '~/types';

const { buyNewPass } = usePassUtils();

const props = defineProps<{
    showNewPassModal: boolean,
    memberEmail: string,
    choosenPassId: number,
    choosenPassTitle: string
}>();

const emit = defineEmits(['update:showNewPassModal']);

const toast = useToast();
const choosenPassObj = computed(() => offersStore.offersPublicActive.find((offer: Offer) => offer.id === props.choosenPassId));

const closeShowNewPassModal = () => {
    emit('update:showNewPassModal', false);
}

const paymentStore = usePaymentStore();
const offersStore = useOffersStore();

const addNewPaymentMethod = async () => {
    console.log('mail', props.memberEmail);
    await paymentStore.postPaymentMethod(props.memberEmail)
    paymentStore.getHiddenCreditCardInfo(props.memberEmail)
    toast.add({ title: 'Karta płatnicza dodana', description: 'Karta płatnicza została dodana do Twojego konta' });
}

const test = () => {
    console.log('test cada', paymentStore.cardData );
    console.log('test obj', offersStore.offersPublicActive);
    console.log('offerById', choosenPassObj.value);
}

onBeforeMount( async () => {
    await paymentStore.getHiddenCreditCardInfo(props.memberEmail)    
    
})

</script>

<template>

<UModal 
    :model-value="showNewPassModal"
    :closable="true"
    @close="closeShowNewPassModal"
    :ui="{}"
>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
            <h3 class="font-bold text-lg">Formularz zakupu karnetu</h3>
        </template>

        <div v-if="isObjectEmpty(paymentStore.cardData)" class="flex flex-col gap-3">
            <h2 class="font-medium">W celu zakupu karnetu, najpierw należy przypisać kartę płatniczą do konta.</h2>
            <p>Wykonaj to za pomocą poniższego formularza</p>
            <div class="flex flex-col items-center p-4">
                <UForm :state="paymentStore.newCardData" :validate="validateCreditCard" class="space-y-4" @submit="addNewPaymentMethod">  
                    <UFormGroup label="Numer karty" name="cardNumber" required>
                        <UInput v-model="paymentStore.newCardData.cardNumber" label="cardNumber" placeholder="Numer Karty" />
                    </UFormGroup>
                    <UFormGroup label="Miesiąc wygaśnięcia" name="expirationMonth" required>
                        <UInput v-model="paymentStore.newCardData.expirationMonth" label="expirationMonth" placeholder="Miesiąc" />
                    </UFormGroup>
                    <UFormGroup label="Rok wygaśnięcia" name="expirationYear" required>
                        <UInput v-model="paymentStore.newCardData.expirationYear" label="expirationYear" placeholder="Rok" />
                    </UFormGroup>
                    <UFormGroup label="Numer CVC" name="cvc" required>
                        <UInput v-model="paymentStore.newCardData.cvc" label="cvc" placeholder="Kod CVC / CVV" />
                    </UFormGroup>
                
                    <UButton type="submit" color="blue">Zapisz nową kartę płatniczą</UButton>
                </UForm>
            </div>
        </div>

        <div v-else class="flex flex-col gap-4">
            <h2 class="font-medium text-xl">Wybrany karnet:</h2>
            <ul>
                <li><span class="font-medium">Nazwa:</span> {{choosenPassObj?.title}}</li>
                <li><span class="font-medium">Cena:</span> {{choosenPassObj?.monthlyPrice}} zł</li>
                <li><span class="font-medium">Opłata aktywacyjna:</span> {{choosenPassObj?.entryFee}} zł</li>
                <li><span class="font-medium">Ważność:</span> {{choosenPassObj?.durationInMonths}} miesięcy</li>
            </ul>

            <p v-if="choosenPassObj" class="text-gray-500">
                Aktywacja karnetu następuje od momentu zakupu, 
                <br />karnet będzie ważny do: {{dateToString(passEndDate(choosenPassObj.durationInMonths))}}
            </p>

            <UButton 
                class="flex flex-row justify-center text-xl px-7 py-2" 
                label="Dołącz do zdrowia i potwierdź zakup!" 
                @click="buyNewPass(memberEmail, choosenPassId, 'admin@worker.com')" 
                icon="i-icon-park-outline-sport"
            />

        </div>

        <template #footer>
            <div class="flex flex-row justify-end gap-5">
                <UButton label="Anuluj" @click="closeShowNewPassModal" color="gray" icon="i-material-symbols-cancel" />
            </div>
        </template>
    </UCard>
</UModal>

</template>

<style scoped>

</style>