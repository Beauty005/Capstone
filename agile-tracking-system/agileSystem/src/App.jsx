import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import WelcomePage from './pages/welcome'
import Login from './pages/login'
import SignUp from './pages/signup'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ScrumDetails from './components/ScrumDetails'
import UserProfile from './pages/UserProfile'
import AdminProfile from './pages/AdminProfile'
// import ScrumDetails from './components/ScrumDetails'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/scrum-details/:id" element={<ScrumDetails />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
      </Routes>
    </>
  )
}

export default App
