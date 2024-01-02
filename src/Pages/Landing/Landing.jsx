import { useState } from "react";
import Select from "react-select";
import { codeSubmission, compilerResult } from "../../API/ServerRequest";
import EditorWindow from "../../Components/EditorWindow/EditorWindow";
import OutputWindow from "../../Components/OutputWindow/OutputWindow";
import { languages } from "../../Constants/Languages";

const Landing = () => {
   const [editorValue, setEditorValue] = useState("");
   const [outPutDetails, setOutputDetails] = useState(null);
   const [languageId, setLanguageId] = useState(null);
   const [languageName, setLanguageName] = useState(null);

   // Get source code from editor
   const handleEditorChange = (value) => {
      setEditorValue(value);
   };

   // Code execute by button click
   const handleCodeExecution = () => {
      codeSubmission(editorValue, languageId).then((res) => {
         const token = res.token;
         if (token) {
            compilerResult(token).then((res) => setOutputDetails(res));
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
         <div className="flex items-center gap-4">
            <div className="w-3/12">
               <Select
                  onChange={handleLanguageChange}
                  placeholder="Select Language"
                  options={languages}
               />
            </div>
            {/* <div className="w-3/12">
               <Select options={options} />
            </div> */}
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
                  outPutDetails={outPutDetails}
                  handleBtnClick={handleCodeExecution}
               />
            </div>
         </div>
      </section>
   );
};

export default Landing;
