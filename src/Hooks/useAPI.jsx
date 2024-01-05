import axios from "axios";
import { useContext } from "react";
import { ExecutionContext } from "../Context/ExecutionOutputProvider";

const axiosRequest = axios.create({
   baseURL: import.meta.env.VITE_SERVER_API,
});

const useAPI = () => {
   const { handleSetOutput } = useContext(ExecutionContext);

   // Get result from compile server
   const compilerResult = async (token) => {
      const options = {
         method: "GET",
         url: import.meta.env.VITE_RAPID_URL + "/" + token,
         params: {
            base64_encoded: "true",
            fields: "*",
         },
         headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API,
            "X-RapidAPI-Host": import.meta.env.VITE_RAPID_HOST,
         },
      };
      try {
         const { data } = await axios.request(options);
         const statusCode = data?.status_id;
         if (statusCode === 1 || statusCode === 2) {
            // Processing
            setTimeout(() => {
               compilerResult(token);
            }, 2000);
            return;
         } else {
            if (data !== undefined) {
               handleSetOutput(data);
            }
         }
      } catch (error) {
         console.error(error);
      }
   };

   // Request server to compile source code
   const codeSubmission = async (sourceCode, languageId) => {
      // Server request additional details
      const options = {
         method: "POST",
         url: import.meta.env.VITE_RAPID_URL,
         params: {
            base64_encoded: "true",
            fields: "*",
         },
         headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API,
            "X-RapidAPI-Host": import.meta.env.VITE_RAPID_HOST,
         },
         data: {
            language_id: languageId,
            source_code: btoa(sourceCode),
            stdin: "",
         },
      };
      try {
         const { data } = await axios.request(options);
         return data;
      } catch (err) {
         console.log(err);
      }
   };

   // User login
   const userLogin = async (loginDetails) => {
      const { data } = await axiosRequest.post("/auth/login", loginDetails);
      return data;
   };

   // User register
   const userRegister = async (userInfo) => {
      const { data } = await axiosRequest.post("/auth/registration", userInfo);
      return data;
   };

   // Save history
   const saveHistory = async (historyData) => {
      const { data } = await axiosRequest.post("/save-history", historyData);
      return data;
   };

   // Get history
   const getHistory = async (email) => {
      const { data } = await axiosRequest.get(`/get-history?email=${email}`);
      return data;
   };

   return {
      codeSubmission,
      compilerResult,
      userLogin,
      userRegister,
      saveHistory,
      getHistory,
   };
};

export default useAPI;
