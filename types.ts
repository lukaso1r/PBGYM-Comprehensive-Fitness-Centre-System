export interface MemberToRegisterData {    
    email: string;
    password: string;
    name: string;
    surname: string;
    birthdate: string;
    gender: string;
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
    gender: string,
    pesel: string,
    phoneNumber: string,
    address: {
        id: number,
        city: string,
        streetName: string,
        buildingNumber: string,
        apartmentNumber: number,
        postalCode: string
    },
    passActive?: boolean,
    passDateEnd?: string,

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
    name: string,
    surname: string,
    birthdate: string,
    gender: string,
    pesel: string,
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
    type: string,
    specialOfferText: string | undefined,
    borderText: string | undefined,
    previousPriceInfo: string | undefined
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

export interface CreditCardData {
    cardNumber: string,
    expirationMonth: string,
    expirationYear: string,
    cvc: string
}

export interface PaymentData {
    id: number,
    amount: number,
    dateTime: string,
    cardNumber: string,
    expirationMonth: string,
    expirationYear: string,
    name: string,
    surname: string,
    email: string,
    pesel: string
  }



export interface GymEntryData {
    id: number,
    dateTimeOfEntry: string,
    dateTimeOfExit: string,
    email: string
}

export interface MemberPaymentHistory {
    id: number,
    amount: number,
    dateTime: string,
    cardNumber: string,
    expirationMonth: string,
    expirationYear: string,
    name: string,
    surname: string,
    email: string,
    pesel: string
}

export interface MemberGymEntriesHistory {
    id: number,
    dateTimeOfEntry: string,
    dateTimeOfExit: string,
    email: string
}

export interface ActiveMemberPass {
    id: number,
    title: string,
    dateStart: string,
    dateEnd: string
    dateOfNextPayment: string,
    monthlyPrice: number
}

export interface PassHistory {
    id: number,
    title: string,
    dateStart: string,
    dateEnd: string,
    monthlyPrice: number
}

export interface TrainerDataToRegister {
    email: string,
    password: string,
    name: string,
    surname: string,
    birthdate: string,
    gender: string,
    pesel: string,
    phoneNumber: string,
    address: {
        city: string,
        streetName: string,
        buildingNumber: string,
        apartmentNumber?: number,
        postalCode: string
    }
}

export interface TrainerData {
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
    },
    description: string,
    photo: string[],
    gender: string,
    visible: boolean,
    trainerTags: string[]
}

export interface TrainerEntries {
    id: number,
    dateTimeOfEntry: string,
    dateTimeOfExit: string,
    email: string
}

export interface TrainerDataToEdit {
    name: string;
    surname: string;
    birthdate: string;
    gender: string;
    pesel: string;
    phoneNumber: string;
    address: {
        city: string;
        streetName: string;
        buildingNumber: string;
        apartmentNumber: number;
        postalCode: string;
    };
    description: string;
    photo: string[];
    visible: boolean;
    trainerTags: string[];
}

export interface TrainerOffer {
    id?: number,
    title: string,
    price: number,
    trainingSessionCount: number,
    trainingSessionDurationInMinutes: number,
    visible: boolean
}

export interface TrainerWithOffers {
    trainerInfo: {
        id: number;
        email: string;
        name: string;
        surname: string;
        phoneNumber: string;
        description: string;
        photo: string[];
        gender: string;
        trainerTags: string[];
    };
    trainerOffers: {
        id: number;
        title: string;
        price: number;
        trainingSessionCount: number;
        trainingSessionDurationInMinutes: number;
        visible: boolean;
    }[];
}

export interface EditableGroupClassData {
    id?: number,
    title: string,
    dateStart: string,
    durationInMinutes: number,
    memberLimit: number,
    trainerEmail: string
}

export interface GroupClassWithTrainer {
    id: number;
    title: string;
    dateStart: string;
    durationInMinutes: number;
    memberLimit: number;
    trainer: {
        id: number;
        email: string;
        name: string;
        surname: string;
        phoneNumber: string;
        description: string;
        photo: string[];
        gender: string;
        trainerTags: string[];
    };
    currentMemberCount: number;
}

export interface GroupClassMember {
    id: number;
    email: string;
    name: string;
    surname: string;
}
    
export interface BlogPost {
    id?: number;
    title: string;
    postDate: string;
    lastUpdateDate?: string;
    content: string
}

