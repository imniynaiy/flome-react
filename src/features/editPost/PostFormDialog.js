import React, { useState } from 'react'
import { addNewPost, editPost } from '../posts/postsSlice'
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

  const canAdd = [category, content].every(Boolean) && addRequestStatus === 'idle'
  const canEdit = [id, category, content].every(Boolean) && editRequestStatus === 'idle'
  const handleSubmit = async () => {
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
        <Autocomplete
          disablePortal
          id="category"
          margin="dense"
          options={categories}
          sx={{ width: 300 }}
          value={category}
          fullWidth
          required
          freeSolo
          renderInput={(params) => <TextField {...params} label="category" onChange={handleCategoryChanged} />}
        />
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>{status === "edit" ? "Update" : "Create"}</Button>
      </DialogActions>
    </Dialog>
  );
}