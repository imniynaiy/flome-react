import {useEffect, useState} from 'react';
import Layout from '../layout/Layout'
import { PostForm } from '../editPost/PostForm';
import { PostsList } from './PostsList';
import Pagination from '@mui/material/Pagination';
import { useSelector, useDispatch } from 'react-redux'
import { validateUser } from '../user/userSlice';
import { Header } from '../layout/Header';
import { CategoriesTab } from '../categories/CategoriesTab';

import { fetchPosts, setPage, deletePost } from '../posts/postsSlice'
import { setEdit } from '../editPost/editPostSlice';
export function Post() {

  const user = useSelector(state => state.user)
  const total = useSelector(state => state.posts.total)
  const size = useSelector(state => state.posts.size)
  const page = useSelector(state => state.posts.page)

  const showModal = useSelector(state => state.editPost.show)

  const [didLogin, setDidLogin] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setDidLogin(validateUser(user.username, user.expiredAt, user.token))
  }, [user]);

  const handlePageChange = (event, newValue) => {
    dispatch(setPage(newValue))
    dispatch(fetchPosts())
}

const editFactory = (post) => {
  return () => {
    dispatch(setEdit({
      id: post.ID,
      category: post.Category,
      content: post.Content
    }))
  }
}

const deleteFactory = (post) => {
  return () => {
    dispatch(deletePost(post.id))
  }
}

  return (
    <Layout>
      <Header title="Flome" isLogin={didLogin} />
      <CategoriesTab />
      <PostsList isLogin={didLogin} editFactory={editFactory} deleteFactory={deleteFactory} />
      <Pagination page={page} count={Math.ceil(total / size)} shape="rounded" onChange={handlePageChange} />
      {didLogin && showModal ? <PostForm /> : null}
    </Layout>
  );
}