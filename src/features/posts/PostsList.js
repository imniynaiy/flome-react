import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Typography, CardActions, Button, CircularProgress, CardContent } from '@mui/material';
import { fetchPosts } from './postsSlice'
import dayjs from 'dayjs'
import './PostList.css'

const formatTime = (time) => {
  return dayjs(time).format('YYYY/MM/DD')
}
const PostExcerpt = ({ post, isLogin, handleEditClick, handleDeleteClick }) => {
  var actions = null
  if (isLogin) {
    actions = (
      <CardActions sx={{ justifyContent: "end" }}>
        <Button size="small" onClick={handleEditClick}>Edit</Button>
        <Button size="small" onClick={handleDeleteClick}>Delete</Button>
      </CardActions>
    )
  }
  return (
    <Card sx={{
      margin: 0.5,
    }}>
      <CardContent>
        <Typography variant="body2">
          {post.Content}
        </Typography>
        <Typography variant="body2">
          {post.Category}
        </Typography>
        <Typography variant="body2">
          {formatTime(post.UpdatedAt)}
        </Typography>
        {actions}
      </CardContent>
    </Card>)
}

export const PostsList = ({ isLogin, editFactory, deleteFactory }) => {
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
    content = posts.posts.map(post => {
      const handleEditClick = editFactory(post)
      const handleDeleteClick = deleteFactory(post)
      return (
        <PostExcerpt key={post.ID} post={post} isLogin={isLogin} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />
      )
    })
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      {content}
    </section>
  )
}