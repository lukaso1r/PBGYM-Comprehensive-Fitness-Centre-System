export interface MemberToRegisterData {    
    email: string;
    password: string;
    name: string;
    surname: string;
    birthdate: string;
    pesel: string;
    phoneNumber: string;
    address: {
        city: string;
        streetName: string;
        buildingNumber: string;
        apartmentNumber: number;
        postalCode: string;
    };
}

export interface UserToLoginCredentials {
    email: string;
    password: string;
}

export interface LoggedMemberData {
    id: number,
    email: string,
    name: string,
    surname: string,
    birthdate: string,
    pesel: string,
    phoneNumber: string,
    address: {
        id: number,
        city: string,
        streetName: string,
        buildingNumber: string,
        apartmentNumber: number,
        postalCode: string
    }
}

export interface DefaultLoginData {
    jwt: string,
    userType: string
}

export interface ChangePasswordData {
    oldPassword: string,
    newPassword: string
}

export interface ChangeEmailData {
    newEmail: string
}

export interface ChangeMemberDetailsData {
    phoneNumber: string,
    address: {
        city: string,
        streetName: string,
        buildingNumber: string,
        apartmentNumber: number,
        postalCode: string
    }
}

export interface Offer {
    id: number,
    title: string,
    subtitle: string,
    monthlyPrice: number,
    entryFee: number,
    durationInMonths: number,
    properties: [
      string
    ],
    active: boolean,
    type: string
}

export interface EditableStandardOfferData {
    title: string,
    subtitle: string,
    monthlyPrice: number,
    entryFee: number,
    durationInMonths: number,
    properties: string[],
    active: boolean,
}

export interface LoggedWorkerData {
    id: number,
    email: string,
    name: string,
    surname: string,
    birthdate: string,
    gender: string,
    pesel: string,
    phoneNumber: string,
    address: {
        id: number,
        city: string,
        streetName: string,
        buildingNumber: string,
        apartmentNumber: number | undefined,
        postalCode: string
    },
    idCardNumber: string,
    position: string,
    permissions: string[]
}

export interface Worker {
    id: number,
    email: string,
    name: string,
    surname: string,
    birthdate: string,
    pesel: string,
    phoneNumber: string,
    gender: string
    address: {
      id: number,
      city: string,
      streetName: string,
      buildingNumber: string,
      apartmentNumber: string | number | undefined,
      postalCode: string
    },
    idCardNumber: string,
    position: string,
    permissions: string[]
}

export interface ChangeWorkerPasswordData {
    email: string,
    oldPassword: string | '',
    newPassword: string,
    newPasswordRepeat: string
}

export interface NewWorkerData {
    email: string,
    password: string,
    name: string,
    surname: string,
    gender: string,
    birthdate: string,
    pesel: string,
    phoneNumber: string,
    address: {
      city: string,
      streetName: string,
      buildingNumber: string,
      apartmentNumber: string,
      postalCode: string
    },
    idCardNumber: string,
    position: string,
    permissions: string[]
}

export interface SpecialOffer {
    id: number,
    title: string,
    subtitle: string,
    monthlyPrice: number,
    entryFee: number,
    durationInMonths: number,
    properties: string[],
    active: boolean,
    type: string,
    specialOfferText: string,
    borderText: string,
    previousPriceInfo: string
}

export interface EditableSpecialOfferData{
    title: string,
    subtitle: string,
    monthlyPrice: number,
    entryFee: number,
    durationInMonths: number,
    properties: string[],
    active: boolean,
    specialOfferText: string,
    borderText: string,
    previousPriceInfo: string
}
