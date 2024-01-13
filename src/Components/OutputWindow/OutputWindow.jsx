import { useContext } from "react";
import { ExecutionContext } from "../../Context/ExecutionOutputProvider";
import styles from "./styles.module.css";

const OutputWindow = ({ handleBtnClick }) => {
   const { outputLoading, executionOutput, output } =
      useContext(ExecutionContext);

   return (
      <div className={styles.outputMainWrapper}>
         <h2 className={styles.outputTitle}>Output</h2>
         <div className={styles.outputWrapper}>
            <pre
               className={`${
                  executionOutput?.status_id !== 3 &&
                  executionOutput?.status_id !== undefined
                     ? "text-red-500"
                     : ""
               }`}>
               {output && output}
            </pre>
         </div>
         <button
            onClick={handleBtnClick}
            type="button"
            className={styles.executeBtn}>
            {!outputLoading ? "Run and Execute" : "Processing..."}
         </button>
      </div>
   );
};

export default OutputWindow;
