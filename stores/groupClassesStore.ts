import type { 
    EditableGroupClassData, GroupClassWithTrainer,
    DefaultLoginData, GroupClassMember

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
    const groupClassesMembers = useState<GroupClassMember[]>(() => []);

    const toast = useToast();
    const router = useRouter();
    const config = useRuntimeConfig()
    const backendUrl = config.public.backendUrl

    // GET

    const getGroupClassesUpcoming = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<GroupClassWithTrainer[]>(`${backendUrl}/groupClasses/upcoming`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response) {
                groupClassesUpcoming.value = response;
                console.log('Nadchodzące zajęcia grupowe:', response);
            } else {
                toast.add({title: 'Błąd', description: 'Nie udało się pobrać nadchodzących zajęć grupowych.'});
                throw new Error('Nie udało się pobrać nadchodzących zajęć grupowych.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getGroupClassesMembers = async (groupClassId: number) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<GroupClassMember[]>(`${backendUrl}/groupClasses/${groupClassId}/members`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                groupClassesMembers.value = response;
                console.log('Członkowie zajęć grupowych:', response);
            } else {
                throw new Error('Nie udało się pobrać członków zajęć grupowych.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.add({title: 'Błąd', description: 'Nie udało się pobrać członków zajęć grupowych.'});
        }
    }

    const getGroupClassesHistorical = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<GroupClassWithTrainer[]>(`${backendUrl}/groupClasses/historical`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                groupClassesHistorical.value = response;
                console.log('Historia zajęć grupowych:', response);
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
            response = await $fetch<GroupClassWithTrainer[]>(`${backendUrl}/groupClasses/trainer/${trainerEmail}/upcoming`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                groupClassesUpcomingByTrainerEmail.value = response;
                console.log('Nadchodzące zajęcia grupowe prowadzone przez trenera:', response);
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
            response = await $fetch<GroupClassWithTrainer[]>(`${backendUrl}/groupClasses/trainer/${trainerEmail}/historical`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                groupClassesHistoricalByTrainerEmail.value = response;
                console.log('Historia zajęć grupowych prowadzonych przez trenera:', response);
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
            response = await $fetch<GroupClassWithTrainer[]>(`${backendUrl}/groupClasses/member/${memberEmail}/upcoming`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                groupClassesUpcomingForMember.value = response;
                console.log('Nadchodzące zajęcia grupowe dla klienta:', response);
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
            response = await $fetch<GroupClassWithTrainer[]>(`${backendUrl}/groupClasses/member/${memberEmail}/historical`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                groupClassesHistoricalForMember.value = response;
                console.log('Historia zajęć grupowych dla klienta:', response);
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
            response = await $fetch(`${backendUrl}/groupClasses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(toRaw(editableGroupClass.value))
            });
            if(response === 'Group class created successfully'){
                await getGroupClassesUpcoming();
                await getGroupClassesUpcomingByTrainerEmail(editableGroupClass.value.trainerEmail);
                toast.add({title: 'Sukces', description: `Pomyślnie utworzono zajęcia grupowe: ${editableGroupClass.value.title}`});
                editableGroupClass.value = createEditableGroupClassObject();
                return true;
            // biome-ignore lint/style/noUselessElse: <explanation>
            } else {
                throw new Error('Nie udało się utworzyć zajęć grupowych.');
            }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
            console.error('Error:', error.response);
            switch (error.response.status) {
                case 409:
                    toast.add({title: 'Błąd', description: 'Zajęcia grupowe nakładają się na inne.'});
                    break;
                case 400:
                    toast.add({title: 'Błąd', description: 'Niepoprawne data.'});
                    break;
                case 403:
                    toast.add({title: 'Błąd', description: 'Nie masz uprawnień do utworzenia zajęć grupowych.'});
                    break;
                case 404:
                    toast.add({title: 'Błąd', description: 'Nie znaleziono trenera.'});
                    break;	
                default:
                    toast.add({title: 'Błąd', description: 'Nie udało się utworzyć zajęć grupowych.'});
            }
            return false
        }
    }

    // TO FIX URL KOMAR ZEPSUŁ I NIE MOŻNA DODAĆ DO ZAJĘĆ GRUPOWYCH
    const postEnrollMemberToGroupClass = async (groupClassId: number, memberEmail: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch(`${backendUrl}/groupClasses/member/${memberEmail}/enroll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(groupClassId)
            });
            if(response){
                toast.add({title: 'Sukces', description: 'Pomyślnie zapisano na zajęcia grupowe'});
                await getGroupClassesUpcoming()
                await getGroupClassesUpcomingForMember(memberEmail);
                if(useCookie<DefaultLoginData>('defaultLoginData').value.userType==="Worker"){
                    await getGroupClassesMembers(groupClassId);
                }
                return true
            // biome-ignore lint/style/noUselessElse: <explanation>
            } else {
                throw new Error('Nie udało się utworzyć zajęć grupowych.');
            }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
            console.error('Error:', error.response);
            switch (error.response.status) {
                case 409:
                    toast.add({title: 'Błąd', description: 'Zajęcia grupowe są już zapełnione.'});
                    break;
                case 400:
                    toast.add({title: 'Błąd', description: 'Klient nie posiada aktywnego karnetu lub podano niepoprawne dane.'});
                    break;
                case 403:
                    toast.add({title: 'Błąd', description: 'Nie masz uprawnień do dodania klienta do zajęć.'});
                    break;
                case 404:
                    toast.add({title: 'Błąd', description: 'Nie znaleziono zajęć bądź klienta.'});
                    break;	
                default:
                    toast.add({title: 'Błąd', description: 'Nie udało się utworzyć zajęć grupowych.'});
            }
            return false
        }
    }

    // PUT

    const putUpdateGroupClass = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        console.log('editableGroupClass.value:', editableGroupClass.value);
        try {
            response = await $fetch(`${backendUrl}/groupClasses`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(toRaw(editableGroupClass.value))
            });
            console.log('response:', response);
            if(response === 'Group class updated successfully'){
                toast.add({title: 'Sukces', description: `Pomyślnie zaktualizowano zajęcia grupowe: ${editableGroupClass.value.title}`});
                editableGroupClass.value = createEditableGroupClassObject();
                return true
            // biome-ignore lint/style/noUselessElse: <explanation>
            } else {
                toast.add({title: 'Błąd', description: 'Nie udało się zaktualizować zajęć grupowych.'});
                console.log('Error:', response);
                throw new Error('Nie udało się zaktualizować zajęć grupowych.');
            }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
            console.error('Error:', error.response);
            toast.add({title: 'Błąd', description: 'Nie udało się zaktualizować zajęć grupowych.'});
            return false
        }
    }

    const putRemoveMemberFromGroupClass = async (groupClassId: number, memberEmail: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch(`${backendUrl}/groupClasses/member/${memberEmail}/signOut`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(groupClassId)
            });
            if(response){
                toast.add({title: 'Sukces', description: 'Pomyślnie usunięto z zajęć grupowych:'});
                await getGroupClassesUpcomingForMember(memberEmail);
                await getGroupClassesUpcoming()
                if(useCookie<DefaultLoginData>('defaultLoginData').value.userType==="Worker"){
                    await getGroupClassesMembers(groupClassId);
                }
                return true
            // biome-ignore lint/style/noUselessElse: <explanation>
            } else {
                toast.add({title: 'Błąd', description: 'Nie udało się usunąć z zajęć grupowych.'});
                throw new Error('Nie udało się usunąć z zajęć grupowych.');
            }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
            console.error('Error:', error.response);
            return false
        }
    }

    // DELETE

    const deleteGroupClass = async (groupClassId: number) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch(`${backendUrl}/groupClasses/${groupClassId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if(response){
                toast.add({title: 'Sukces', description: `Pomyślnie usunięto zajęcia grupowe: ${groupClassId}`});
                router.push('/admin-panel/zarzadzanie/zajecia');
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
        groupClassesMembers,

        getGroupClassesUpcoming,
        getGroupClassesUpcomingByTrainerEmail,
        getGroupClassesHistoricalByTrainerEmail,
        getGroupClassesUpcomingForMember,
        getGroupClassesHistoricalForMember,
        getGroupClassesHistorical,
        getGroupClassesMembers,

        postNewGroupClass,
        postEnrollMemberToGroupClass,

        putUpdateGroupClass,
        putRemoveMemberFromGroupClass,

        deleteGroupClass
    }
});