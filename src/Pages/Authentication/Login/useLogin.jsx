import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useAPI from "../../../Hooks/useAPI";

const useLogin = () => {
   const { userLogin } = useAPI();
   const { state } = useLocation();
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   // Server request
   const { isPending, mutate } = useMutation({
      mutationKey: ["userLogin"],
      mutationFn: (loginInfo) => userLogin(loginInfo),
      onSuccess: (data) => {
         const token = data.token;
         if (token) {
            localStorage.setItem("access_token", token);
            toast.success("Login Successful");
            if (state !== null) {
               navigate(state.from);
            } else {
               navigate("/");
            }
         }
      },
      onError: (data) => {
         const statusCode = data.response.status;
         const errMsg = data.response.data.error;
         if (statusCode === 401) {
            toast.error(errMsg);
         } else {
            toast.error("Something went wrong");
         }
      },
   });

   // Form submit
   const onSubmit = async (data) => {
      // User login process
      mutate(data);
   };

   return { register, handleSubmit, onSubmit, errors, isPending };
};

export default useLogin;
