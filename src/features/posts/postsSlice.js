import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from '../../api/client'
import { fetchCategories } from '../categories/categoriesSlice'

const initialState = {
    posts: [],
    category: 'all',
    status: 'idle',
    error: null,
    total: 0,
    page: 1,
    size: 10
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.page = 1
      state.category = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
  },
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

export const { setCategory, setPage } = postsSlice.actions

export default postsSlice.reducer

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (args, {getState}) => {
    const { category, page, size } = getState().posts
    const response = await client.get(`http://localhost:8081/api/v1/posts?category=${category}&page=${page}&size=${size}`)
    return response.data
  })

  const addPost = createAsyncThunk(
    'posts/addPost',
    // The payload creator receives the partial `{content, category}` object
    async (post, {getState}) => {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + getState().user.token
        },
        body: post,
      }
      // We send the initial data to the fake API server
      const response = await client.post('http://localhost:8081/api/v1/posts', config)
      // The response includes the complete post object, including unique ID
      return response.data
    }
  )

  const editPost = createAsyncThunk(
    'posts/editPost',
    // The payload creator receives the partial `{content, category}` object
    async (post, {getState}) => {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + getState().user.token
        },
        body: post,
      }
      // We send the initial data to the fake API server
      const response = await client.put('http://localhost:8081/api/v1/posts', config)
      // The response includes the complete post object, including unique ID
      return response.data
    }
  )

  const deletePost = createAsyncThunk(
    'posts/deletePost',
    // The payload creator receives the partial `{content, category}` object
    async (id, {getState, dispatch}) => {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + getState().user.token
        }
      }
      // We send the initial data to the fake API server
      const response = await client.del('http://localhost:8081/api/v1/posts/' + id, config)
      // The response includes the complete post object, including unique ID
      return response.data
    }
  )

  export const deletePostAndGetPosts = (id) => async (dispatch) => {
    await dispatch(deletePost(id))
    await dispatch(fetchPosts())
    await dispatch(fetchCategories())
  }

  export const editPostAndGetPosts = (post) => async (dispatch) => {
    await dispatch(editPost(post))
    await dispatch(fetchPosts())
    await dispatch(fetchCategories())
  }

  export const addPostAndGetPosts = (post) => async (dispatch) => {
    await dispatch(addPost(post))
    await dispatch(fetchPosts())
    await dispatch(fetchCategories())
  }