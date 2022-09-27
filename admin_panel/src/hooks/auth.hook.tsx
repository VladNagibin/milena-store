import { useEffect, useState } from "react";
import { login, password, token as tokenGen } from "../auth";
const localStorageName = "milena_store_admin_auth";

export const useAuth = () => {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState<string>('');

  const enter = (loginInp: string, passwordInp: string) => {
    if (loginInp == login && passwordInp == password) {
      setToken(tokenGen);
      sessionStorage.setItem(localStorageName,JSON.stringify({
        token:tokenGen
      }))
    }
  };

  const out = () => {
    setToken('');
    sessionStorage.removeItem(localStorageName)
  };
  useEffect(() => {
    if (token!='' && token != tokenGen) {
      out();
    }
  }, [token]);

  useEffect(()=>{
    let dataStr = sessionStorage.getItem(localStorageName)
    console.log(dataStr)
    if(dataStr){
        let data = JSON.parse(dataStr)
        setToken(data.token)
    }
    setReady(true)
  },[])

  return {token,ready,enter,out}
};


