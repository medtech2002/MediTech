// React
import React from "react";

/* ------------- React Router Dom ------------- */
// Import Router,Route,Routes
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* ------------- Components ------------- */
import AllChats from "../Components/AllChats/AllChats";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route exact path="/allchats" element={<AllChats />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
