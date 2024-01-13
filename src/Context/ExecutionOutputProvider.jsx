import { createContext, useState } from "react";

export const ExecutionContext = createContext();
const ExecutionOutputProvider = ({ children }) => {
   const [outputLoading, setOutputLoading] = useState(false);
   const [output, setOutput] = useState(null);

   // handle output loading
   const handleLoading = (loadingState) => {
      setOutputLoading(loadingState);
   };

   // Context value
   const contextValue = {
      output,
      setOutput,
      outputLoading,
      handleLoading,
   };
   return (
      <ExecutionContext.Provider value={contextValue}>
         {children}
      </ExecutionContext.Provider>
   );
};

export default ExecutionOutputProvider;
