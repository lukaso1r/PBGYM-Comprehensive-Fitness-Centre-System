import type { Offer, EditableStandardOfferData, DefaultLoginData, SpecialOffer, EditableSpecialOfferData } from "~/types";

export const useOffersStore = defineStore('offersStore', () => {

    const toast = useToast()

    // GETY
    const offersPublicActive = useState<Offer[]>(() => ([] as Offer[]));
    const offerStandardByTitle = useState<Offer>(() => ({} as Offer));
    const offerSpecialByTitle = useState<Offer>(() => ({} as Offer));
    const offerStandardAll = useState<Offer[]>(() => []);
    const offerSpecialAll = useState<SpecialOffer[]>(() => []);
    const offerAll = useState<Offer[]>(() => []);
    
    // GET /offers  

    const getOffersPublicActive = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<Offer[]>('https://pbgym.onrender.com/offers/public/active', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response) {
                offersPublicActive.value = response;
                console.log('Oferty public active:', response);
            } else {
                throw new Error('Nie udało się pobrać aktywnych ofert publicznych.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getOfferStandardByTitle = async (title: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<Offer>(`https://pbgym.onrender.com/offers/standard/${title}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                offerStandardByTitle.value = response;
                console.log('Oferta po tytyle z ofert standardowych:', response);
            } else {
                throw new Error('Nie udało się pobrać oferty standardowej.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getOfferSpecialByTitle = async (title: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<SpecialOffer>(`https://pbgym.onrender.com/offers/special/${title}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                offerSpecialByTitle.value = response;
                console.log('Oferta po tytyle z ofert specjalnych:', response);
            } else {
                throw new Error('Nie udało się pobrać oferty specjalnej.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getOfferStandardAll = async () => {    
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<Offer[]>('https://pbgym.onrender.com/offers/standard', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                offerStandardAll.value = response;
                console.log('Oferty standardowe:', response);
            } else {
                throw new Error('Nie udało się pobrać ofert standardowych.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getOfferSpecialAll = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<SpecialOffer[]>('https://pbgym.onrender.com/offers/special', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                offerSpecialAll.value = response;
                console.log('Oferty specjalne:', response);
            } else {
                throw new Error('Nie udało się pobrać ofert specjalnych.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getOfferAll = async () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<Offer[]>('https://pbgym.onrender.com/offers/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            if (response) {
                offerAll.value = response;
                console.log('Oferty all:', response);
            } else {
                throw new Error('Nie udało się pobrać ofert.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // POST /offers

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
            if (response === 'Standard Offer successfully added.') {
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

    const addSpecialOffer = async (offer: EditableSpecialOfferData) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<EditableSpecialOfferData>('https://pbgym.onrender.com/offers/special', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(offer)
            });
            if (response === 'Special Offer successfully added.') {
                toast.add({ title: 'Dodano specjalną ofertę', description: `${offer.title}` });
            } else {
                throw new Error(response || 'Nie udało się dodać oferty specjalnej.');
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
    }

    // PUT /offers

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

    const updateSpecialOffer = async (offer: EditableSpecialOfferData, previousTitle: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch<EditableSpecialOfferData>(`https://pbgym.onrender.com/offers/special/${previousTitle}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                },
                body: JSON.stringify(offer)
            });
            if (response === 'Special Offer successfully updated.') {
                toast.add({ title: 'Zaktualizowano specjalną ofertę', description: `${offer.title}` });
            } else {
                throw new Error(response || 'Nie udało się zaktualizować oferty specjalnej.');
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

    // DELETE 

    const deleteOffer = async (title: string) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let response: any;
        try {
            response = await $fetch(`https://pbgym.onrender.com/offers/${title}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie<DefaultLoginData>('defaultLoginData').value.jwt}`
                }
            });
            console.log(response)
            if (response === 'Offer successfully deleted.') {
                toast.add({ title: 'Usunięto ofertę', description: `${title}` });
            } else {
                throw new Error(response || 'Nie udało się usunąć oferty.');
            }
        // biome-ignore lint/suspicious/noExplicitAny: <error type>
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                console.error('Not found (404): Oferta o takim tytule nie istnieje.');
                toast.add({ title: 'Błąd usunięcia oferty', description: 'Oferta o takim tytule nie istnieje.' });
            } if(error.response && error.response.status === 400) {
                toast.add({ title: 'Błąd usunięcia oferty', description: `${error}` });
                console.error('Error:', error);
            }
        }
    }    

    return {
        offersPublicActive,
        offerStandardByTitle,
        offerSpecialByTitle,
        offerStandardAll,
        offerSpecialAll,
        offerAll,

        addStandardOffer,
        addSpecialOffer,
        
        updateStandardOffer,
        updateSpecialOffer,
        
        getOffersPublicActive,
        getOfferStandardByTitle,
        getOfferSpecialByTitle,
        getOfferStandardAll,
        getOfferSpecialAll,
        getOfferAll,

        deleteOffer
    };
    
});
