import React from 'react'
import CartTable from './CartTable'
import OrderSummary from './OrderSummary'

export default function DeliveryInfo() {

  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-6 gap-x-2'>
        <div className='col-span-4 bg-white rounded max-h-[45em] overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-md scrollbar-track-rounded-md'>
          <CartTable />
        </div>
        <div className='col-span-2 bg-white rounded px-5'>
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}
