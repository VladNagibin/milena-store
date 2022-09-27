import {createContext} from 'react'

function noop(){}

function psevdoEnter(loginInp:string,passwordInp:string){}


export const AuthContext = createContext({
    enter: psevdoEnter,
    out: noop,
    token:'',
    ready:false
})