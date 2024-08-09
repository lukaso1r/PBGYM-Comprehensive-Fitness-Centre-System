import type { MemberToLogin } from "~/types";
import {useLocalStorage} from '@vueuse/core'

export const useLoginStore = defineStore('login', () => {

    const memberToLogin = useState<MemberToLogin>('memberToLogin', () => ({
        email: "",
        password: ""
    }));

    // TODO: add other user data
    const loggedUserData = useLocalStorage('loggedUserData', {
        jwt: '',
        userType: '',
    });

    const login = () => {
        async function loginMember() {
            try {
                // TODO: consider adding useLazyFetch etc.
                console.log('Próba logowania:', memberToLogin.value);
                const response = await fetch('https://pbgym.onrender.com/auth/authenticate', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(memberToLogin.value)
                });

                const data = await response.json();

                console.log('JWT:', data.jwt);
                loggedUserData.value.jwt = data.jwt;

                console.log('User Type:', data.userType);
                loggedUserData.value.userType = data.userType;

                switch (data.userType) {
                    case 'Member':
                        console.log('Member');
                        navigateTo('/twoj-profil');
                        break;
                    case 'Trainer':
                        console.log('/trener-panel');
                        navigateTo('/trener-panel');
                        break;
                    case 'Admin':
                        console.log('/admin-panel');
                        navigateTo('/admin-panel');
                        break;
                    default:
                        console.log('Błąd');
                        alert('Błąd logowania');
                        break;
                }
                clearData();
            
            } catch (error) {
                console.error('Error:', error);
                alert('Błąd logowania');
            }
        };

        loginMember();
        console.log("koniec login funcition");
    }

    const logOut = () => {
        loggedUserData.value.jwt = '';
        loggedUserData.value.userType = '';
        navigateTo('/');
    };

    const clearData = () => {
        memberToLogin.value = {
            email: "",
            password: ""
        };
    };

    return {
        memberToLogin,
        loggedUserData,
        login,
        logOut
    };

});