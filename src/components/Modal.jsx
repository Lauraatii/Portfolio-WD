import styles from "./Modal.module.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";

export default function ShowModal({ showModal, closeModal }) {
  const [user, setUser] = useState([]);
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
      .then((data) => setUser(data));
  }, []);

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      className={styles.modal}
    >
      <div id="container">
        <h1 className={styles.icon}>&#9742;</h1>
        <h2>Contact {user.fullName} </h2>

        <div className={styles.phone}>
          <p className={styles.modalInfo}> {user.phoneNo}</p>
        </div>
        <div className={styles.mail}>
          <p className={styles.modalInfo}>{user.email}</p>
        </div>
      </div>
    </Modal>
  );
}
