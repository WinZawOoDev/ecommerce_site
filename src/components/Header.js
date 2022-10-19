import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import { BsCurrencyDollar, BsFillCaretDownFill, BsCheck2 } from 'react-icons/bs'


const MoneySignIcon = () => <span className='p-1 border-2 border-gray-300 rounded-full text-gray-500 m-1 text-sm'><BsCurrencyDollar /></span>;


export default function Header() {


    //Curreny selection
    const currency = [{ id: 1, name: "USD", Label: MoneySignIcon }, { id: 2, name: "MMK", Label: MoneySignIcon }];
    const [selectedCurrency, setSelectedCurrency] = useState(currency[0]);


    function topMostSection() {
        return (
            <div className="flex items-center justify-between">

                {/* Logo */}
                <div className='border-2 border-gray-300 px-1 py-1 rounded'>
                    <span className='font-semibold text-xl text-gray-400 capitalize'>ecommerce site</span>
                </div>

                <div className='flex items-center'>
                    <MenuBox items={currency} selectedItem={selectedCurrency} setSelectedItem={setSelectedCurrency} />
                </div>
            </div>);
    }

    return (
        <>
            {topMostSection()}
        </>
    )
}


function MenuBox({ items, selectedItem, setSelectedItem }) {
    return (
        <div className='w-auto'>
            <Menu as="div" className="relative inline-block">
                {
                    ({ open }) => (
                        <>
                            <Menu.Button className={`relative inline-flex items-center  ${open && "z-50 border-t border-x border-gray-200 rounded-t-sm bg-white"}`}>
                                <selectedItem.Label />
                                <span className='text-gray-600 mx-1 text-sm'>{selectedItem.name}</span>
                                <span className={`mx-1 text-gray-500 text-sm ${open ? "rotate-180" : 'rotate-0'}`}><BsFillCaretDownFill /></span>
                            </Menu.Button>

                            <Menu.Items className="absolute w-48 right-0 z-10 border border-gray-200 rounded-tl-sm rounded-b-sm bg-white shadow-sm" style={{ marginTop: "-3px" }}>
                                <div className=' w-full px-2 py-3'>
                                    {
                                        items.map(item => (
                                            <Menu.Item key={item.id} onClick={() => setSelectedItem(prev => ({ ...prev, ...item }))} as="div" className={({ active }) => `flex items-center justify-center cursor-pointer rounded p-1 ${active && 'bg-orange-500'}`}>
                                                {
                                                    ({ active }) => (
                                                        <>
                                                            {(selectedItem.id === item.id) ? <span className='w-1/2 ml-2'><BsCheck2 /></span> : <span className='w-1/2 ml-2'></span>}
                                                            <span className='w-1/2 ml-4'>{item.name}</span>
                                                        </>)
                                                }
                                            </Menu.Item>
                                        ))
                                    }
                                </div>
                            </Menu.Items>
                        </>
                    )
                }
            </Menu>
        </div>
    );
}


