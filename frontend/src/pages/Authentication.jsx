// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Authcontext } from '../context/Authcontext.jsx';
// import { Snackbar } from '@mui/material';

// const defaultTheme = createTheme();

// export default function Authentication() {
//   const [username, setUsername] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [name, setName] = React.useState('');
//   const [error, setError] = React.useState('');
//   const [message, setMessage] = React.useState('');
//   const [fromState, setFromState] = React.useState(0); // 0 = Sign In, 1 = Sign Up
//   const [open, setOpen] = React.useState(false);

//   const { handleRegister, handleLogin } = React.useContext(Authcontext);

//   // const handleAuth = async (event) => {
//   //   event.preventDefault();  // Prevent default form submission
//   //   try {
//   //     if (fromState === 0) {
//   //       await handleLogin(username, password);  // Login logic
//   //       setMessage('Logged in successfully');
//   //       setOpen(true);
        
//   //     } else if (fromState === 1) {
//   //       const result = await handleRegister(name, username, password);  // Register logic
//   //       setMessage(result);  // Success message from backend
//   //       setOpen(true);
//   //       setError("")
//   //       setFromState()
//   //       setPassword("")
//   //     }
//   //   } catch (error) {
//   //     // Handle any errors (e.g., user already exists or invalid credentials)
//   //     const errorMessage = error?.response?.data?.message || 'An error occurred. Please try again.';
//   //     setError(errorMessage);
//   //   }

//   //   setTimeout(() => {
//   //     setOpen(false);
//   //   }, 3000);
//   //   setTimeout(() => {
//   //     setError("")
//   //   }, 3000);
//   // };




//   const handleAuth = async (event) => {
//     event.preventDefault();
//     try {
//       if (fromState === 0) {
//         await handleLogin(username, password);  
//         setMessage('Logged in successfully');
//       } else if (fromState === 1) {
//         const result = await handleRegister(name, username, password);
//         setMessage(result);
//         setError("");
  
//         // ⬇️ Ensure state updates after signup ⬇️
//         setFromState(0); // Switch to login mode
//         setUsername(""); 
//         setPassword("");
//       }
//       setOpen(true);
//     } catch (error) {
//       setError(error?.response?.data?.message || 'An error occurred.');
//     }
  
//     setTimeout(() => setOpen(false), 3000);
//     setTimeout(() => setError(""), 3000);
//   };
  

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Grid container component="main" sx={{ height: '100vh' }}>
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
//             backgroundRepeat: 'no-repeat',
//             backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <div>
//               <Button variant={fromState === 0 ? 'contained' : ''} onClick={() => setFromState(0)}>
//                 Sign In
//               </Button>
//               <Button variant={fromState === 1 ? 'contained' : ''} onClick={() => setFromState(1)}>
//                 Sign Up
//               </Button>
//             </div>

//             <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleAuth}>
//               {fromState === 1 && (
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   id="fullname"
//                   label="Full Name"
//                   name="fullname"
//                   autoFocus
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               )}
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="username"
//                 label="Username"
//                 name="username"
//                 autoFocus
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <FormControlLabel
//                 control={<Checkbox value="remember" color="primary" />}
//                 label="Remember me"
//               />
//               {error && <p style={{ color: 'red' }}>{error}</p>}
//               <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//                 {fromState === 0 ? 'Log In' : 'Sign Up'}
//               </Button>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>

//       <Snackbar open={open} autoHideDuration={4000} message={message} />
//     </ThemeProvider>
//   );
// }


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
import { Authcontext } from '../context/Authcontext.jsx';
import { Snackbar, Typography } from '@mui/material';
import { FaVideo, FaUsers, FaGlobeAmericas } from 'react-icons/fa';

// Custom theme with your color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6b00', // Your orange color
    },
    secondary: {
      main: '#3b82f6', // Blue color
    },
  },
});

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
    event.preventDefault();
    try {
      if (fromState === 0) {
        await handleLogin(username, password);  
        setMessage('Logged in successfully');
      } else if (fromState === 1) {
        const result = await handleRegister(name, username, password);
        setMessage(result);
        setError("");
        setFromState(0);
        setUsername(""); 
        setPassword("");
      }
      setOpen(true);
    } catch (error) {
      setError(error?.response?.data?.message || 'An error occurred.');
    }
  
    setTimeout(() => setOpen(false), 3000);
    setTimeout(() => setError(""), 3000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            background: 'linear-gradient(135deg, #ff6b00 0%, #3b82f6 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <Box sx={{ maxWidth: '500px' }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
              Welcome to LinkUp
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <FaVideo size={24} style={{ marginRight: '1rem' }} />
              <Typography variant="h5" component="h3">
                High Quality Video Calls
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <FaUsers size={24} style={{ marginRight: '1rem' }} />
              <Typography variant="h5" component="h3">
                Connect with Anyone
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <FaGlobeAmericas size={24} style={{ marginRight: '1rem' }} />
              <Typography variant="h5" component="h3">
                Global Access
              </Typography>
            </Box>
            
            <Typography variant="body1" sx={{ mt: 4, opacity: 0.9 }}>
              Join thousands of users who trust LinkUp for their daily communication needs.
              Secure, reliable, and easy to use.
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ 
          backgroundColor: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <Button 
                variant={fromState === 0 ? 'contained' : 'outlined'} 
                onClick={() => setFromState(0)}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  borderRadius: '8px',
                }}
              >
                Sign In
              </Button>
              <Button 
                variant={fromState === 1 ? 'contained' : 'outlined'} 
                onClick={() => setFromState(1)}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  borderRadius: '8px',
                }}
              >
                Sign Up
              </Button>
            </Box>

            <Box component="form" noValidate sx={{ mt: 1, width: '100%' }} onSubmit={handleAuth}>
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    }
                  }}
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus={fromState === 0}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                  sx={{ color: 'text.secondary' }}
                />
                {fromState === 0 && (
                  <Button 
                    size="small" 
                    sx={{ textTransform: 'none', color: 'text.secondary' }}
                  >
                    Forgot password?
                  </Button>
                )}
              </Box>
              
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
              
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                sx={{ 
                  mt: 3, 
                  mb: 2,
                  py: 1.5,
                  borderRadius: '8px',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              >
                {fromState === 0 ? 'Log In' : 'Sign Up'}
              </Button>
              
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                {fromState === 0 ? "Don't have an account?" : "Already have an account?"}{' '}
                <Button 
                  size="small" 
                  onClick={() => setFromState(fromState === 0 ? 1 : 0)}
                  sx={{ 
                    textTransform: 'none', 
                    color: 'primary.main',
                    fontWeight: 600,
                  }}
                >
                  {fromState === 0 ? 'Sign Up' : 'Sign In'}
                </Button>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar 
        open={open} 
        autoHideDuration={4000} 
        message={message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: 'primary.main',
            color: 'white',
            fontWeight: 500,
          }
        }}
      />
    </ThemeProvider>
  );
}