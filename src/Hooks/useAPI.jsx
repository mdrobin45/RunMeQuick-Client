import axios from "axios";

const axiosRequest = axios.create({
   baseURL: import.meta.env.VITE_SERVER_API,
});

const useAPI = () => {
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
      const { data } = await axiosRequest.post("/compiler", { code, language });
      return data;
   };

   return {
      userLogin,
      userRegister,
      getHistory,
      codeCompiler,
   };
};

export default useAPI;
