import type { Offer } from "~/types";

export const useOffersStore = defineStore('offersStore', () => {
    const offers = useState<Offer[]>(() => ([]));

    const getOffers = async () => {
        try {
            const { data, error } = await useFetch<Offer[]>('https://pbgym.onrender.com/offers/public/active', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (error.value) {
                throw new Error('Błąd pobrania ofert');
            }

            // Logowanie danych w konsoli
            console.log('Dane z serwera:', data.value);

            // Aktualizacja stanu `offers`
            if (data.value) {
                offers.value = data.value;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Błąd pobrania ofert');
        }
    };

    return {
        offers,
        getOffers
    };
});
