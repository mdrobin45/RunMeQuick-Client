import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
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
   const [history, setHistory] = useState([]);
   const [historyArray, setHistoryArray] = useState([]);

   // Handle language changes
   const handleLanguageChange = (e) => {
      const language = e.value;
      const label = e.label;

      // setLanguageValue(language);
      setSelectedLanguage(language);
      setSelectedLanguageLabel(label);
   };

   // Load history from session storage instant of page load
   useEffect(() => {
      const sessionHistory = sessionStorage.getItem("history");
      if (sessionHistory) {
         setHistoryArray(JSON.parse(sessionHistory));
      }
   }, []);

   // Save history in session storage
   useEffect(() => {
      sessionStorage.setItem("history", JSON.stringify(historyArray));
   }, [historyArray]);

   // Decode access token
   useEffect(() => {
      if (token) {
         const decoded = jwtDecode(token);
         setDecodeToken(decoded);
      }
   }, [token]);

   // Get user history from database
   const {
      isFetching,
      refetch: refetchHistory,
      data: dbHistory = [],
   } = useQuery({
      queryKey: ["userHistory"],
      queryFn: () => getHistory(decodeToken?.email),
   });

   // Load history from database for logged in user instant of page load
   useEffect(() => {
      if (!dbHistory.length) {
         refetchHistory();
      }
   }, [dbHistory.length, refetchHistory, isFetching]);

   // If user logged in history will fetch from db otherwise from session
   useEffect(() => {
      if (token) {
         setHistory(dbHistory);
      } else {
         let sessionHistory = sessionStorage.getItem("history");
         if (sessionHistory) {
            sessionHistory = JSON.parse(sessionHistory);
            setHistory(sessionHistory);
         }
      }
   }, [dbHistory, token, historyArray]);

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
               toast.success("Execution complete");
            } else {
               setOutput({ output: res.stderr, isError: true });
               toast.error("Execution failed");
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
            setHistoryArray((prev) => [...prev, historyInfo]);

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
