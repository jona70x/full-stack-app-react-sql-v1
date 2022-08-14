import { Link, useParams } from "react-router-dom";

const ActionsBar = () => {
  // Getting course id from params
  const { id } = useParams();

  return (
    <div className="actions--bar">
      <div className="wrap">
        <Link className="button" to={`/courses/${id}/update`}>
          Update Course
        </Link>
        <a className="button" href="/">
          Delete Course
        </a>
        <Link className="button button-secondary" to="/">
          Return to List
        </Link>
      </div>
    </div>
  );
};

export default ActionsBar;
