// React
import React from "react";

/* ------------- React Router Dom ------------- */
// Import Router,Route,Routes
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
import AllMedicine from "../Components/AllMedicine/AllMedicine";
import Navbar from "../Components/Navbar/Navbar";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* Home Route */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/allchats" element={<AllChats />} />
          <Route exact path="/disease-checker" element={<DiseasesChecker />} />
        </Routes>
        <Routes>
          <Route exact path="/allmedicine" element={<AllMedicine />} />
        </Routes>
        <Routes>
          <Route path="/addmedicine" element={<AddMedicine />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
