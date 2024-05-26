import {useEffect, useState} from 'react';
import Layout from '../layout/Layout'
import { PostForm } from './PostForm';
import { PostsList } from './PostsList';
import Pagination from '@mui/material/Pagination';
import { useSelector, useDispatch } from 'react-redux'
import { validateUser } from '../user/userSlice';
import { Header } from '../layout/Header';
import { CategoriesTab } from '../categories/CategoriesTab';

import { fetchPosts, setPage } from '../posts/postsSlice'

export function Post() {

  const user = useSelector(state => state.user)
  const posts = useSelector(state => state.posts)
  const total = useSelector(state => state.posts.total)
  const size = useSelector(state => state.posts.size)
  const page = useSelector(state => state.posts.page)
  const [didLogin, setDidLogin] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
        setDidLogin(validateUser(user.username, user.expiredAt, user.token))
    }, [user]);

  const handlePageChange = (event, newValue) => {
    dispatch(setPage(newValue))
    dispatch(fetchPosts())
}

  return (
    <Layout>
        <Header title="Flome" isLogin={didLogin} />
        <CategoriesTab />
      <Pagination page={page} count={Math.ceil(total / size)} shape="rounded" onChange={handlePageChange} />
    </Layout>
  );
}