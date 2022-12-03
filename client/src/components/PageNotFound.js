import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <div className='container mx-auto flex justify-center items-center bg-white rounded h-[40em]'>
            <div className=''>
                <span className='text-3xl px-5 text-gray-400 font-medium'>Not found !</span>
                <Link to="/" className='px-5'>
                    <span className='text-cyan-600 underline font-light'>back to shop</span>
                </Link>
            </div>
        </div>
    )
}
