import { ILoginData } from "../reducers/authReducer";
 
export default interface IRegistrationData extends ILoginData{
    email?:string
    phone?:string
}