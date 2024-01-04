import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const useUser = () => {
   const [decodedInfo] = useState(() => {
      const storeToken = localStorage.getItem("access_token");
      if (storeToken) {
         return jwtDecode(storeToken);
      } else {
         return null;
      }
   });

   useEffect(() => {
      if (decodedInfo) {
         const expireMilliseconds = decodedInfo?.exp * 1000;

         // Logout if session expired
         if (Date.now() >= expireMilliseconds) {
            localStorage.removeItem("access_token");
            toast.error("Session expired");
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const name = decodedInfo ? decodedInfo.name : null;
   const email = decodedInfo ? decodedInfo.email : null;

   return { name, email };
};

export default useUser;
