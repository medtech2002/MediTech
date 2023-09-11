// React
import React from "react";

/* ------------- React Router Dom ------------- */
// Import Router,Route,Routes
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "../Components/SignIn/SignIn";
import SignUp from "../Components/SignUp/SignUp";
/* ------------- Components ------------- */

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>{<Route exact path="/" element={<SignIn/>} /> }</Routes>
        <Routes>{<Route exact path="/signup" element={<SignUp/>} /> }</Routes>
      </Router>
    </>
  );
};

export default AppRouter;
