import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './RootLayout'
import AuthPage from '../pages/AuthPage'
// import Home from '../pages/Home'

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />} >
          {/* <Route index element={<Home />} /> */}
        </Route>
        <Route path="/auth" element={<AuthPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default Routing
