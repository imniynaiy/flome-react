import React, { useState } from 'react'
import { addNewPost } from './postsSlice'
import { useDispatch } from 'react-redux'

export const PostForm = ({id, action}) => {
  const dispatch = useDispatch()
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const onCategoryChanged = e => setCategory(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const canSave =
    [category, content].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewPost({ category, content })).unwrap()
        setCategory('')
        setContent('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postCategory">Post Category:</label>
        <input
          type="text"
          id="postCategory"
          name="postCategory"
          value={category}
          onChange={onCategoryChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked}>{action === "new" ? 'Add Post' : 'Edit Post'}</button>
      </form>
    </section>
  )
}