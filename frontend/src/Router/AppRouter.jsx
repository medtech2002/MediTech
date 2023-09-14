// React
import React from "react";

/* ------------- React Router Dom ------------- */
// Import Router,Route,Routes
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";

/* ------------- Components ------------- */
// Home Page
import Home from "../Components/Home/Home";
// Sign Up Page
import SignUp from "../Components/SignUp/SignUp";
// Sign In Page
import SignIn from "../Components/SignIn/SignIn";
// All Chats Page
import AllChats from "../Components/AllChats/AllChats";
import DiseasesChecker from "../Components/DiseasesChecker/DiseasesChecker";
//AddMedicine
import AddMedicine from "../Components/AddMedicine/AddMedicine";

// Define a custom PrivateRoute component
function PrivateRoute({ element, userType }) {
  if (userType === "admin") {
    return element;
  } else {
    // Redirect to the SignIn page if the user is not an admin
    return <Navigate to="/signin" />;
  }
}
const AppRouter = () => {
  const userType = "admin";

  return (
    <>
      <Router>
        <Routes>
          {/* Home Route */}
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
        <Routes>
          <Route exact path="/signin" element={<SignIn />} />
        </Routes>
        <Routes>
          <Route exact path="/allchats" element={<AllChats />} />
        </Routes>
        <Routes>
          <Route exact path="/disease-checker" element={<DiseasesChecker />} />
        <Route
          path="/addmedicine"
          element={<PrivateRoute element={<AddMedicine />} userType={userType} />}
        />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
