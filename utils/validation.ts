import type { FormError, FormSubmitEvent } from '#ui/types'
import type { CreditCardData } from '~/types'

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

export const validate = (data: CreditCardData) => {
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
