export interface MemberToRegister {    
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
        apartmentNumber: string;
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
    phoneNumber: number,
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