import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 'new',
    id: '',
    category: '',
    content: '',
    show: false
}

const postsSlice = createSlice({
  name: 'editPost',
  initialState,
  reducers: {
    setEdit: (state, action) => {
      console.log(action.payload)
      state.id = action.payload.id
      state.category = action.payload.category
      state.content = action.payload.content
      state.status = 'edit'
      state.show = true
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setContent: (state, action) => {
      state.content = action.payload
    },
    setNew: (state, action) => {
      state.id = ''
      state.category = ''
      state.content = ''
      state.status = 'new'
        state.show = true
    },
    dismiss: (state, action) => {
      state.show = false
    }
  }
})

export const { setEdit, setNew, setCategory, setContent,dismiss } = postsSlice.actions

export default postsSlice.reducer