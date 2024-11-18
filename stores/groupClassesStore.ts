import type { 
    EditableGroupClassData, GroupClassWithTrainer,
    DefaultLoginData,

} from "~/types";

export const useGroupClassesStore = defineStore('groupClassesStore', () => {

    const { createEditableGroupClassObject } = useObjectFactory();

    const editableGroupClass = useState<EditableGroupClassData>(() => createEditableGroupClassObject());
    const groupClassesUpcoming = useState<GroupClassWithTrainer[]>(() => []);
    const groupClassesHistorical = useState<GroupClassWithTrainer[]>(() => []);
    const groupClassesUpcomingByTrainerEmail = useState<GroupClassWithTrainer[]>(() => []);
    const groupClassesHistoricalByTrainerEmail = useState<GroupClassWithTrainer[]>(() => []);
    const groupClassesUpcomingForMember = useState<GroupClassWithTrainer[]>(() => []);
    const groupClassesHistoricalForMember = useState<GroupClassWithTrainer[]>(() => []);

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

    const getGroupClassesHistorical = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<GroupClassWithTrainer[]>('https://pbgym.onrender.com/groupClasses/historical', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                groupClassesHistorical.value = response;
                console.log('Historia zajęć grupowych:', response);
                toast.add({title: 'Sukces', description: 'Pomyślnie pobrano historię zajęć grupowych.'});
            } else {
                toast.add({title: 'Błąd', description: 'Nie udało się pobrać historii zajęć grupowych.'});
                console.log('Error:', response);
                throw new Error('Nie udało się pobrać historii zajęć grupowych.');
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
                method: 'GET',
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
                method: 'GET',
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
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                groupClassesUpcomingForMember.value = response;
                console.log('Nadchodzące zajęcia grupowe dla klienta:', response);
                toast.add({title: 'Sukces', description: 'Pomyślnie pobrano nadchodzące zajęcia grupowe dla klienta.'});
            } else {
                toast.add({title: 'Błąd', description: 'Nie udało się pobrać nadchodzących zajęć grupowych dla klienta.'});
                throw new Error('Nie udało się pobrać nadchodzących zajęć grupowych dla klienta.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getGroupClassesHistoricalForMember = async (memberEmail: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<GroupClassWithTrainer[]>(`https://pbgym.onrender.com/groupClasses/member/${memberEmail}/historical`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                groupClassesHistoricalForMember.value = response;
                console.log('Historia zajęć grupowych dla klienta:', response);
                toast.add({title: 'Sukces', description: 'Pomyślnie pobrano historię zajęć grupowych dla klienta.'});
            } else {
                toast.add({title: 'Błąd', description: 'Nie udało się pobrać historii zajęć grupowych dla klienta.'});
                throw new Error('Nie udało się pobrać historii zajęć grupowych dla klienta.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // POST

    const postNewGroupClass = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch('https://pbgym.onrender.com/groupClasses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(toRaw(editableGroupClass.value))
            });
            if(response === 'Group class created successfully'){
                await getGroupClassesUpcoming();
                toast.add({title: 'Sukces', description: `Pomyślnie utworzono zajęcia grupowe: ${editableGroupClass.value.title}`});
                editableGroupClass.value = createEditableGroupClassObject();
                
            } else {
                toast.add({title: 'Błąd', description: 'Nie udało się utworzyć zajęć grupowych.'});
                throw new Error('Nie udało się utworzyć zajęć grupowych.');
            }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
            console.error('Error:', error.response);
        }
    }

    // TO FIX URL KOMAR ZEPSUŁ I NIE MOŻNA DODAĆ DO ZAJĘĆ GRUPOWYCH
    const postEnrollMemberToGroupClass = async (groupClassId: number, memberEmail: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch(`https://pbgym.onrender.com/groupClasses/${groupClassId}/enroll/${memberEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if(response === 'Member enrolled successfully'){
                toast.add({title: 'Sukces', description: `Pomyślnie zapisano na zajęcia grupowe: ${groupClassId}`});
            } else {
                toast.add({title: 'Błąd', description: 'Nie udało się zapisać na zajęcia grupowe.'});
                throw new Error('Nie udało się zapisać na zajęcia grupowe.');
            }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
            console.error('Error:', error.response);
        }
    }

    // PUT

    const putUpdateGroupClass = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch('https://pbgym.onrender.com/groupClasses', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(editableGroupClass.value)
            });
            if(response === 'Group class updated successfully'){
                toast.add({title: 'Sukces', description: `Pomyślnie zaktualizowano zajęcia grupowe: ${editableGroupClass.value.title}`});
                editableGroupClass.value = createEditableGroupClassObject();
            } else {
                toast.add({title: 'Błąd', description: 'Nie udało się zaktualizować zajęć grupowych.'});
                console.log('Error:', response);
                throw new Error('Nie udało się zaktualizować zajęć grupowych.');
            }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
            console.error('Error:', error.response);
        }
    }

    const putRemoveMemberFromGroupClass = async (groupClassId: number, memberEmail: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch(`https://pbgym.onrender.com/groupClasses/${groupClassId}/remove/${memberEmail}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if(response === 'Member signed out successfully'){
                toast.add({title: 'Sukces', description: `Pomyślnie usunięto z zajęć grupowych: ${groupClassId}`});
            } else {
                toast.add({title: 'Błąd', description: 'Nie udało się usunąć z zajęć grupowych.'});
                throw new Error('Nie udało się usunąć z zajęć grupowych.');
            }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
            console.error('Error:', error.response);
        }
    }

    // DELETE

    const deleteGroupClass = async (groupClassId: number) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch(`https://pbgym.onrender.com/groupClasses/${groupClassId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if(response === 'Group class deleted successfully'){
                toast.add({title: 'Sukces', description: `Pomyślnie usunięto zajęcia grupowe: ${groupClassId}`});
            } else {
                toast.add({title: 'Błąd', description: 'Nie udało się usunąć zajęć grupowych.'});
                console.log('Error:', response);
                throw new Error('Nie udało się usunąć zajęć grupowych.');
            }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
            console.error('Error:', error.response);
        }
    }
    


    return {
        editableGroupClass,
        groupClassesUpcoming,
        groupClassesUpcomingByTrainerEmail,
        groupClassesHistoricalByTrainerEmail,
        groupClassesUpcomingForMember,
        groupClassesHistoricalForMember,
        groupClassesHistorical,

        getGroupClassesUpcoming,
        getGroupClassesUpcomingByTrainerEmail,
        getGroupClassesHistoricalByTrainerEmail,
        getGroupClassesUpcomingForMember,
        getGroupClassesHistoricalForMember,
        getGroupClassesHistorical,

        postNewGroupClass,
        postEnrollMemberToGroupClass,

        putUpdateGroupClass,
        putRemoveMemberFromGroupClass,

        deleteGroupClass
    }
});