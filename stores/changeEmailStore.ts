import type { ChangeEmailData, DefaultLoginData, LoggedMemberData } from "~/types";

export const useChangeEmailStore = defineStore('changeEmailStore', () => {

    const changeEmailData = useState<ChangeEmailData>(() => ({newEmail: ''}))
    const loginStore = useLoginStore();

    const toast = useToast();
    const config = useRuntimeConfig()
    const backendUrl = config.public.backendUrl

    const changeEmail = async () => {
        async function changeEmailApiCall() {
            try {
                console.log("Z trycatcha", useCookie<DefaultLoginData>('defaultLoginData').value.jwt, useCookie<LoggedMemberData>('loggedMemberData').value.email, JSON.stringify(changeEmailData.value)  )
                const response = await useFetch(`${backendUrl}/members/changeEmail/${useCookie<LoggedMemberData>('loggedMemberData').value.email}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                    },
                    method: 'PUT',
                    body: JSON.stringify(changeEmailData.value)
                });
                console.log('response change email:', response);
                toast.add({title: 'Sukces', description: 'Pomyślnie zmieniono email'});
                loginStore.logOut();
                console.log('Wylogowano po zmianie emaila');
            }
            catch (error) {
                console.error('Error:', error);
                toast.add({title: 'Błąd', description: 'Nie udało się zmienić emaila'});
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