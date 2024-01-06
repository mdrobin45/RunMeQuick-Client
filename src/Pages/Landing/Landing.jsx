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

const Landing = () => {
   // const { editorValue } = useLandingLogic();
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
      // Decode token
      if (token) {
         const decoded = jwtDecode(token);
         setDecodeToken(decoded);
      }
   }, [token]);

   // Get user history
   const { refetch, data: history = [] } = useQuery({
      queryKey: ["userHistory"],
      queryFn: () => getHistory(decodeToken?.email),
   });

   // Get source code from editor
   const handleEditorChange = (value) => {
      setEditorValue(value);
   };

   // Handle history change
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

         const historyInfo = {
            label: `History - ${executionOutput?.language?.name}`,
            value: Date.now(),
            email: decodeToken?.email,
            sourceCode: executionOutput?.source_code,
            output: result,
         };

         if (token) {
            axios
               .post(
                  `${import.meta.env.VITE_SERVER_API}/save-history`,
                  historyInfo
               )
               .then((res) => console.log(res));
         }
      }

      // Refetch history
      refetch();
   }, [decodeToken?.email, executionOutput, refetch, result, token]);

   return (
      <section className=" p-4 md:p-6 lg:p-10">
         <Topbar
            handleHistoryChange={handleHistoryChange}
            history={history}
            changeHandler={handleLanguageChange}
         />
         <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-2/3">
               <EditorWindow
                  editorValue={editorValue}
                  handleEditorChange={handleEditorChange}
                  lan={languageName}
               />
            </div>
            <div className="w-full md:w-1/3 h-48">
               <OutputWindow handleBtnClick={handleCodeExecution} />
            </div>
         </div>
      </section>
   );
};

export default Landing;
