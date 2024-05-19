import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from '../../api/client'

const initialState = {
    categories: [],
    currentCategory: '',
    status: 'idle',
    error: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.categories = action.payload.Categories
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default categoriesSlice.reducer

  export const fetchCategories = createAsyncThunk('posts/fetchCategories', async () => {
    const response = await client.get('http://localhost:8081/api/v1/categories')
    return response.data
  })
