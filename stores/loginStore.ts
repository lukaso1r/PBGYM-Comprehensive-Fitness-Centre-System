import type {  UserToLoginCredentials,  DefaultLoginData,  LoggedMemberData,  LoggedWorkerData, TrainerData  } from "~/types";

export const useLoginStore = defineStore('login', () => {

    const config = useRuntimeConfig()
    const backendUrl = config.public.backendUrl

    const toast = useToast();

    const userToLoginCredentials = useState<UserToLoginCredentials>('userToLoginCredentials', () => ({
        email: "",
        password: ""
    }));

    const defaultLoginData = useCookie<DefaultLoginData>('defaultLoginData', {
        maxAge: dayInMilliseconds.value,
        expires: nextDayDate.value 
    });
      
    const loggedMemberData = useCookie<LoggedMemberData>('loggedMemberData', {
        maxAge: dayInMilliseconds.value,
        expires: nextDayDate.value 
    });

    const loggedWorkerData = useCookie<LoggedWorkerData>('loggedWorkerData', {
        maxAge: dayInMilliseconds.value,
        expires: nextDayDate.value 
    });

    const loggedTrainerData = useCookie<TrainerData>('loggedTrainerData', {
        maxAge: dayInMilliseconds.value,
        expires: nextDayDate.value 
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
                    toast.add({title: 'Błąd', description: 'Błąd logowania'});
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
                            toast.add({title: 'Błąd', description: 'Błąd pobierania danych użytkownika'});
                            alert('Błąd pobierania danych użytkownika');
                        } else if (data.value) {
                            toast.add({title: 'Sukces', description: 'Zalogowano pomyślnie'});
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
                        console.log('/trainer');
                        const { data, error } = await useFetch<TrainerData>(`https://pbgym.onrender.com/trainers/${userToLoginCredentials.value.email}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${defaultLoginData.value.jwt}`
                            },
                            method: 'GET'
                        });
                        if (error.value) {
                            toast.add({title: 'Błąd', description: 'Błąd pobierania danych trenera'});
                            console.error('Error:', error.value);
                            alert('Błąd pobierania danych trenera');
                        } else if (data.value) {
                            loggedTrainerData.value = data.value;
                            toast.add({title: 'Sukces', description: 'Zalogowano pomyślnie'});
                            console.log('Dane z serwera loogedTrainerData:', toRaw(loggedTrainerData.value));
                            navigateTo('/trainer');
                        } else {
                            console.error('Brak danych w odpowiedzi');
                            alert('Brak danych w odpowiedzi');
                        }
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
                            toast.add({title: 'Błąd', description: 'Błąd pobierania danych workera lub admina'});
                            console.error('Error:', error.value);
                            alert('Błąd pobierania danych workera lub admina');
                        } else if (data.value) {
                            loggedWorkerData.value = data.value;
                            toast.add({title: 'Sukces', description: 'Zalogowano pomyślnie'});  
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
        loggedWorkerData.value = {} as LoggedWorkerData
        loggedTrainerData.value = {} as TrainerData
        toast.add({title: 'Sukces', description: 'Wylogowano pomyślnie'});
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
        loggedTrainerData,
        login,
        logOut
    };

});