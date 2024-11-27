import type { DefaultLoginData, GymEntryData, PaymentData } from '~/types';
 
export const useStatisticsStore = defineStore('statisticsStore', () => {

    const fullPaymentListByEmail = useState<PaymentData[]>(() => []);
    const gymEntriesMonthlyByEmail = useState<GymEntryData[]>(() => []);
    const groupClassesMonthlyByEmail = ref({});
    const dailyGymMinutesByEmail = ref({});

    const monthlyGroupClassesByTrainerEmail = ref({});

    const trainerCount = ref(0);

    const paymentSumToday = ref('');
    const paymentSumMonthly = ref({});
    const paymentSumDaily = ref({});

    const passesRegistrationsToday = ref('');
    const passesRegistrationsMonthly = ref({});
    const passesRegistrationsDaily = ref({});

    const memberRegistrationsToday = ref('');
    const memberRegistrationsMonthly = ref({});
    const memberRegistrationsDaily = ref({});

    const memberCount = ref(0);
    const activePassCount = ref(0);

    const gymEntriesToday = ref('');
    const gymEntriesMonthly = ref({});
    const gymEntriesDaily = ref({});

    const groupClassesToday = ref('');
    const groupClassesMonthly = ref({});
    const groupClassesDaily = ref({});

    const toast = useToast();

    const getFullPaymentHistoryByEmail = async (email: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<PaymentData[]>(`/memberStatistics/getPaymentHistory/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                fullPaymentListByEmail.value = response;
                console.log('Pełna lista płatności:', response);
            } else {
                throw new Error('Nie udało się pobrać listy płatności.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getGymEntriesMonthlyByEmail = async (email: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<GymEntryData[]>(`https://pbgym.onrender.com/memberStatistics/getMonthlyGymEntries/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                gymEntriesMonthlyByEmail.value = response;
                console.log('Pełna lista wejść do siłowni:', response);
            } else {
                throw new Error('Nie udało się pobrać listy wejść do siłowni.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getGroupClassesMonthlyByEmail = async (email: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<GymEntryData[]>(`https://pbgym.onrender.com/memberStatistics/getMonthlyGroupClasses/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                groupClassesMonthlyByEmail.value = response;
                console.log('Pełna lista zajęć grupowych:', response);
            } else {
                throw new Error('Nie udało się pobrać listy zajęć grupowych.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getDailyGymMinutesByEmail = async (email: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<GymEntryData[]>(`https://pbgym.onrender.com/memberStatistics/getDailyGymMinutes/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                dailyGymMinutesByEmail.value = response;
                console.log('Pełna lista minut na siłowni:', response);
            } else {
                throw new Error('Nie udało się pobrać listy minut na siłowni.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getMonthlyGroupClassesByTrainerEmail = async (email: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<GymEntryData[]>(`https://pbgym.onrender.com/trainerStatistics/getMonthlyGroupClasses/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                monthlyGroupClassesByTrainerEmail.value = response;
                console.log('Pełna lista zajęć grupowych prowadzonych przez trenera:', response);
            } else {
                throw new Error('Nie udało się pobrać listy zajęć grupowych prowadzonych przez trenera.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getTrainerCount = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<number>('https://pbgym.onrender.com/statistics/trainerCount', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                trainerCount.value = response;
                console.log('Liczba trenerów:', response);
            } else {
                throw new Error('Nie udało się pobrać liczby trenerów.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getPaymentSumToday = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<string>('https://pbgym.onrender.com/statistics/paymentSums/today', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                paymentSumToday.value = response;
                console.log('Suma płatności dzisiaj:', response);
            } else {
                throw new Error('Nie udało się pobrać sumy płatności dzisiaj.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getPaymentSumMonthly = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch('https://pbgym.onrender.com/statistics/paymentSums/monthly', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                paymentSumMonthly.value = response;
                console.log('Suma płatności w tym miesiącu:', response);
            } else {
                throw new Error('Nie udało się pobrać sumy płatności w tym miesiącu.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getPaymentSumDaily = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch('https://pbgym.onrender.com/statistics/paymentSums/daily', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                paymentSumDaily.value = response;
                console.log('Suma płatności dziennie:', response);
            } else {
                throw new Error('Nie udało się pobrać sumy płatności dziennie.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getPassesRegistrationsToday = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<string>('https://pbgym.onrender.com/statistics/passesRegistrations/today', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                passesRegistrationsToday.value = response;
                console.log('Rejestracje karnetów dzisiaj:', response);
            } else {
                throw new Error('Nie udało się pobrać liczby rejestracji karnetów dzisiaj.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getPassesRegistrationsMonthly = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch('https://pbgym.onrender.com/statistics/passesRegistrations/monthly', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                passesRegistrationsMonthly.value = response;
                console.log('Rejestracje karnetów w tym miesiącu:', response);
            } else {
                throw new Error('Nie udało się pobrać liczby rejestracji karnetów w tym miesiącu.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getPassesRegistrationsDaily = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch('https://pbgym.onrender.com/statistics/passesRegistrations/daily', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                passesRegistrationsDaily.value = response;
                console.log('Rejestracje karnetów dziennie:', response);
            } else {
                throw new Error('Nie udało się pobrać liczby rejestracji karnetów dziennie.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getMemberRegistrationsToday = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<string>('https://pbgym.onrender.com/statistics/memberRegistrations/today', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                memberRegistrationsToday.value = response;
                console.log('Rejestracje członków dzisiaj:', response);
            } else {
                throw new Error('Nie udało się pobrać liczby rejestracji członków dzisiaj.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getMemberRegistrationsMonthly = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch('https://pbgym.onrender.com/statistics/memberRegistrations/monthly', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                memberRegistrationsMonthly.value = response;
                console.log('Rejestracje członków w tym miesiącu:', response);
            } else {
                throw new Error('Nie udało się pobrać liczby rejestracji członków w tym miesiącu.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getMemberRegistrationsDaily = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch('https://pbgym.onrender.com/statistics/memberRegistrations/daily', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                memberRegistrationsDaily.value = response;
                console.log('Rejestracje członków dziennie:', response);
            } else {
                throw new Error('Nie udało się pobrać liczby rejestracji członków dziennie.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getMemberCount = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<number>('https://pbgym.onrender.com/statistics/memberCount', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                memberCount.value = response;
                console.log('Liczba członków:', response);
            } else {
                throw new Error('Nie udało się pobrać liczby członków.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getGymEntriesToday = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<string>('https://pbgym.onrender.com/statistics/gymEntries/today', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                gymEntriesToday.value = response;
                console.log('Wejścia do siłowni dzisiaj:', response);
            } else {
                throw new Error('Nie udało się pobrać liczby wejść do siłowni dzisiaj.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getGymEntriesMonthly = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch('https://pbgym.onrender.com/statistics/gymEntries/monthly', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                gymEntriesMonthly.value = response;
                console.log('Wejścia do siłowni w tym miesiącu:', response);
            } else {
                throw new Error('Nie udało się pobrać liczby wejść do siłowni w tym miesiącu.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getGymEntriesDaily = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch('https://pbgym.onrender.com/statistics/gymEntries/daily', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                gymEntriesDaily.value = response;
                console.log('Wejścia do siłowni dziennie:', response);
            } else {
                throw new Error('Nie udało się pobrać liczby wejść do siłowni dziennie.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getGroupClassesToday = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<string>('https://pbgym.onrender.com/statistics/groupClasses/today', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                groupClassesToday.value = response;
                console.log('Liczba zajęć grupowych dzisiaj:', response);
            } else {
                throw new Error('Nie udało się pobrać liczby zajęć grupowych dzisiaj.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getGroupClassesMonthly = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch('https://pbgym.onrender.com/statistics/groupClasses/monthly', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                groupClassesMonthly.value = response;
                console.log('Liczba zajęć grupowych w tym miesiącu:', response);
            } else {
                throw new Error('Nie udało się pobrać liczby zajęć grupowych w tym miesiącu.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getGroupClassesDaily = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch('https://pbgym.onrender.com/statistics/groupClasses/daily', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                groupClassesDaily.value = response;
                console.log('Liczba zajęć grupowych dziennie:', response);
            } else {
                throw new Error('Nie udało się pobrać liczby zajęć grupowych dziennie.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getActivePassCount = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<number>('https://pbgym.onrender.com/statistics/activePassCount', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                activePassCount.value = response;
                console.log('Liczba aktywnych karnetów:', response);
            } else {
                throw new Error('Nie udało się pobrać liczby aktywnych karnetów.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    


    return {
        fullPaymentListByEmail, 
        gymEntriesMonthlyByEmail,
        groupClassesMonthlyByEmail,
        dailyGymMinutesByEmail,
        monthlyGroupClassesByTrainerEmail,
        trainerCount,
        paymentSumToday,
        paymentSumMonthly,
        paymentSumDaily,
        passesRegistrationsToday,
        passesRegistrationsMonthly,
        passesRegistrationsDaily,
        memberRegistrationsToday,
        memberRegistrationsMonthly,
        memberRegistrationsDaily,
        memberCount,
        gymEntriesToday,
        gymEntriesMonthly,
        gymEntriesDaily,
        groupClassesToday,
        groupClassesMonthly,
        groupClassesDaily,
        activePassCount,


        getTrainerCount,
        getPaymentSumToday,
        getPaymentSumMonthly,
        getPaymentSumDaily,
        getPassesRegistrationsToday,
        getPassesRegistrationsMonthly,
        getPassesRegistrationsDaily,
        getMemberRegistrationsToday,
        getMemberRegistrationsMonthly,
        getMemberRegistrationsDaily,
        getMemberCount,
        getGymEntriesToday,
        getGymEntriesMonthly,
        getGymEntriesDaily,
        getGroupClassesToday,
        getGroupClassesMonthly,
        getGroupClassesDaily,
        getActivePassCount,
        getFullPaymentHistoryByEmail,
        getGymEntriesMonthlyByEmail,
        getGroupClassesMonthlyByEmail,
        getDailyGymMinutesByEmail,
        getMonthlyGroupClassesByTrainerEmail
    };
});