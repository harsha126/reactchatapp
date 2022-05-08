import { createContext ,useEffect ,useState,useContext } from "react";
import { auth } from "../firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext({
    curruser:null,
})

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({children}){
    const[curruser,setCurruser] = useState(null);
    const[loading,setLoding] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {  
        setCurruser(user ? user : null);
      });
      return () => {
        unsubscribe()
      }
    }, []);

    return <AuthContext.Provider value={curruser}>{children}</AuthContext.Provider>
}

