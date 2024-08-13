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
    id: 0,
    title: "string",
    subtitle: "string",
    monthlyPrice: 0,
    entryFee: 0,
    durationInMonths: 0,
    properties: [
      "string"
    ],
    active: true,
    type: "string"
}
