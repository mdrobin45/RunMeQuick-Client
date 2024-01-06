import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Select from "react-select";
import UserDropdown from "../../../Components/UserDropdown/UserDropdown";
import { languages } from "../../../Constants/Languages";
import useAuth from "../../../Hooks/useAuth";
import useLandingLogic from "../useLandingLogic";

const Topbar = () => {
   const { token } = useAuth();
   const { handleLanguageChange, handleHistoryChange, history } =
      useLandingLogic();
   return (
      <div className="flex items-center justify-between gap-4">
         <div className="flex items-center justify-between md:justify-start gap-4 w-full">
            <div className="w-2/4 md:w-3/12">
               <Select
                  defaultValue={languages[0]}
                  onChange={handleLanguageChange}
                  placeholder="Select Language"
                  options={languages}
               />
            </div>
            <div className="w-2/4 md:w-3/12">
               <Select
                  onChange={handleHistoryChange}
                  placeholder="History"
                  options={history}
               />
            </div>
         </div>
         <div>
            {token ? (
               <UserDropdown />
            ) : (
               <>
                  <Link to="/login">
                     <Button>Login</Button>
                  </Link>
               </>
            )}
         </div>
      </div>
   );
};

export default Topbar;
