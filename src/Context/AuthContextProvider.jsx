import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
   // Hold the token
   const [token, setToken] = useState(localStorage.getItem("access_token"));

   // Handle set token
   const handleSetToken = (newToken) => {
      setToken(newToken);
   };

   useEffect(() => {
      if (token) {
         localStorage.setItem("access_token", token);
      } else {
         localStorage.removeItem("access_token");
      }
   }, [token]);

   const contextValue = useMemo(
      () => ({
         token,
         handleSetToken,
      }),
      [token]
   );

   return (
      <AuthContext.Provider value={contextValue}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthContextProvider;
