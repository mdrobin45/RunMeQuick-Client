import axios from "axios";

const axiosRequest = axios.create({
   baseURL: import.meta.env.VITE_SERVER_API,
});

const useAPI = () => {
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
            compilerResult(token);
            return;
         }
         return data;
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
   return { codeSubmission, compilerResult, userLogin, userRegister };
};

export default useAPI;
