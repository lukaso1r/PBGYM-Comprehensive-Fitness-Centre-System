import type { UserToLoginCredentials, DefaultLoginData, LoggedMemberData, LoggedWorkerData  } from "~/types";

export const useLoginStore = defineStore('login', () => {

    const userToLoginCredentials = useState<UserToLoginCredentials>('userToLoginCredentials', () => ({
        email: "",
        password: ""
    }));

    const defaultLoginData = useCookie<DefaultLoginData>('defaultLoginData', {
        maxAge: weekInMilliseconds.value,
        expires: nextWeekDate.value 
    });
      
    const loggedMemberData = useCookie<LoggedMemberData>('loggedMemberData', {
        maxAge: weekInMilliseconds.value,
        expires: nextWeekDate.value 
    });

    const loggedWorkerData = useCookie<LoggedWorkerData>('loggedWorkerData', {
        maxAge: weekInMilliseconds.value,
        expires: nextWeekDate.value 
    });
    
    const login = () => {
        async function loginUser() {
            try {
                // TODO: consider adding useLazyFetch etc.
                console.log('Próba logowania:', userToLoginCredentials.value);
                const { data, error } = await useFetch<DefaultLoginData>('https://pbgym.onrender.com/auth/authenticate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userToLoginCredentials.value)
                });

                if (error.value) {
                    console.error('Error:', error.value);
                    alert('Błąd logowania');
                    throw new Error('Błąd logowania');
                // biome-ignore lint/style/noUselessElse: <explanation>
                } else if (data.value) {
                    defaultLoginData.value = data.value;
                    console.log('Dane z serwera:', toRaw(defaultLoginData.value));
                } else {
                    console.error('Brak danych w odpowiedzi');
                    alert('Brak danych w odpowiedzi');
                    throw new Error('Brak danych w odpowiedzi');
                }

                console.log("Próba otrzymania danych użytkownika po zalogowaniu");         
                switch (defaultLoginData.value.userType) {
                    case 'Member': {
                        console.log('Member');
                        const { data, error } = await useFetch<LoggedMemberData>(`https://pbgym.onrender.com/members/${userToLoginCredentials.value.email}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${defaultLoginData.value.jwt}`
                            },
                            method: 'GET'
                        });
                        if (error.value) {
                            console.error('Error:', error.value);
                            alert('Błąd pobierania danych użytkownika');
                        } else if (data.value) {
                            loggedMemberData.value = data.value;
                            console.log('Dane z serwera loggedMemberData:', toRaw(loggedMemberData.value));
                            navigateTo('/twoj-profil');
                        } else {
                            console.error('Brak danych w odpowiedzi');
                            alert('Brak danych w odpowiedzi');
                        }
                        break;
                    }
                    case 'Trainer': {
                        // TODO: fetch trainer data
                        console.log('/trener-panel');
                        navigateTo('/trener-panel');
                        break;
                    }
                    case 'Worker': {
                        console.log('Worker or Admin');
                        const { data, error } = await useFetch<LoggedWorkerData>(`https://pbgym.onrender.com/workers/${userToLoginCredentials.value.email}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${defaultLoginData.value.jwt}`
                            },
                            method: 'GET'
                        });
                        if (error.value) {
                            console.error('Error:', error.value);
                            alert('Błąd pobierania danych workera lub admina');
                        } else if (data.value) {
                            loggedWorkerData.value = data.value;
                            console.log('Dane z serwera loggedWorkerData:', toRaw(loggedWorkerData.value));
                            navigateTo('/admin-panel');
                        } else {
                            console.error('Brak danych w odpowiedzi');
                            alert('Brak danych w odpowiedzi');
                        }
                        break;
                    }
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

        loginUser();
        console.log("koniec login funcition");
    }

    const logOut = () => {
        defaultLoginData.value = {} as DefaultLoginData
        loggedMemberData.value = {} as LoggedMemberData
        navigateTo('/');
    };

    const clearData = () => {
        userToLoginCredentials.value = {
            email: "",
            password: ""
        };
    };

    return {
        userToLoginCredentials,
        defaultLoginData,
        loggedMemberData,
        loggedWorkerData,
        login,
        logOut
    };

});