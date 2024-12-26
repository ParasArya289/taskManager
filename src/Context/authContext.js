import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [isLoginLoading,setIsLoginLoading] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
    }
  },[])

  const loginHandler = async ({username, password}) => {
    try {
      console.log(username, password);
      setIsLoginLoading(true);
      const res = await axios.post(
        "https://taskmanager-7vum.onrender.com/login",
        { username, password }
      );
      console.log("CONTEXT",res.data.token)
      setToken(res.data.token);
      localStorage.setItem("token",res.data.token);
    } catch (error) {
      console.error("Error: ", error.message);
    }finally{
        setIsLoginLoading(false);
    }
  };

  return (
    <authContext.Provider
      value={{loginHandler,token,setToken,isLoginLoading}}
    >
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};
