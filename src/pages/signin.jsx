import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

const theme = createTheme({
  //  style:{ backgroundImage:`url('https://static.vecteezy.com/system/resources/previews/001/849/553/original/modern-gold-background-free-vector.jpg')` },
  // palette: {
  //   mode: 'dark',
  // },
});



const signin = async (requestData, setError_message) => {
  const { username, password } = requestData
  console.log("signin function")

  const res = await fetch('http://localhost:4000/api/user/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  console.log("res : ", res)

  const data = await res.json()

  if (!res.ok) {
    console.log("login failed")
    setError_message(data.error)

    // throw Error(data.message || 'Something went wrong')
  }
  if (res.ok) {
    console.log("login success")
    setError_message('')

    // save user in local storage 
    localStorage.setItem('user', JSON.stringify(data))
  }
}

export default function Signin() {
  const [error_message, setError_message] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Prepare request data
    const requestData = {
      username: data.get('username'),
      password: data.get('password')
    };

    console.log(requestData)
    await signin(requestData, setError_message)
    console.log("error_message : ", error_message)

    // rederict to dashboard
    if (JSON.parse(localStorage.getItem('user') !== null)) {
      window.location.href = '/dashboard'
    }
  };

  const signin_return = (
    <ThemeProvider
      theme={theme}
    >
      <Container  sx={{  py: 10 }}>
        <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
            <img
              class="cropped-image1"
            width="90%"
            heigth="90%"
            src="https://cdn.dribbble.com/userupload/3398668/file/original-2020d80cd61939d536f49b9787560917.jpg?compress=1&resize=1504x1128"
            alt="Recipe Image"
          />
        </Grid>
        <Grid item xs={12} md={4} component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
         */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              // href="/dashboard"
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>

              <Grid>
                <Typography color="error" variant="body2">
                  {error_message}
                </Typography>
              </Grid>
            </Box>
          </Box>
          </Grid>
          </Grid>
      </Container>
    </ThemeProvider>
  )

  // if already logged in
  if (JSON.parse(localStorage.getItem('user') !== null)) {
    // console.log("logging out")
    window.location.href = '/dashboard'
    // // delete user from local storage
    // localStorage.removeItem('user')
  }
  else {
    console.log("not logged in")
    return signin_return
  }
}