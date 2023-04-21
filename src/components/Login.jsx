import styles from "./Signup.module.css";
import Navigation from "./shared/Navigation";
import Footer from "./shared/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUsername } from "./../utils.js";
import { validatePassword } from "./../utils.js";

export default function LogIn() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isUsernameValid, setUsernameIsValid] = useState(true);
  const [isPasswordValid, setPasswordIsValid] = useState(true);

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      username: newUsername,
    }));
    setUsernameIsValid(true);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      password: newPassword,
    }));
    setPasswordIsValid(true);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    let credentials = {
      username: event.currentTarget.elements.username.value,
      password: event.currentTarget.elements.password.value,
    };

  const isUsernameValid = validateUsername(credentials.username);
  const isPasswordValid = validatePassword(credentials.password);

  if (isUsernameValid && isPasswordValid) {
    // submit the form
      const creds = await loginUser(credentials);
      const idValue = creds.id;
      const tokenValue = creds.access_token;

    localStorage.setItem("token", JSON.stringify(tokenValue));
    localStorage.setItem("id", JSON.stringify(idValue));

    setCredentials(" ");

    if (creds) {
      setTimeout(navigate("/"), 2000);
    }
  }  else {
    if (!isUsernameValid) {
      setUsernameError("Enter valid username!");
      setUsernameIsValid(false);
    }
    if (!isPasswordValid) {
      setPasswordError("Enter valid password!");
      setPasswordIsValid(false);
    }
   }
  };

  async function loginUser(credentials) {
    const result = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(credentials),
    });

    const res = await result.json();
    return res;
  }

  return (
    <>
      <Navigation></Navigation>
      <div className={styles.center}>
        <form className={styles} onSubmit={handleLogin}>
          <h2>Log In</h2>
          <label>
            Username
            <input
              type="text"
              placeholder="Username"
              name="username"
              defaultValue={credentials.username}
              onChange={handleUsernameChange}
              className={!isUsernameValid ? styles.invalid : ""}  
             />
            {!isUsernameValid && <div className={styles.error}>{usernameError}</div>}
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Password"
              name="password"
              defaultValue={credentials.password}
              onChange={handlePasswordChange}
              className={!isPasswordValid ? styles.invalid : ""}
            />
            {!isPasswordValid && <div className={styles.error}>{passwordError}</div>}
          </label>

          <input type="submit" value="Log In" />
        </form>
      </div>
      <Footer></Footer>
    </>
  );
}
