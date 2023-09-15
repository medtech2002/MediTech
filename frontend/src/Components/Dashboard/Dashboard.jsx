import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h4" paragraph>
        Welcome to your MedTech Dashboard.
      </Typography>
      {/* Add dashboard content here */}
      <Link to="/allchats">
        <Button variant="contained" color="primary">
          Chat With a Doctor
        </Button>
      </Link>
    </Box>
  );
};

export default Dashboard;
