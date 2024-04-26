import { TextField, Snackbar } from "@mui/material";
import "./App.css";
import { getUsers, createUser, deleteUser } from "./api.js";
import React, { useEffect, useState } from "react";

/** Regex */
/** Firstname's and lastname's regex */
const regexNames = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\\- ]+$");
/** Email's regex */
const regexEmail = new RegExp("^[a-zA-Z\\.\\-]+@[a-zA-Z]+\\.[a-z]{2,4}$");

/**
 * Calculates age in years from the given birth date
 *
 * @param {string} date The birth date
 * @throws "Missing parameter date" if birth date is not given
 * @returns {boolean} The age in year
 */
const calculateAge = (date) => {
  if (!date) {
    throw new Error("Missing parameter date");
  }
  const currentDate = new Date();
  const userBirthDate = new Date(date);

  return (
    currentDate.getFullYear() -
    userBirthDate.getFullYear() -
    (currentDate.getMonth() < userBirthDate.getMonth() ||
    (currentDate.getMonth() === userBirthDate.getMonth() &&
      currentDate.getDate() < userBirthDate.getDate())
      ? 1
      : 0)
  );
};

/**
 * Check if the given bith date indicates that the user is at least 18 yo
 *
 * @param {string} date The user birth date
 * @throws "Missing parameter date" if birth `date` is not given
 * @returns {boolean} True if user is adult, otherwise false
 *
 * @see calculateAge
 */
const isAdult = (date) => {
  return calculateAge(date) >= 18;
};

/**
 * Check if every form fields are filled
 *
 * @param {object} userData The user's data
 * @throws "Missing parameter userData" if `userData` is not given
 * @returns {boolean} True if every field of `userData` are not empty
 */
const isCompleted = (userData) => {
  if (!userData) {
    throw new Error("Missing parameter userData");
  }
  return Object.values(userData).every((value) => value !== "");
};

/**
 * Check if every form fields are valid
 *
 * @param {object} userDataErrors The userdata's errors
 * @returns {boolean} True if every field of userDataErrors are empty
 */
const isValid = (userDataErrors) => {
  return Object.values(userDataErrors).every((error) => !error);
};

/**
 * Check that zip code is valid
 *
 * @param {string} zipCode The zip code
 * @returns {string} Error message if zipCode is invalid, otherwise empty string
 */
const isValidZipCode = (zipCode) => {
  const regexOnlyNumber = new RegExp("^[0-9]+$");
  if (!regexOnlyNumber.test(zipCode)) {
    return "Le code postal ne doit pas contenir de lettre.";
  } else if (zipCode.length < 5) {
    return "Le code postal doit contenir au minimum 5 chiffres.";
  } else if (zipCode.length > 5) {
    return "Le code postal doit contenir au maximum 5 chiffres.";
  }
};

