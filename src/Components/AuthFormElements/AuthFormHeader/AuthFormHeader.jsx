import { Link } from "react-router-dom";
import styles from "../styles.module.css";

const AuthFormHeader = ({ heading }) => {
   return (
      <div>
         <div className={styles.formHeadingWrapper}>
            <h2 className={styles.formHeading}>{heading}</h2>
            <Link to="/" className={styles.backToHomeLink}>
               Back to Home
            </Link>
         </div>
         <hr />
      </div>
   );
};

export default AuthFormHeader;
