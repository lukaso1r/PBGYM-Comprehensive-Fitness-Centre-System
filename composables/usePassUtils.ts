export const usePassUtils = () => {

    const paymentStore = usePaymentStore();
    const passStore = usePassStore();

    const toast = useToast();

    const testFn = () => {
        console.log('testFn')
    }

    const buyNewPass = async (memberEmail: string, passId: number, workerEmail?: string) => {
        console.log('buyNewPass')
        console.log('test czy istnieje zapisana karta płatnicza, pobranie karty z ednpointu')
        await paymentStore.getHiddenCreditCardInfo(memberEmail);
        if(!isObjectEmpty(paymentStore.cardData)) {
            console.log('karta płatnicza istnieje', paymentStore.cardData)
        } else {
            console.log('brak karty płatniczej', paymentStore.cardData)
        }
        console.log('kupno karnetu', memberEmail, passId)
        await passStore.postNewPass(memberEmail, passId);
        toast.add({ title: 'Karnet zakupiony' });
        
    }

    return {
        testFn,
        buyNewPass
    };
};