import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Importing other components
import Spinner from "../UI/Spinner";

// Component that fetchs course data and display links
const Courses = () => {
  // Setting navigate from router
  const navigate = useNavigate();
  // Setting data to display
  const [courseData, setCourseData] = useState([]);
  // assuming that the component has not rendered because data is loading
  const [isLoading, setIsLoading] = useState(true);

  // Getting data to display
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://courses-restapi.herokuapp.com/api/courses"
        );
        setCourseData(response.data);
      } catch (error) {
        // Navigating user to server error if axios return a 500
        if (error.response.status === 500) {
          navigate("/error");
        }
      }
      setIsLoading(false);
    };
    getData();
  }, []);

  // creating course links to display
  const courseLinks = courseData.map((course) => {
    return (
      <Link
        className="course--module course--link"
        key={course.id}
        to={`/courses/${course.id}`}
      >
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{course.title}</h3>
      </Link>
    );
  });

  // conditionally render a spinner while data is getting fetched
  let message;

  if (isLoading) {
    message = <Spinner />;
  }

  return (
    <main>
      <div className="wrap main--grid">
        {message}
        {!isLoading && courseLinks}
        <Link
          className="course--module course--add--module"
          to="/courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};

export default Courses;
