// Links to re-direct user
import { Link } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../../storage/auth-context";

// Header component present app-wide
const Header = () => {
  const authCtx = useContext(AuthContext);

  // Checking if user is in to conditonally render welcome message or links
  let links;
  if (authCtx.isLoggedIn) {
    links = (
      <>
        <li>Welcome, {`${authCtx.credentials.firstName}`}</li>
        <li>
          <Link to="/signout">Sign Out</Link>
        </li>
      </>
    );
  } else {
    links = (
      <>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </>
    );
  }
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          <ul className="header--signedout">{links}</ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
