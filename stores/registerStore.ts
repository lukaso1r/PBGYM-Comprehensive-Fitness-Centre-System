import type { MemberToRegister } from "~/types";
import { useLoginStore } from './loginStore';

export const useRegisterStore = defineStore('register', () => {

    // TODO: not sure if it stays here like that
    const loginStore = useLoginStore();
    
    const memberToRegister = useState<MemberToRegister>('memberToRegister', () => ({
        email: "",
        password: "",
        name: "",
        surname: "",
        birthdate: "",
        pesel: "",
        phoneNumber: "",
        address: {
            city: "",
            streetName: "",
            buildingNumber: "",
            apartmentNumber: "",
            postalCode: ""
        }
    }));

    const status = ref("idle");

    // TODO: zrobić to w try catch
    const register = () => {
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
            }
        }
        registerMember();
        loginStore.userToLoginCredentials = {
            email: memberToRegister.value.email,
            password: memberToRegister.value.password
        };
        loginStore.login();
        clearData();
    };

    const clearData = () => {
        memberToRegister.value = {
            email: "",
            password: "",
            name: "",
            surname: "",
            birthdate: "",
            pesel: "",
            phoneNumber: "",
            address: {
                city: "",
                streetName: "",
                buildingNumber: "",
                apartmentNumber: "",
                postalCode: ""
            }
        };
    };

    return {
        memberToRegister,
        status,
        register,
        clearData
    };
});
