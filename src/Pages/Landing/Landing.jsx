import EditorWindow from "../../Components/EditorWindow/EditorWindow";
import OutputWindow from "../../Components/OutputWindow/OutputWindow";
import Topbar from "./Topbar/Topbar";
import useLandingLogic from "./useLandingLogic";

const Landing = () => {
   const {
      editorValue,
      languageName,
      handleCodeExecution,
      handleEditorChange,
   } = useLandingLogic();

   return (
      <section className=" p-4 md:p-6 lg:p-10">
         <Topbar />
         <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-2/3">
               <EditorWindow
                  lan={languageName}
                  editorValue={editorValue}
                  handleEditorChange={handleEditorChange}
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
