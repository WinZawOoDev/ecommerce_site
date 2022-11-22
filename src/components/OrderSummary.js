import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProductFromCart } from '../app/cartSlice'

export default function OrderSummary() {

    const { ordSummary } = useSelector(selectProductFromCart);
    const totalOrderPrice = () => ordSummary.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);

    return (
        <div className='bg-white rounded px-5 max-h-[45em] min-h-[40em]'>
            <div className='pt-8 pb-5'>
                <span className=' text-gray-700'>Order Summary</span>
            </div>
            <hr />
            <div className='py-5 border-b border-gray-300'>
                {
                    ordSummary.map(summary => (
                        <div key={summary.id} className='relative flex justify-between items-center p-2'>
                            <div className='w-2/3'>
                                <span className='font-light text-sm text-gray-700 '>{summary.name}</span>
                            </div>
                            <div className='flex justify-between items-center w-1/3'>
                                <span className='text-sm text-gray-600'>{summary.currency}</span>
                                <span className='ml-5 font-light'>{summary.value.toLocaleString('en-US')}</span>
                            </div>
                        </div>
                    ))
                }
                <div className='relative flex justify-between items-center p-2 mt-4'>
                    <input className='w-2/3 h-9 border border-gray-200 rounded px-5 text-gray-700 outline-none placeholder:font-light placeholder:text-sm focus-visible:border-gray-300' placeholder='Enter coupon code' />
                    <button className='w-1/3 h-9 border border-gray-200 ml-4 rounded-md bg-cyan-600'>
                        <span className='uppercase text-white text-sm font-medium tracking-wider'>apply</span>
                    </button>
                </div>
            </div>
            <div className='relative flex justify-between items-center p-2 mt-4'>
                <div className='w-2/3'>
                    <span className='text-sm text-gray-700'>Total</span>
                </div>
                <div className='flex justify-between items-center w-1/3'>
                    <span className='text-sm text-gray-700'>MMK</span>
                    <span className='ml-5 text-gray-700'>{totalOrderPrice().toLocaleString("en-US")}</span>
                </div>
            </div>
            <div className='flex justify-center mt-10'>
                <Link to={"deli-info"} className='w-80 py-2 text-center rounded bg-red-800 outline-none'>
                    <span className='uppercase text-white'>proceed to checkout</span>
                </Link>
            </div>
            <div className='text-center my-20'>
                <Link to={"/"} className='font-light text-sm text-cyan-700 underline'>continue shopping</Link>
            </div>
        </div>
    )
}
