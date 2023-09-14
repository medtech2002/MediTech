import React, { useState } from "react";

// AddMedicine CSS
import "./AddMedicine.css";

/* ------------- Components ------------- */
// SignIn Page
import SignIn from "../SignIn/SignIn";

/* ------------- Storage ------------- */
// Cookies
import Cookies from "js-cookie";

import {
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import baseUrl from "../../Helper/BaseUrl";
import axios from "axios";

function AddMedicine() {
  // Take the token and userid if it is not peresent redirect to SignIn page
  if (
    !(
      Cookies.get("token") &&
      Cookies.get("userid") &&
      Cookies.get("type") === "admin"
    )
  ) {
    Cookies.remove("token");
    Cookies.remove("userid");
    Cookies.remove("type");
    window.location.href = "/signin";
  }

  const [medicineInfo, setMedicineInfo] = useState({
    name: "",
    pic: "",
    price: "",
    inStock: false,
    composition: "",
    usage: "",
    sideEffects: [""],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMedicineInfo({
      ...medicineInfo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddSideEffect = () => {
    setMedicineInfo({
      ...medicineInfo,
      sideEffects: [...medicineInfo.sideEffects, ""],
    });
  };
  const handleRemoveSideEffect = (index) => {
    const updatedSideEffects = [...medicineInfo.sideEffects];
    updatedSideEffects.splice(index, 1);
    setMedicineInfo({
      ...medicineInfo,
      sideEffects: updatedSideEffects,
    });
  };
  const handleSideEffectChange = (index, value) => {
    const updatedSideEffects = [...medicineInfo.sideEffects];
    updatedSideEffects[index] = value;
    setMedicineInfo({
      ...medicineInfo,
      sideEffects: updatedSideEffects,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Take the Token and Userid
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");
    const type = Cookies.get("type");

    axios
      .post(`${baseUrl}/api/medicines/add-medicine/${userid}`, medicineInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log("Medicine added successfully:", res.data);
        // Clear the form or navigate to another page as needed
        setMedicineInfo({
          name: "",
          pic: "",
          price: "",
          inStock: false,
          composition: "",
          usage: "",
          sideEffects: [""],
        });
      })
      .catch((error) => {
        // console.error("Error adding medicine:", error);
      });
  };

  return (
    <>
      {Cookies.get("token") &&
      Cookies.get("userid") &&
      Cookies.get("type") === "admin" ? (
        <div className="addMed">
          <Container
            sx={{
              width: "55%",
              mt: 5,
              mb: 5,
              p: 5,
              boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              borderRadius: "5px",
              backgroundColor: "white",
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
              Add Medicine
            </Typography>
            <form
              onSubmit={handleSubmit}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={medicineInfo.name}
                onChange={handleInputChange}
                margin="normal"
                variant="filled"
                color="secondary"
              />
              <TextField
                fullWidth
                label="Pic"
                name="pic"
                value={medicineInfo.pic}
                onChange={handleInputChange}
                margin="normal"
                variant="filled"
                color="secondary"
              />
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={medicineInfo.price}
                onChange={handleInputChange}
                type="text"
                margin="normal"
                variant="filled"
                color="secondary"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="inStock"
                    checked={medicineInfo.inStock}
                    onChange={handleInputChange}
                    color="secondary"
                  />
                }
                label="In Stock"
              />
              <TextField
                fullWidth
                label="Composition"
                name="composition"
                value={medicineInfo.composition}
                onChange={handleInputChange}
                margin="normal"
                variant="filled"
                color="secondary"
              />
              <TextField
                fullWidth
                label="Usage"
                name="usage"
                value={medicineInfo.usage}
                onChange={handleInputChange}
                margin="normal"
                variant="filled"
                color="secondary"
              />
              <Box>
                <Typography variant="subtitle1">Side Effects:</Typography>
                {medicineInfo.sideEffects.map((sideEffect, index) => (
                  <div key={index}>
                    <TextField
                      fullWidth
                      value={sideEffect}
                      onChange={(e) =>
                        handleSideEffectChange(index, e.target.value)
                      }
                      margin="normal"
                      variant="filled"
                      color="secondary"
                    />
                    {medicineInfo.sideEffects.length > 1 && (
                      <IconButton onClick={() => handleRemoveSideEffect(index)}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    )}
                    {index === medicineInfo.sideEffects.length - 1 && (
                      <IconButton onClick={handleAddSideEffect}>
                        <AddCircleOutlineIcon color="secondary" />
                      </IconButton>
                    )}
                  </div>
                ))}
              </Box>
              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{
                  width: "fit-content",
                  mt: 2,
                  alignSelf: "center",
                }}
              >
                Submit
              </Button>
            </form>
          </Container>
        </div>
      ) : (
        <SignIn />
      )}
    </>
  );
}

export default AddMedicine;
