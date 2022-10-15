export interface IRegistrationValue {
    login: string
    email: string
    password: string
}
export type RegistrationErrorType = Partial<IRegistrationValue>

export type LoginValueType = Omit<IRegistrationValue, "login">

export type LoginErrorType = Partial<LoginValueType>

export type UserInfoType = Omit<IRegistrationValue, "password">

