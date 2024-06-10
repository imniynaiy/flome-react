import React, { useState } from 'react'
import { addPostAndGetPosts, editPostAndGetPosts } from '../posts/postsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory, setContent, dismiss } from './editPostSlice'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function PostFormDialog() {
  const dispatch = useDispatch()
  const show = useSelector(state => state.editPost.show)
  const category = useSelector(state => state.editPost.category)
  const content = useSelector(state => state.editPost.content)
  const id = useSelector(state => state.editPost.id)
  const status = useSelector(state => state.editPost.status)
  const categories = useSelector(state => state.categories.selectables)

  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const [editRequestStatus, setEditRequestStatus] = useState('idle')

  const handleCategoryChanged = e => dispatch(setCategory(e.target.value))
  const handleContentChanged = e => dispatch(setContent(e.target.value))
  const handleSubmit = async () => {
    if (status === 'new') {
      // console.log({category, content, addRequestStatus})
      const canAdd = [category, content].every(Boolean) && addRequestStatus === 'idle'
  
      if (canAdd) {
        try {
          setAddRequestStatus('pending')
          await dispatch(addPostAndGetPosts({ category, content }))
        } catch (err) {
          console.error('Failed to save the post: ', err)
        } finally {
          setAddRequestStatus('idle')
          dispatch(dismiss())
        }
      }
    } else if (status === 'edit') {
      const canEdit = [id, category, content].every(Boolean) && editRequestStatus === 'idle'
      if (canEdit) {
        try {
          setAddRequestStatus('pending')
          await dispatch(editPostAndGetPosts({ id, category, content }))
        } catch (err) {
          console.error('Failed to save the post: ', err)
        } finally {
          setEditRequestStatus('idle')
          dispatch(dismiss())
        }
      }
    }
  }

  const handleClose = () => {
    dispatch(dismiss())
  };

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      PaperProps={{
        component: 'form'
      }}
    >
      <DialogTitle>{status === "edit" ? "Edit Post" : "New Post"}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="content"
          name="content"
          label="Content"
          type="text"
          fullWidth
          multiline
          value={content}
          onChange={handleContentChanged}
          sx={{pb: 2}}
        />
        <Autocomplete
          disablePortal
          id="category"
          margin="dense"
          options={categories}
          sx={{ width: 300, pb: 4 }}
          value={category}
          fullWidth
          required
          freeSolo
          renderInput={(params) => <TextField {...params} label="category" onChange={handleCategoryChanged} />}
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>{status === "edit" ? "Update" : "Create"}</Button>
      </DialogActions>
    </Dialog>
  );
}