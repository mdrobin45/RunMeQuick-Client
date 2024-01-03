import { useEffect, useState } from "react";

const OutputWindow = ({ handleBtnClick, outPutDetails, isLoading }) => {
   const [output, setOutput] = useState(null);

   useEffect(() => {
      if (
         outPutDetails?.stderr !== null ||
         outPutDetails?.stdout !== null ||
         outPutDetails?.compile_output !== null
      ) {
         setOutput(
            outPutDetails?.stderr ||
               outPutDetails?.stdout ||
               outPutDetails?.compile_output
         );
      }
   }, [outPutDetails]);

   return (
      <div className="mt-6 h-full">
         <h2 className="text-2xl font-bold pb-2">Output</h2>
         <div className="bg-gray-800 rounded-md overflow-x-scroll text-[#07bc0c] w-full h-48 p-4">
            <pre
               className={`${
                  outPutDetails?.status_id !== 3 ? "text-red-500" : ""
               }`}>
               {output && atob(output)}
            </pre>
         </div>
         <button
            onClick={handleBtnClick}
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 mt-4 dark:focus:ring-gray-700 dark:border-gray-700">
            {!isLoading ? "Run and Execute" : "Processing..."}
         </button>
      </div>
   );
};

export default OutputWindow;
