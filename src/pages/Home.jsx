import React from 'react'
import Hero from '../components/Hero'
import ProductCard from '../components/ProdCard'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Hero />
      
      <ProductCard />
      
    </div>
  )
}

export default Home
