import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { findUser, saveUserToDB } from "../../../APIs/APIs";
import useAuth from "../../../Hooks/useAuth";

const useRegister = () => {
   const { registerWithEmailPassword } = useAuth();
   const navigate = useNavigate();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   // Form submit
   const onSubmit = async (data) => {
      // Initialize tost message
      const toastMsg = toast.loading("");
      toast.update(toastMsg, {
         render: "In Progress...",
         isLoading: true,
      });

      // Continue registration process if user not exist in database
      findUser(data.username).then((res) => {
         if (!res.exist) {
            // User registration process
            registerWithEmailPassword(data.email, data.password)
               .then((result) => {
                  if (result.user) {
                     // Save user to database
                     const userInfo = {
                        username: data.username,
                        email: result.user?.email,
                     };
                     saveUserToDB(userInfo).then((res) => console.log(res));

                     // Show toast after successful registration
                     toast.update(toastMsg, {
                        render: "Done",
                        type: "success",
                        isLoading: false,
                     });
                     navigate("/");
                  }
               })
               .catch((err) => {
                  toast.update(toastMsg, {
                     render: err.message,
                     type: "error",
                     isLoading: false,
                  });
               });
         } else {
            toast.update(toastMsg, {
               render: "User already exist!",
               type: "error",
               isLoading: false,
            });
         }
      });
   };

   return { register, handleSubmit, onSubmit, errors };
};

export default useRegister;
