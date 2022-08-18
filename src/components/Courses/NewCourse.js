import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from "react";

import axios from "axios";

import ValidationErrors from "../Errors/ValidationErrors";
import AuthContext from "../../storage/auth-context";

// helper function to clean input
const inputCleaner = (input) => input.trim();

// Component that renders form to update course
const NewCourseForm = () => {
  // Setting authorization context
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  // Setting error state
  const [errors, setErrors] = useState([]);

  // Setting refs to get values from user
  const titleRef = useRef();
  const descriptionRef = useRef();
  const materialsRef = useRef();
  const timeRef = useRef();

  /**
   *
   * @param {string} title
   * @param {string} description
   * @param {string} materialsNeeded
   * @param {string} estimatedTime
   * This function will make a post call to create a course
   * It does need authentication credentials to make the request
   * It will navigate the user if creation was successfull or
   * navifate to '/error/ if reponse is 500
   */
  const createCourse = async (
    title,
    description,
    materialsNeeded,
    estimatedTime
  ) => {
    try {
      // Post request to axios with course data
      const encodedCredentials = btoa(
        `${authCtx.credentials.emailAddress}:${authCtx.credentials.password}`
      );
      const response = await axios.post(
        "https://courses-restapi.herokuapp.com/api/courses",
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

      if (response.status === 201) {
        alert("You have created a new course");
        navigate("/");
      }
    } catch (error) {
      setErrors(error.response.data.message || error.response.data.errors);

      if (error.response.status === 500) {
        navigate("/error");
      }
    }
  };

  // Function that submits form and clean inputs
  const submitHandlerForm = (e) => {
    e.preventDefault();
    // Cleaning inputs
    const cleanTitle = inputCleaner(titleRef.current.value);
    const cleanDescription = inputCleaner(descriptionRef.current.value);
    const cleanMaterials = inputCleaner(materialsRef.current.value);
    const cleanTime = inputCleaner(timeRef.current.value);

    // creating course
    createCourse(cleanTitle, cleanDescription, cleanMaterials, cleanTime);
  };
  return (
    <>
      {errors.length > 0 && <ValidationErrors errors={errors} />}
      <div className="wrap" onSubmit={submitHandlerForm}>
        <form>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                ref={titleRef}
              />

              <p>{`By ${authCtx.credentials.firstName} ${authCtx.credentials.lastName}`}</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                ref={descriptionRef}
              />
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                ref={timeRef}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                ref={materialsRef}
              />
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
          </button>
          <button
            className="button button-secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default NewCourseForm;
