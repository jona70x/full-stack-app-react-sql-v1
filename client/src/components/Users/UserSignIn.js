import { Link, useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useState, useRef, useContext, useEffect } from "react";
import { helpers } from "../../helpers/helpers";
import AuthContext from "../../storage/auth-context";
// Importing other components
import ValidationErrors from "../Errors/ValidationErrors";

// helper function to clean input
const inputCleaner = (input) => input.trim();

// Component to get data and sign in user
const UserSignIn = () => {
  // Setting authorization context
  const authCtx = useContext(AuthContext);

  const history = createBrowserHistory();
  const navigate = useNavigate();

  // working with inputs
  const emailRef = useRef();
  const passwordRef = useRef();

  // Setting error state
  const [errors, setErrors] = useState([]);

  // redirecting users if already in

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      history.back();
    }
  });

  // user sign in function
  const userSignIn = async (email, password) => {
    try {
      const response = await helpers.getUser(email, password);

      if (response.status === 200) {
        setErrors([]);
        alert("You are in!");
        // Calls method from context to sign in user
        authCtx.actions.signIn(
          email,
          password,
          response.data.id,
          response.data.firstName,
          response.data.lastName
        );
      }
    } catch (error) {
      setErrors(error.response.data.message);

      if (error.response.status === 500) {
        navigate("/error");
      }
    }
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    // Cleaning inputs
    const cleanEmail = inputCleaner(emailRef.current.value);
    const cleanPassword = inputCleaner(passwordRef.current.value);

    userSignIn(cleanEmail, cleanPassword);
  };

  return (
    <main>
      {errors.length > 0 && <ValidationErrors errors={errors} />}
      <div className="form--centered">
        <h2>Sign In</h2>
        <form onSubmit={submitFormHandler}>
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
            Sign In
          </button>
          <button
            type="cancel"
            className="button button-secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to{" "}
          <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;
