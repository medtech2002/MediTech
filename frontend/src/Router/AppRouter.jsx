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

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
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
      </Router>
    </>
  );
};

export default AppRouter;
