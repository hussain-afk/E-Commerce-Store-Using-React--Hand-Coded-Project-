import React from 'react'
import ProdCard from '../components/ProdCard'

function AllProductsPage() {
    return (
        <div>
            <div className="text-center my-10 space-y-2">
                <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900 tracking-tight">
                    All Products
                </h1>
                <div className="h-1 w-12 bg-indigo-600 mx-auto rounded-full" />
                <p className="text-sm md:text-base text-gray-500 max-w-md mx-auto pt-1 font-medium">
                    Explore our curated collection of premium essentials designed for everyday life.
                </p>
            </div>
            <ProdCard />
        </div>
    )
}

export default AllProductsPage;
