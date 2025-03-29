import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Authcontext } from '../context/authcontext';
import { Snackbar } from '@mui/material';

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [fromState, setFromState] = React.useState(0); // 0 = Sign In, 1 = Sign Up
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(Authcontext);

  const handleAuth = async (event) => {
    event.preventDefault();  // Prevent default form submission
    try {
      if (fromState === 0) {
        await handleLogin(username, password);  // Login logic
        setMessage('Logged in successfully');
        setOpen(true);
        
      } else if (fromState === 1) {
        const result = await handleRegister(name, username, password);  // Register logic
        setMessage(result);  // Success message from backend
        setOpen(true);
        setError("")
        setFromState()
        setPassword("")
      }
    } catch (error) {
      // Handle any errors (e.g., user already exists or invalid credentials)
      const errorMessage = error?.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
    }

    setTimeout(() => {
      setOpen(false);
    }, 3000);
    setTimeout(() => {
      setError("")
    }, 3000);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <div>
              <Button variant={fromState === 0 ? 'contained' : ''} onClick={() => setFromState(0)}>
                Sign In
              </Button>
              <Button variant={fromState === 1 ? 'contained' : ''} onClick={() => setFromState(1)}>
                Sign Up
              </Button>
            </div>

            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleAuth}>
              {fromState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  name="fullname"
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {fromState === 0 ? 'Log In' : 'Sign Up'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={open} autoHideDuration={4000} message={message} />
    </ThemeProvider>
  );
}
