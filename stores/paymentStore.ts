import type { CreditCardData, LoggedMemberData, DefaultLoginData } from "~/types";

export const usePaymentStore = defineStore('paymentStore', () => {

    const cardData = useState<CreditCardData>(() => ({} as CreditCardData))
    const newCardData = useState<CreditCardData>(() => ({} as CreditCardData))
    const toast = useToast();
    const config = useRuntimeConfig()
    const backendUrl = config.public.backendUrl

    const getHiddenCreditCardInfo = async (memberEmail: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<CreditCardData>(`${backendUrl}/creditCardInfo/${useCookie<LoggedMemberData>('loggedMemberData').value.email}/hidden`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                cardData.value = response;
                console.log('Dane karty kredytowej:', response);
            } else {
                throw new Error('Nie udało się pobrać oferty standardowej.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const deletePaymentMethod = async (memberEmail: string) => {
        try {
            await $fetch(`${backendUrl}/creditCardInfo/${memberEmail}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            console.log('Usunięto metodę płatności.');
            cardData.value = {} as CreditCardData;
            toast.add({ title: 'Usunięto metodę płatności' });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const postPaymentMethod = async (memberEmail: string) => {
        console.log('newCardData.value:', newCardData.value);
        try {
            await $fetch(`${backendUrl}/creditCardInfo/${memberEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(newCardData.value)
            });
            console.log('Dodano metodę płatności.');
            toast.add({ title: 'Dodano metodę płatności' });
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Nie udało się dodać metody płatności' });
        }
    }

    return {
        cardData,
        newCardData,

        getHiddenCreditCardInfo,
        deletePaymentMethod,
        postPaymentMethod,

    }

});
