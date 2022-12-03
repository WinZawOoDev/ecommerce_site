import React from 'react'
import { BsCartX } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function EmptyCart() {
    return (
        <div className='container mx-auto'>
            <div className='min-h-[30em] flex justify-center items-center bg-white rounded'>
                <BsCartX className='text-9xl text-red-600' />
                <div className='ml-16'>
                    <span className='block text-2xl font-medium text-gray-600 my-3'>Your cart is empty</span>
                    <Link to="/" className='text-cyan-600 underline font-light text-lg'>please go to shop</Link>
                </div>
            </div>
        </div>
    )
}
