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
               className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
               <Avatar
                  variant="circular"
                  size="sm"
                  alt="tania andrew"
                  className="border border-gray-900 p-0.5"
                  src="https://i.ibb.co/238dYyx/user.png"
               />
            </Button>
         </MenuHandler>
         <MenuList className="p-1">
            <Typography
               as="span"
               variant="small"
               className="font-bold text-gray-900 p-3">
               {decoded?.name ? decoded?.name : ""}
            </Typography>
            <Typography
               as="span"
               variant="small"
               className=" text-gray-600 -mt-3 px-3">
               {decoded?.email ? decoded?.email : ""}
            </Typography>

            <MenuItem
               onClick={handleLogOut}
               className={`flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10`}>
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
