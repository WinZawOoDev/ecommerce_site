import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import { BsCurrencyDollar, BsFillCaretDownFill, BsCheck2 } from 'react-icons/bs'
import { MM, EG } from 'country-flag-icons/react/3x2';


const MoneySignIcon = () => <span className='p-1 border-2 border-gray-300 rounded-full text-gray-500 m-1 text-sm'><BsCurrencyDollar /></span>;

const MyanmarFlag = () => <div className='w-6 h-4 m-1'><MM title='Myanmar' /></div>
const EnglishFlag = () => <div className='w-6 h-4 m-1'><EG title='English' /></div>



export default function Header() {


    //Curreny selection
    const currency = [{ id: 1, name: "USD", Label: MoneySignIcon }, { id: 2, name: "MMK", Label: MoneySignIcon }];
    const [selectedCurrency, setSelectedCurrency] = useState(currency[0]);

    const languange = [{ id: 1, name: "English", Label: EnglishFlag }, { id: 2, name: "Myanmar", Label: MyanmarFlag }];
    const [selectedLanguage, setSelectedLanguage] = useState(languange[0]);


    function topMostSection() {
        return (
            <div className="flex items-center justify-between">

                {/* Logo */}
                <div className='border-2 border-gray-300 px-1 py-1 rounded'>
                    <span className='font-semibold text-xl text-gray-400 capitalize'>ecommerce site</span>
                </div>

                <div className='flex items-center justify-between'>
                    <SelectBox items={currency} selectedItem={selectedCurrency} setSelectedItem={setSelectedCurrency} />
                    <SelectBox items={languange} selectedItem={selectedLanguage} setSelectedItem={setSelectedLanguage} />
                </div>
            </div>);
    }

    return (
        <>
            {topMostSection()}
        </>
    )
}


function SelectBox({ items, selectedItem, setSelectedItem }) {
    return (
        <div className='w-auto'>
            <Menu as="div" className="relative inline-block">
                {
                    ({ open }) => (
                        <>
                            <Menu.Button className={`relative h-8 inline-flex items-center focus:outline-none ${open && "z-50 border-t border-x border-gray-200 rounded-t-sm bg-white"}`}>
                                <selectedItem.Label />
                                <span className='text-gray-600 mx-1 text-sm'>{selectedItem.name}</span>
                                <span className={`mx-1 text-gray-500 text-sm ${open ? "rotate-180" : 'rotate-0'}`}><BsFillCaretDownFill /></span>
                            </Menu.Button>
                            {open && <div className='absolute w-full top-8 bg-white h-[5px] z-50 border-x border-gray-200'></div>}
                            <Menu.Items className="absolute w-48 top-9 right-0 z-10 border border-gray-200 rounded-tl-sm rounded-b-sm bg-white shadow-sm">
                                <div className=' w-full px-2 py-3'>
                                    {
                                        items.map(item => (
                                            <Menu.Item key={item.id} onClick={() => setSelectedItem(prev => ({ ...prev, ...item }))} as="div" className={({ active }) => `flex items-center justify-center cursor-pointer rounded p-1 ${active && 'bg-orange-500'}`}>
                                                {
                                                    ({ active }) => (
                                                        <>
                                                            {(selectedItem.id === item.id) ? <span className={`w-1/2 ml-2 font-semibold ${active && 'text-white'}`}><BsCheck2 /></span> : <span className='w-1/2 ml-2'></span>}
                                                            <span className={`w-1/2 ml-4 ${active && 'text-white'}`}>{item.name}</span>
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


