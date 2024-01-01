import Editor from "@monaco-editor/react";
import { useState } from "react";

const EditorWindow = (language) => {
   const [editorValue, setEditorValue] = useState("");

   // Handle editor change
   const handleEditorChange = (value) => {
      setEditorValue(value);
   };

   console.log(editorValue);
   return (
      <div className="overlay mt-6 rounded-md overflow-hidden h-full shadow-4xl">
         <h2 className="text-2xl font-bold pb-2">Editor</h2>
         <Editor
            height="85vh"
            width={`100%`}
            defaultLanguage="javascript"
            language={language || "javascript"}
            value={editorValue}
            theme="vs-dark"
            defaultValue="// some comment"
            onChange={handleEditorChange}
         />
      </div>
   );
};

export default EditorWindow;
