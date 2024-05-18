import React, { useState } from 'react'
import { login } from './userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

export const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginRequestStatus, setLoginRequestStatus] = useState('idle')

  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)

  const canLogin =
    [username, password].every(Boolean) && loginRequestStatus === 'idle'

  const handleLoginClick = async () => {
    if (canLogin) {
      try {
        setLoginRequestStatus('pending')
        await dispatch(login({ username, password })).unwrap()
        setUsername('')
        setPassword('')
        navigate(`/`)
      } catch (err) {
        console.error('Failed to login: ', err)
      } finally {
        setLoginRequestStatus('idle')
      }
    }
  }

  return (
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
            Log in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={onUsernameChanged}
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
              value={password}
              onChange={onPasswordChanged}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={handleLoginClick}
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Box>
  )
}