import { useContext } from "react";
import { AuthContext } from "../Context/AuthContextProvider";

const useAuth = () => {
   const contextValue = useContext(AuthContext);
   return contextValue;
};

export default useAuth;
