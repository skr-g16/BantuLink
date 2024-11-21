import { useState } from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import { Navbar } from './components/Navbar'
import {About, Contact, Home, Services, Login, Signup} from './components/pages'

const App = () => {
  
const [isLoggedIn, setIsLoggedIn] = useState(false);

const handleLogin = () => {
  setIsLoggedIn(true);
}
const handleLogout = () => {
  setIsLoggedIn(false);
}
  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App
