import React, { useState } from 'react'
import { Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPasswod] = useState('');
    const checkUser = {
        email,
        password
    }
    const loginUser = () => {
      axios.post('http://localhost:3000/api/login', checkUser)
  .then((response) => {
    Swal.fire({
      title: "Congratulations!",
      text: "Logged in successfully!",
      icon: "success"
    }).then((result) => {
      // Optionally check if result.isConfirmed if needed:
      if (result.isConfirmed) {
        navigate('/todoApp');
      }
    });
    console.log(response);
  }).catch((err) => {
    const errorMessage = err.response?.data?.message || 'An error occurred during login';
    Swal.fire({
      title: "Error!",
      text: errorMessage,
      icon: "error"
    });
  });
}

  return (
    <Paper
      elevation={3}
      sx={{ width: '40vw', marginX: 'auto', padding: 2, height: '50vh', marginY: 'auto' }}
    >
      <Typography
        variant='h5'
        sx={{ textAlign: 'center', marginBottom: 2 }}
      >
        Login
      </Typography>
      <TextField
      onChange={(e) => setEmail(e.target.value)}
        fullWidth
        label='Enter Email'
      />
      <br /><br />
      <TextField
        onChange={(e) => setPasswod(e.target.value)}
        fullWidth
        label='Enter Password'
      />
      <br /><br />
      <Button
      onClick={loginUser}
        fullWidth
        variant='contained'
        color='success'
        sx={{ marginBottom: 3 }}>
        login
      </Button>
      <Button
        onClick={() => navigate('/signUp')}
        fullWidth
        variant='contained'
        color='error'>
        Create new account
      </Button>
    </Paper>
  )
}

export default Login