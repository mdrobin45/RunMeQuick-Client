import { useContext } from "react";
import { ExecutionContext } from "../../Context/ExecutionOutputProvider";
import styles from "./styles.module.css";

const OutputWindow = ({ handleBtnClick, output }) => {
   const { outputLoading } = useContext(ExecutionContext);

   console.log();
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
      </div>
   );
};

export default OutputWindow;
