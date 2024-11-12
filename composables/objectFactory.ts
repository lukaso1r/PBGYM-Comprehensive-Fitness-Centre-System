import type { MemberToRegisterData, TrainerDataToRegister, TrainerData, TrainerDataToEdit, TrainerOffer, MemberPaymentHistory } from '~/types';

export const useObjectFactory = () => {

    const createMemberToRegisterObject = (): MemberToRegisterData => {
        return {
            email: '',
            password: '',
            name: '',
            surname: '',
            birthdate: '',
            gender: '',
            pesel: '',
            phoneNumber: '',
            address: {
                city: '',
                streetName: '',
                buildingNumber: '',
                apartmentNumber: 0,
                postalCode: ''
            }
        }
    };

    const createTrainerToRegisterObject = (): TrainerDataToRegister => {
        return {
            email: '',
            password: '',
            name: '',
            surname: '',
            birthdate: '',
            gender: '',
            pesel: '',
            phoneNumber: '',
            address: {
                city: '',
                streetName: '',
                buildingNumber: '',
                apartmentNumber: 0,
                postalCode: ''
            }
        }
    }

    const createTrainerObject = (): TrainerData => {
        return {
            id: 0,
            email: '',
            name: '',
            surname: '',
            birthdate: '',
            pesel: '',
            phoneNumber: '',
            address: {
                id: 0,
                city: '',
                streetName: '',
                buildingNumber: '',
                apartmentNumber: 0,
                postalCode: ''
            },
            description: '',
            photo: [],
            gender: '',
            visible: false,
            trainerTags: []
        }
    }

    const createTrainerDataToEditObject = (): TrainerDataToEdit => {
        return {
            name: '',
            surname: '',
            birthdate: '',
            gender: '',
            pesel: '',
            phoneNumber: '',
            address: {
                city: '',
                streetName: '',
                buildingNumber: '',
                apartmentNumber: 0,
                postalCode: ''
            },
            description: '',
            photo: [],
            visible: false,
            trainerTags: []
        }
    }

    const createTrainerOfferObject = (): TrainerOffer => {
        return {
            title: '',
            price: 0,
            trainingSessionCount: 0,
            trainingSessionDurationInMinutes: 0,
            visible: false
        }
    }

    const createMemberPaymentHistoryObject = (): MemberPaymentHistory => {
        return {
            id: 0,
            amount: 0,
            dateTime: '',
            cardNumber: '',
            expirationMonth: '',
            expirationYear: '',
            name: '',
            surname: '',
            email: '',
            pesel: '',
        }
    }



    return {
        createMemberToRegisterObject,
        createTrainerToRegisterObject,
        createTrainerObject,
        createTrainerDataToEditObject,
        createTrainerOfferObject,
        createMemberPaymentHistoryObject
    };
};