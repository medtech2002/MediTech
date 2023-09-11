import React,{useState} from 'react'
import { Typography, Container, Paper, Grid, TextField, Button, Avatar, CssBaseline,FormControl,InputLabel
    ,Select,MenuItem } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Logo from '../../Logo/MediTech Logo.png';
import baseUrl from '../../Helper/BaseUrl';
import axios from 'axios'
function SignUp() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('user');
    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
      };
      
      const handleFullnameChange = (event) => {
        setFullname(event.target.value);
      };
      
      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
      
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
      const handleSignUp = async () => {
        try {
          // Make an HTTP POST request to your server
          const response = await axios.post(`${baseUrl}/api/persons/register`, {
            fullname,
            email,
            password,
            userType,
          });
      
          if (response.status === 201) {
            alert('Registration successful'); // You can use your preferred notification method here
            // Redirect to the login page or another appropriate page
          } else {
            alert('Registration failed'); // You can use your preferred notification method here
          }
        } catch (error) {
          console.error(error);
          alert('Something went wrong'); // You can use your preferred notification method here
        }
      };      
  return (
    <div style={{ background: '#F218AD', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* Background container */}
      <Container component="main" maxWidth="lg" sx={{width:'57%',paddingRight:'65px',paddingLeft:'48px'}}>
        <CssBaseline />
        <Paper elevation={3} sx={{ padding: 4, display: 'flex', alignItems: 'center', borderRadius: '16px', 
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', flex: '2' }}>
          <img src={Logo} alt="Logo" width="200" height="200" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', marginRight: '20px' }} /> 
          <Grid container spacing={2} sx={{ flex: '6' }}>
            <Grid item xs={20}>
              <Avatar sx={{ bgcolor: 'primary.main', marginRight: '16px' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h5" component="div" gutterBottom>
                Sign Up
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={fullname}
                  onChange={handleFullnameChange}
                />
              </form>
            </Grid>
            <Grid item xs={12}>
              <form>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
              </form>
            </Grid>
            <Grid item xs={12}>
              <form>
                <TextField
                  label="Password"
                  type='password'
                  variant="outlined"
                  fullWidth
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />
              </form>
            </Grid>
            <Grid item xs={12}>
              {/* Dropdown menu for user type */}
              <FormControl fullWidth variant="outlined">
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
                fullWidth
                size="large"
                color="primary"
                type="submit"
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  )
}

export default SignUp