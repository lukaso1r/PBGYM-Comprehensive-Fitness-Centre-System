import type { MemberToRegister } from "~/types";

export const useRegisterStore = defineStore('register', () => {
    
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

    const register = () => {
        // register logic
        console.log("register store working");
        console.log(toRaw(memberToRegister.value));

        // próba fetchowania
        console.log("próba fetchowania");
        console.log(toRaw(memberToRegister.value));

        async function registerMember() {
            const response = await fetch('https://pbgym.onrender.com/auth/registerMember', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(memberToRegister.value)
            });
            const data = response;
            console.log(data);
        }
        registerMember();
        
        console.log("koniec register funcition");
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
        register,
        clearData
    };
});
