import React, { useEffect } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import OneCategory from './OneCategory'
import ProductDetails from './ProductDetails'

export default function Main() {

    // useEffect(() => {

    //     fetch('https://api.storerestapi.com/categories')
    //         .then(response => response.json())
    //         .then(json => console.log(json));
    // }, []);


    return (
        <div className='py-4'>
            <Header />
            <Routes>
                <Route path='/' element={<Body />} />
                <Route path='category/:mainCategory/:subCategory/:product' element={<OneCategory />} />
                <Route path='product-details/:mainCategory/:subCategory/:product/:producId' element={<ProductDetails />} />
            </Routes>
            <Footer />
        </div>
    )
}
