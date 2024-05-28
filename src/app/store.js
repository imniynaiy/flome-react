import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import userReducer from '../features/user/userSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import editPostReducer from '../features/editPost/editPostSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    categories: categoriesReducer,
    user: userReducer,
    editPost: editPostReducer,
  },
});
