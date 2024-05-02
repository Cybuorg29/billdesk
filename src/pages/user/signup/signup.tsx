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
import { registerArgs } from '../../../models/registerModels';
import { signup } from '../../../api/userServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        AudditX
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const SignUp = () => {
  const navigate = useNavigate()
  const [user, setUser] = React.useState({
    username: '',
    password: '',
    name: '',
    email: '',
    phone: ''
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log(user)

      const res = await signup(user)

      if (res.data.code === 200) {
        toast.success('user signup sucessfully')
        toast.info('please create your profile')
        navigate('/login')

      } else if (res.data.code === 400) {
        toast.error(res.data.message);
        navigate(`/claim/profile/${res.data.package}`);
      } else {
        toast.error(res.data.message)
      }
    } catch (err: any) {
      toast.error(err?.message)
    }


  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Business Name"
                  label="Business Name"
                  name="Business Name"
                  autoComplete="Business Name"
                  value={user?.name}
                  onChange={(e) => { setUser({ ...user, name: e.target.value }) }}
                />
              </Grid>


              <Grid item xs={12}>

                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={user?.email}
                  onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  value={user?.phone}
                  onChange={(e) => { setUser({ ...user, phone: e.target.value }) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  value={user?.username}
                  onChange={(e) => { setUser({ ...user, username: e.target.value }) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={user?.password}
                  onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <div className='text-blue-500 text-sm cursor-pointer' onClick={() => navigate('/login')}>
                  Already have an account? Sign in
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />

      </Container>
    </ThemeProvider>
  );
}

export default SignUp