import React, { memo } from 'react'
import Hero from '../components/Hero'
import ProductCard from '../components/ProdCard'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { ProductContext } from '../utils/context/ProductApi'
// import ProdCardSkeleton from '../components/ProdCardSkeleton'

function Home() {
  const { loading } = useContext(ProductContext)
  if (loading) {
    return (
      <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="w-full max-w-[340px] rounded-2xl bg-slate-900 animate-pulse"
        >
          <div className="aspect-square bg-slate-800 rounded-xl m-3"></div>

          <div className="p-4 space-y-3">
            <div className="h-3 bg-slate-800 rounded w-20"></div>
            <div className="h-4 bg-slate-800 rounded"></div>
            <div className="h-4 bg-slate-800 rounded w-3/4"></div>

            <div className="flex justify-between">
              <div className="h-5 bg-slate-800 rounded w-16"></div>
              <div className="h-5 bg-slate-800 rounded w-12"></div>
            </div>

            <div className="h-10 bg-slate-800 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
      </>
    )
  }
  return (
    <div>
      <Hero />
      
      <ProductCard />
      
    </div>
  )
}

export default memo(Home)
