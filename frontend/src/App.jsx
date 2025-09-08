import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import { Toaster } from "react-hot-toast"
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Signup from './pages/Signup'

function App() {
  const { authUser } = useContext(AuthContext)

  return (
    <div className="bg-[url('/bgimg1.jpg')] bg-contain bg-black bg-cover bg-no-repeat">
      <Toaster />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />

      </Routes>
    </div>
  )
}

export default App
