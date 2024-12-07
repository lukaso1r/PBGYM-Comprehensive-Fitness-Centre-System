import type { MemberPaymentHistory, MemberGymEntriesHistory,  DefaultLoginData, ActiveMemberPass, LoggedMemberData, GymEntryData } from "~/types";

export const useLoggedMemberStore = defineStore('loggedMemberStore', () => {
    
    const memberPaymentHistory = useState<MemberPaymentHistory[]>(() => []);
    const memberGymEntriesHistory = useState<MemberGymEntriesHistory[]>(() => []);

    const memberMonthlyGymEntriesByEmail = ref({})
    const memberDailyGymMinutesByEmail = ref({})
    const groupClassesMonthlyByEmail = ref({})

    const config = useRuntimeConfig()
    const backendUrl = config.public.backendUrl

    const getMemberPaymentsHistory = async (email: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<MemberPaymentHistory[]>(`${backendUrl}/memberStatistics/getPaymentHistory/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                memberPaymentHistory.value = response;
                console.log('Historia płatności:', response);
            } else {
                throw new Error('Nie udało się pobrać historii płatności.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getMemberGymEntriesHistory = async (email: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<MemberGymEntriesHistory>(`${backendUrl}/members/getGymEntries/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                memberGymEntriesHistory.value = response;
                console.log('Historia wejść do siłowni:', response);
            } else {
                throw new Error('Nie udało się pobrać historii wejść do siłowni.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getMemberMonthlyGymEntriesByEmail = async (email: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<MemberGymEntriesHistory>(`${backendUrl}/memberStatistics/getMonthlyGymEntries/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                memberMonthlyGymEntriesByEmail.value = response;
                console.log('Historia wejść do siłowni:', response);
            } else {
                throw new Error('Nie udało się pobrać historii wejść do siłowni.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getMemberDailyGymMinutesByEmail = async (email: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch(`${backendUrl}/memberStatistics/getDailyGymMinutes/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                memberDailyGymMinutesByEmail.value = response;
                console.log('Historia minut na siłowni:', response);
            } else {
                throw new Error('Nie udało się pobrać historii minut na siłowni.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getGroupClassesMonthlyByEmail = async (email: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<GymEntryData[]>(`${backendUrl}/memberStatistics/getMonthlyGroupClasses/${email}`, {
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



    

    



    return {
        memberPaymentHistory,
        memberGymEntriesHistory,
        memberMonthlyGymEntriesByEmail,
        memberDailyGymMinutesByEmail,
        groupClassesMonthlyByEmail,

        getMemberPaymentsHistory,
        getMemberGymEntriesHistory,
        getMemberMonthlyGymEntriesByEmail,
        getMemberDailyGymMinutesByEmail,
        getGroupClassesMonthlyByEmail

    }

});