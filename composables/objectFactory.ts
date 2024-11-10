import type { MemberToRegisterData, TrainerDataToRegister, TrainerData, TrainerDataToEdit } from '~/types';

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



    return {
        createMemberToRegisterObject,
        createTrainerToRegisterObject,
        createTrainerObject,
        createTrainerDataToEditObject
    };
};