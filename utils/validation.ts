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

