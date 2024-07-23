import React from 'react'
import Home from './Home'
import Form from './Form'

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div id="app">
      <BrowserRouter>
      <nav>
        {/* NavLinks here */}
        <Link to="/" class=''>Home</Link>
        <Link to="order" class=''>Order</Link>
        
      </nav>
      {/* Route and Routes here */}
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='order' element={<Form />}/>
      </Routes>
    </BrowserRouter>
    </div>
    
  )
}

export default App
