<script lang="ts" setup>

const props = defineProps<{
    showNewCreditCardForMemberModal: boolean,
    memberEmail: string,
}>();

const emit = defineEmits(['update:showNewCreditCardForMemberModal']);

const toast = useToast();
const creditCardStatus = computed(() => membersManagmentStore.paymentOptionsStatus);

const closeShowNewPassModal = () => {
    emit('update:showNewCreditCardForMemberModal', false);
}

const membersManagmentStore = useMembersManagmentStore();

const addNewPaymentMethod = async () => {
    console.log('mail', props.memberEmail);
    await membersManagmentStore.postNewCreditCardForMember(props.memberEmail)
    membersManagmentStore.getMemberPaymentOptionsStatus(props.memberEmail)
    toast.add({ title: 'Karta płatnicza dodana', description: 'Karta płatnicza została dodana do Twojego konta' });
}

watch(
    () => props.memberEmail,
    async (newEmail) => {
        if (newEmail) {
            // await membersManagmentStore.getMemberPaymentOptionsStatus(newEmail);
            console.log('status', creditCardStatus.value);
        }
    },
    { immediate: true }
);

</script>


<template>

<UModal 
    :model-value="showNewCreditCardForMemberModal"
    :closable="true"
    @close="closeShowNewPassModal"
    :ui="{}"
    >
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
            <h3 class="font-bold text-lg">Formularz zakupu karnetu</h3>
        </template>

        <div class="flex flex-col gap-3">
            <div v-if="membersManagmentStore.paymentOptionsStatus">
                <p class="pb-9">Wybierz karnet z listy poniżej</p>
                <WorkerComponentsOfferList :memberEmail="memberEmail"/>
            </div>
            <div v-else class="flex flex-col p-3">
                <h2 class="font-medium">W celu zakupu karnetu, najpierw należy przypisać kartę płatniczą do konta.</h2>
                <p>Wykonaj to za pomocą poniższego formularza</p>
                <div class="flex flex-col items-center pt-9">
                    <UForm :state="membersManagmentStore.creditCardDataToAdd" :validate="validateCreditCard" class="space-y-4" @submit="addNewPaymentMethod">  
                        <UFormGroup label="Numer karty" name="cardNumber" required>
                            <UInput v-model="membersManagmentStore.creditCardDataToAdd.cardNumber" label="cardNumber" placeholder="Numer Karty" />
                        </UFormGroup>
                        <UFormGroup label="Miesiąc wygaśnięcia" name="expirationMonth" required>
                            <UInput v-model="membersManagmentStore.creditCardDataToAdd.expirationMonth" label="expirationMonth" placeholder="Miesiąc" />
                        </UFormGroup>
                        <UFormGroup label="Rok wygaśnięcia" name="expirationYear" required>
                            <UInput v-model="membersManagmentStore.creditCardDataToAdd.expirationYear" label="expirationYear" placeholder="Rok" />
                        </UFormGroup>
                        <UFormGroup label="Numer CVC" name="cvc" required>
                            <UInput v-model="membersManagmentStore.creditCardDataToAdd.cvc" label="cvc" placeholder="Kod CVC / CVV" />
                        </UFormGroup>
                    
                        <UButton type="submit" color="blue">Zapisz nową kartę płatniczą</UButton>
                    </UForm>
                </div>
            </div>
        </div>
        
        <template #footer>
            <div class="flex flex-row justify-end gap-5">
                <UButton label="Anuluj" @click="closeShowNewPassModal" color="gray" icon="i-material-symbols-cancel" />
            </div>
        </template>
    </UCard>
</UModal>


</template>


<style>


</style>