function App() {
  /** Snackbar message */
  const [message, setMessage] = useState("Les champs ne sont pas valides.");
  /** Snackbar is open */
  const [open, setOpen] = useState(false);
  /** Form is submitted  */
  const [isSubmitted, setIsSubmitted] = useState(false);
  /** List of users */
  const [users, setUsers] = useState([]);

  const [secret, setSecret] = useState("");

  /** User's input data */
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    birthDate: "",
    city: "",
    email: "",
    zipCode: "",
  });

  /** User error's input data */
  const [userDataErrors, setUserDataErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    birthDate: "",
    city: "",
    zipCode: "",
  });

  useEffect(() => {
    async function getAPIUsers() {
      try {
        let users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.log("Error : ", error);
      }
    }
    getAPIUsers();
  }, []);

  /**
   * Set userDataErrors `fieldName` error if #value is invalid
   *
   * @param {string} fieldName The field name
   * @param {string} value The field value
   */
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "firstname":
        setUserDataErrors((errors) => ({
          ...errors,
          [fieldName]: regexNames.test(value) ? "" : "Prénom invalide.",
        }));
        break;
      case "lastname":
        setUserDataErrors((errors) => ({
          ...errors,
          [fieldName]: regexNames.test(value) ? "" : "Nom invalide.",
        }));
        break;
      case "email":
        setUserDataErrors((errors) => ({
          ...errors,
          [fieldName]: regexEmail.test(value) ? "" : "Email invalide.",
        }));
        break;
      case "zipCode":
        const error = isValidZipCode(value);
        setUserDataErrors((errors) => ({
          ...errors,
          [fieldName]: error ? error : "",
        }));
        break;
      case "birthDate":
        setUserDataErrors((errors) => ({
          ...errors,
          [fieldName]: isAdult(value)
            ? ""
            : "Vous devez avoir au moins 18 ans.",
        }));
        break;
      default:
        break;
    }
  };

  /**
   * Update user's data and linked user data's errors
   *
   * @param {string} fieldName The field name to update
   * @param {string} value The field value set
   *
   * @see validateField
   */
  const setField = (fieldName, value) => {
    setUserData({ ...userData, [fieldName]: value });
    validateField(fieldName, value);
  };

  /**
   * Submit and display success snackbar if form is valid
   */
  const submit = async () => {
    if (isValid(userDataErrors)) {
      console.log("UserData : ", userData);
      try {
        const response = await createUser(userData);
        console.log(response);
        // setUsers(...users, response);
      } catch (e) {
        console.log("Erreur lors de la création de user : ", e);
      }
      window.localStorage.setItem("user", JSON.stringify(userData));
      setMessage("Utilisateur enregistré avec succès !");
      setOpen(true);
      clean();
      setIsSubmitted(false);
    } else {
      setIsSubmitted(true);
      setOpen(true);
    }
  };

  /** Close the snackbar */
  const handleClose = () => {
    setOpen(false);
  };

  /** Clean form after succesfull submit */
  const clean = () => {
    setUserData({
      firstname: "",
      lastname: "",
      birthDate: "",
      city: "",
      email: "",
      zipCode: "",
    });
    setUserDataErrors({
      firstname: "",
      lastname: "",
      email: "",
      birthDate: "",
      city: "",
      zipCode: "",
    });
  };

  const onDelete = async (user) => {
    if (secret.length === 0) {
      setMessage("Vous devez renseigner le secret password.");
      setOpen(true);
      return;
    }
    try {
      await deleteUser(user._id, secret);
      setMessage("Utilisateur supprimé avec succès !");
      setOpen(true);
    } catch (e) {
      console.log("Erreur lors de la suppression de user : ", e);
      setMessage("Secret password incorrect.");
    }
  };

  return (
    <>
      <div className="main">
        <form className="form">
          <TextField
            className="input"
            data-testid="firstname"
            label="Prénom"
            variant="outlined"
            value={userData.firstname}
            onChange={(event) => {
              setField("firstname", event.target.value);
            }}
            error={isSubmitted && !!userDataErrors.firstname}
            helperText={
              isSubmitted && userDataErrors.firstname
                ? userDataErrors.firstname
                : ""
            }
          />
          <TextField
            className="input"
            data-testid="lastname"
            label="Nom"
            variant="outlined"
            value={userData.lastname}
            onChange={(event) => {
              setField("lastname", event.target.value);
            }}
            error={isSubmitted && !!userDataErrors.lastname}
            helperText={
              isSubmitted && userDataErrors.lastname
                ? userDataErrors.lastname
                : ""
            }
          />
          <TextField
            type="email"
            className="input"
            data-testid="email"
            label="Email"
            variant="outlined"
            value={userData.email}
            onChange={(event) => {
              setField("email", event.target.value);
            }}
            error={isSubmitted && !!userDataErrors.email}
            helperText={
              isSubmitted && userDataErrors.email ? userDataErrors.email : ""
            }
          />
          <div
            style={{ display: "flex", flexDirection: "row", columnGap: "20px" }}
          >
            <p>Date de naissance :</p>
            <TextField
              type="date"
              label="birth"
              className="input"
              data-testid="birth"
              variant="outlined"
              value={userData.birthDate}
              onChange={(event) => {
                setField("birthDate", event.target.value);
              }}
              error={isSubmitted && !!userDataErrors.birthDate}
              helperText={
                isSubmitted && userDataErrors.birthDate
                  ? userDataErrors.birthDate
                  : ""
              }
            />
          </div>
          <TextField
            type="text"
            data-testid="city"
            label="Ville"
            variant="outlined"
            value={userData.city}
            onChange={(event) => {
              setField("city", event.target.value);
            }}
          />
          <TextField
            type="text"
            data-testid="zipcode"
            label="Code postal"
            variant="outlined"
            value={userData.zipCode}
            onChange={(event) => {
              setField("zipCode", event.target.value);
            }}
            error={isSubmitted && !!userDataErrors.zipCode}
            helperText={
              isSubmitted && userDataErrors.zipCode
                ? userDataErrors.zipCode
                : ""
            }
          />
          <button
            type="button"
            value="Submit"
            data-testid="register"
            className={
              isCompleted(userData) ? "enable button" : "disabled button"
            }
            disabled={!isCompleted(userData)}
            onClick={submit}
          >
            S'enregistrer
          </button>
          <Snackbar
            data-testid="snackbar"
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message={message}
          />
        </form>
        <div className="list">
          <div className="users">
            <ul>
              {users.map((user) => (
                <li>
                  {user.lastname} {user.firstname} : {user.email}
                  <button onClick={() => onDelete(user)}>Supprimer</button>
                </li>
              ))}
            </ul>
          </div>
          <TextField
            type="password"
            data-testid="secret"
            label="Secret password"
            variant="outlined"
            value={secret}
            onChange={(event) => {
              setSecret(event.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
export {
  calculateAge,
  isAdult,
  isCompleted,
  isValid,
  isValidZipCode,
  regexEmail,
  regexNames,
};
