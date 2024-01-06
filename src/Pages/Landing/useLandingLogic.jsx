import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { ExecutionContext } from "../../Context/ExecutionOutputProvider";
import useAPI from "../../Hooks/useAPI";
import useAuth from "../../Hooks/useAuth";

const useLandingLogic = () => {
   const [editorValue, setEditorValue] = useState("");
   const [languageId, setLanguageId] = useState(63);
   const [languageName, setLanguageName] = useState(null);
   const { codeSubmission, compilerResult, getHistory } = useAPI();
   const { token } = useAuth();
   const { handleLoading, executionOutput, setOutput } =
      useContext(ExecutionContext);
   const [result, setResult] = useState(null);
   const [decodeToken, setDecodeToken] = useState(null);

   useEffect(() => {
      // Decode token
      if (token) {
         const decoded = jwtDecode(token);
         setDecodeToken(decoded);
      }
   }, [token]);

   // Call history api
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

   // Handle language changes
   const handleLanguageChange = (e) => {
      const id = e.id;
      const name = e.value;

      setLanguageId(id);
      setLanguageName(name);
   };

   return {
      history,
      editorValue,
      languageName,
      handleLanguageChange,
      handleHistoryChange,
      handleCodeExecution,
      handleEditorChange,
   };
};

export default useLandingLogic;
