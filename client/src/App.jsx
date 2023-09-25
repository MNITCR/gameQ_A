import React from 'react'
import Signup from './signup/Signup'
import Signin from './signin/Signin'
import Home from './home/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Signup' element={<Signup />} ></Route>
        <Route path='/' element={<Signin />} ></Route>
        <Route path='/Home' element={<Home />} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
