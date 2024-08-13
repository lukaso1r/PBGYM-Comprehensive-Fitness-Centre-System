import type { ChangePasswordData, LoggedMemberData, DefaultLoginData } from "~/types";

export const useChangePasswordStore = defineStore('changePasswordStore', () => {

    const changePasswordData = useState<ChangePasswordData>(() => ({oldPassword: '', newPassword: ''}))

    const changePassword = async () => {
        async function changePasswordApiCall() {
            try {
                console.log("Z trycatcha", useCookie<DefaultLoginData>('defaultLoginData').value.jwt, useCookie<LoggedMemberData>('loggedMemberData').value.email, JSON.stringify(changePasswordData.value)  )
                const response = await useFetch(`https://pbgym.onrender.com/members/changePassword/${useCookie<LoggedMemberData>('loggedMemberData').value.email}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                    },
                    method: 'PUT',
                    body: JSON.stringify(changePasswordData.value)
                });
                console.log('response change password:', response);
            }
            catch (error) {
                console.error('Error:', error);
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