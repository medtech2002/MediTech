import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const bgu="https://img.freepik.com/free-vector/medical-technology-science-background-vector-blue-with-blank-space_53876-117739.jpg";
const Home = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundImage:`url(${bgu})`,
          backgroundSize:"cover",
          backgroundRepeat:"no-repeat",
          backgroundPosition:"center"
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "36px",
            marginBottom: "20px",
            // Add additional styles here
            color: "#007BFF", // Custom text color
            fontFamily: "Arial, sans-serif", // Custom font family
            fontWeight: "bold", // Custom font weight
          }}
          gutterBottom
        >
          Welcome to MedTech App
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "18px",
            lineHeight: 1.5,
            color:"white"
          }}
          paragraph
        >
          Your trusted platform for medical technology solutions.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/dashboard"
          sx={{
            marginTop: "20px",
            // Custom button styles
            backgroundColor: "#4CAF50", // Custom background color
            color: "#FFFFFF", // Custom text color
            borderRadius: "8px", // Custom border radius
            boxShadow: "none", // Remove box shadow
            "&:hover": {
              backgroundColor: "#45A049", // Custom hover background color
            },
          }}
        >
          Go to Dashboard
        </Button>
      </Box>
    </div>
  );
};

export default Home;
