

import React, { useEffect } from 'react';
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
import { useAppDispatch } from '../../../store/app/hooks';
import { login } from '../../../api/userServices';
import { toast } from 'react-toastify';
import { saveToken } from '../../../store/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton';
import { baseUrl } from '../../../api/Url/ProdUrl';
import { change } from '../../../store/features/loader/loaderSlice';
import { actionPayload } from '../../../store/payload/payloadModel';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href={`${baseUrl}/`}>
        BillDesk
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [user, setUser] = React.useState({
    username: '',
    password: ''
  })
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();

    try {
      dispatch(change())
      const { data } = await login(user.username, user.password)
      if (data.code === 200) {
        toast.success(data.message)
        const payload: actionPayload = {
          type: '',
          data: {
            token: data?.token,
            istoken: true
          }
        }
        dispatch(saveToken(payload))

        navigate('/')
        dispatch(change())
      } else {
        toast.error(data.message)
        dispatch(change())
      }

    } catch (err: any) {
      console.log(err.message)
      toast.error('an error occured please try again')
      dispatch(change())
    }



  };
  const initToken = () => {
    let token: any = sessionStorage.getItem('token')
    if (!token) {

    } else {
      token = JSON.parse(token)
      const payload: actionPayload = {
        type: '',
        data: {
          token: token,
          istoken: true
        }
      }
      dispatch(saveToken(payload))
      navigate('/')
    }
  }
  useEffect(() => {
    initToken();


  }, [])

  const handleChange = (e: any) => {
    if (e.target.id === 'username') {
      setUser({ ...user, username: e.target.value });
    } else if (e.target.id === 'password') {
      setUser({ ...user, password: e.target.value })
    }

  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className='text-3xl p-5 ' >BillDesk</div>
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => { handleChange(e) }}

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
              onChange={(e) => { handleChange(e) }}
            />

            <SolidButton color='primary' innerText='Sign In' onClick={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)} />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}



