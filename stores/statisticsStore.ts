import type { StatsPaymentsByUserEmail, DefaultLoginData, StatsGymEntriesByUserEmail } from '~/types';
 
export const useStatisticsStore = defineStore('statisticsStore', () => {

    const fullPaymentList = useState<StatsPaymentsByUserEmail[]>(() => []);
    const fullGymEntriesList = useState<StatsGymEntriesByUserEmail[]>(() => []);

    // Funkcje zwracające wartości przefiltrowane po adresie email użytkownika
    // const PaymentListByEmail
    // const GymEntriesListByEmail

    const toast = useToast();

    const getfullPaymentList = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<StatsPaymentsByUserEmail>('https://pbgym.onrender.com/statistics/payments', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                fullPaymentList.value = response;
                console.log('Pełna lista płatności:', response);
            } else {
                throw new Error('Nie udało się pobrać listy płatności.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getfullGymEntriesList = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<StatsGymEntriesByUserEmail>('https://pbgym.onrender.com/statistics/gymEntries', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                fullGymEntriesList.value = response;
                console.log('Pełna lista wejść do siłowni:', response);
            } else {
                throw new Error('Nie udało się pobrać listy wejść do siłowni.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return {
        fullPaymentList, 
        fullGymEntriesList,

        getfullPaymentList,
        getfullGymEntriesList
    };
});