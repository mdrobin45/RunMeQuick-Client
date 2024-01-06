import Editor from "@monaco-editor/react";
import styles from "./styles.module.css";

const EditorWindow = ({ lan, editorValue, handleEditorChange }) => {
   return (
      <div className={styles.editorMainWrapper}>
         <h2 className={styles.editorTitle}>Editor</h2>
         <div className={styles.editorWrapper}>
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
