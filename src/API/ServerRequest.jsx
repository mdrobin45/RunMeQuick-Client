import axios from "axios";

// Get result from compile server
export const compilerResult = async (token) => {
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
      const statusCode = data.status?.id;
      if (statusCode === 1 || statusCode === 2) {
         // Processing
         setTimeout(() => {
            compilerResult(token);
         }, 2000);
         return;
      } else {
         return data;
      }
   } catch (error) {
      console.error(error);
   }
};

// Request server to compile source code
export const codeSubmission = async (sourceCode) => {
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
         language_id: 63,
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
