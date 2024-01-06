import Editor from "@monaco-editor/react";

const EditorWindow = ({ lan, editorValue, handleEditorChange }) => {
   return (
      <div className="overlay mt-6 rounded-md overflow-hidden h-full shadow-4xl">
         <h2 className="text-2xl font-bold pb-2">Editor</h2>
         <div className="rounded-md overflow-hidden">
            <Editor
               height="80vh"
               width={`100%`}
               defaultLanguage="javascript"
               language={lan}
               value={editorValue}
               theme="vs-dark"
               defaultValue="// some comment"
               onChange={handleEditorChange}
            />
         </div>
      </div>
   );
};

export default EditorWindow;
