export const validatePassword = (password: string) => {
    if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/.test(password)) && password !== '') {
        return false
    }
    return true
}