import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import { PostsList } from './features/posts/PostsList'
import { PostForm } from './features/posts/PostForm'
import { LoginForm } from './features/user/LoginForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<React.Fragment><PostsList /><PostForm action="new" /></React.Fragment>} />
        <Route path="/login" element={<LoginForm />}/>   
      </Routes>
    </BrowserRouter>
  )
}

export default App