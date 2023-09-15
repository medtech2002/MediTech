import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  CssBaseline,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Logo from "../../Logo/MediTech Logo.png";
import axios from "axios";
import baseUrl from "../../Helper/BaseUrl";
import cookies from "js-cookie";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user"); // Initialize the user type state

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please fill in all required fields");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    const adminEmail = "medtechsih2023@gmail.com";
    const adminPassword = "shamjitvanehakash@2023";
    const adminUserType = "admin";

    axios
      .post(`${baseUrl}/api/persons/login`, {
        email,
        password,
        userType:
          email === adminEmail &&
          password === adminPassword &&
          userType === "user"
            ? adminUserType
            : userType,
      })
      .then((res) => {
        cookies.set("token", res.data.token);
        cookies.set("userid", res.data.userid);
        cookies.set("type", res.data.type);
        // alert("Login successfully");
        // setEmail(""),
        // setPassword("");
        // setUserType("user");
        window.location.href="/dashboard"

      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong");
      });
  };

  return (
    <div
      style={{
        background: "white",
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {/* Background container */}
      <Container
        component="main"
        maxWidth="lg"
        sx={{ width: "57%", paddingRight: "65px", paddingLeft: "48px",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",borderRadius:"5px" }}
      >
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            alignItems: "center",
            borderRadius: "16px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            flex: "2",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            width="200"
            height="200"
            style={{
              marginRight: "20px",
            }}
          />
          <Grid container spacing={2} sx={{ flex: "6" }}>
            <Grid item xs={20}>
              <Avatar sx={{ bgcolor: "primary.main", marginRight: "16px" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h5" component="div" gutterBottom>
                Log in
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form>
                <TextField
                  label="Email Address"
                  variant="filled"
                  color="secondary"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </form>
            </Grid>
            <Grid item xs={12}>
              <form>
                <TextField
                  label="Password"
                  type="password"
                  variant="filled"
                  color="secondary"
                  fullWidth
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </form>
            </Grid>
            <Grid item xs={12}>
              {/* Dropdown menu for user type */}
              <FormControl fullWidth variant="filled" color="secondary">
                <InputLabel id="user-type-label">User Type</InputLabel>
                <Select
                  labelId="user-type-label"
                  id="user-type"
                  value={userType}
                  onChange={handleUserTypeChange}
                  label="User Type"
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="doctor">doctor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                type="submit"
                onClick={handleSignIn}
                sx={{
                  mt:2,
                  mb:2
                }}
              >
                Log in
              </Button>
              <br/>
              <Link to="/signup" className="my-2"
                style={{
                  textDecoration:"none",
                  color:"black"
                }}
              >
                Not a User Register Here
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default SignIn;
