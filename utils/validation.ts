import type { FormError, FormSubmitEvent } from '#ui/types'
import type { CreditCardData, LoggedMemberData, MemberToRegisterData, 
    TrainerDataToEdit, TrainerDataToRegister, TrainerOffer,
    EditableGroupClassData,
} from '~/types'

export const validatePassword = (password: string) => {
    if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/.test(password)) && password !== '') {
        return false
    }
    return true
}

export const validateEmail = (email: string) => {
    if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) && email !== '') {
        return false
    }
    return true
}

export const validatePesel = (pesel: string) => {
    if (!(/^[0-9]{11}$/.test(pesel) && pesel !== '')) {
        return false
    }
    return true
}

const checkPESELChecksum = (pesel: string) => {
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += Number.parseInt(pesel[i], 10) * weights[i];
    }
    return sum % 10 === 0;
}

export const validatePhoneNumber = (phoneNumber: string) => {
    if (!(/^\d{9}$/.test(phoneNumber)) && phoneNumber !== '') {
        return false
    }
    return true
}

export const validatePostalCode = (postalCode: string) => {
    if (!(/^\d{2}-\d{3}$/.test(postalCode)) && postalCode !== '') {
        return false
    }
    return true
}

export const validatePosition = (position: string) => {
    if (!(/^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*(\s[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)*$/.test(position)) && position !== '') {
        return false
    }
    return true
}

export const validateCardNumber = (cardNumber: string) => {
    if (!(/^\d{16}$/.test(cardNumber)) && cardNumber !== '') {
        return false
    }
    return true
}

export const validateCardMonth = (month: string) => {
    if (!(/^(0?[1-9]|1[0-2])$/.test(month)) && month !== '') {
        return false
    }
    return true
}

export const validateCardYear = (year: string) => {
    if (!(/^(0[0-9]|[1-9][0-9])$/.test(year)) && year !== '') {
        return false
    }
    return true
}

export const validateCardCVC = (cvc: string) => {
    if (!(/^\d{3}$/.test(cvc)) && cvc !== '') {
        return false
    }
    return true
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isObjectEmpty = (obj: any) => {
    return Object.keys(obj).length === 0
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isListEmpty = (list: any) => {
    return list.length === 0 ? 'Brak' : list
}

export const validateCreditCard = (data: CreditCardData) => {
    const errors: FormError<string>[] = []

    if (!data.cardNumber) errors.push({ path: 'cardNumber', message: 'Numer karty jest wymagany' })
    if (!data.expirationMonth) errors.push({ path: 'expirationMonth', message: 'Miesiąc ważności karty jest wymagany' })
    if (!data.expirationYear) errors.push({ path: 'expirationYear', message: 'Rok ważności karty jest wymagany' })
    if (!data.cvc) errors.push({ path: 'cvc', message: 'Kod CVC / CVV jest wymagany' })
    if (validateCardNumber(data.cardNumber) === false) errors.push({ path: 'cardNumber', message: 'Numer karty jest nieprawidłowy' })
    if (validateCardMonth(data.expirationMonth) === false) errors.push({ path: 'expirationMonth', message: 'Miesiąc ważności karty jest nieprawidłowy' })
    if (validateCardYear(data.expirationYear) === false) errors.push({ path: 'expirationYear', message: 'Rok ważności karty jest nieprawidłowy' })
    if (validateCardCVC(data.cvc) === false) errors.push({ path: 'cvc', message: 'Kod CVC / CVV jest nieprawidłowy' })
    return errors
}

export const validateMemberData = (data: LoggedMemberData) => {
    console.log('validacja membera', data)
    const errors: FormError<string>[] = []

    if (!data.name) errors.push({ path: 'name', message: 'Imię jest wymagane' })
    if (!data.surname) errors.push({ path: 'surname', message: 'Nazwisko jest wymagane' })
    if (!data.email) errors.push({ path: 'email', message: 'Email jest wymagany' })
    if (!data.pesel) errors.push({ path: 'pesel', message: 'PESEL jest wymagany' })
    if (!data.phoneNumber) errors.push({ path: 'phoneNumber', message: 'Numer telefonu jest wymagany' })
    if (validatePesel(data.pesel) === false) errors.push({ path: 'pesel', message: 'PESEL jest nieprawidłowy' })
    if (validatePhoneNumber(data.phoneNumber) === false) errors.push({ path: 'phoneNumber', message: 'Numer telefonu jest nieprawidłowy' })
    // if (!checkPESELChecksum(data.pesel)) errors.push({ path: 'pesel', message: 'PESEL jest nieprawidłowy' })
    if (data.address.streetName === '') errors.push({ path: 'streetName', message: 'Ulica jest wymagana' })
    if (data.address.city === '') errors.push({ path: 'city', message: 'Miasto jest wymagane' })
    if (!data.address.postalCode) errors.push({ path: 'postalCode', message: 'Kod pocztowy jest wymagany' })
    if (validatePostalCode(data.address.postalCode) === false) errors.push({ path: 'postalCode', message: 'Kod pocztowy jest nieprawidłowy' })
    if (data.address.buildingNumber === '') errors.push({ path: 'buildingNumber', message: 'Numer domu jest wymagany' })
    return errors
}

export const validateMemberToRegister = (data: MemberToRegisterData) => {
    const errors: FormError<string>[] = []
    if (!data.email) errors.push({ path: 'email', message: 'Email jest wymagany' })
    if (!validateEmail(data.email)) errors.push({ path: 'email', message: 'Email jest nieprawidłowy' })
    if (!data.password) errors.push({ path: 'password', message: 'Hasło jest wymagane' })
    if (!validatePassword(data.password)) errors.push({ path: 'password', message: 'Hasło musi zawierać co najmniej 8 znaków, jedną cyfrę i jeden znak specjalny' })
    if (!data.name) errors.push({ path: 'name', message: 'Imię jest wymagane' })
    if (!data.surname) errors.push({ path: 'surname', message: 'Nazwisko jest wymagane' })
    if (!data.email) errors.push({ path: 'email', message: 'Email jest wymagany' })
    if (!data.pesel) errors.push({ path: 'pesel', message: 'PESEL jest wymagany' })
    if (!data.phoneNumber) errors.push({ path: 'phoneNumber', message: 'Numer telefonu jest wymagany' })
    if (validatePesel(data.pesel) === false) errors.push({ path: 'pesel', message: 'PESEL jest nieprawidłowy' })
    if (validatePhoneNumber(data.phoneNumber) === false) errors.push({ path: 'phoneNumber', message: 'Numer telefonu jest nieprawidłowy' })
    if (data.address.streetName === '') errors.push({ path: 'streetName', message: 'Ulica jest wymagana' })
    if (data.address.city === '') errors.push({ path: 'city', message: 'Miasto jest wymagane' })
    if (!data.address.postalCode) errors.push({ path: 'postalCode', message: 'Kod pocztowy jest wymagany' })
    if (validatePostalCode(data.address.postalCode) === false) errors.push({ path: 'postalCode', message: 'Kod pocztowy jest nieprawidłowy' })
    if (data.address.buildingNumber === '') errors.push({ path: 'buildingNumber', message: 'Numer domu jest wymagany' })
    return errors
}

export const validateTrainerPersonalData = (data: TrainerDataToEdit) => {
    const errors: FormError<string>[] = []
    if (!data.name) errors.push({ path: 'name', message: 'Imię jest wymagane' })
    if (!data.surname) errors.push({ path: 'surname', message: 'Nazwisko jest wymagane' })
    if (!data.pesel) errors.push({ path: 'pesel', message: 'PESEL jest wymagany' })
    if (!data.gender) errors.push({path: 'gender', message: 'Płeć jest wymagana'})
    if (!data.birthdate) errors.push({ path: 'birthdate', message: 'Data urodzenia jest wymagana' })
    if (!data.phoneNumber) errors.push({ path: 'phoneNumber', message: 'Numer telefonu jest wymagany' })
    if (validatePesel(data.pesel) === false) errors.push({ path: 'pesel', message: 'PESEL jest nieprawidłowy' })
    if (validatePhoneNumber(data.phoneNumber) === false) errors.push({ path: 'phoneNumber', message: 'Numer telefonu jest nieprawidłowy' })
    if (data.address.streetName === '') errors.push({ path: 'streetName', message: 'Ulica jest wymagana' })
    if (data.address.city === '') errors.push({ path: 'city', message: 'Miasto jest wymagane' })
    if (!data.address.postalCode) errors.push({ path: 'postalCode', message: 'Kod pocztowy jest wymagany' })
    if (validatePostalCode(data.address.postalCode) === false) errors.push({ path: 'postalCode', message: 'Kod pocztowy jest nieprawidłowy' })
    if (data.address.buildingNumber === '') errors.push({ path: 'buildingNumber', message: 'Numer domu jest wymagany' })
    if (data.description === '') errors.push({ path: 'description', message: 'Opis jest wymagany' })
    if (data.trainerTags.length === 0) errors.push({ path: 'trainerTags', message: 'Tagi trenera są wymagane' })
    if (data.visible === undefined) errors.push({ path: 'visible', message: 'Widoczność trenera jest wymagana' })
    return errors
} 

export const validateTrainerToEditByTrainer = (data: TrainerDataToEdit) => {
    const errors: FormError<string>[] = []
    if (!data.name) errors.push({ path: 'name', message: 'Imię jest wymagane' })
    if (!data.surname) errors.push({ path: 'surname', message: 'Nazwisko jest wymagane' })
    if (!data.pesel) errors.push({ path: 'pesel', message: 'PESEL jest wymagany' })
    if (!data.gender) errors.push({path: 'gender', message: 'Płeć jest wymagana'})
    if (!data.birthdate) errors.push({ path: 'birthdate', message: 'Data urodzenia jest wymagana' })
    if (!data.phoneNumber) errors.push({ path: 'phoneNumber', message: 'Numer telefonu jest wymagany' })
    if (validatePesel(data.pesel) === false) errors.push({ path: 'pesel', message: 'PESEL jest nieprawidłowy' })
    if (validatePhoneNumber(data.phoneNumber) === false) errors.push({ path: 'phoneNumber', message: 'Numer telefonu jest nieprawidłowy' })
    if (data.address.streetName === '') errors.push({ path: 'streetName', message: 'Ulica jest wymagana' })
    if (data.address.city === '') errors.push({ path: 'city', message: 'Miasto jest wymagane' })
    if (!data.address.postalCode) errors.push({ path: 'postalCode', message: 'Kod pocztowy jest wymagany' })
    if (validatePostalCode(data.address.postalCode) === false) errors.push({ path: 'postalCode', message: 'Kod pocztowy jest nieprawidłowy' })
    if (data.address.buildingNumber === '') errors.push({ path: 'buildingNumber', message: 'Numer domu jest wymagany' })
    return errors
} 


export const validateTrainerToRegister = (data: TrainerDataToRegister) => {
    const errors: FormError<string>[] = []
    if (!data.email) errors.push({ path: 'email', message: 'Email jest wymagany' })
    if (!validateEmail(data.email)) errors.push({ path: 'email', message: 'Email jest nieprawidłowy' })
    if (!data.password) errors.push({ path: 'password', message: 'Hasło jest wymagane' })
    if (!validatePassword(data.password)) errors.push({ path: 'password', message: 'Hasło musi zawierać co najmniej 8 znaków, jedną cyfrę i jeden znak specjalny' })
    if (!data.name) errors.push({ path: 'name', message: 'Imię jest wymagane' })
    if (!data.surname) errors.push({ path: 'surname', message: 'Nazwisko jest wymagane' })
    if (!data.email) errors.push({ path: 'email', message: 'Email jest wymagany' })
    if (!data.pesel) errors.push({ path: 'pesel', message: 'PESEL jest wymagany' })
    if (!data.phoneNumber) errors.push({ path: 'phoneNumber', message: 'Numer telefonu jest wymagany' })
    if (validatePesel(data.pesel) === false) errors.push({ path: 'pesel', message: 'PESEL jest nieprawidłowy' })
    if (validatePhoneNumber(data.phoneNumber) === false) errors.push({ path: 'phoneNumber', message: 'Numer telefonu jest nieprawidłowy' })
    if (data.address.streetName === '') errors.push({ path: 'streetName', message: 'Ulica jest wymagana' })
    if (data.address.city === '') errors.push({ path: 'city', message: 'Miasto jest wymagane' })
    if (!data.address.postalCode) errors.push({ path: 'postalCode', message: 'Kod pocztowy jest wymagany' })
    if (validatePostalCode(data.address.postalCode) === false) errors.push({ path: 'postalCode', message: 'Kod pocztowy jest nieprawidłowy' })
    if (data.address.buildingNumber === '') errors.push({ path: 'buildingNumber', message: 'Numer domu jest wymagany' })
    return errors
}

export const validateNewTrainerOffer = (data: TrainerOffer) => {
    const errors: FormError<string>[] = []
    if (!data.title || data.title==='') errors.push({ path: 'title', message: 'Tytuł oferty jest wymagany' })
    if (!data.price) errors.push({ path: 'price', message: 'Cena oferty jest wymagana' })
    if (!data.trainingSessionCount) errors.push({ path: 'trainingSessionCount', message: 'Ilość sesji jest wymagana' })
    if (!data.trainingSessionDurationInMinutes) errors.push({ path: 'trainingSessionDurationInMinutes', message: 'Czas trwania sesji jest wymagany' })
    if (data.price === 0) errors.push({ path: 'price', message: 'Cena nie może być ujemna' })
    return errors
}

export const validateGroupClassData = (data: EditableGroupClassData) => {
    const errors: FormError<string>[] = []
    if (!data.title || data.title==='') errors.push({ path: 'title', message: 'Tytuł zajęć jest wymagany' })
    if (!data.date || data.date==='') errors.push({ path: 'date', message: `Data zajęć jest wymagana${data.date}t` })
    if (!data.date) errors.push({ path: 'date', message: `Data zajęć jest wymagana${data.date}t` })
    if (data.date && new Date(data.date) < new Date()) errors.push({ path: 'date', message: 'Data zajęć nie może być z przeszłości' })
    if (!data.durationInMinutes || data.durationInMinutes===0) errors.push({ path: 'durationInMinutes', message: 'Czas trwania zajęć jest wymagany' })
    if (!data.memberLimit || data.memberLimit<=0) errors.push({ path: 'memberLimit', message: 'Limit uczestników jest wymagany' })
    if (!data.trainerEmail || data.trainerEmail==='') errors.push({ path: 'trainerEmail', message: 'Email trenera jest wymagany' })
        
    
    return errors
}