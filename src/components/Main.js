import React, { useEffect } from 'react'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'

export default function Main() {

    // useEffect(() => {

    //     fetch('https://api.storerestapi.com/categories')
    //         .then(response => response.json())
    //         .then(json => console.log(json));
    // }, []);

    return (
        <div className='py-4'>
            <Header />
            <Body />
            <Footer/>
        </div>
    )
}
