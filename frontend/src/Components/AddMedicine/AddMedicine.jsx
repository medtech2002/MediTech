import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
  Box,
  Container,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import baseUrl from '../../Helper/BaseUrl';
import axios from 'axios';

function AddMedicine() {
  const [medicineInfo, setMedicineInfo] = useState({
    name: '',
    pic: '',
    price: '',
    inStock: false,
    composition: '',
    usage: '',
    sideEffects: [''],
  });
  const [userid, setUserid] = useState('');/*{chekc whether this is correct or not}*/

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMedicineInfo({
      ...medicineInfo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddSideEffect = () => {
    setMedicineInfo({
      ...medicineInfo,
      sideEffects: [...medicineInfo.sideEffects, ''],
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
    try {
      // Define the data to send to the server
      const requestData = {
        name: medicineInfo.name,
        pic: medicineInfo.pic,
        price: medicineInfo.price,
        inStock: medicineInfo.inStock,
        composition: medicineInfo.composition,
        usage: medicineInfo.usage,
        sideEffects: medicineInfo.sideEffects,
        userType: 'admin', 
      };
  
      // Make the POST request to your API
      const response = await axios.post(`${baseUrl}/api/medicines/add-medicine/${userid}`, requestData);
  
      // Check the response status and handle it accordingly
      if (response.status === 201) {
        console.log('Medicine added successfully:', response.data);
        // Clear the form or navigate to another page as needed
        setMedicineInfo({
          name: '',
          pic: '',
          price: '',
          inStock: false,
          composition: '',
          usage: '',
          sideEffects: [''],
        });
      } else {
        console.error('Failed to add medicine:', response.data);
        // Handle the error condition as needed
      }
    } catch (error) {
      console.error('Error adding medicine:', error);
      // Handle network or other errors as needed
    }
  };
  
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Medicine
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={medicineInfo.name}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Pic"
          name="pic"
          value={medicineInfo.pic}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          value={medicineInfo.price}
          onChange={handleInputChange}
          type="number"
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="inStock"
              checked={medicineInfo.inStock}
              onChange={handleInputChange}
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
        />
        <TextField
          fullWidth
          label="Usage"
          name="usage"
          value={medicineInfo.usage}
          onChange={handleInputChange}
          margin="normal"
        />
       <Box>
          <Typography variant="subtitle1">Side Effects:</Typography>
          {medicineInfo.sideEffects.map((sideEffect, index) => (
            <div key={index}>
              <TextField
                fullWidth
                value={sideEffect}
                onChange={(e) => handleSideEffectChange(index, e.target.value)}
                margin="normal"
              />
              {medicineInfo.sideEffects.length > 1 && (
                <IconButton onClick={() => handleRemoveSideEffect(index)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              )}
              {index === medicineInfo.sideEffects.length - 1 && (
                <IconButton onClick={handleAddSideEffect}>
                  <AddCircleOutlineIcon />
                </IconButton>
              )}
            </div>
          ))}
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default AddMedicine;
