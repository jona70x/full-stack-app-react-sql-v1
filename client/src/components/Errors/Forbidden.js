import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <main>
      <div className="wrap">
        <h2>Forbidden</h2>
        <p>Oops! It seems you do not have access to these pages</p>
        <button className="button" onClick={() => navigate("/")}>
          Go home
        </button>
      </div>
    </main>
  );
};

export default Forbidden;
