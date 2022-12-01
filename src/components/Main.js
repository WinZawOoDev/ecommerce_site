import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import OneCategory from './OneCategory'
import ProductDetails from './ProductDetails'
import EmptyCart from './Cart/EmptyCart'
import PageNotFound from './PageNotFound'
import Cart from './Cart'
import SignIn from './Account/SignIn'


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
                <Route path='view-cart/*' element={<Cart />} />
                <Route path='empty-cart' element={<EmptyCart />} />
                <Route path='signin' element={<SignIn />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
            <Footer />
        </div>
    )
}
