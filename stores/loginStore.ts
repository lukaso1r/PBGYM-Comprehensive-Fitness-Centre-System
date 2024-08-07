import type { MemberToLogin } from "~/types";

export const useLoginStore = defineStore('login', () => {

    const memberToLogin = useState<MemberToLogin>('memberToLogin', () => ({
        email: "",
        password: ""
    }));

    const testMethod = () => {
        console.log("login store working");
        console.log(toRaw(memberToLogin.value));
    };

    const login = () => {
        // login logic
        console.log("login function working");
        console.log(toRaw(memberToLogin.value));

        // próba fetchowania
        console.log("próba fetchowania");
        console.log(toRaw(memberToLogin.value));

        async function loginMember() {
            const response = await fetch('https://pbgym.onrender.com/auth/authenticate', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(memberToLogin.value)
            });
            const data = response;
            console.log(data);
        }
        loginMember();

        navigateTo('/twoj-profil')
        console.log("koniec login funcition");
        // clearData();
    };

    return {
        memberToLogin,
        testMethod,
        login
    };


});