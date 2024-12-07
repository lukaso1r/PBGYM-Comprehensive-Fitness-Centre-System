import type { UserToLoginCredentials, DefaultLoginData, LoggedMemberData, ChangeMemberDetailsData  } from "~/types";

export const useChangeMemberDetailsStore = defineStore('changeMemberDetails', () => {

    const loginStore = useLoginStore();
    const toast = useToast();
    const config = useRuntimeConfig()
    const backendUrl = config.public.backendUrl

    const changeMemberDetailsData = useState<ChangeMemberDetailsData>(() => ({
        name: '',
        surname: '',
        birthdate: '',
        gender: '',
        pesel: '',
        phoneNumber: '',
        address: {
            city: '',
            streetName: '',
            buildingNumber: '',
            apartmentNumber: 0,
            postalCode: ''
        }
    })) 

    const changeMemberDetails = async () => {
        async function changeMemberDetailsApiCall() {
            try {
                console.log("Z trycatcha", useCookie<DefaultLoginData>('defaultLoginData').value.jwt, useCookie<LoggedMemberData>('loggedMemberData').value.email, JSON.stringify(changeMemberDetailsData.value)  )
                const response = await useFetch(`https://pbgym.onrender.com/members/${useCookie<LoggedMemberData>('loggedMemberData').value.email}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                    },
                    method: 'PUT',
                    body: JSON.stringify(changeMemberDetailsData.value)
                });
                console.log('response change member details:', response);
                loginStore.logOut();
                toast.add({title: 'Sukces', description: 'Pomyślnie zmieniono dane'});
                console.log('Wylogowano po zmianie danych');
            }
            catch (error) {
                console.error('Error:', error);
                toast.add({title: 'Błąd', description: 'Nie udało się zmienić danych'});
                alert('Błąd zmiany danych');
            }
        };
        await changeMemberDetailsApiCall();
    }

    return {
        changeMemberDetailsData,
        changeMemberDetails
    }

});