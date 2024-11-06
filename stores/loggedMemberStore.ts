import type { MemberPaymentHistory, MemberGymEntriesHistory,  DefaultLoginData, ActiveMemberPass, LoggedMemberData } from "~/types";

export const useLoggedMemberStore = defineStore('loggedMemberStore', () => {
    
    const memberPaymentHistory = useState<MemberPaymentHistory[]>(() => []);
    const memberGymEntriesHistory = useState<MemberGymEntriesHistory[]>(() => []);

    const getMemberPaymentsHistory = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<MemberPaymentHistory>('https://pbgym.onrender.com/members/getOwnPayments', {
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

    const getMemberGymEntriesHistory = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<MemberGymEntriesHistory>('https://pbgym.onrender.com/members/getOwnGymEntries', {
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

    

    



    return {
        memberPaymentHistory,
        memberGymEntriesHistory,

        getMemberPaymentsHistory,
        getMemberGymEntriesHistory,
    }

});