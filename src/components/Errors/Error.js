import { useNavigate } from "react-router-dom";

// Component to display an error when API sends a 500 status code
const Error = () => {
  const navigate = useNavigate();
  return (
    <main>
      <div className="wrap">
        <h2>Internal Error</h2>
        <p>Oh no! Something happened. Let us fix it for you</p>
        <button className="button" onClick={() => navigate("/")}>
          Go home
        </button>
      </div>
    </main>
  );
};

export default Error;
