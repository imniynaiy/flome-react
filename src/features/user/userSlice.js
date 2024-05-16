import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from '../../api/client'
import * as jose from 'jose'


const initialState = {
    username: '',
    expiredAt: '',
    token: '',
    status: 'idle',
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(login.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(login.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // Add any fetched posts to the array
          state.token = action.payload.Token
          const claims = jose.decodeJwt(state.token)
          console.log(claims)
          state.expiredAt = claims.exp
          state.username = claims.Username
        })
        .addCase(login.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
    }
  })

  export default userSlice.reducer

  export const login = createAsyncThunk(
    'user/login',
    // The payload creator receives the partial `{username, password}` object
    async user => {
      // We send the initial data to the fake API server
      const response = await client.post('http://localhost:8081/api/v1/login', user)
      // The response includes the complete post object, including unique ID
      return response.data
    }
  )