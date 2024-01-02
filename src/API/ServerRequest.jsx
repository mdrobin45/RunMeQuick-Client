import axios from "axios";

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
