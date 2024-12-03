import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import { Navbar } from './components/Navbar'
import {About, Home, Login, Signup, Profile} from './components/pages'

const App = () => {
  
const [isLoggedIn, setIsLoggedIn] = useState(false);

const handleLogin = () => {
  setIsLoggedIn(true);
}
const handleLogout = () => {
  setIsLoggedIn(false);
}
  return (
    <div className="w-full h-full bg-slate-100">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Login" element={<Login onLogin={handleLogin}/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Profile/:userId" element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App
