import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Login from "../Pages/Authentication/Login/Login";
import Landing from "../Pages/Landing/Landing";

const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout />,
      children: [
         {
            path: "/",
            element: <Landing />,
         },
      ],
   },
   {
      path: "/login",
      element: <Login />,
   },
]);

export default router;
