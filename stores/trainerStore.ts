import type { TrainerData, DefaultLoginData, TrainerEntries, TrainerDataToEdit } from '~/types';

export const useTrainerStore = defineStore('trainerStore', () => {

    const { createTrainerObject } = useObjectFactory();

    const trainerData = ref<TrainerData>(createTrainerObject());
    const allTrainers = ref<TrainerData[]>([] as TrainerData[]);
    const trainerEntries = ref<TrainerEntries[]>([] as TrainerEntries[]);
    const trainerTags = ref<string[]>(['Test', 'Lubię', 'Gziby'] as string[]);

    const toast = useToast();

        
    const doSomething = () => {
        return 'soon'
    }

    const getTrainerByEmail = async (email: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<TrainerData>(`https://pbgym.onrender.com/trainers/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                trainerData.value = response;
                console.log('Dane trenera:', response);
            } else {
                throw new Error('Nie udało się pobrać danych trenera.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getAllTrainers = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<TrainerData[]>('https://pbgym.onrender.com/trainers/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                allTrainers.value = response;
                console.log('Lista trenerów:', response);
                toast.add({ title: 'Sukces.', description: 'Lista trenerów została pobrana.' });
            } else {
                throw new Error('Nie udało się pobrać listy trenerów.');

            }
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Błąd.', description: 'Nie udało się pobrać listy trenerów.' });
        }
    }

    // DAĆ ADMINOWI UPRAWNIENIA DO WYŚWIETLANIA WEJŚĆ TRERNERA
    const getTrainerEntries = async (email?: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<TrainerEntries[]>('https://pbgym.onrender.com/trainers/getOwnGymEntries', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                trainerEntries.value = response;
                console.log('Lista wejść trenera:', response);
                toast.add({ title: 'Sukces.', description: 'Lista wejść trenera została pobrana.' });
            } else {
                throw new Error('Nie udało się pobrać listy wejść trenera.');

            }
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Błąd.', description: 'Nie udało się pobrać listy wejść trenera.' });
        }
    }

    // PUT
    
    const putUpdateTrainer = async (trainerData: TrainerDataToEdit, email: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<TrainerData>(`https://pbgym.onrender.com/trainers/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(trainerData)
            });
            if (response) {
                console.log('Zaktualizowane dane trenera:', response);
                toast.add({ title: 'Sukces.', description: 'Dane trenera zostały zaktualizowane.' });
            } else {
                throw new Error('Nie udało się zaktualizować danych trenera.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Błąd.', description: 'Nie udało się zaktualizować danych trenera.' });
        }
    }
    
    const putUpdateTrainerPassword = async (email: string, newPassword: string, oldPassword?: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<TrainerData>(`https://pbgym.onrender.com/trainers/changePassword/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify({ newPassword, oldPassword })
            });
            if (response) {
                console.log('Zaktualizowane hasło trenera:', response);
                toast.add({ title: 'Sukces.', description: 'Hasło trenera zostało zaktualizowane.' });
            } else {
                throw new Error('Nie udało się zaktualizować hasła trenera.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Błąd.', description: 'Nie udało się zaktualizować hasła trenera.' });
        }   
    }

    const putUpdateTrainerEmail = async (email: string, newEmail: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<TrainerData>(`https://pbgym.onrender.com/trainers/changeEmail/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify({ newEmail })
            });
            if (response) {
                console.log('Zaktualizowany email trenera:', response);
                toast.add({ title: 'Sukces.', description: 'Email trenera został zaktualizowany.' });
            } else {
                throw new Error('Nie udało się zaktualizować emaila trenera.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Błąd.', description: 'Nie udało się zaktualizować emaila trenera.' });
        }   
    }
    
    
    return {
        trainerData,
        allTrainers,
        trainerEntries,
        trainerTags,

        getTrainerByEmail,
        getAllTrainers,
        getTrainerEntries,
        putUpdateTrainer,
        putUpdateTrainerPassword,
        putUpdateTrainerEmail,


        doSomething
    }


});