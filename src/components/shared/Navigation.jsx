import styles from "./Navigation.module.css";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const tokenFromStorage = getToken();

  const navigate = useNavigate();

  const logout = () => {
    navigate("/auth/login");
    localStorage.clear();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.gridLeft}>
        <h1>Musik Samspil</h1>
        <p>Skabt af DAOS - Dansk Amatørorkester Samvirke </p>
      </div>
      <ul className={styles.navLinks}>
        <input type="checkbox" id="checkbox_toggle" />
        <label htmlFor="checkbox_toggle" className={styles.hamburger}>
          &#9776;
        </label>

        <div className={styles.menu}>
          <li>
            <a href="/">Posts</a>
          </li>
          <li>
            <a href="/ensembles">Create Post</a>
          </li>
          <li
            style={{ display: tokenFromStorage ? "block" : "none" }}
            className={styles.profile}
          >
            <a href="/musician">Profile</a>
          </li>
          {/* <li className={styles.services}>
           <a href="/ensemble">Ensemble Profile</a>
         </li> */}
          <li style={{ display: tokenFromStorage ? "none" : "block" }}>
            <a href="/signup">Create Account</a>
          </li>
          <li style={{ display: tokenFromStorage ? "none" : "block" }}>
            <a href="/auth/login">Log In</a>
          </li>
          <li
            style={{ display: tokenFromStorage ? "block" : "none" }}
            onClick={logout}
          >
            <a href="/auth/login">Log Out</a>
          </li>
        </div>
      </ul>
    </nav>
  );
}
