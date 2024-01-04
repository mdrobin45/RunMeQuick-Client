import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAPI from "../../../Hooks/useAPI";

const useLogin = () => {
   const { userLogin } = useAPI();
   // const { state } = useLocation();
   // const navigate = useNavigate();

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
         // console.log(data);
      },
      onError: (data) => {
         const statusCode = data.response.status;
         const errMsg = data.response.data.error;
         if (statusCode === 401) {
            toast.error(errMsg);
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
