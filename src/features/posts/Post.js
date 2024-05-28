import { useEffect, useState } from 'react';
import Layout from '../layout/Layout'
import PostFormDialog from '../editPost/PostFormDialog';
import { PostsList } from './PostsList';
import { Pagination, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux'
import { validateUser } from '../user/userSlice';
import { Header } from '../layout/Header';
import { CategoriesTab } from '../categories/CategoriesTab';

import { fetchPosts, setPage, deletePost } from '../posts/postsSlice'
import { setEdit, setNew } from '../editPost/editPostSlice';
export function Post() {

  const user = useSelector(state => state.user)
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

  const handleAddClick = () => {
    dispatch(setNew())
  }

  return (
    <Layout>
      <Header title="Flome" isLogin={didLogin} />
      <CategoriesTab />
      <PostsList isLogin={didLogin} editFactory={editFactory} deleteFactory={deleteFactory} />
      <Pagination page={page} count={Math.ceil(total / size)} onChange={handlePageChange} size='large' sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 2,
        marginBottom: 2,
      }}/>
      {didLogin ? <PostFormDialog /> : null}
      <Fab color="primary" aria-label="add" sx={{
        position: 'fixed',
        bottom: 32,
        transform: 'translate(464px, 0)',
      }} onClick={handleAddClick}>
        <AddIcon />
      </Fab>
    </Layout>
  );
}