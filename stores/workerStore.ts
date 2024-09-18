import type { Worker, DefaultLoginData, ChangeWorkerPasswordData } from "~/types"

export const useWorkerStore = defineStore('workerStore', () => {
    const allWorkers = useState<Worker[]>(() => ([]));
    const permissionList = <string[]>['ADMIN', 'STATISTICS', 'USER_MANAGEMENT', 'NEWSLETTER', 'PASS_MANAGEMENT', 'GROUP_CLASSES_MANAGEMENT', 'BLOG', 'SHOP_MANAGEMENT']


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

    const changeWorkerData = (worker: Worker) => {
        console.log('Zaktualizowano pracownika', worker)
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


    return {
        allWorkers,
        permissionList,
        getAllWorkers,
        getWorkerByEmail,
        changeWorkerData,
        changeWorkerPassowrd
    }
        
})