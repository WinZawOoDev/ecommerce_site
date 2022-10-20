import React, { useState, useContext } from 'react'
import { Menu } from '@headlessui/react'
import { AppContext } from '../App';
import {
    BsCurrencyDollar,
    BsFillCaretDownFill,
    BsCheck2,
    BsBoxArrowLeft,
    BsBoxArrowRight,
    BsPerson,
    BsGrid,
    BsListUl
} from 'react-icons/bs'
import { MM, EG } from 'country-flag-icons/react/3x2';


const MoneySignIcon = () => <span className='p-1 border-2 border-gray-300 rounded-full text-gray-500 m-1 text-sm'><BsCurrencyDollar /></span>;

const MMFlagIcon = () => <div className='w-6 h-4 m-1'><MM title='Myanmar' /></div>
const EngFlagIcon = () => <div className='w-6 h-4 m-1'><EG title='English' /></div>

const UserIcon = () => <span className='m-1 text-xl'><BsPerson /></span>
const SingInIcon = () => <span className='font-semibold'><BsBoxArrowLeft /></span>
const SignOutIcon = () => <span className='font-semibold'><BsBoxArrowRight /></span>


export default function Header() {


    //Curreny selection
    const currency = [{ id: 1, name: "USD", Label: MoneySignIcon }, { id: 2, name: "MMK", Label: MoneySignIcon }];
    const [selectedCurrency, setSelectedCurrency] = useState(currency[0]);

    const languange = [{ id: 1, name: "English", Label: EngFlagIcon }, { id: 2, name: "Myanmar", Label: MMFlagIcon }];
    const [selectedLanguage, setSelectedLanguage] = useState(languange[0]);

    const accountInfo = { button: { name: "Account", Label: UserIcon }, items: [{ id: 1, name: "SignIn", Label: SingInIcon }, { id: 2, name: "SignOut", Label: SignOutIcon }] }

    function topMostSection() {
        return (
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className='border-2 border-gray-300 px-1 py-1 rounded'>
                    <span className='font-semibold text-xl text-gray-400 capitalize'>ecommerce site</span>
                </div>

                <div className='grid justify-items-center grid-cols-3 gap-1 divide-x'>
                    <SelectBox items={currency} selectedItem={selectedCurrency} setSelectedItem={setSelectedCurrency} />
                    <SelectBox items={languange} selectedItem={selectedLanguage} setSelectedItem={setSelectedLanguage} />
                    <MenuBox button={accountInfo.button} items={accountInfo.items} />
                </div>
            </div>);
    }

    function searchSection() {
        return (
            <div className='w-full my-2 py-3 border border-gray-100 bg-[#F8F8FF]'>
                <div className='container mx-auto flex items-center'>
                    <ViewSwitch />
                </div>
            </div>);
    }

    return (
        <>
            {topMostSection()}
            {searchSection()}
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
                            <Menu.Button className={`relative h-8 inline-flex items-center focus:outline-none ${open && "z-50 border-t border-x border-gray-200 rounded-t-sm bg-white shadow-[5px -4px 5px 0px rgba(209,209,209,0.51)]"}`}>
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

function MenuBox({ button, items }) {

    const [open, setOpen] = useState(false);

    return (
        <div className='w-auto' onMouseLeave={() => setOpen(false)}>
            <div className="relative inline-block">
                <button onMouseOver={() => setOpen(true)} className={`relative h-8 inline-flex items-center focus:outline-none ${open && "z-50 border-t border-x border-gray-200 rounded-t-sm bg-white shadow-[5px -4px 5px 0px rgba(209,209,209,0.51)]"}`}>
                    <button.Label />
                    <span className='text-gray-600 mx-1 text-sm'>{button.name}</span>
                    <span className={`mx-1 text-gray-500 text-sm ${open ? "rotate-180" : 'rotate-0'}`}><BsFillCaretDownFill /></span>
                </button>
                {
                    open && (
                        <>
                            <div className='absolute w-full top-8 bg-white h-[5px] z-50 border-x border-gray-200'></div>
                            <div className="absolute w-40 top-9 right-0 z-10 border border-gray-200 rounded-tl-sm rounded-b-sm bg-white shadow-sm">
                                <div className=' w-full px-2 py-3'>
                                    {
                                        items.map(item => (
                                            <div key={item.id} onClick={() => setOpen(false)} as="div" className={`flex items-center mb-2 justify-start cursor-pointer rounded p-1 hover:bg-orange-500 hover:text-white`}>
                                                <span className='ml-5'><item.Label /></span>
                                                <span className='mx-3'>{item.name}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>)
}

function ViewSwitch() {

    const { UIView, setUIView } = useContext(AppContext);

    return (
        <div className='flex items-center justify-between border border-gray-200 bg-white rounded'>
            <div onClick={() => setUIView(prev => ({ ...prev, grid: true, list: false }))} className={`text-xl m-1 p-1 cursor-pointer ${UIView.grid && 'bg-gray-200 rounded'} `}><BsGrid /></div>
            <div onClick={() => setUIView(prev => ({ ...prev, list: true, grid: false }))} className={`text-xl m-1 p-1 cursor-pointer ${UIView.list && 'bg-gray-200 rounded'}`}><BsListUl /></div>
        </div>
    );
}
