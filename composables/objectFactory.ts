import type { MemberToRegisterData } from '~/types';

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

    return {
        createMemberToRegisterObject,
    };
};