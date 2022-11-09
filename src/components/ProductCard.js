import React, { useState } from 'react'
import { BsStar, BsStarFill } from 'react-icons/bs'

export default function ProductCard({product}) {

    const [cardActive, setCardActive] = useState({ status: false, index: null });

    return (
        <>
            {
                product.map((numb, index) => (
                    <div key={index + 1} className={`relative w-[18.2em] h-[22em] rounded text-center m-2 bg-white shadow ${(cardActive.status && (cardActive.index === index)) && "shadow-xl"}`}>
                        <div className='h-[65%] flex justify-center p-2'>
                            <div
                                onMouseOver={() => setCardActive(prev => ({ ...prev, status: true, index }))}
                                onMouseLeave={() => setCardActive(prev => ({ ...prev, status: false, index: null }))}
                            >
                                <img title='items' className='h-full cursor-pointer' src='images/items/mouse.png' />
                            </div>
                        </div>
                        <div className='h-[35%]  px-5 text-left'>
                            <span className='truncate block font-medium text-gray-600'>Logitech G502 Lightspeed Wireless Gaming Mouse with Hero 25K Sensor, PowerPlay Compatible, Tunable Weights and Lightsync RGB - Black</span>
                            <div className=''>
                                <span className='text-gray-600 font-light text-sm'>Brand : </span>
                                <span className='text-sm text-gray-800'>Logitech</span>
                            </div>
                            <div className='-my-1'>
                                <span className='mr-2 text-xs text-gray-700'>MMK</span>
                                <span className='text-gray-700 text-sm font-semibold'>150000.00</span>
                            </div>
                            <div className='mb-2'>
                                <span className='text-sm text-gray-600 font-light mr-2'>By</span>
                                <span className='text-sm text-gray-800'>Logitech Co.ltd</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center'>
                                    <BsStarFill className='mx-[0.9px] text-yellow-600 text-sm' />
                                    <BsStarFill className='mx-[0.9px] text-yellow-600 text-sm' />
                                    <BsStarFill className='mx-[0.9px] text-yellow-600 text-sm' />
                                    <BsStarFill className='mx-[0.9px] text-yellow-600 text-sm' />
                                    <BsStar className='mx-[0.9px] text-sm' />
                                </div>
                                <span className='block line-through decoration-gray-800 text-gray-800 text-sm font-thin'>free shipping</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
