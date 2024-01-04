import { useState } from "react";
import AuthFormFooter from "../../../Components/AuthFormElements/AuthFormFooter/AuthFormFooter";
import AuthFormHeader from "../../../Components/AuthFormElements/AuthFormHeader/AuthFormHeader";
import styles from "../styles.module.css";
import useRegister from "./useRegister";

const Register = () => {
   const {
      register,
      handleSubmit,
      onSubmit,
      errors,
      isPending: pendingRegister,
   } = useRegister();
   const [showPassword, setShowPassword] = useState(false);

   // Handle password show hide
   const showHideHandler = () => {
      setShowPassword(!showPassword);
   };
   return (
      <div className={styles.sectionWrapper}>
         <div className={styles.formWrapper}>
            <AuthFormHeader heading="Create an Account" />
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
               <div className={styles.inputWrapper}>
                  <label htmlFor="name" className={styles.inputLabel}>
                     Your Name
                  </label>
                  <input
                     {...register("name", {
                        required: "This field is required",
                     })}
                     type="text"
                     id="name"
                     className={styles.input}
                     required
                  />
                  {errors.name ? (
                     <p className="text-sm text-red-500">
                        {errors.name.message}
                     </p>
                  ) : (
                     " "
                  )}
               </div>
               <div className={styles.inputWrapper}>
                  <label htmlFor="Email" className={styles.inputLabel}>
                     Email
                  </label>
                  <input
                     {...register("email", {
                        required: "This field is required",
                        pattern: {
                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                           message: "Invalid email address",
                        },
                     })}
                     type="email"
                     id="Email"
                     className={styles.input}
                     required
                  />
                  {errors.email ? (
                     <p className="text-sm text-red-500">
                        {errors.email.message}
                     </p>
                  ) : (
                     " "
                  )}
               </div>
               <div className={styles.inputWrapper}>
                  <label htmlFor="password" className={styles.inputLabel}>
                     Password
                  </label>
                  <div className="relative">
                     <input
                        {...register("password", {
                           required: "This field is required",
                           pattern: {
                              value: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+|~-]).{7,}$/,
                              message:
                                 "Password must be at least 6 characters long and include at least one uppercase and one special character",
                           },
                        })}
                        id="password"
                        type={`${showPassword ? "text" : "password"}`}
                        className={styles.input}
                        required
                     />
                     <div
                        onClick={showHideHandler}
                        className={styles.passwordFieldWrapper}>
                        {showPassword ? (
                           <svg
                              onClick={showHideHandler}
                              className="w-4 h-4 text-gray-500 cursor-pointer"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 14">
                              <g
                                 stroke="currentColor"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2">
                                 <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                 <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
                              </g>
                           </svg>
                        ) : (
                           <svg
                              onClick={showHideHandler}
                              className="w-4 h-4 text-gray-500 cursor-pointer"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 18">
                              <path
                                 stroke="currentColor"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="M1.933 10.909A4.357 4.357 0 0 1 1 9c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 19 9c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M2 17 18 1m-5 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                           </svg>
                        )}
                     </div>
                     {errors.password ? (
                        <p className="text-sm text-red-500">
                           {errors.password.message}
                        </p>
                     ) : (
                        ""
                     )}
                  </div>
               </div>
               <button type="submit" className={styles.submitBtn} size="lg">
                  {!pendingRegister ? (
                     "Register"
                  ) : (
                     <>
                        <svg
                           aria-hidden="true"
                           className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-900"
                           viewBox="0 0 100 101"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                           />
                           <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                           />
                        </svg>
                     </>
                  )}
               </button>
            </form>
            <AuthFormFooter registerPage={true} />
         </div>
      </div>
   );
};

export default Register;
