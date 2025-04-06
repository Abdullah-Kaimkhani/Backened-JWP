import React, { useState } from 'react'
import { Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPasswod] = useState('');
    const [name, setName] = useState('');
const saveData = {
  name,
  email,
  password
}

    const createAccount = () => {

      axios.post('https://login-sage-sigma.vercel.app/api/signup', saveData)
      .then((response) => {
          Swal.fire({
            title: "Congratulations!",
            text: "Account created successfully!",
            icon: "success"
          }).then((result) => {
            // Optionally check if result.isConfirmed if needed:
            if (result.isConfirmed) {
              navigate('/');
            }
          });
        console.log(response);
      }).catch((err) => {
        const errorMessage = err.response?.data?.message || 'An error occurred during registration';
          Swal.fire({
            title: "Error!",
            text: errorMessage,
            icon: "error"
          });
        console.log(err);
      })
        // console.log(email, password);
    }
  return (
    <Paper
      elevation={3}
      sx={{ width: '40vw', margin: 'auto', padding: 5 }}
    >
      <Typography
        variant='h5'
        sx={{ textAlign: 'center', marginBottom: 2 }}
      >
        Sign Up
      </Typography>
      <TextField
      onChange={(e) => setName(e.target.value)}
        fullWidth
        label='Enter Name'
      />
      <br /><br />
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
      onClick={createAccount}
        fullWidth
        variant='contained'
        color='success'
        sx={{ marginBottom: 3 }}>
        Create Account
      </Button>
      <Button
        onClick={() => navigate('/')}
        fullWidth
        variant='contained'
        color='error'>
        Already have an account
      </Button>
    </Paper>
  )
}

export default SignUp