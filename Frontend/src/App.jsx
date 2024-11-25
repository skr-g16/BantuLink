import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import { Navbar } from './components/Navbar'
import {About, Home, Login, Signup} from './components/pages'

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
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App
