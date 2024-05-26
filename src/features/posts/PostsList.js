import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Card, Typography, CardActions, Button, CircularProgress} from '@mui/material';
import { fetchPosts } from './postsSlice'

const PostExcerpt = ({ post, isLogin, handleEditClick, handleDeleteClick }) => {
  var content = null
  if (isLogin) {
    content = (
      <CardActions>
    <Button size="small" onClick={handleEditClick}>Edit</Button>
    <Button size="small" onClick={handleDeleteClick}>Delete</Button>
  </CardActions>
    )
  }
  return (
  <Card max-width="800">
  <Typography variant="body2">
  {post.Content}
  </Typography>
  <Typography variant="body2">
  {post.CreatedAt}
  </Typography>
  <Typography variant="body2">
  {post.Category}
  </Typography>
  {content}
</Card>)
}

export const PostsList = ({isLogin}) => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts)

  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <CircularProgress />
  } else if (postStatus === 'succeeded') {
    content = posts.posts.map(post => (
      <PostExcerpt key={post.ID} post={post} isLogin={isLogin}/>
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      {content}
    </section>
  )
}