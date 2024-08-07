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

export interface MemberToLogin {
    email: string;
    password: string;
}