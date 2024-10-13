import type { Offer, EditableStandardOfferData, DefaultLoginData } from "~/types";

export const useOffersStore = defineStore('offersStore', () => {
    const offers = useState<Offer[]>(() => ([]));
    const toast = useToast()

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
            console.log('Dane z serwera:', data.value);
            if (data.value) {
                offers.value = data.value;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Błąd pobrania ofert');
        }
    };

    const addStandardOffer = async (offer: EditableStandardOfferData) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<EditableStandardOfferData>('https://pbgym.onrender.com/offers/standard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(offer)
            });
            if (response.status === 'Standard Offer successfully added.') {
                toast.add({ title: 'Dodano standardową ofertę', description: `${offer.title}` });
            } else {
                throw new Error(response || 'Nie udało się dodać oferty standardowej.');
            }
        // biome-ignore lint/suspicious/noExplicitAny: <error type>
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                console.error('Conflict (409): Oferta o takim tytule już istnieje.');
                toast.add({ title: 'Błąd dodania oferty', description: 'Oferta o takim tytule już istnieje.' });
            } if(error.response && error.response.status === 400) {
                toast.add({ title: 'Błąd dodania oferty', description: `${error}` });
                console.error('Error:', error);
            }
        }
    };

    const updateStandardOffer = async (offer: EditableStandardOfferData, previousTitle: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<EditableStandardOfferData>(`https://pbgym.onrender.com/offers/standard/${previousTitle}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(offer)
            });
            if (response === 'Standard Offer successfully updated.') {
                toast.add({ title: 'Zaktualizowano standardową ofertę', description: `${offer.title}` });
            } else {
                throw new Error(response || 'Nie udało się zaktualizować oferty standardowej.');
            }
        // biome-ignore lint/suspicious/noExplicitAny: <error type>
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                console.error('Conflict (409): Oferta o takim tytule już istnieje.');
                toast.add({ title: 'Błąd aktualizacji oferty', description: 'Oferta o takim tytule już istnieje.' });
            } if(error.response && error.response.status === 400) {
                toast.add({ title: 'Błąd aktualizacji oferty', description: `${error}` });
                console.error('Error:', error);
            }
        }
    }

    

    return {
        offers,
        getOffers,
        addStandardOffer,
        updateStandardOffer
    };
});
