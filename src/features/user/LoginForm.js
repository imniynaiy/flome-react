import React, { useState } from 'react'
import { login } from './userSlice'
import { useDispatch } from 'react-redux'
import { redirect } from "react-router-dom";

export const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginRequestStatus, setLoginRequestStatus] = useState('idle')

  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)

  const canLogin =
    [username, password].every(Boolean) && loginRequestStatus === 'idle'

  const onLoginClicked = async () => {
    if (canLogin) {
      try {
        setLoginRequestStatus('pending')
        await dispatch(login({ username, password })).unwrap()
        setUsername('')
        setPassword('')
        redirect(`/`);
      } catch (err) {
        console.error('Failed to login: ', err)
      } finally {
        setLoginRequestStatus('idle')
      }
    }
  }

  return (
    <section>
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={onUsernameChanged}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onPasswordChanged}
        />
        <button type="button" onClick={onLoginClicked}>Login</button>
      </form>
    </section>
  )
}