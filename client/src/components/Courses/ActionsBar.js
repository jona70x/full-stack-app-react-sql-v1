import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import AuthContext from "../../storage/auth-context";

const ActionsBar = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  // Getting course id from params
  const { id } = useParams();

  const deleteCourse = async () => {
    const encodedCredentials = btoa(
      `${authCtx.credentials.emailAddress}:${authCtx.credentials.password}`
    );
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/courses/${id}`,
        {
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
          },
        }
      );

      if (response.status === 204) {
        alert("You have delete this course");
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 500) {
        navigate("/error");
      }
      alert(error.response.data.message);
    }
  };

  return (
    <div className="actions--bar">
      <div className="wrap">
        <Link className="button" to={`/courses/${id}/update`}>
          Update Course
        </Link>
        <button className="button" onClick={() => deleteCourse()}>
          Delete Course
        </button>
        <Link className="button button-secondary" to="/">
          Return to List
        </Link>
      </div>
    </div>
  );
};

export default ActionsBar;
