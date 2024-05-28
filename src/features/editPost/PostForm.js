import React, { useState } from 'react'
import { addNewPost, editPost } from '../posts/postsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory, setContent, dismiss } from './editPostSlice'

export const PostForm = () => {
  const dispatch = useDispatch()

  const category = useSelector(state => state.editPost.category)
  const content = useSelector(state => state.editPost.content)
  const id = useSelector(state => state.editPost.id)
  const status = useSelector(state => state.editPost.status)

  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const [editRequestStatus, setEditRequestStatus] = useState('idle')

  const onCategoryChanged = e => dispatch(setCategory(e.target.value))
  const onContentChanged = e => dispatch(setContent(e.target.value))

  const canAdd = [category, content].every(Boolean) && addRequestStatus === 'idle'
  const canEdit = [id, category, content].every(Boolean) && editRequestStatus === 'idle'
  const onSavePostClicked = async () => {
    if (status === 'new') {
      if (canAdd) {
        try {
          setAddRequestStatus('pending')
          await dispatch(addNewPost({ category, content })).unwrap()
          dispatch(dismiss())
        } catch (err) {
          console.error('Failed to save the post: ', err)
        } finally {
          setAddRequestStatus('idle')
        }
      }
    } else if (status === 'edit') {
      if (canEdit) {
        try {
          setAddRequestStatus('pending')
          await dispatch(editPost({ id, category, content })).unwrap()
          dispatch(dismiss())
        } catch (err) {
          console.error('Failed to save the post: ', err)
        } finally {
          setEditRequestStatus('idle')
        }
      }
    }
  }

  return (
    <section>

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
        <button type="button" onClick={onSavePostClicked}>{status === "new" ? 'Add Post' : 'Edit Post'}</button>
      </form>
    </section>
  )
}