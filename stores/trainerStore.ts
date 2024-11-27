import type { TrainerData, DefaultLoginData, TrainerEntries, TrainerDataToEdit, TrainerOffer, TrainerWithOffers } from '~/types';

export const useTrainerStore = defineStore('trainerStore', () => {

    const loginStore = useLoginStore();
    const { 
        createTrainerObject, 
        createTrainerOfferObject,
        createTrainerDataToEditObject

    } = useObjectFactory();

    const trainerData = ref<TrainerData>(createTrainerObject());
    const allTrainers = ref<TrainerData[]>([] as TrainerData[]);
    const trainerEntries = ref<TrainerEntries[]>([] as TrainerEntries[]);
    const trainerOffer = ref<TrainerOffer>(createTrainerOfferObject())
    const trainerOffersByEmail = ref<TrainerOffer[]>([] as TrainerOffer[]);
    const allTrainersWithOffers = ref<TrainerWithOffers[]>([] as TrainerWithOffers[]);

    const toast = useToast();
    const router = useRouter();

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
            } else {
                throw new Error('Nie udało się pobrać listy trenerów.');

            }
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Błąd.', description: 'Nie udało się pobrać listy trenerów.' });
        }
    }

    const getAllTrainersWithOffers = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<TrainerWithOffers[]>('https://pbgym.onrender.com/trainerOffers/allTrainersWithOffers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response) {
                allTrainersWithOffers.value = response;
                console.log('Lista trenerów z ofertami:', response);
            } else {
                throw new Error('Nie udało się pobrać listy trenerów z ofertami.');

            }
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Błąd.', description: 'Nie udało się pobrać listy trenerów z ofertami.' });
        }
    }


    const getTrainerEntries = async (email?: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<TrainerEntries[]>(`https://pbgym.onrender.com/trainers/getGymEntries/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                trainerEntries.value = response;
                console.log('Lista wejść trenera:', response);
            } else {
                throw new Error('Nie udało się pobrać listy wejść trenera.');

            }
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Błąd.', description: 'Nie udało się pobrać listy wejść trenera.' });
        }
    }

    const getTrainerOfferByEmail = async (email: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<TrainerOffer[]>(`https://pbgym.onrender.com/trainerOffers/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                trainerOffersByEmail.value = response;
                console.log('Oferty trenera:', response);
            } else {
                throw new Error('Nie udało się pobrać ofert trenera.');

            }
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Błąd.', description: 'Nie udało się pobrać ofert trenera.' });
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
                if(useCookie<DefaultLoginData>('defaultLoginData').value.userType === 'Trainer'){
                    loginStore.logOut();
                }
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
        // biome-ignore lint/style/useConst: <explanation>
        let oldPasswordString = oldPassword ? oldPassword : '';
        try {
            response = await $fetch<TrainerData>(`https://pbgym.onrender.com/trainers/changePassword/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify({ newPassword, oldPasswordString })
            });
            if (response) {
                console.log('Zaktualizowane hasło trenera:', response);
                toast.add({ title: 'Sukces.', description: 'Hasło trenera zostało zaktualizowane.' });
                if(useCookie<DefaultLoginData>('defaultLoginData').value.userType === 'Trainer'){
                    loginStore.logOut();
                }
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
                if(useCookie<DefaultLoginData>('defaultLoginData').value.userType === 'Trainer'){
                    loginStore.logOut();
                }else{
                    getTrainerByEmail(newEmail);
                    router.push(`/admin-panel/zarzadzanie/trenerzy/${newEmail}`);
                }
            } else {
                throw new Error('Nie udało się zaktualizować emaila trenera.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Błąd.', description: 'Nie udało się zaktualizować emaila trenera.' });
        }   
    }

    const putUpdateTrainerOffer = async (trainerOffer: TrainerOffer, email: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        console.log('Oferta trenera:', trainerOffer, email);
        try {
            response = await $fetch<TrainerOffer>(`https://pbgym.onrender.com/trainerOffers/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(trainerOffer)
            });
            if (response) {
                console.log('Zaktualizowana oferta trenera:', response);
                toast.add({ title: 'Sukces.', description: 'Oferta trenera została zaktualizowana.' });
            } else {
                throw new Error('Nie udało się zaktualizować oferty trenera.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Błąd.', description: 'Nie udało się zaktualizować oferty trenera.' });
        }
    }


    // DELETE

    const deleteTrainerOffer = async (email: string, id: number) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<TrainerOffer>(`https://pbgym.onrender.com/trainerOffers/${email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(id)
            });
            if (response) {
                console.log('Usunięta oferta trenera:', response);
                toast.add({ title: 'Sukces.', description: 'Oferta trenera została usunięta.' });
                getTrainerOfferByEmail(email);
                if(useCookie<DefaultLoginData>('defaultLoginData').value.userType === 'Trainer'){
                    router.push('/trainer/oferty');    
                }else{
                    router.push(`/admin-panel/zarzadzanie/trenerzy/${email}`);
                }
            } else {
                throw new Error('Nie udało się usunąć oferty trenera.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Błąd.', description: 'Nie udało się usunąć oferty trenera.' });
        }
    }

    // POST

    const postTrainerOffer = async (trainerOffer: TrainerOffer, email: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<TrainerOffer>(`https://pbgym.onrender.com/trainerOffers/${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(toRaw(trainerOffer))
            });
            if (response) {
                console.log('Dodana oferta trenera:', response);
                toast.add({ title: 'Sukces.', description: 'Oferta trenera została dodana.' });
                getTrainerOfferByEmail(email);
            } else {
                throw new Error('Nie udało się dodać oferty trenera.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.add({ title: 'Błąd.', description: 'Nie udało się dodać oferty trenera.' });
        }
    }
        

    const clearData = () => {
        trainerData.value = createTrainerObject();
        allTrainers.value = [];
        trainerEntries.value = [];
    }
    
    
    return {
        trainerData,
        allTrainers,
        trainerEntries,
        trainerOffer,
        trainerOffersByEmail,
        allTrainersWithOffers,
        
        getTrainerByEmail,
        getAllTrainers,
        getTrainerEntries,
        getTrainerOfferByEmail,
        getAllTrainersWithOffers,
        
        putUpdateTrainer,
        putUpdateTrainerPassword,
        putUpdateTrainerEmail,
        putUpdateTrainerOffer,

        postTrainerOffer,
        
        deleteTrainerOffer,

        clearData,
    }


});