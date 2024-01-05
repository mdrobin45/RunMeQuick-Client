import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import EditorWindow from "../../Components/EditorWindow/EditorWindow";
import OutputWindow from "../../Components/OutputWindow/OutputWindow";
import UserDropdown from "../../Components/UserDropdown/UserDropdown";
import { languages } from "../../Constants/Languages";
import useAPI from "../../Hooks/useAPI";
import useAuth from "../../Hooks/useAuth";

const Landing = () => {
   const [editorValue, setEditorValue] = useState("");
   const [outPutDetails, setOutputDetails] = useState(null);
   const [languageId, setLanguageId] = useState(63);
   const [languageName, setLanguageName] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const { codeSubmission, compilerResult } = useAPI();
   const { token } = useAuth();

   // Get source code from editor
   const handleEditorChange = (value) => {
      setEditorValue(value);
   };

   // Code execute by button click
   const handleCodeExecution = () => {
      setIsLoading(true);
      codeSubmission(editorValue, languageId).then((res) => {
         const token = res.token;
         if (token) {
            compilerResult(token).then((res) => {
               setOutputDetails(res);
               setIsLoading(false);
            });
         }
      });
   };

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
            <div className="w-3/12">
               <Select
                  defaultValue={languages[0]}
                  onChange={handleLanguageChange}
                  placeholder="Select Language"
                  options={languages}
               />
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
               <OutputWindow
                  isLoading={isLoading}
                  outPutDetails={outPutDetails}
                  handleBtnClick={handleCodeExecution}
               />
            </div>
         </div>
      </section>
   );
};

export default Landing;
