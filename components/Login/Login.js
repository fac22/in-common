import { useState } from 'react';
import { auth } from '../../firebase';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from '@firebase/auth';
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Card,
  Alert,
} from '@mui/material';

export default function Login() {
  const [logInEmail, setLogInEmail] = useState('');
  const [logInPassword, setLogInPassword] = useState('');
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [forgotPasswordShow, setForgotPasswordShow] = useState(false);
  const [error, setError] = useState(false);
  console.log({ error });
  async function logIn() {
    try {
      await signInWithEmailAndPassword(auth, logInEmail, logInPassword);
    } catch (error) {
      console.log(error);
      // setStatusBase({ msg: 'Success', key: Math.random() });
      return setError(true);
    }
  }
  async function resetPassword() {
    try {
      await sendPasswordResetEmail(auth, resetPasswordEmail);
      console.log('reset email sent');
      alert('Reset password email sent! Check your junk/spam folder');
    } catch (error) {
      return console.log(error);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      {!forgotPasswordShow && (
        <Card
          sx={{
            minWidth: 275,
            padding: 5,
            borderRadius: 3,
            mt: 5,
          }}
        >
          <form>
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Log in
            </Typography>

            <label hidden htmlFor="email">
              Email
            </label>
            <Box sx={{ mb: 2 }}>
              <TextField
                variant="outlined"
                id="filled-email-input"
                label="Email"
                type="email"
                autoComplete="current-email"
                onChange={(e) => {
                  setLogInEmail(e.target.value);
                  setError(false);
                }}
                fullWidth
              />
            </Box>
            <label hidden htmlFor="password">
              Password
            </label>
            <Box sx={{ mb: 2 }}>
              <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setLogInPassword(e.target.value);
                  setError(false);
                }}
                fullWidth
              />
            </Box>
            <Button
              variant="outlined"
              sx={{ mb: 2, padding: 1.85 }}
              onClick={(e) => {
                e.preventDefault();
                logIn();
              }}
              fullWidth
            >
              Log in
            </Button>
            <Button
              variant="outlined"
              sx={{ padding: 1.85, mb: 2 }}
              onClick={(e) => {
                e.preventDefault();
                setForgotPasswordShow(true);
              }}
              fullWidth
            >
              Forgot password
            </Button>
          </form>
          {error ? (
            <Alert severity="error" sx={{ padding: 1.85 }}>
              Email and/or password is incorrect
            </Alert>
          ) : null}
        </Card>
      )}

      {forgotPasswordShow && (
        <Card
          sx={{
            minWidth: 275,
            padding: 5,
            borderRadius: 3,
            mt: 5,
          }}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await resetPassword(auth, resetPasswordEmail);
              e.target.reset();
              setForgotPasswordShow(false);
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Reset password
            </Typography>

            <label hidden htmlFor="resetPasswordEmail">
              Email
            </label>
            <Box sx={{ mb: 2 }}>
              <TextField
                variant="outlined"
                id="resetPasswordEmail"
                name="resetPasswordEmail"
                label="Email"
                type="email"
                autoComplete="current-email"
                onChange={(e) => setResetPasswordEmail(e.target.value)}
                fullWidth
              />
            </Box>
            <Button
              variant="outlined"
              sx={{ mb: 2, padding: 1.85 }}
              type="submit"
              fullWidth
            >
              Send password reset email
            </Button>
            <Button
              variant="outlined"
              sx={{ padding: 1.85 }}
              type="submit"
              fullWidth
              onClick={(e) => {
                e.preventDefault();
                setForgotPasswordShow(false);
              }}
            >
              Back to log in
            </Button>
          </form>
        </Card>
      )}
    </Container>
  );
}
