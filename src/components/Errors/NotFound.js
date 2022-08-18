import { useNavigate } from "react-router-dom";

// Component to display an error when API sends a 404 status code
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main>
      <div className="wrap">
        <h2>Not Found</h2>
        <p>Sorry! It seems this page does not exist 🥲</p>
        <button className="button" onClick={() => navigate("/")}>
          Go home
        </button>
      </div>
    </main>
  );
};

export default NotFound;
