import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectProductFromCart, selectTotalCart, selectTotalCartQty, increCartQty, decreCartQty, deleteCart } from '../app/cartSlice'
import { BsX, BsDash, BsPlus } from 'react-icons/bs'

export default function CartTable({ isStockOut }) {

    const dispatch = useDispatch();
    const { items } = useSelector(selectProductFromCart);
    const totalCart = useSelector(selectTotalCart);
    const totalCartQty = useSelector(selectTotalCartQty);


    return (
        <div className='py-7 px-5'>
            <div className='flex justify-between items-center pb-5 px-1 border-b border-b-gray-200'>
                <span className='text-lg text-gray-800'>Your  Cart</span>
                <div>
                    <span className='text-gray-600 mx-2'>{totalCartQty}</span>
                    <span className='text-gray-600 font-light'>total quantity of </span>
                    <span className='text-gray-600 mx-2'>{totalCart}</span>
                    <span className='text-gray-600 font-light'>items</span>
                </div>
            </div>
            <div>
                <table className='table-auto w-full mt-3'>
                    <thead>
                        <tr>
                            <td className='text-sm font-semibold text-gray-700'>Product Details</td>
                            <td className='text-center text-sm font-semibold text-gray-700'>Quantity</td>
                            <td className='text-center text-sm font-semibold text-gray-700'>Price</td>
                            <td className='text-center text-sm font-semibold text-gray-700'>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((data, index) => (
                                <tr key={index + 1}>
                                    <td className='font-light text-gray-600 inline-flex items-center py-4'>
                                        <img className="object-contain max-w-[5em]" src={require(`../images${data.productDetail.img}`)} />
                                        <div className='ml-2 max-w-[15em]'>
                                            <span className='block text-sm font-light truncate text-gray-800'>{data.productDetail.desc}</span>
                                            <div>
                                                <span className='text-sm font-thin'>Brand : </span>
                                                <span className='text-sm font-light'>{data.productDetail.brand}</span>
                                            </div>
                                            {
                                                isStockOut({ id: data.id, name: data.name }) ? <span className='block text-xs mt-1 text-gray-600 line-through'>out of stock</span>
                                                    : <span className='block text-xs font-medium mt-1 text-gray-600'>({data.productDetail.stock}) items instock</span>
                                            }

                                        </div>
                                    </td>
                                    <td className='py-4'>
                                        <div className='flex items-center justify-center'>
                                            <button
                                                onClick={() => dispatch(decreCartQty({ id: data.id, name: data.name }))}
                                                className='border border-gray-300 px-2 py-1 rounded outline-none'
                                            >
                                                <BsDash />
                                            </button>
                                            <span className='px-5 text-lg font-medium text-gray-600'>{data.quantity}</span>
                                            <button
                                                onClick={() => dispatch(increCartQty({ id: data.id, name: data.name }))}
                                                className={`border border-gray-300 px-2 py-1 rounded outline-none transition duration-200 ease-in-out ${isStockOut({ id: data.id, name: data.name }) && "border-gray-100 text-gray-200 pointer-events-none"}`}
                                            >
                                                <BsPlus />
                                            </button>
                                        </div>
                                    </td>
                                    <td className='py-4 font-light text-gray-600 px-5'>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-sm -mr-4'>MMK</span>
                                            <span className='-ml-3'> {data.price.toLocaleString('en-US')}</span>
                                        </div>
                                    </td>
                                    <td className='py-4 font-light text-gray-600 px-5'>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-sm -mr-4'>MMK</span>
                                            <span className='-ml-3'>{data.totalPrice.toLocaleString()}</span>
                                        </div>
                                    </td>
                                    <td className='text-center py-4 px-3'>
                                        <button onClick={() => dispatch(deleteCart({ id: data.id, name: data.name }))} className='outline-none'>
                                            <BsX className='text-red-800 text-lg' />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}


CartTable.defaultProps = {
    isStockOut: () => { },
    decreCartQty: () => { },
    increCartQty: () => { },
    deleteCart: () => { }
}
