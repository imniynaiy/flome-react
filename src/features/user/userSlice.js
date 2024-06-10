import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from '../../api/client'
import * as jose from 'jose'
import { router } from '../../router/router';

const initialState = {
  username: localStorage.getItem('username') || '',
  expiredAt: parseInt(localStorage.getItem('expiredAt')) || 0,
  token: localStorage.getItem('token') || '',
  status: 'idle',
  error: null,
}

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://production';

const expired = (expiredAt) => {
  return (new Date()).getTime()/1000 >= expiredAt
}

export const validateUser = (username, expiredAt, token) => {
  return Boolean(username && token && expiredAt && !expired(expiredAt))
}

if (!validateUser(initialState.username, initialState.expiredAt, initialState.token)) {
  initialState.username = ''
  initialState.token = ''
  initialState.expiredAt = ''
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      logout(state, action) {
        state.username = ''
        state.token = ''
        state.expiredAt = ''
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        localStorage.removeItem('expiredAt')
        router.navigate('/')
      }
    },
    extraReducers(builder) {
      builder
        .addCase(login.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(login.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.token = action.payload.Token
          const claims = jose.decodeJwt(state.token)
          state.expiredAt = claims.exp
          state.username = claims.Username
          localStorage.setItem('username', state.username)
          localStorage.setItem('token', state.token)
          localStorage.setItem('expiredAt', state.expiredAt)
        })
        .addCase(login.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
    }
  })

  export default userSlice.reducer

  export const { logout } = userSlice.actions

  export const login = createAsyncThunk(
    'user/login',
    // The payload creator receives the partial `{username, password}` object
    async user => {
      // We send the initial data to the fake API server
      const response = await client.post(API_ENDPOINT + '/api/v1/login', {body: user})
      // The response includes the complete post object, including unique ID
      return response.data
    }
  )