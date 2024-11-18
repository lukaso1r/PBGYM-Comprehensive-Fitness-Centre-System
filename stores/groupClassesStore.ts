import type { 
    EditableGroupClassData, GroupClassWithTrainer,
    DefaultLoginData,

} from "~/types";

export const useGroupClassesStore = defineStore('groupClassesStore', () => {

    const { createEditableGroupClassObject } = useObjectFactory();

    const editableGroupClass = useState<EditableGroupClassData>(() => createEditableGroupClassObject());
    const groupClassesUpcoming = useState<GroupClassWithTrainer[]>(() => []);
    const groupClassesUpcomingByTrainerEmail = useState<GroupClassWithTrainer[]>(() => []);
    const groupClassesHistoricalByTrainerEmail = useState<GroupClassWithTrainer[]>(() => []);
    const groupClassesUpcomingForMember = useState<GroupClassWithTrainer[]>(() => []);

    const toast = useToast();

    // GET

    const getGroupClassesUpcoming = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<GroupClassWithTrainer[]>('https://pbgym.onrender.com/groupClasses/upcoming', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                groupClassesUpcoming.value = response;
                console.log('Nadchodzące zajęcia grupowe:', response);
                toast.add({title: 'Sukces', description: 'Pomyślnie pobrano nadchodzące zajęcia grupowe.'});
            } else {
                toast.add({title: 'Błąd', description: 'Nie udało się pobrać nadchodzących zajęć grupowych.'});
                throw new Error('Nie udało się pobrać nadchodzących zajęć grupowych.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getGroupClassesUpcomingByTrainerEmail = async (trainerEmail: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<GroupClassWithTrainer[]>(`https://pbgym.onrender.com/groupClasses/trainer/${trainerEmail}/upcoming`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                groupClassesUpcomingByTrainerEmail.value = response;
                console.log('Nadchodzące zajęcia grupowe prowadzone przez trenera:', response);
                toast.add({title: 'Sukces', description: 'Pomyślnie pobrano nadchodzące zajęcia grupowe prowadzone przez trenera.'});
            } else {
                toast.add({title: 'Błąd', description: 'Nie udało się pobrać nadchodzących zajęć grupowych prowadzonych przez trenera.'});
                throw new Error('Nie udało się pobrać nadchodzących zajęć grupowych prowadzonych przez trenera.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getGroupClassesHistoricalByTrainerEmail = async (trainerEmail: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<GroupClassWithTrainer[]>(`https://pbgym.onrender.com/groupClasses/trainer/${trainerEmail}/historical`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                groupClassesHistoricalByTrainerEmail.value = response;
                console.log('Historia zajęć grupowych prowadzonych przez trenera:', response);
                toast.add({title: 'Sukces', description: 'Pomyślnie pobrano historię zajęć grupowych prowadzonych przez trenera.'});
            } else {
                toast.add({title: 'Błąd', description: 'Nie udało się pobrać historii zajęć grupowych prowadzonych przez trenera.'});
                throw new Error('Nie udało się pobrać historii zajęć grupowych prowadzonych przez trenera.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getGroupClassesUpcomingForMember = async (memberEmail: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<GroupClassWithTrainer[]>(`https://pbgym.onrender.com/groupClasses/member/${memberEmail}/upcoming`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                groupClassesUpcomingForMember.value = response;
                console.log('Nadchodzące zajęcia grupowe dla członka:', response);
                toast.add({title: 'Sukces', description: 'Pomyślnie pobrano nadchodzące zajęcia grupowe dla członka.'});
            } else {
                toast.add({title: 'Błąd', description: 'Nie udało się pobrać nadchodzących zajęć grupowych dla członka.'});
                throw new Error('Nie udało się pobrać nadchodzących zajęć grupowych dla członka.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return {
        editableGroupClass,
        groupClassesUpcoming,
        groupClassesUpcomingByTrainerEmail,
        groupClassesHistoricalByTrainerEmail,

        getGroupClassesUpcoming,
        getGroupClassesUpcomingByTrainerEmail,
        getGroupClassesHistoricalByTrainerEmail,

    }
});