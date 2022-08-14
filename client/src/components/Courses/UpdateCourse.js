import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { createBrowserHistory } from "history";
import AuthContext from "../../storage/auth-context";
import axios from "axios";

// Importing other components
import Spinner from "../UI/Spinner";
import ValidationErrors from "../Errors/ValidationErrors";

// helper function to clean input
const inputCleaner = (input) => input.trim();

// Component that renders form to update course
const UpdateCourse = () => {
  const authCtx = useContext(AuthContext);
  // Getting params from router
  const { id } = useParams();
  const navigate = useNavigate();
  // Setting data to display
  const [courseData, setCourseData] = useState([]);
  // assuming that the component has not rendered because data is loading
  const [isLoading, setIsLoading] = useState(true);
  // Setting error state
  const [errors, setErrors] = useState([]);

  // Setting refs to get values from user
  const titleRef = useRef();
  const descriptionRef = useRef();
  const materialsRef = useRef();
  const timeRef = useRef();

  // This will let us take user back
  const history = createBrowserHistory();

  // Getting data to display
  useEffect(() => {
    const getData = async (courseId) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/courses/${courseId}`
        );
        console.log(response.data);
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
        if (error.response.status === 403) {
          navigate("/forbidden");
        }
        setErrors(error.response.data.message || error.response.data.errors);
      }
      setIsLoading(false);
    };
    getData(id);

    // Restricting access to other users to get into update if they are not the owners
    if (!isLoading) {
      if (authCtx.credentials.userId !== courseData.courseUser?.id) {
        navigate("/forbidden");
      }
    }
  }, [id, navigate, courseData.courseUser?.id, isLoading]);

  // Update course function
  const updateCourse = async (
    title,
    description,
    materialsNeeded,
    estimatedTime,
    courseId = id
  ) => {
    try {
      // Post request to axios with course data
      const encodedCredentials = btoa(
        `${authCtx.credentials.emailAddress}:${authCtx.credentials.password}`
      );

      const response = await axios.put(
        `http://localhost:5000/api/courses/${courseId}`,
        {
          title,
          description,
          materialsNeeded,
          estimatedTime,
          userId: authCtx.credentials.userId,
        },
        {
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
          },
        }
      );

      if (response.status === 204) {
        alert("You have updated a new course");
        navigate(`/courses/${courseId}`);
      }
    } catch (error) {
      console.error(error);
      setErrors(error.response.data.message || error.response.data.errors);

      if (error.response.status === 500) {
        navigate("/error");
      }
    }
  };
  const updateFormHandler = (e) => {
    e.preventDefault();

    // Cleaning inputs
    const cleanTitle = inputCleaner(titleRef.current.value);
    const cleanDescription = inputCleaner(descriptionRef.current.value);
    const cleanMaterials = inputCleaner(materialsRef.current.value);
    const cleanTime = inputCleaner(timeRef.current.value);

    // calling updating function
    updateCourse(cleanTitle, cleanDescription, cleanMaterials, cleanTime);
  };

  // conditionally render a spinner while data is getting fetched
  let message;
  if (isLoading) {
    message = <Spinner />;
  }

  // Extracting course data
  const { title, description, materialsNeeded, estimatedTime, courseUser } =
    courseData;

  // Form to update course
  const updateCourseForm = (
    <form onSubmit={updateFormHandler}>
      <div className="main--flex">
        <div>
          <label htmlFor="courseTitle">Course Title</label>
          <input
            id="courseTitle"
            name="courseTitle"
            type="text"
            defaultValue={title}
            ref={titleRef}
          />

          <p>
            By{" "}
            {courseUser ? `${courseUser.firstName} ${courseUser.lastName}` : ""}
          </p>

          <label htmlFor="courseDescription">Course Description</label>
          <textarea
            id="courseDescription"
            name="courseDescription"
            defaultValue={description}
            ref={descriptionRef}
          />
        </div>
        <div>
          <label htmlFor="estimatedTime">Estimated Time</label>
          <input
            id="estimatedTime"
            name="estimatedTime"
            type="text"
            defaultValue={estimatedTime}
            ref={timeRef}
          />

          <label htmlFor="materialsNeeded">Materials Needed</label>
          <textarea
            id="materialsNeeded"
            name="materialsNeeded"
            defaultValue={materialsNeeded}
            ref={materialsRef}
          />
        </div>
      </div>
      <button className="button" type="submit">
        Update Course
      </button>
      <button
        type="button"
        className="button button-secondary"
        onClick={() => history.back()}
      >
        Cancel
      </button>
    </form>
  );

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        {errors.length > 0 && <ValidationErrors errors={errors} />}
        {message}
        {!isLoading && updateCourseForm}
      </div>
    </main>
  );
};

export default UpdateCourse;
