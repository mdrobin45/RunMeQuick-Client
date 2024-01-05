import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const ExecutionContext = createContext();
const ExecutionOutputProvider = ({ children }) => {
   const [executionOutput, setExecutionOutput] = useState(null);
   const [outputLoading, setOutputLoading] = useState(false);
   const [output, setOutput] = useState(null);

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
      if (
         executionOutput?.stderr !== null ||
         executionOutput?.stdout !== null ||
         executionOutput?.compile_output !== null
      ) {
         setOutput(
            executionOutput?.stderr ||
               executionOutput?.stdout ||
               executionOutput?.compile_output
         );
      }

      // Show toast
      if (executionOutput !== null) {
         if (executionOutput?.status_id === 3) {
            toast.success("Execution complete");
         } else {
            toast.error("Compile error");
         }
      }
   }, [executionOutput]);

   // Context value
   const contextValue = {
      output,
      setOutput,
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
