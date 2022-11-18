import React, { useEffect, useContext, useState } from 'react'
import { useImmer } from 'use-immer';
import { Link } from 'react-router-dom';
import { BsX, BsDash, BsPlus, BsCartX } from 'react-icons/bs'
import { AppContext } from '../App'
import { products } from '../dummyData/Products';


const orderSummary = [
  { id: 1, name: "Subtotal", value: 400000, currency: "MMK" },
  { id: 2, name: "Estimated shipping fee", value: 40000, currency: "MMK" },
  { id: 3, name: "Estimated tax fee", value: 3000, currency: "MMK" }
]


export default function CartView() {

  const { cart, totalCart, totalCartQty, increCartQty, decreCartQty, deleteCart } = useContext(AppContext);

  const [tData, setTData] = useImmer([]);

  const getProduct = () => {
    cart.forEach((c) => {
      products.forEach(product => {
        if ((c.id === product.id) && (c.name === product.name)) {
          setTData(prev => {
            prev.push({
              id: product.id,
              name: product.name,
              productDetail: {
                img: product.images[0].src,
                desc: product.description,
                brand: product.brand,
                stock: 5
              },
              quantity: c.qty,
              price: product.price
            })
          });
        }
      })
    })
  }

  useEffect(() => {
    getProduct();
  }, []);


  const findArrObjIndex = ({ id, name }, arr) => arr.findIndex(list => (list.id === id) && (list.name === name));

  const isStockOut = ({ id, name }) => {
    const index = findArrObjIndex({ id, name }, tData);
    return index !== -1 && tData[index].productDetail.stock === 0;
  }

  const isCartEmpty = () => totalCart() === 0;

  const handleDelete = ({ id, name }) => {
    deleteCart({ id, name });
    setTData(prev => {
      const index = findArrObjIndex({ id, name }, prev);
      if (index !== -1) prev.splice(index, 1);
    })
  }


  const handleQtyIncrease = ({ id, name }) => {
    if (isStockOut({ id, name })) return;
    increCartQty({ id, name });
    setTData(prev => {
      const index = findArrObjIndex({ id, name }, prev);
      prev[index].quantity++;
      prev[index].productDetail.stock--;
    });
  }

  const handleQtyDecrease = ({ id, name }) => {
    decreCartQty({ id, name });
    setTData(prev => {
      const index = findArrObjIndex({ id, name }, prev)
      if (index !== -1) {
        if (prev[index].quantity === 1)
          handleDelete({ id, name });
        else {
          prev[index].quantity--;
          prev[index].productDetail.stock++;
        }
      }
    })

  }


  const totalOrderPrice = () => orderSummary.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);

  console.log(totalOrderPrice());

  return (
    <div className='container mx-auto'>
      {
        isCartEmpty() ?
          <div className='min-h-[30em] flex justify-center items-center bg-white rounded'>
            <BsCartX className='text-9xl text-red-600' />
            <div className='ml-16'>
              <span className='block text-2xl font-medium text-gray-600 my-3'>Your cart is empty</span>
              <Link to="/" className='text-cyan-600 underline font-light text-lg'>please go to shop</Link>
            </div>
          </div>
          :
          <div className='grid grid-cols-6 gap-x-2'>
            <div className='col-span-4 bg-white rounded'>
              <div className='py-7 px-5'>
                <div className='flex justify-between items-center pb-5 px-1 border-b border-b-gray-200'>
                  <span className='text-lg text-gray-800'>Your  Cart</span>
                  <div>
                    <span className='text-gray-600 mx-2'>{totalCartQty()}</span>
                    <span className='text-gray-600 font-light'>total quantity of </span>
                    <span className='text-gray-600 mx-2'>{totalCart()}</span>
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
                        tData.map((data, index) => (
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
                                  onClick={() => handleQtyDecrease({ id: data.id, name: data.name })}
                                  className='border border-gray-300 px-2 py-1 rounded outline-none'
                                >
                                  <BsDash />
                                </button>
                                <span className='px-5 text-lg font-medium text-gray-600'>{data.quantity}</span>
                                <button
                                  onClick={() => handleQtyIncrease({ id: data.id, name: data.name })}
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
                                <span className='-ml-3'>{(data.price * data.quantity).toLocaleString()}</span>
                              </div>
                            </td>
                            <td className='text-center py-4 px-3'>
                              <button onClick={() => handleDelete({ id: data.id, name: data.name })} className='outline-none'>
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
            </div>
            <div className='col-span-2 bg-white rounded px-5'>
              <div className='pt-8 pb-5'>
                <span className=' text-gray-700'>Order Summary</span>
              </div>
              <hr />
              <div className='py-5 border-b border-gray-300'>
                {
                  orderSummary.map(summary => (
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
                <button className='w-80 py-2 rounded bg-red-800 outline-none'>
                  <span className='uppercase text-white'>proceed to checkout</span>
                </button>
              </div>
              <div className='text-center my-20'>
                <Link to={"/"} className='font-light text-sm text-cyan-700 underline'>continue shopping</Link>
              </div>
            </div>
          </div>
      }

    </div>
  )
}
