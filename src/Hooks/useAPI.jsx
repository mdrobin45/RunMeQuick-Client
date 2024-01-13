import axios from "axios";

const axiosRequest = axios.create({
   baseURL: import.meta.env.VITE_SERVER_API,
});

const useAPI = () => {
   const controller = new AbortController();
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

   // Get history
   const getHistory = async (email) => {
      const { data } = await axiosRequest.get(`/get-history?email=${email}`);
      return data;
   };

   // Compiler API call
   const codeCompiler = async (language, code) => {
      const { data } = await axiosRequest.post(
         "/compiler",
         { code, language },
         { signal: controller.signal }
      );
      return data;
   };

   // Cancel handler
   const cancelHandler = () => {
      controller.abort();
      console.log("cancelled");
   };

   return {
      userLogin,
      userRegister,
      getHistory,
      codeCompiler,
      cancelHandler,
   };
};

export default useAPI;
