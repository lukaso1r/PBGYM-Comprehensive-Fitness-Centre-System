import type { Worker, DefaultLoginData } from "~/types"

export const useWorkerStore = defineStore('workerStore', () => {
    const allWorkers = useState<Worker[]>(() => ([]));

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

            // Logowanie danych w konsoli
            console.log('Dane z serwera:', data.value);

            // Aktualizacja stanu `worker`
            if (data.value) {
                allWorkers.value = data.value;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Błąd pobrania pracowników');
        }
    }

    return {
        allWorkers,
        getAllWorkers
    }
        
})