import { useNavigate } from "react-router-dom";

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
