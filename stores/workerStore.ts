import type { Worker, DefaultLoginData, ChangeWorkerPasswordData, NewWorkerData, LoggedWorkerData } from "~/types"

export const useWorkerStore = defineStore('workerStore', () => {
    const allWorkers = useState<Worker[]>(() => ([]));
    const permissionList = <string[]>['ADMIN', 'STATISTICS', 'USER_MANAGEMENT', 'NEWSLETTER', 'PASS_MANAGEMENT', 'GROUP_CLASSES_MANAGEMENT', 'BLOG', 'SHOP_MANAGEMENT']
    const loginStore = useLoginStore();

    const toast = useToast()


    const getAllWorkers = async () => {
        try {
            const { data, error } = await useFetch<Worker[]>('https://pbgym.onrender.com/workers/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });

            if (error.value) {
                throw new Error('Błąd pobrania pracowników');
            }
            
            console.log('Dane z serwera:', data.value);

            if (data.value) {
                allWorkers.value = data.value;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Błąd pobrania pracowników');
        }
    }

    const getWorkerByEmail = () =>{
        return 'soon'
    }

    const changeWorkerData = async (worker: Worker) => {
        async function changeWorkerDataApiCall() {
            console.log(' changeWorkerDataApiCall Worker:', worker);
            try {
                const response = await useFetch(`https://pbgym.onrender.com/workers/${worker.email}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                    },
                    method: 'PUT',
                    body: JSON.stringify(
                        {
                            "name": worker.name,
                            "surname": worker.surname,
                            "birthdate": worker.birthdate,
                            "gender": worker.gender,
                            "pesel": worker.pesel,
                            "phoneNumber": worker.phoneNumber,
                            "idCardNumber": worker.idCardNumber,
                            "address": {
                                "city": worker.address.city,
                                "streetName": worker.address.streetName,
                                "buildingNumber": worker.address.buildingNumber,
                                "apartmentNumber": worker.address.apartmentNumber,
                                "postalCode": worker.address.postalCode
                            }
                        }
                    )
                });
                console.log('response change worker data:', response);
            }
            catch (error) {
                console.error('Error:', error);
                alert('Błąd zmiany danych pracownika');
            }
        };
        await changeWorkerDataApiCall();
        console.log('Zmieniono dane pracownika', worker)
    }

    const changeWorkerPassowrd = async (changePasswordState: ChangeWorkerPasswordData) => {
        async function changePasswordApiCall() {
            try {
                console.log("Z trycatcha", useCookie<DefaultLoginData>('defaultLoginData').value.jwt, JSON.stringify(changePasswordState)  )
                const response = await useFetch(`https://pbgym.onrender.com/workers/changePassword/${changePasswordState.email}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                    },
                    method: 'PUT',
                    body: JSON.stringify({
                        oldPassword: changePasswordState.oldPassword,
                        newPassword: changePasswordState.newPassword
                    })
                });
                console.log('response change password:', response);
            }
            catch (error) {
                console.error('Error:', error);
                alert('Błąd zmiany hasła');
            }
        };
        await changePasswordApiCall();
        console.log('Zmieniono hasło pracownika', changePasswordState)
    }

    const changeWorkerPermissions = async (position: string, permissions: string[], email: string) => {
        async function changePermissionsApiCall() {
            try {
                const response = await useFetch(`https://pbgym.onrender.com/workers/authority/${email}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                    },
                    method: 'PUT',
                    body: JSON.stringify({
                        position: position,
                        permissions: permissions
                    })
                });
                console.log('response change permissions:', response);
            }
            catch (error) {
                console.error('Error:', error);
                alert('Błąd zmiany uprawnień');
            }
        };
        await changePermissionsApiCall();
        console.log('Zmieniono uprawnienia pracownika', permissions)
    }

    const changeWorkerEmail = async (oldEmail: string, newEmail: string) => {
        async function changeEmailApiCall() {
            try {
                const response = await useFetch(`https://pbgym.onrender.com/workers/changeEmail/${oldEmail}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                    },
                    method: 'PUT',
                    body: JSON.stringify({
                        newEmail: newEmail
                    })
                });
                console.log('response change email:', response);
                loginStore.logOut();
            }
            catch (error) {
                console.error('Error:', error);
                alert('Błąd zmiany emaila');
            }
        };
        await changeEmailApiCall();
        console.log('Zmieniono email pracownika', newEmail)
    }

    const addNewWorker = async (worker: NewWorkerData) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            // Wysyłanie zapytania do serwera
            response = await $fetch('https://pbgym.onrender.com/auth/registerWorker', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`,
                },
                method: 'POST',
                body: worker
            });
    
            // Jeśli serwer zwraca sukces
            console.log('Full server response:', response);
    
            if (response === 'Worker registered successfully') {
                toast.add({ title: 'Dodano pracownika', description: `${worker.email}` });
            } else {
                throw new Error(response || 'Nie udało się dodać pracownika.');
            }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
            console.log('Full server response:', response);
    
            // Sprawdzenie, czy błąd ma pole statusCode (HTTP status)
            if (error.response && error.response.status === 409) {
                console.error('Conflict (409): Email already in use.');
                toast.add({ title: 'Błąd dodania pracownika', description: 'Ten adres email jest już zarejestrowany.' });
            } else {
                // Obsługa innych błędów
                const errorMessage = error?.response?.status || error.message || 'Nieznany błąd';
                toast.add({ title: 'Błąd dodania pracownika', description: `${worker.email}: ${errorMessage}` });
                console.error('Error:', error);
            }
        }
    };

    return {
        allWorkers,
        permissionList,
        getAllWorkers,
        getWorkerByEmail,
        changeWorkerData,
        changeWorkerPassowrd,
        changeWorkerPermissions,
        changeWorkerEmail,
        addNewWorker
    }
        
})