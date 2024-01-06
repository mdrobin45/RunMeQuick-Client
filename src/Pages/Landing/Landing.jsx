import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import EditorWindow from "../../Components/EditorWindow/EditorWindow";
import OutputWindow from "../../Components/OutputWindow/OutputWindow";
import { ExecutionContext } from "../../Context/ExecutionOutputProvider";
import useAPI from "../../Hooks/useAPI";
import useAuth from "../../Hooks/useAuth";
import Topbar from "./Topbar/Topbar";
import styles from "./styles.module.css";

const Landing = () => {
   const { codeSubmission, compilerResult } = useAPI();
   const { handleLoading } = useContext(ExecutionContext);
   const [languageId, setLanguageId] = useState(63);
   const [languageName, setLanguageName] = useState(null);
   const [editorValue, setEditorValue] = useState("");
   const { getHistory } = useAPI();
   const { token } = useAuth();
   const { executionOutput, setOutput } = useContext(ExecutionContext);
   const [result, setResult] = useState(null);
   const [decodeToken, setDecodeToken] = useState(null);

   // Handle language changes
   const handleLanguageChange = (e) => {
      const id = e.id;
      const name = e.value;

      setLanguageId(id);
      setLanguageName(name);
   };

   useEffect(() => {
      // Decode access token
      if (token) {
         const decoded = jwtDecode(token);
         setDecodeToken(decoded);
      }
   }, [token]);

   // Get user history from database
   const { refetch, data: history = [] } = useQuery({
      queryKey: ["userHistory"],
      queryFn: () => getHistory(decodeToken?.email),
   });

   // Get source code from editor on change
   const handleEditorChange = (value) => {
      setEditorValue(value);
   };

   // Handle history selector change and get history value
   const handleHistoryChange = (e) => {
      const sourceCode = atob(e.sourceCode);
      setEditorValue(sourceCode);
      setOutput(e.output);
   };

   // Code execute by button click
   const handleCodeExecution = async () => {
      handleLoading(true);
      codeSubmission(editorValue, languageId).then((res) => {
         const token = res.token;
         if (token) {
            compilerResult(token);
         }
      });
   };

   useEffect(() => {
      if (executionOutput) {
         // Handle execution error
         if (
            executionOutput?.stderr !== null ||
            executionOutput?.stdout !== null ||
            executionOutput?.compile_output !== null
         ) {
            setResult(
               executionOutput?.stderr ||
                  executionOutput?.stdout ||
                  executionOutput?.compile_output
            );
         }

         // Create history object for store database
         const historyInfo = {
            label: `History - ${executionOutput?.language?.name}`,
            value: Date.now(),
            email: decodeToken?.email,
            sourceCode: executionOutput?.source_code,
            output: result,
         };

         // Server request for store history
         if (token) {
            axios
               .post(
                  `${import.meta.env.VITE_SERVER_API}/save-history`,
                  historyInfo
               )
               .then((res) => console.log(res));
         }
      }

      // Refetch history when execute complete
      refetch();
   }, [decodeToken?.email, executionOutput, refetch, result, token]);

   return (
      <section className={styles.mainWrapper}>
         <Topbar
            handleHistoryChange={handleHistoryChange}
            history={history}
            changeHandler={handleLanguageChange}
         />
         <div className={styles.windowWrapper}>
            <div className={styles.editorWrapper}>
               <EditorWindow
                  editorValue={editorValue}
                  handleEditorChange={handleEditorChange}
                  lan={languageName}
               />
            </div>
            <div className={styles.outputWrapper}>
               <OutputWindow handleBtnClick={handleCodeExecution} />
            </div>
         </div>
      </section>
   );
};

export default Landing;
