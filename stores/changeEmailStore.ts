import type { ChangeEmailData, DefaultLoginData, LoggedMemberData } from "~/types";

export const useChangeEmailStore = defineStore('changeEmailStore', () => {

    const changeEmailData = useState<ChangeEmailData>(() => ({newEmail: ''}))
    const loginStore = useLoginStore();

    const changeEmail = async () => {
        async function changeEmailApiCall() {
            try {
                console.log("Z trycatcha", useCookie<DefaultLoginData>('defaultLoginData').value.jwt, useCookie<LoggedMemberData>('loggedMemberData').value.email, JSON.stringify(changeEmailData.value)  )
                const response = await useFetch(`https://pbgym.onrender.com/members/changeEmail/${useCookie<LoggedMemberData>('loggedMemberData').value.email}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                    },
                    method: 'PUT',
                    body: JSON.stringify(changeEmailData.value)
                });
                console.log('response change email:', response);
                loginStore.logOut();
                console.log('Wylogowano po zmianie emaila');
            }
            catch (error) {
                console.error('Error:', error);
                alert('Błąd zmiany emaila');
            }
        };
        await changeEmailApiCall();
        console.log('Koniec zmiany maila');
    }

    return {
        changeEmailData,
        changeEmail
    }
});