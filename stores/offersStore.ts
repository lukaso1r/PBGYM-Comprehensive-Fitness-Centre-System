import type {Offer} from "~/types";

export const useOffersStore = defineStore('offersStore', () => {

    const offers = useState<Offer[]>(() => ([]))
    
    const getOffers = async () => {
        // TODO: rozwalone jest idk czemu @komarewski haaloooooooooooooooooooooooooooooo
        async function getOffersApiCall() {
            try {
                const data = await useFetch('https://pbgym.onrender.com/offers/public/active', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log('Dane z serwera:', data);
            }
            catch (error) {
                console.error('Error:', error);
                alert('Błąd pobrania ofert');
            }
        };
        await getOffersApiCall();
    }

    return {
        offers,
        getOffers
    }
});