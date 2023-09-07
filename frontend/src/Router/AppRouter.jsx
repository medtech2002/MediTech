// React
import React from "react";

/* ------------- React Router Dom ------------- */
// Import Router,Route,Routes
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* ------------- Components ------------- */

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>{/* <Route exact path="/" element={} /> */}</Routes>
      </Router>
    </>
  );
};

export default AppRouter;
