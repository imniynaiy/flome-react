import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from '../../api/client'

const initialState = {
    posts: [],
    status: 'idle',
    error: null,
    total: 0,
    page: 1,
    size: 10
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.posts = action.payload.Posts
        state.total = action.payload.Count
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default postsSlice.reducer

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('http://localhost:8081/api/v1/posts')
    return response.data
  })

  export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    // The payload creator receives the partial `{content, category}` object
    async initialPost => {
      // We send the initial data to the fake API server
      const response = await client.post('/fakeApi/posts', initialPost)
      // The response includes the complete post object, including unique ID
      return response.data
    }
  )