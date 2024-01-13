import { useContext } from "react";
import { ExecutionContext } from "../../Context/ExecutionOutputProvider";
import useAPI from "../../Hooks/useAPI";
import styles from "./styles.module.css";

const OutputWindow = ({ handleBtnClick, output }) => {
   const { outputLoading } = useContext(ExecutionContext);
   const { cancelHandler } = useAPI();

   return (
      <div className={styles.outputMainWrapper}>
         <h2 className={styles.outputTitle}>Output</h2>
         <div className={styles.outputWrapper}>
            <pre className={output?.isError ? "text-red-500" : ""}>
               {output?.output !== undefined ? atob(output.output) : ""}
            </pre>
         </div>
         <button
            onClick={handleBtnClick}
            type="button"
            className={styles.executeBtn}>
            {!outputLoading ? "Run and Execute" : "Processing..."}
         </button>
         <button
            disabled={outputLoading ? false : true}
            onClick={cancelHandler}
            type="button"
            className={`text-white ${
               !outputLoading ? "opacity-20" : ""
            } bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}>
            Cancel
         </button>
      </div>
   );
};

export default OutputWindow;
