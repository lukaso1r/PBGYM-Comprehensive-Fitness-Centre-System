import type { ChangePasswordData, LoggedMemberData, DefaultLoginData } from "~/types";

export const useChangePasswordStore = defineStore('changePasswordStore', () => {

    const config = useRuntimeConfig()
    const backendUrl = config.public.backendUrl
    const toast = useToast();

    const changePasswordData = useState<ChangePasswordData>(() => ({oldPassword: '', newPassword: ''}))

    const changePassword = async () => {
        async function changePasswordApiCall() {
            try {
                console.log("Z trycatcha", useCookie<DefaultLoginData>('defaultLoginData').value.jwt, useCookie<LoggedMemberData>('loggedMemberData').value.email, JSON.stringify(changePasswordData.value)  )
                const response = await useFetch(`${backendUrl}/members/changePassword/${useCookie<LoggedMemberData>('loggedMemberData').value.email}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                    },
                    method: 'PUT',
                    body: JSON.stringify(changePasswordData.value)
                });
                console.log('response change password:', response);
                toast.add({title: 'Sukces', description: 'Pomyślnie zmieniono hasło'});
            }
            catch (error) {
                console.error('Error:', error);
                toast.add({title: 'Błąd', description: 'Nie udało się zmienić hasła'});
                alert('Błąd zmiany hasła');
            }
        };
        await changePasswordApiCall();
    }

    return {
        changePasswordData,
        changePassword
    }
});