import type { CreditCardData, LoggedMemberData, DefaultLoginData } from "~/types";

export const usePaymentStore = defineStore('paymentStore', () => {

    const cardData = useState<CreditCardData>(() => ({cardNumber: '', expirationMonth: '', expirationYear: '', cvc: ''}))
    const newCardData = useState<CreditCardData>(() => ({cardNumber: '', expirationMonth: '', expirationYear: '', cvc: ''}))
    const toast = useToast();

    const getHiddenCreditCardInfo = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<CreditCardData>(`https://pbgym.onrender.com/creditCardInfo/${useCookie<LoggedMemberData>('loggedMemberData').value.email}/hidden`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                cardData.value = response;
                console.log('Oferta po tytyle z ofert standardowych:', response);
            } else {
                throw new Error('Nie udało się pobrać oferty standardowej.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const deletePaymentMethod = async () => {
        try {
            await $fetch(`https://pbgym.onrender.com/creditCardInfo/${useCookie<LoggedMemberData>('loggedMemberData').value.email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            console.log('Usunięto metodę płatności.');
            toast.add({ title: 'Usunięto metodę płatności' });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const postPaymentMethod = async () => {
        console.log('newCardData.value:', newCardData.value);
        try {
            await $fetch(`https://pbgym.onrender.com/creditCardInfo/${useCookie<LoggedMemberData>('loggedMemberData').value.email}`, {
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
