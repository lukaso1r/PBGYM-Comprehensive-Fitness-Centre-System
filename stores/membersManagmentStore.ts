import type { LoggedMemberData, DefaultLoginData, ChangeMemberDetailsData, ChangePasswordData, MemberToRegisterData} from "~/types";

export const useMembersManagmentStore = defineStore('membersManagment', () => {

    const { createMemberToRegisterObject } = useObjectFactory();

    const memberByEmail = useState<LoggedMemberData>('memberByEmail', () => ({} as LoggedMemberData));
    const allMembers = useState<LoggedMemberData[]>('allMembers', () => ([] as LoggedMemberData[]));
    const memberDataToChange = useState<ChangeMemberDetailsData>('memberDataToChange', () => ({} as ChangeMemberDetailsData));
    const memberToRegister = useState<MemberToRegisterData>('memberToRegister', createMemberToRegisterObject);

    const router = useRouter();
    const toast = useToast();

    // GET _______________________________________________________________

    const getMemberByEmail = async (memberEmail: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<LoggedMemberData>(`https://pbgym.onrender.com/members/${memberEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                memberByEmail.value = response;
                console.log('Dane członka:', response);
            } else {
                throw new Error('Nie udało się pobrać danych członka.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getAllMembers = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<LoggedMemberData[]>('https://pbgym.onrender.com/members/all', {
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

    // POST _______________________________________________________________

    const postRegisterNewMember = async () => {
        console.log('memberToRegister.value:', memberToRegister.value);
        try {
            await $fetch('https://pbgym.onrender.com/auth/registerMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(memberToRegister.value)
            });
            console.log('Dodano nowego członka.');
            toast.add({ title: 'Dodano nowego członka' });
            getAllMembers();
            memberToRegister.value = createMemberToRegisterObject();
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Nie udało się dodać nowego członka' });
        }
    }

    // PUT _______________________________________________________________

    const putMemberDetails = async (memberEmail: string) => {
        console.log('memberDataToChange.value:', memberDataToChange.value);
        try {
            await $fetch(`https://pbgym.onrender.com/members/${memberEmail}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(memberDataToChange.value)
            });
            console.log('Zmieniono dane członka.');
            toast.add({ title: 'Zmieniono dane członka' });
            getMemberByEmail(memberEmail);
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Nie udało się zmienić danych członka' });
        }
    }

    const putMemberPassword = async (memberEmail: string, newPassword: string) => {
        try {
            await $fetch(`https://pbgym.onrender.com/members/changePassword/${memberEmail}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify({ newPassword })
            });
            console.log('Zmieniono hasło członka.');
            toast.add({ title: 'Zmieniono hasło członka' });
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Nie udało się zmienić hasła członka' });
        }
    }

    const putMemberEmail = async (memberEmail: string, newEmail: string) => {
        try {
            await $fetch(`https://pbgym.onrender.com/members/changeEmail/${memberEmail}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify({ newEmail })
            });
            console.log('Zmieniono email członka.');
            toast.add({ title: 'Zmieniono email członka' });
            router.push(`/admin-panel/zarzadzanie/klienci/${newEmail}`);
            
            await getMemberByEmail(newEmail);
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Nie udało się zmienić emaila członka' });
        }
    }

    // DELETE _______________________________________________________________


    const clearData = () => {
        memberByEmail.value = {} as LoggedMemberData;
        allMembers.value = [] as LoggedMemberData[];
        memberDataToChange.value = {} as ChangeMemberDetailsData;
    }

    return {
        memberByEmail,
        allMembers,
        memberDataToChange,
        memberToRegister,

        getMemberByEmail,
        getAllMembers,

        putMemberDetails,
        putMemberPassword,
        putMemberEmail,

        postRegisterNewMember,

        clearData
        

    }

});
