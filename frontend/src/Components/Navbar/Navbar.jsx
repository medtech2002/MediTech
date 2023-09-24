// React & UseState & UseEffect
import React, { useState, useEffect } from "react";
// Navbar CSS
import "./Navbar.css";

import baseUrl from "../../Helper/BaseUrl";

/* ------------- Pictures ------------- */
// Logo
import logo from "../../Logo/MediTech.png";

/* ------------- React Router Dom ------------- */
// UseNavigate
import { useNavigate } from "react-router-dom";
// NavLink
import { NavLink } from "react-router-dom";

/* ------------- Storage ------------- */
// Cookie
import Cookies from "js-cookie";

/* ------------- Fetch ------------- */
// Axios
import axios from "axios";

/* ------------- MUI Structure ------------- */
// Skeleton
import Skeleton from "@mui/material/Skeleton";

/* ------------- MUI Components ------------- */
// Box
import Box from "@mui/material/Box";
// Avatar
import Avatar from "@mui/material/Avatar";
// Menu
import Menu from "@mui/material/Menu";
// Menu Item
import MenuItem from "@mui/material/MenuItem";
// List Item Icon
import ListItemIcon from "@mui/material/ListItemIcon";
// Divider
import Divider from "@mui/material/Divider";
// Icon Button
import IconButton from "@mui/material/IconButton";
// Tooltip
import Tooltip from "@mui/material/Tooltip";

