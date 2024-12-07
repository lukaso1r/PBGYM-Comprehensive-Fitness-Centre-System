import type { MemberToRegisterData, TrainerDataToRegister, DefaultLoginData } from "~/types";
import { useLoginStore } from './loginStore';

export const useRegisterStore = defineStore('register', () => {

    const { createTrainerToRegisterObject, createMemberToRegisterObject } = useObjectFactory();

    // TODO: not sure if it stays here like that
    const loginStore = useLoginStore();
    
    const memberToRegister = useState<MemberToRegisterData>('memberToRegister', () => createMemberToRegisterObject());
    const trainerToRegister = ref<TrainerDataToRegister>(createTrainerToRegisterObject());

    const toast = useToast();
    const status = ref("idle");
    const config = useRuntimeConfig()
    const backendUrl = config.public.backendUrl

    // TODO: zrobić to w try catch
    const register = async () => {
        async function registerMember() {
            const response = await fetch('https://pbgym.onrender.com/auth/registerMember', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(memberToRegister.value)
            });
            const data = response;
            if(data.status === 201) {
                status.value = "success";
                console.log("Z register store register(): status", status.value)
            }
        }
        await registerMember();
        loginStore.userToLoginCredentials = {
            email: memberToRegister.value.email,
            password: memberToRegister.value.password
        };
        loginStore.login();
        clearData();
    };

    const registerTrainer = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch('https://pbgym.onrender.com/auth/registerTrainer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(trainerToRegister.value)
            });
            console.log('response:', response);
            toast.add({title: 'Trener zarejestrowany', description: 'Trener został zarejestrowany pomyślnie.'});
        } catch (error) {
            console.error('Error:', error);
            toast.add({title: 'Błąd', description: 'Nie udało się zarejestrować trenera.'});
        }
    }

    const clearData = () => {
        // change to object factory
        memberToRegister.value = {
            email: "",
            password: "",
            name: "",
            surname: "",
            birthdate: "",
            gender: "",
            pesel: "",
            phoneNumber: "",
            address: {
                city: "",
                streetName: "",
                buildingNumber: "",
                apartmentNumber: 0,
                postalCode: ""
            }
        };
    };

    return {
        memberToRegister,
        status,
        trainerToRegister,

        registerTrainer,
        register,
        clearData
    };
});
