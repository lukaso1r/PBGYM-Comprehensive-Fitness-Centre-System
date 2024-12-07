import type { DefaultLoginData } from '~/types';

export const useAdminLogsStore = defineStore('adminLogsStore', () => {

    const toast = useToast();
    const config = useRuntimeConfig()
    const backendUrl = config.public.backendUrl

    const sysLogs = ref<string>('');

    const getSystemLogs = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch('https://pbgym.onrender.com/logs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                sysLogs.value = response;
            } else {
                toast.add({title: 'Błąd', description: 'Nie udało się pobrać logów systemowych.'});
                throw new Error('Nie udało się pobrać logów systemowych.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    

    return {
        sysLogs,
        getSystemLogs
    };
});