import type { LoggedMemberData, DefaultLoginData } from "~/types";

export const useMembersManagmentStore = defineStore('membersManagment', () => {

    const memberByEmail = useState<LoggedMemberData>('memberByEmail', () => ({} as LoggedMemberData));
    const allMembers = useState<LoggedMemberData[]>('allMembers', () => ([] as LoggedMemberData[]));

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


    // PUT _______________________________________________________________

    const putMemberDetails = async (memberEmail: string) => {
        try {
            await $fetch(`https://pbgym.onrender.com/members/${memberEmail}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(memberByEmail.value)
            });
            console.log('Zaktualizowano dane członka.');
        } catch (error) {
            console.error('Error:', error);
        }
    }


    // DELETE _______________________________________________________________



    return {

    }

});
