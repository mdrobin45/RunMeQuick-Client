import { Button } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import EditorWindow from "../../Components/EditorWindow/EditorWindow";
import OutputWindow from "../../Components/OutputWindow/OutputWindow";
import UserDropdown from "../../Components/UserDropdown/UserDropdown";
import { languages } from "../../Constants/Languages";
import { ExecutionContext } from "../../Context/ExecutionOutputProvider";
import useAPI from "../../Hooks/useAPI";
import useAuth from "../../Hooks/useAuth";

const Landing = () => {
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
            value: executionOutput?.created_at,
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
   return (
      <section className=" p-10">
         <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full">
               <div className="w-3/12">
                  <Select
                     defaultValue={languages[0]}
                     onChange={handleLanguageChange}
                     placeholder="Select Language"
                     options={languages}
                  />
               </div>
               <div className="w-3/12">
                  <Select
                     onChange={handleHistoryChange}
                     placeholder="History"
                     options={history}
                  />
               </div>
            </div>
            <div>
               {token ? (
                  <UserDropdown />
               ) : (
                  <>
                     <Link to="/login">
                        <Button>Login</Button>
                     </Link>
                  </>
               )}
            </div>
         </div>
         <div className="flex gap-3">
            <div className="w-2/3">
               <EditorWindow
                  lan={languageName}
                  editorValue={editorValue}
                  handleEditorChange={handleEditorChange}
               />
            </div>
            <div className="w-1/3 h-48">
               <OutputWindow handleBtnClick={handleCodeExecution} />
            </div>
         </div>
      </section>
   );
};

export default Landing;
