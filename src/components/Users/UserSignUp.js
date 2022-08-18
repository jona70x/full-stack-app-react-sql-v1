import { Link, useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useState, useRef, useContext, useEffect } from "react";
import { helpers } from "../../helpers/helpers";
import AuthContext from "../../storage/auth-context";
// Importing other components
import ValidationErrors from "../Errors/ValidationErrors";
import axios from "axios";

// helper function to clean input
const inputCleaner = (input) => input.trim();

const UserSignUp = () => {
  // Setting authorization context
  const authCtx = useContext(AuthContext);

  const history = createBrowserHistory();
  const navigate = useNavigate();

  // working with inputs
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  // Setting error state
  const [errors, setErrors] = useState([]);

  // redirecting users if already in
  useEffect(() => {
    if (authCtx.isLoggedIn) {
      history.back();
    }
  });

  // user sign up function
  const userSignUp = async (email, password, firstName, lastName) => {
    try {
      // Post request to axios
      const response = await axios.post(
        "http://courses-restapi.herokuapp.com/api/users",
        {
          firstName,
          lastName,
          emailAddress: email,
          password,
        }
      );

      // if the user is created api will throw a 201
      if (response.status === 201) {
        alert("Account successfully created. Please sign in");

        // // use sign in method to get user signed in
        // const response = await helpers.getUser(email, password);

        // // Calls method from context to sign in user
        // authCtx.actions.signIn(
        //   email,
        //   password,
        //   response.data.id,
        //   firstName,
        //   lastName
        // );

        // take user to main page
        navigate("/signin");
      }
    } catch (error) {
      setErrors(error.response.data.message || error.response.data.errors);

      if (error.response.status === 500) {
        navigate("/error");
      }
    }
  };

  // cleans inputs and submits form
  const submitFormHandler = (e) => {
    e.preventDefault();
    // Cleaning inputs
    const cleanEmail = inputCleaner(emailRef.current.value);
    const cleanPassword = inputCleaner(passwordRef.current.value);
    const cleanFirstName = inputCleaner(firstNameRef.current.value);
    const cleanLastName = inputCleaner(lastNameRef.current.value);

    userSignUp(cleanEmail, cleanPassword, cleanFirstName, cleanLastName);
  };

  return (
    <main>
      {errors.length > 0 && <ValidationErrors errors={errors} />}
      <div className="form--centered">
        <h2>Sign Up</h2>

        <form onSubmit={submitFormHandler}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            ref={firstNameRef}
          />
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" ref={lastNameRef} />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            ref={emailRef}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            ref={passwordRef}
          />
          <button className="button" type="submit">
            Sign Up
          </button>
          <button
            className="button button-secondary"
            type="cancel"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;
