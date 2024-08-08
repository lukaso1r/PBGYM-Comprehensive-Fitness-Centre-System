import type { MemberToLogin } from "~/types";

export const useLoginStore = defineStore('login', () => {

    const memberToLogin = useState<MemberToLogin>('memberToLogin', () => ({
        email: "",
        password: ""
    }));

    const login = () => {
        async function loginMember() {
            const response = await fetch('https://pbgym.onrender.com/auth/authenticate', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(memberToLogin.value)
            });
            const data = response
            console.log(data)
            navigateTo('/twoj-profil')
            
        }
        loginMember();
        
        console.log("koniec login funcition");
        clearData();
    };

    const clearData = () => {
        memberToLogin.value = {
            email: "",
            password: ""
        };
    };

    return {
        memberToLogin,
        login
    };

});