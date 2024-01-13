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
   const { codeCompiler } = useAPI();
   const { handleLoading } = useContext(ExecutionContext);
   const [selectedLanguage, setSelectedLanguage] = useState("javascript");
   const [selectedLanguageLabel, setSelectedLanguageLabel] =
      useState("javascript");
   const [editorValue, setEditorValue] = useState("");
   const { getHistory } = useAPI();
   const { token } = useAuth();
   const [output, setOutput] = useState({});
   const [decodeToken, setDecodeToken] = useState(null);

   // Handle language changes
   const handleLanguageChange = (e) => {
      const language = e.value;
      const label = e.label;

      // setLanguageValue(language);
      setSelectedLanguage(language);
      setSelectedLanguageLabel(label);
   };

   useEffect(() => {
      // Decode access token
      if (token) {
         const decoded = jwtDecode(token);
         setDecodeToken(decoded);
      }
   }, [token]);

   // Get user history from database
   const { refetch: refetchHistory, data: history = [] } = useQuery({
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
      codeCompiler(selectedLanguage, editorValue)
         .then((res) => {
            handleLoading(false);

            if (res.stdout) {
               setOutput({ output: res.stdout, isError: false });
            } else {
               setOutput({ output: res.stderr, isError: true });
            }

            // Create history object for store database
            const historyInfo = {
               label: `History - ${selectedLanguageLabel}`,
               value: Date.now(),
               email: decodeToken?.email,
               sourceCode: btoa(editorValue),
               output: res.stdout
                  ? { output: res.stdout, isError: false }
                  : { output: res.stderr, isError: true },
            };

            // Server request for store history
            if (token && Object.keys(output).length !== 0) {
               axios
                  .post(
                     `${import.meta.env.VITE_SERVER_API}/save-history`,
                     historyInfo
                  )
                  .then((res) => {
                     if (res) {
                        refetchHistory();
                     }
                  });
            }
         })
         .catch((err) => {
            if (err) {
               handleLoading(false);
            }
         });
   };

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
                  lan={selectedLanguage}
               />
            </div>
            <div className={styles.outputWrapper}>
               <OutputWindow
                  output={output}
                  handleBtnClick={handleCodeExecution}
               />
            </div>
         </div>
      </section>
   );
};

export default Landing;
