import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";

// Importing other components
import Spinner from "../UI/Spinner";
import ActionsBar from "./ActionsBar";
import AuthContext from "../../storage/auth-context";

// Displays course information
const CourseDetail = () => {
  const authCtx = useContext(AuthContext);

  // Getting params from router
  const { id } = useParams();
  const navigate = useNavigate();
  // Setting data to display
  const [courseData, setCourseData] = useState({});
  // assuming that the component has not rendered because data is loading
  const [isLoading, setIsLoading] = useState(true);

  // Getting data to display
  useEffect(() => {
    const getData = async (courseId) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/courses/${courseId}`
        );

        setCourseData(response.data);
      } catch (error) {
        // Navigating user to friendly 404 if route is not found
        if (error.response.status === 404) {
          navigate("/notfound");
        }
        // Navigating user to server error if axios return a 500 error
        if (error.response.status === 500) {
          navigate("/error");
        }
      }
      setIsLoading(false);
    };
    getData(id);
  }, []);

  // conditionally render a spinner while data is getting fetched
  let message;
  // If user is not course owner, can not access delete and update buttons
  let isCourseOwner = false;
  let details;
  if (isLoading) {
    message = <Spinner />;
  }
  if (!isLoading) {
    // Extracting course data
    const { title, description, materialsNeeded, estimatedTime, courseUser } =
      courseData;

    if (authCtx.credentials.userId === courseUser.id) {
      isCourseOwner = true;
    }

    details = (
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{title}</h4>
              <p>
                By{" "}
                {courseUser
                  ? `${courseUser.firstName} ${courseUser.lastName}`
                  : ""}
              </p>
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <li>
                  <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <main>
      {<ActionsBar isOwner={isCourseOwner} />}
      {message}
      {!isLoading && details}
    </main>
  );
};

export default CourseDetail;
