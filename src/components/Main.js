import React, { useEffect } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import OneCategory from './OneCategory'
import ProductDetails from './ProductDetails'
import CartView from './CartView'
import DeliveryInfo from './DeliveryInfo'
import EmptyCart from './EmptyCart'

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
                <Route path='category/:mainCategory/:subCategory/:product' element={<><Outlet /></>}>
                    <Route index element={<OneCategory />} />
                    <Route path='product-details/:mainCategory/:subCategory/:product/:producId' element={<ProductDetails />} />
                </Route>
                <Route path='product-details/:mainCategory/:subCategory/:product/:producId' element={<ProductDetails />} />
                <Route path='view-cart' element={<><Outlet /></>}>
                    <Route index element={<CartView />} />
                    <Route path='deli-info' element={<><Outlet /></>}>
                        <Route index element={<DeliveryInfo />} />
                        <Route path='empty-cart' element={<EmptyCart />} />
                    </Route>
                    <Route path='empty-cart' element={<EmptyCart />} />
                </Route>
                <Route path='empty-cart' element={<EmptyCart />} />
            </Routes>
            <Footer />
        </div>
    )
}
