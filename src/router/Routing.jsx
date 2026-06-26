import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' 
// importing pages and components
import RootLayout from './RootLayout'
import AuthPage from '../pages/AuthPage'
import Home from '../pages/Home'
import ProdDeatailPage from '../pages/ProdDeatailPage'
import NotFound from '../pages/NotFound'
import ProfilePage from '../pages/ProfilePage'
import Cart from '../pages/CartPage'
import WishListPage from '../pages/WishListPage'
// importing context
import { useContext } from 'react'
import { ProductContext } from '../utils/context/ProductApi'
// import { ToastContext } from '../utils/context/ToastContext'

function Routing() {
  const { user, profileUrl } = useContext(ProductContext)
  

  return (
    <BrowserRouter>
      <Routes>
        {/* 404 Catch-all route */}
        <Route path="/*" element={<NotFound />} />
        
        {/* Layout and nested routes */}
        <Route path="/" element={<RootLayout />} >
          <Route index element={<Home />} />
          <Route path="/products/:id" element={user ? <ProdDeatailPage /> : <Navigate to="/auth" replace /> } />
          <Route path="/profile/:displayName" element={ user ? <ProfilePage /> : <Navigate to="/auth" replace /> } />
          <Route path="/cart" element={ user ? <Cart /> : <Navigate to="/auth" replace /> } />
          <Route path="/wishlist" element={ user ? <WishListPage /> : <Navigate to="/auth" replace /> } />
          <Route path="/wishlist/:id" element={ user ? <ProdDeatailPage /> : <Navigate to="/auth" replace /> } />
        </Route>
        {/* Auth Route: If user exists, redirect to home. Otherwise, show AuthPage */}
        <Route path="/auth" element={user ? <Navigate to={`/profile/${profileUrl}`} replace /> : <AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routing