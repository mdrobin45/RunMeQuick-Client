import { useState } from "react";
import Select from "react-select";
import { codeSubmission } from "../../API/ServerRequest";
import EditorWindow from "../../Components/EditorWindow/EditorWindow";
import Output from "../../Components/Output/Output";

const options = [
   { value: "chocolate", label: "Chocolate" },
   { value: "strawberry", label: "Strawberry" },
   { value: "vanilla", label: "Vanilla" },
];

const Landing = () => {
   const [editorValue, setEditorValue] = useState("");

   // Get source code from editor
   const handleEditorChange = (value) => {
      setEditorValue(value);
   };

   // Code execute by button click
   const handleCodeExecution = () => {
      codeSubmission(editorValue).then((res) => console.log(res));
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
            <div className="w-3/4">
               <EditorWindow
                  editorValue={editorValue}
                  handleEditorChange={handleEditorChange}
               />
            </div>
            <div className="w-[25%] h-48">
               <Output handleBtnClick={handleCodeExecution} />
            </div>
         </div>
      </section>
   );
};

export default Landing;
