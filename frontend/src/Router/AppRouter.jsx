// React
import React from "react";

/* ------------- React Router Dom ------------- */
// Import Router,Route,Routes
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "../Pages/SignIn";

/* ------------- Components ------------- */

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>{<Route exact path="/" element={<SignIn/>} /> }</Routes>
      </Router>
    </>
  );
};

export default AppRouter;
