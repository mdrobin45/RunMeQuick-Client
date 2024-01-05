import { createContext, useEffect, useState } from "react";

export const ExecutionContext = createContext();
const ExecutionOutputProvider = ({ children }) => {
   const [executionOutput, setExecutionOutput] = useState(null);
   const [outputLoading, setOutputLoading] = useState(false);

   // handle output loading
   const handleLoading = (loadingState) => {
      setOutputLoading(loadingState);
   };

   // handle set new output
   const handleSetOutput = (output) => {
      setExecutionOutput(output);
   };

   useEffect(() => {
      setOutputLoading(false);
   }, [executionOutput]);

   // Context value
   const contextValue = {
      outputLoading,
      handleLoading,
      executionOutput,
      handleSetOutput,
   };
   return (
      <ExecutionContext.Provider value={contextValue}>
         {children}
      </ExecutionContext.Provider>
   );
};

export default ExecutionOutputProvider;
