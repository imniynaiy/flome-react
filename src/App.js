import React from 'react'

import { PostsList } from './features/posts/PostsList'
import { PostForm } from './features/posts/PostForm'

function App() {
  return (
  <React.Fragment><PostsList /><PostForm action="new" /></React.Fragment>
  )
}

export default App