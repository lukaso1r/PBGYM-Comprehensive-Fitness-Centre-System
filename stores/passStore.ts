import type { DefaultLoginData, ActiveMemberPass, LoggedMemberData, PassHistory } from "~/types";

export const usePassStore = defineStore('passStore', () => {

  const toast = useToast();
  const config = useRuntimeConfig()
  const backendUrl = config.public.backendUrl

  const activeMemberPass = useState<ActiveMemberPass>(() => ({} as ActiveMemberPass));
  const memberPassHistory = useState<PassHistory[]>(() => []);

  const getActiveMemberPass = async (email: string) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let response: any;
    try {
      response = await $fetch<ActiveMemberPass>(`${backendUrl}/passes/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
        }
      });
      if (response) {
        activeMemberPass.value = response;
        console.log('Aktywny karnet:', response);
      } else {
        throw new Error('Nie udało się pobrać aktywnego karnetu.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const getMemberPassHistory = async (email: string) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let response: any;
    try {
      response = await $fetch<PassHistory[]>(`${backendUrl}/passes/passHistory/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
        }
      });
      if (response) {
        memberPassHistory.value = response;
        console.log('Historia karnetów:', response);
      } else {
        throw new Error('Nie udało się pobrać historii karnetów.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const postNewPass = async (email: string, offerId: number) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let response: any;
    console.log('email:', email, 'offerId:', offerId, 'jwt:', useCookie<DefaultLoginData>('defaultLoginData').value.jwt);
    try {
      response = await $fetch<ActiveMemberPass>(`${backendUrl}/passes/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
        },
        body: JSON.stringify({ offerId })
      });
      if (response) {
        activeMemberPass.value = response;
        console.log('Karnet zakupiony:', response);
        toast.add({
          title: 'Karnet zakupiony!',
          description: 'Karnet został zakupiony pomyślnie.'
        });
      } else {
        throw new Error('Nie udało się zakupić karnetu.');
      }
    } catch (error) {
      console.error('Error:', error, response);
      toast.add({
        title: 'Błąd zakupu karnetu!',
        description: 'Nie udało się zakupić karnetu.'
      });
    }
  }

  const clearData = () => {
    activeMemberPass.value = {} as ActiveMemberPass;
    memberPassHistory.value = [];
  }

  return{
    activeMemberPass,
    memberPassHistory,

    getActiveMemberPass,
    getMemberPassHistory,
    postNewPass,
    clearData

  }

});

