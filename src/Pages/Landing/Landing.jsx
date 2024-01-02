import { useState } from "react";
import Select from "react-select";
import { codeSubmission, compilerResult } from "../../API/ServerRequest";
import EditorWindow from "../../Components/EditorWindow/EditorWindow";
import OutputWindow from "../../Components/OutputWindow/OutputWindow";

const options = [
   { value: "chocolate", label: "Chocolate" },
   { value: "strawberry", label: "Strawberry" },
   { value: "vanilla", label: "Vanilla" },
];

const Landing = () => {
   const [editorValue, setEditorValue] = useState("");
   const [outPutDetails, setOutputDetails] = useState(null);

   // Get source code from editor
   const handleEditorChange = (value) => {
      setEditorValue(value);
   };

   // Code execute by button click
   const handleCodeExecution = () => {
      codeSubmission(editorValue).then((res) => {
         const token = res.token;
         if (token) {
            compilerResult(token).then((res) => setOutputDetails(res));
         }
      });
   };
   return (
      <section className=" p-10">
         <div className="flex items-center gap-4">
            <div className="w-3/12">
               <Select placeholder="Select Language" options={options} />
            </div>
            <div className="w-3/12">
               <Select options={options} />
            </div>
         </div>
         <div className="flex gap-3">
            <div className="w-2/3">
               <EditorWindow
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
