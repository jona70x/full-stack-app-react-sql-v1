import { Routes, Route, Navigate } from "react-router-dom";

// Importing other components
import Header from "./components/UI/Header";
import Courses from "./components/Courses/Courses";
import CourseDetail from "./components/Courses/CourseDetail";
import UpdateCourse from "./components/Courses/UpdateCourse";
import NewCourseForm from "./components/Courses/NewCourse";
import UserSignIn from "./components/Users/UserSignIn";
import UserSignOut from "./components/Users/UserSignOut";
import UserSignUp from "./components/Users/UserSignUp";
import PrivateRoute from "./components/Courses/PrivateRoute";
import Error from "./components/Errors/Error";
import Forbidden from "./components/Errors/Forbidden";
import NotFound from "./components/Errors/NotFound";

// Component that renders header component present app wide
// Also contains routing including a NotFound component for 404 responses
const App = () => {
  return (
    <>
      <Header />
      {/* {Setting routes} */}
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses" element={<Navigate to="/" />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route
          path="/courses/:id/update"
          element={<PrivateRoute component={UpdateCourse} />}
        />
        <Route
          path="/courses/create"
          element={<PrivateRoute component={NewCourseForm} />}
        />
        {/* {App Routing} */}
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/error" element={<Error />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
