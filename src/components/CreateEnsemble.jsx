import { useState} from "react";
import styles from "./Signup.module.css";
import Navigation from "./shared/Navigation";
import Footer from "./shared/Footer";
import { useNavigate } from "react-router-dom";
import { validateName } from "./../utils.js";
import { validateDesc } from "./../utils.js";


export default function CreateEnsemble() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [address, setAddress] = useState("");
  const [activeMusicians, setActiveMusicians ] = useState("");
  const [practiceFrequency, setPracticeFrequency] = useState("");
  const [genre, setGenre] = useState("");
  
  const [nameError, setNameError] = useState("");
  const [descError, setDescError] = useState("");
  const [isNameValid, setNameValid] = useState(true);
  const [isDescValid, setDescValid] = useState(true);

  

  const onNameChange = (e) => {setName(e.target.value);};
  const onDescriptionChange = (e) => {setDescription(e.target.value);};
  const onLinkChange = (e) => {setLink(e.target.value);};
  const onAddressChange = (e) => {setAddress(e.target.value);}
  const onActMusicChange = (e) => setActiveMusicians(e.target.value);
  const onPracticeChange = (e) => setPracticeFrequency(e.target.value);
  const onGenreChange = (e) => setGenre(e.target.value);

  const getToken = () => {
    return localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  };


  const clearForm = () => {
    setName("");
    setDescription("");
    setLink("");
    setAddress("");
    setActiveMusicians("");
    setPracticeFrequency("");
    setGenre("");
  };

  function handleSubmit(e) {
    e.preventDefault();
    const tokenFromStorage = getToken();

    const isNameValid = validateName(name);
    const isDescValid = validateDesc(description);

    if (isNameValid && isDescValid) {
      setNameError("");
      setDescError("");

    const data = {
      name,
      description,
      link,
      address,
      activeMusicians,
      practiceFrequency,
      genre,
    };
    
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenFromStorage}`,
      },
      mode: "cors",
      body: JSON.stringify(data),
    };

    fetch("http://localhost:3000/ensembles", requestOptions)
      .then((response) => response.json())
      .then((res) => console.log(res));

    navigate("/");
    clearForm();
  } else {
  if (!isNameValid) {
    setNameError("Name must be filled in!");
    setNameValid(false);
  }
  if (!isDescValid) {
    setDescError("Description must be filled in!");
    setDescValid(false);
  }
  }
}

  return (
    <>
      <Navigation></Navigation>
      <div className={styles.center}>
        <form className={styles} onSubmit={handleSubmit}>
          <label>
        Ensemble Name
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onNameChange}
              className={!isNameValid ? styles.invalid : ""}
            />
            {!isNameValid && <div className={styles.error}>{nameError}</div>}
          </label>

          <label>
            Description
            <textarea
              placeholder="Description"
              name="description"
              value={description}
              onChange={onDescriptionChange}
            className={!isDescValid ? styles.invalid : ""}
            />
             {!isDescValid && <div className={styles.error}>{descError}</div>}
          </label>


          <label>
         Link
            <input
              type="text"
              placeholder="Link"
              name="link"
              value={link}
              onChange={onLinkChange}
         
            />
          
          </label>


          <label>
          Address
            <input
              type="text"
              placeholder="Address"
              name="addres"
              value={address}
              onChange={onAddressChange}
            />
          </label>


          <label>
            Active musicians
            <input
              type="number"
              placeholder="Active musicians"
              name="activeMusicians"
              value={activeMusicians}
              onChange={onActMusicChange}
            />
          </label>


          <label>
            Practice Frequency
            <input
              type="text"
              placeholder="Practice Frequency"
              name="practiceFrequency"
              value={practiceFrequency}
              onChange={onPracticeChange}
            />
          </label>

          <label>
            Genre
            <input
              type="text"
              placeholder="Genre"
              name="genre"
              value={genre}
              onChange={onGenreChange}
            //   className={!isEmailValid ? styles.invalid : ""}
            />
          {/* {!isEmailValid && <div className={styles.error}>{emailError}</div>} */}
          </label>

          

     

          

        

         

          <input type="submit" value="Create" />
        </form>
      </div>
      <Footer></Footer>
    </>
  );
}

