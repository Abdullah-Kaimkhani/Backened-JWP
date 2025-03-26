import React from 'react'
import Login from './Screens/Login'
import TodoApp from './Screens/TodoApp'
import SignUp from './Screens/SignUp'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/todoapp" element={<TodoApp />} />
    </Routes>
    </>
  )
}

export default App