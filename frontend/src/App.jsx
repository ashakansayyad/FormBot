import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Home,Login,Signup,Notfound} from './pages/pages';
import './App.css';


function App() {
  return (
   <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="*" element={<Notfound/>} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
