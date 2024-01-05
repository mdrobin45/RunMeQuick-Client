import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import AuthContextProvider from "./Context/AuthContextProvider.jsx";
import ExecutionOutputProvider from "./Context/ExecutionOutputProvider.jsx";
import router from "./Router/Router.jsx";
import "./index.css";

// Create a client
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <AuthContextProvider>
         <ExecutionOutputProvider>
            <QueryClientProvider client={queryClient}>
               <ThemeProvider>
                  <RouterProvider router={router} />
                  <Toaster />
               </ThemeProvider>
            </QueryClientProvider>
         </ExecutionOutputProvider>
      </AuthContextProvider>
   </React.StrictMode>
);
