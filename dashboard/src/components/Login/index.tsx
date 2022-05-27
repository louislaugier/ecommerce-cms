import { FormEvent, useState } from "react";
import { LoginProps } from "../../interfaces/Props";
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Login = ({ navigate, isLoading, setIsLoading, throwErr, api, error, setError, setBearer, setCookie}: LoginProps) => {

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const login = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    if (!email) throwErr("No email provided");
    else if (!password) throwErr("No password provided");
    else try {
      const res = await api.post("auth/local", { identifier: email, password });
      if (res.data && res.data.user?.isAdmin) {
        if (error) setError(null);
        setBearer(res.data.jwt);
        setCookie("ecommerce_bearer", res.data.jwt, { path: "/" });
        setCookie("ecommerce_user", res.data.user.email, { path: "/" });
        navigate("/");
        window.location.reload();
      }
    } catch (err: any) {
      let msg: string = "Internal server error";
      if (err.response.status === 400) msg = "Incorrect login";
      throwErr(msg, err);
    }
    setIsLoading(false);
  }

  return (
    <ThemeProvider theme={theme}>
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
            Login
          </Typography>
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> setEmail(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <LoadingButton
              loading={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </LoadingButton>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" mt={8} mb={4}>
          {'Copyright © '}
          <Link color="inherit" href="https://mui.com/">
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
