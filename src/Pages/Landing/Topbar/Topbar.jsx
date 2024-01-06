import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Select from "react-select";
import UserDropdown from "../../../Components/UserDropdown/UserDropdown";
import { languages } from "../../../Constants/Languages";
import useAuth from "../../../Hooks/useAuth";
import styles from "./styles.module.css";

const Topbar = ({ changeHandler, handleHistoryChange, history }) => {
   const { token } = useAuth();
   history = history.toReversed();
   return (
      <div className={styles.topbarMainWrapper}>
         <div className={styles.dropdownWrapper}>
            <div className={styles.selectElement}>
               <Select
                  defaultValue={languages[0]}
                  onChange={changeHandler}
                  placeholder="Select Language"
                  options={languages}
               />
            </div>
            <div className={styles.selectElement}>
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