/* ------------- MUI Icons ------------- */
// LogoOut Icon
import Logout from "@mui/icons-material/Logout";
// Account Icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// Dashboard Icon
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
// Notes Icon
import NotesIcon from "@mui/icons-material/Notes";
// Notes Add Icon
import NoteAddIcon from "@mui/icons-material/NoteAdd";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState();

  // UseEffect for Get the User Details
  useEffect(() => {
    // Set Token and UserId in Cookie
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");
    const type = Cookies.get("type");

    if (token && userid && type) {
      // Get Details user from backend
      axios
        .get(`${baseUrl}/api/persons/get-details/${userid}/${type}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
          // Store the Username
          setUser(res.data);
          localStorage.setItem("name", res.data.fullname);
        })
        .catch((err) => {
          Cookies.remove("token");
          Cookies.remove("userid");
          Cookies.remove("type");
        });
    }
  },[]);

  // Anchor UseState for Tooltip
  const [anchorEl, setAnchorEl] = useState(null);

  // Set data in Open for Open Tooltip
  const open = Boolean(anchorEl);

  // Tooltip HandleClick Func
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Tooltip HandleClose Func
  const handleClose = () => {
    setAnchorEl(null);
  };

  // String to Color Func
  const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  // NavLink Active Style
  const navLinkStyle = ({ isActive }) => {
    return {
      background: isActive ? "linear-gradient(to right,#9e0bac, #1c0d9e" : "",
      color: isActive ? "white" : "black",
    };
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          {/* Logo  */}
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="BS5 Logo" />
            {/* Name */}
            {/* <span className="navbar-text m-2">MediTech</span> */}
          </NavLink>

          {/* Collapsiable  */}
          <div
            className="navbar-toggler"
            // data-bs-toggle="collapse"
            // data-bs-target="#collapsibleNavbar"
            style={{
              borderStyle: "none",
              margin: "0px",
              padding: "0px",
              cursor: "pointer",
            }}
          ></div>

          {/* Collapse Part */}
          <div
            className="collapse navbar-collapse justify-content-end"
            // id="collapsibleNavbar"
          >
            {/* Unordered List */}
            <ul className="navbar-nav">
              {/* NavLink Items */}
              <NavLink className="nav-item" style={navLinkStyle} to="/">
                Home
              </NavLink>
              <NavLink className="nav-item" style={navLinkStyle} to="/about">
                About
              </NavLink>

              {/* Logic For Login and Not Login */}
              {
                // Get Token and Userid from Cookie => If Present
                Cookies.get("token") &&
                Cookies.get("userid") &&
                Cookies.get("type") ? (
                  <>
                    {
                      // Check the User is set or not
                      user ? (
                        <React.Fragment>
                          {/* If Yes then so the Tooltip Box*/}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              textAlign: "center",
                            }}
                          >
                            {/* ToolTip */}
                            <Tooltip title="Profile" sx={{ zIndex: 9999 }}>
                              {/* Icon Button */}
                              <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2, color: "black" }}
                                aria-controls={
                                  open ? "account-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                              >
                                Hey, {user.fullname.split(" ")[0]}
                                {/* Avatar for Logo names */}
                                {user.pic ? (
                                  <Avatar
                                    alt="avatar"
                                    src={user.pic}
                                    sx={{
                                      ml: 2,
                                      width: 32,
                                      height: 32,
                                      boxShadow:
                                        "rgba(34, 140, 221, 0.3) 0px 1px 2px 0px, rgba(0, 139, 245, 0.15) 0px 2px 6px 2px",
                                    }}
                                  />
                                ) : (
                                  <Avatar
                                    sx={{
                                      ml: 2,
                                      width: 32,
                                      height: 32,
                                      bgcolor: stringToColor(
                                        user.fullname
                                          .split(" ")[0]
                                          .toUpperCase()
                                      ),
                                      boxShadow:
                                        "rgba(34, 140, 221, 0.3) 0px 1px 2px 0px, rgba(0, 139, 245, 0.15) 0px 2px 6px 2px",
                                    }}
                                  >
                                    {user.fullname
                                      .split(" ")[0]
                                      .charAt(0)
                                      .toUpperCase()}
                                  </Avatar>
                                )}
                              </IconButton>
                            </Tooltip>
                          </Box>
                          {/* Menu bar */}
                          <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            MenuListProps={{
                              elevation: 0,
                              sx: {
                                overflow: "visible",
                                filter:
                                  "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                  width: 32,
                                  height: 32,
                                  ml: -0.5,
                                  mr: 1,
                                },
                                backgroundColor: "#003326ee",
                                "&:before": {
                                  content: '""',
                                  display: "block",
                                  position: "absolute",
                                  top: 0,
                                  right: 14,
                                  width: 10,
                                  height: 10,
                                  bgcolor: "#003326ee",
                                  transform: "translateY(-50%) rotate(45deg)",
                                  zIndex: 0,
                                },
                              },
                            }}
                            transformOrigin={{
                              horizontal: "right",
                              vertical: "top",
                            }}
                            anchorOrigin={{
                              horizontal: "right",
                              vertical: "bottom",
                            }}
                          >
                            {/* Menu Item UserName*/}
                            <MenuItem
                              onClick={() => {
                                handleClose();
                              }}
                              sx={{
                                color: "white",
                                fontWeight: 500,
                                letterSpacing: "1px",
                                backgroundColor: "#333132 !important",
                              }}
                            >
                              {user.fullname}
                            </MenuItem>

                            {/* Menu Item Profile*/}
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                navigate(`/profile`);
                              }}
                              sx={{
                                color: "white",
                                fontWeight: 500,
                                letterSpacing: "1px",
                                "&:hover": {
                                  backgroundColor: "#0f000ac4 !important", // Change the background color on hover
                                },
                              }}
                            >
                              <ListItemIcon>
                                <AccountCircleIcon
                                  style={{ color: "white" }}
                                  fontSize="small"
                                />
                              </ListItemIcon>
                              Profile
                            </MenuItem>

                            {/* Menu Item Dashboard*/}
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                navigate(`/dashboard`);
                              }}
                              sx={{
                                color: "white",
                                fontWeight: 500,
                                letterSpacing: "1px",
                                "&:hover": {
                                  backgroundColor: "#0f000ac4 !important", // Change the background color on hover
                                },
                              }}
                            >
                              <ListItemIcon>
                                <SpaceDashboardIcon
                                  style={{ color: "white" }}
                                  fontSize="small"
                                />
                              </ListItemIcon>
                              Dashboard
                            </MenuItem>

                            {/* Menu Item Notes*/}
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                navigate(`/allchats`);
                              }}
                              sx={{
                                color: "white",
                                fontWeight: 500,
                                letterSpacing: "1px",
                                "&:hover": {
                                  backgroundColor: "#0f000ac4 !important", // Change the background color on hover
                                },
                              }}
                            >
                              <ListItemIcon>
                                <NotesIcon
                                  style={{ color: "white" }}
                                  fontSize="small"
                                />
                              </ListItemIcon>
                              All Chats
                            </MenuItem>

                              {/* Menu Item Notes*/}
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                navigate(`/allmedicine`);
                              }}
                              sx={{
                                color: "white",
                                fontWeight: 500,
                                letterSpacing: "1px",
                                "&:hover": {
                                  backgroundColor: "#0f000ac4 !important", // Change the background color on hover
                                },
                              }}
                            >
                              <ListItemIcon>
                                <NotesIcon
                                  style={{ color: "white" }}
                                  fontSize="small"
                                />
                              </ListItemIcon>
                              All Medicine
                            </MenuItem>
                            

                            {Cookies.get("type") === "admin" ? (
                              <>
                                <MenuItem
                                  onClick={() => {
                                    handleClose();
                                    navigate(`/addmedicine`);
                                  }}
                                  sx={{
                                    color: "white",
                                    fontWeight: 500,
                                    letterSpacing: "1px",
                                    "&:hover": {
                                      backgroundColor: "#0f000ac4 !important", // Change the background color on hover
                                    },
                                  }}
                                >
                                  <ListItemIcon>
                                    <NotesIcon
                                      style={{ color: "white" }}
                                      fontSize="small"
                                    />
                                  </ListItemIcon>
                                  Add Medcine
                                </MenuItem>
                              </>
                            ) : (
                              <></>
                            )}

                            {/* Menu Item Notes*/}

                            {/* Divider */}
                            <Divider style={{ backgroundColor: "white" }} />

                            {/* Menu Item LogOut */}
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                window.location.href = "/signin";
                                Cookies.remove("token");
                                Cookies.remove("userid");
                              }}
                              sx={{
                                color: "white",
                                fontWeight: 500,
                                letterSpacing: "1px",
                                "&:hover": {
                                  backgroundColor: "#0f000ac4 !important", // Change the background color on hover
                                },
                              }}
                            >
                              <ListItemIcon>
                                <Logout
                                  style={{ color: "white" }}
                                  fontSize="small"
                                />
                              </ListItemIcon>
                              Logout
                            </MenuItem>
                          </Menu>
                        </React.Fragment>
                      ) : (
                        <>
                          {/* if Not then Show the Skeleton Box */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              textAlign: "center",
                            }}
                          >
                            {/* Name Skeleton */}
                            <Skeleton
                              variant="text"
                              sx={{
                                fontSize: "1rem",
                                mr: 1,
                                backgroundColor: "#cdecff77",
                                width: "100px",
                                height: "32px",
                              }}
                            />

                            {/* Logo Skeleton */}
                            <Skeleton
                              variant="circular"
                              sx={{ backgroundColor: "#cdecff77" }}
                              width={32}
                              height={32}
                            />
                          </Box>
                        </>
                      )
                    }
                  </>
                ) : (
                  <>
                    {/* If Not then show the SignUp and SignIn Nav Links */}
                    <NavLink
                      className="nav-item"
                      style={navLinkStyle}
                      to="/signup"
                    >
                      SignUp
                    </NavLink>
                    <NavLink
                      className="nav-item"
                      style={navLinkStyle}
                      to="/signin"
                    >
                      SignIn
                    </NavLink>
                  </>
                )
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
