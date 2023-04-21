import styles from "./Profile.module.css";
import style from "./Signup.module.css";
import Navigation from "./shared/Navigation";
import Footer from "./shared/Footer";
import { useState, useEffect } from "react";
import ShowModal from "./Modal";
import { useNavigate } from "react-router-dom";
import MyEnsemble from "./shared/MyEnsemble";

export default function MusicianProfile() {
  const [user, setUser] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [instrument, setInstrument] = useState("");
  const [description, setDescription] = useState("");
  const [ensembles, setEnsembles] = useState([]);

  const navigate = useNavigate();
  const [popUpToggle, setPopUpToggle] = useState(false);

  // SHOW MODAL CONTACT
  const handleModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  // HIDE USER INFO AND SHOW FORM
  const handleClick = () => {
    setIsShown((current) => !current);
  };

  const showDelModal = () => {
    setPopUpToggle((current) => !current);
  };

  // GET LOCALSTORAGE TOKEN
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const getId = () => {
    return localStorage.getItem("id");
  };

  const tokenFromStorage = getToken().replace(/^"(.*)"$/, "$1");

  const idFromStorage = getId().replace(/^"(.*)"$/, "$1");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenFromStorage}`,
      },
      mode: "cors",
    };
    fetch(
      "http://localhost:3000/profile/loggedin/" + idFromStorage,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setUsername(data.username);
        setEmail(data.email);
        setFullName(data.fullName);
        setPhoneNo(data.phoneNo);
        setPassword(data.password);
        setInstrument(data.instrument);
        setDescription(data.description);
        setEnsembles(data.ensembles);
        console.log(data);
      });
  }, []);

  // UPDATE FORM FUNCTIONALITY
  const onUsernameChange = (e) => setUsername(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  // const onPasswordChange = (e) => setPassword(e.target.value);
  const onNameChange = (e) => setFullName(e.target.value);
  const onPhoneNoChange = (e) => setPhoneNo(e.target.value);
  const onInstrumentChange = (e) => setInstrument(e.target.value);
  const onDescriptionChange = (e) => setDescription(e.target.value);

  const handleUpdate = (e) => {
    e.preventDefault();
    // const tokenFromStorage = getToken().replace(/^"(.*)"$/, "$1");

    // const idFromStorage = getId().replace(/^"(.*)"$/, "$1");

    console.log(password);
    const data = {
      username,
      email,
      password,
      fullName,
      phoneNo,
      instrument,
      description,
    };

    console.log("data", data);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenFromStorage}`,
      },
      mode: "cors",
      body: JSON.stringify(data),
    };

    fetch("http://localhost:3000/profile/" + idFromStorage, requestOptions)
      .then((response) => response.json())
      .then((res) => console.log(res));
    window.location.reload(true);
  };

  const handleClickDel = () => {
    const tokenFromStorage = getToken().replace(/^"(.*)"$/, "$1");

    const idFromStorage = getId().replace(/^"(.*)"$/, "$1");
    const logout = () => {
      navigate("/signup");
      localStorage.clear();
    };
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenFromStorage}`,
      },
    };
    fetch("http://localhost:3000/profile/" + idFromStorage, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      });
    logout();
  };

  return (
    <>
      <Navigation></Navigation>

      <h1 className={styles.heading}>Hi, {user.username}! &#128075;</h1>
      {!isShown && (
        <div className={styles.grid}>
          <div className={styles.anotherColumn}>
            <img
              src="https://i.pravatar.cc/300"
              alt="profile"
              className={styles.profile}
            />
            <button className={styles.contact} onClick={handleModal}>
              Contact
            </button>
          </div>

          <div className={styles.column}>
            <div className={styles.info}>{user.fullName}</div>
            <div className={styles.instrum}>
              <span className={styles.span}> &#127925; {user.instrument}</span>
            </div>
            <div className={styles.infodesc}>About me: </div>
            <span className={styles.span}>{user.description}</span>
            <div className={styles.buttons}>
              <button className={styles.update} onClick={handleClick}>
                Update profile
              </button>
              <button className={styles.delete} onClick={showDelModal}>
                Delete profile
              </button>
            </div>
          </div>
        </div>
      )}
      {!isShown && (
        <>
          <h1 className={styles.heading}>My Ensembles</h1>
          <div className={styles.gridEnsembles}>
            {ensembles.map((ensemble, index) => (
              <MyEnsemble
                key={index}
                name={ensemble.name}
                genre={ensemble.genre}
                link={ensemble.link}
              />
            ))}
          </div>
        </>
      )}

      {isShown && (
        <div className={style.center}>
          <form className={style} onSubmit={handleUpdate}>
            <label>
              Full Name
              <input
                type="text"
                placeholder=" Full name"
                name="name"
                defaultValue={user.fullName}
                onChange={onNameChange}
              />
            </label>

            <label>
              Username
              <input
                type="text`"
                placeholder="Username"
                name="username"
                defaultValue={user.username}
                onChange={onUsernameChange}
              />
            </label>

            <label>
              E-mail
              <input
                type="email"
                placeholder="E-mail"
                name="email"
                defaultValue={user.email}
                onChange={onEmailChange}
              />
            </label>

            {/* <label>
              Password
              <input
                type="password"
                placeholder="Password"
                name="password"
                defaultValue={user.password}
                onChange={onPasswordChange}
              />
            </label> */}

            <label>
              Phone Number
              <input
                type="number"
                placeholder="Phone Number"
                name="number"
                defaultValue={user.phoneNo}
                onChange={onPhoneNoChange}
              />
            </label>

            <label>
              Instruments
              <input
                type="text"
                placeholder="Instrument"
                name="instrument"
                defaultValue={user.instrument}
                onChange={onInstrumentChange}
              />
            </label>

            <label>
              Description
              <textarea
                placeholder="Description"
                name="description"
                defaultValue={user.description}
                onChange={onDescriptionChange}
              />
            </label>

            <input type="submit" value="Update Profile" />
          </form>
        </div>
      )}

      <ShowModal showModal={showModal} closeModal={closeModal} />

      {popUpToggle && (
        <div className={styles.popUp}>
          <div
            className={styles.popUpBody}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.popUpContent}>
              <div className={styles.ques}>
                <b>Are you sure you want to DELETE your account?</b>
              </div>
              <div className={styles.buttons}>
                <button className={styles.delete} onClick={handleClickDel}>
                  Yes
                </button>
                <button className={styles.update} onClick={showDelModal}>
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer></Footer>
    </>
  );
}
