// src/components/Login.js
import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { Button, Container, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Успешный вход:", result.user);
      })
      .catch((error) => {
        console.error("Ошибка входа:", error);
      });
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Добро пожаловать в Чат-приложение
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<GoogleIcon />}
        onClick={signInWithGoogle}
      >
        Войти с Google
      </Button>
    </Container>
  );
};

export default Login;
