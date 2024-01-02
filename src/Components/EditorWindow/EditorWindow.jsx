import Editor from "@monaco-editor/react";

const EditorWindow = ({ editorValue, handleEditorChange }) => {
   return (
      <div className="overlay mt-6 rounded-md overflow-hidden h-full shadow-4xl">
         <h2 className="text-2xl font-bold pb-2">Editor</h2>
         <Editor
            height="80vh"
            width={`100%`}
            defaultLanguage="javascript"
            language="javascript"
            value={editorValue}
            theme="vs-dark"
            defaultValue="// some comment"
            onChange={handleEditorChange}
         />
      </div>
   );
};

export default EditorWindow;
