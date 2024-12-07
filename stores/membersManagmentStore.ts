import type { 
    LoggedMemberData, DefaultLoginData, ChangeMemberDetailsData, 
    ChangePasswordData, MemberToRegisterData, MemberPaymentHistory, 
    MemberGymEntriesHistory, CreditCardData} from "~/types";

export const useMembersManagmentStore = defineStore('membersManagment', () => {

    const { createMemberToRegisterObject } = useObjectFactory();

    const memberByEmail = useState<LoggedMemberData>('memberByEmail', () => ({} as LoggedMemberData));
    const allMembers = useState<LoggedMemberData[]>('allMembers', () => ([] as LoggedMemberData[]));
    const memberDataToChange = useState<ChangeMemberDetailsData>('memberDataToChange', () => ({} as ChangeMemberDetailsData));
    const memberToRegister = useState<MemberToRegisterData>('memberToRegister', createMemberToRegisterObject);
    const memberPaymentHistory = useState<MemberPaymentHistory[]>('memberPaymentHistory', () => ([] as MemberPaymentHistory[]));
    const memberGymEntriesHistory = useState<MemberGymEntriesHistory[]>('MemberGymEntriesHistory', () => ([] as MemberGymEntriesHistory[]));
    const creditCardDataToAdd = useState<CreditCardData>('creditCardDataToAdd', () => ({} as CreditCardData));
    const paymentOptionsStatus = useState<CreditCardData>('paymentOptionsStatus', () => ({} as CreditCardData));

    const router = useRouter();
    const toast = useToast();
    const config = useRuntimeConfig()
    const backendUrl = config.public.backendUrl

    // GET _______________________________________________________________

    const getMemberByEmail = async (memberEmail: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<LoggedMemberData>(`${backendUrl}/members/${memberEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                memberByEmail.value = response;
                console.log('Dane klienta:', response);
            } else {
                throw new Error('Nie udało się pobrać danych klienta.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getAllMembers = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<LoggedMemberData[]>(`${backendUrl}/members/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                allMembers.value = response;
                console.log('Wszyscy członkowie:', response);
            } else {
                throw new Error('Nie udało się pobrać danych członków.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getMemberPaymentHistoryByEmail = async (memberEmail: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<MemberPaymentHistory[]>(`${backendUrl}/members/getPaymentHistory/${memberEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                memberPaymentHistory.value = response;
                console.log('Historia płatności klienta:', response);
            } else {
                toast.add({ title: 'Nie udało się pobrać historii płatności klienta' });
                throw new Error('Nie udało się pobrać historii płatności klienta.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getMemberGymEntriesHistoryByEmail = async (memberEmail: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<MemberGymEntriesHistory[]>(`${backendUrl}/members/getGymEntries/${memberEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                memberGymEntriesHistory.value = response;
                console.log('Historia wejść do siłowni klienta:', response);
            } else {
                toast.add({ title: 'Nie udało się pobrać historii wejść do siłowni klienta' });
                throw new Error('Nie udało się pobrać historii wejść do siłowni klienta.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getMemberPaymentOptionsStatus = async (memberEmail: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<CreditCardData[]>(`${backendUrl}/creditCardInfo/${memberEmail}/hidden`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                console.log('Status opcji płatności:', response);
                paymentOptionsStatus.value = response;
                toast.add({ title: 'Sprawdzono status opcji płatności klienta', description: 'Klient posiada przypisaną kartę płatniczą' });
                return true;
            // biome-ignore lint/style/noUselessElse: <explanation>
            } else {
                toast.add({ title: 'Nie udało się pobrać statusu opcji płatności', description: 'Klient nie ma przypisanej karty płatniczej.' });
                paymentOptionsStatus.value = response;
                throw new Error('Nie udało się pobrać statusu opcji płatności klienta.');
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    }

    // POST _______________________________________________________________

    const postRegisterNewMember = async () => {
        console.log('memberToRegister.value:', memberToRegister.value);
        try {
            await $fetch(`${backendUrl}/auth/registerMember`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(memberToRegister.value)
            });
            console.log('Dodano nowego klienta.');
            toast.add({ title: 'Dodano nowego klienta' });
            getAllMembers();
            memberToRegister.value = createMemberToRegisterObject();
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Nie udało się dodać nowego klienta' });
        }
    }

    const postNewCreditCardForMember = async (memberEmail: string) => {
        console.log('creditCardDataToAdd.value:', creditCardDataToAdd.value);
        try {
            await $fetch(`${backendUrl}/creditCardInfo/${memberEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(creditCardDataToAdd.value)
            });
            console.log('Dodano nową kartę płatniczą.');
            toast.add({ title: 'Dodano nową kartę płatniczą' });
            creditCardDataToAdd.value = {} as CreditCardData;
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Nie udało się dodać nowej karty płatniczej' });
        }
    }


    


    // PUT _______________________________________________________________

    const putMemberDetails = async (memberEmail: string) => {
        console.log('memberDataToChange.value:', memberDataToChange.value);
        try {
            await $fetch(`${backendUrl}/members/${memberEmail}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(memberDataToChange.value)
            });
            console.log('Zmieniono dane klienta.');
            toast.add({ title: 'Zmieniono dane klienta' });
            getMemberByEmail(memberEmail);
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Nie udało się zmienić danych klienta' });
        }
    }

    const putMemberPassword = async (memberEmail: string, newPassword: string) => {
        try {
            await $fetch(`${backendUrl}/members/changePassword/${memberEmail}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify({ newPassword })
            });
            console.log('Zmieniono hasło klienta.');
            toast.add({ title: 'Zmieniono hasło klienta' });
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Nie udało się zmienić hasła klienta' });
        }
    }

    const putMemberEmail = async (memberEmail: string, newEmail: string) => {
        try {
            await $fetch(`${backendUrl}/members/changeEmail/${memberEmail}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify({ newEmail })
            });
            console.log('Zmieniono email klienta.');
            toast.add({ title: 'Zmieniono email klienta' });
            router.push(`/admin-panel/zarzadzanie/klienci/${newEmail}`);
            
            await getMemberByEmail(newEmail);
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Nie udało się zmienić emaila klienta' });
        }
    }

    // DELETE _______________________________________________________________


    const clearData = () => {
        memberByEmail.value = {} as LoggedMemberData;
        allMembers.value = [] as LoggedMemberData[];
        memberDataToChange.value = {} as ChangeMemberDetailsData;
        memberToRegister.value = createMemberToRegisterObject();
        memberPaymentHistory.value = [] as MemberPaymentHistory[];
        memberGymEntriesHistory.value = [] as MemberGymEntriesHistory[];
        creditCardDataToAdd.value = {} as CreditCardData;
    }

    return {
        memberByEmail,
        allMembers,
        memberDataToChange,
        memberToRegister,
        memberPaymentHistory,
        memberGymEntriesHistory,
        creditCardDataToAdd,
        paymentOptionsStatus,

        getMemberByEmail,
        getAllMembers,
        getMemberPaymentHistoryByEmail,
        getMemberGymEntriesHistoryByEmail,
        getMemberPaymentOptionsStatus,

        putMemberDetails,
        putMemberPassword,
        putMemberEmail,

        postRegisterNewMember,
        postNewCreditCardForMember,

        clearData
        

    }

});
