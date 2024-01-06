import {
   Avatar,
   Button,
   Menu,
   MenuHandler,
   MenuItem,
   MenuList,
   Typography,
} from "@material-tailwind/react";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import styles from "./styles.module.css";

const UserDropdown = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const { token, handleSetToken } = useAuth();

   // Decode token
   const decoded = jwtDecode(token);

   // Logout
   const handleLogOut = () => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
         handleSetToken();
         toast.error("You are logged out");
      }
   };
   return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
         <MenuHandler>
            <Button
               variant="text"
               color="blue-gray"
               className={styles.avatarBtn}>
               <Avatar
                  variant="circular"
                  size="sm"
                  alt="tania andrew"
                  className={styles.avatar}
                  src="https://i.ibb.co/238dYyx/user.png"
               />
            </Button>
         </MenuHandler>
         <MenuList className="p-1">
            <Typography
               as="span"
               variant="small"
               className={styles.dropdownText}>
               {decoded?.name ? decoded?.name : ""}
            </Typography>
            <Typography as="span" variant="small" className={styles.menuEmail}>
               {decoded?.email ? decoded?.email : ""}
            </Typography>

            <MenuItem onClick={handleLogOut} className={styles.logoutBtn}>
               <Typography
                  color="red"
                  as="span"
                  variant="small"
                  className="font-normal">
                  Sign Out
               </Typography>
            </MenuItem>
         </MenuList>
      </Menu>
   );
};

export default UserDropdown;
