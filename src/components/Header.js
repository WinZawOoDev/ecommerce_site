import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTotalCartQty, selectIsCartEmpty } from '../app/cartSlice'
import { selectTotalWishList } from '../app/wishListSlice'
import { Menu, Listbox } from '@headlessui/react'
import { AppContext } from '../App';
import {
    BsCurrencyDollar,
    BsFillCaretDownFill,
    BsCheck2,
    BsBoxArrowLeft,
    BsBoxArrowRight,
    BsPerson,
    BsGrid,
    BsListUl,
    BsSearch,
    BsCheck,
    BsCart3,
    BsSuitHeart
} from 'react-icons/bs'
import { MM, EG } from 'country-flag-icons/react/3x2';
import { category_data } from '../dummyData/Categories';


const MoneySignIcon = () => <span className='p-1 border-2 border-gray-300 rounded-full text-gray-500 m-1 text-sm'><BsCurrencyDollar /></span>;

const MMFlagIcon = () => <div className='w-6 h-4 m-1'><MM title='Myanmar' /></div>
const EngFlagIcon = () => <div className='w-6 h-4 m-1'><EG title='English' /></div>

const UserIcon = () => <span className='m-1 text-xl'><BsPerson /></span>
const SingInIcon = () => <span className='font-semibold'><BsBoxArrowLeft /></span>
const SignOutIcon = () => <span className='font-semibold'><BsBoxArrowRight /></span>

export default function Header() {

    const totalCartQty = useSelector(selectTotalCartQty);
    const totalWishlist = useSelector(selectTotalWishList);
    const isCartEmpty = useSelector(selectIsCartEmpty);

    const { UIView, changeUIView } = useContext(AppContext);

    //Curreny selection
    const currency = [{ id: 1, name: "USD", Label: MoneySignIcon }, { id: 2, name: "MMK", Label: MoneySignIcon }];
    const [selectedCurrency, setSelectedCurrency] = useState(currency[0]);

    const languange = [{ id: 1, name: "English", Label: EngFlagIcon }, { id: 2, name: "Myanmar", Label: MMFlagIcon }];
    const [selectedLanguage, setSelectedLanguage] = useState(languange[0]);

    const accountInfo = { button: { name: "Account", Label: UserIcon }, items: [{ id: 1, name: "SignIn", Label: SingInIcon }, { id: 2, name: "SignOut", Label: SignOutIcon }] }

    const [searchForm, setSearchForm] = useState({ product: "", category: category_data[0], showResult: false });
    const closeSearchResult = () => setSearchForm(prev => ({ ...prev, showResult: prev.showResult && false }));

    const handleCatSelect = category => setSearchForm(prev => ({ ...prev, category }));
    const handleProductChange = ({ target: { value } }) => setSearchForm(prev => ({ ...prev, product: value, showResult: value && true }));

    const searchResult = ["result1", "result2", "result3", "result4", "result5", "result6", "result7"];

    const handleSearch = () => {
        if (searchForm["product"]) {
            console.log(searchForm);
            setSearchForm(prev => ({ ...prev, showResult: prev.showResult && false }))
        } else
            console.log(false);
    }

    function topMostSection() {
        return (
            <div className="container mx-auto flex items-center justify-between z-50">
                {/* Logo */}
                <div className='border-2 border-gray-300 px-1 py-1 rounded'>
                    <Link to={"/"}>
                        <span className='font-semibold text-xl text-gray-400 capitalize'>ecommerce site</span>
                    </Link>
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
                <div className='flex items-center justify-center mx-auto'>

                    {/* UI View Switch */}
                    <div className='flex items-center justify-between border border-gray-200 bg-white rounded mr-11'>
                        <div
                            onClick={() => changeUIView({ grid: true, list: false })}
                            className={`text-xl m-1 p-1 cursor-pointer ${UIView.grid && 'bg-gray-200 rounded'} `}
                        >
                            <BsGrid />
                        </div>
                        <div
                            onClick={() => changeUIView({ list: true, grid: false })}
                            className={`text-xl m-1 p-1 cursor-pointer ${UIView.list && 'bg-gray-200 rounded'}`}
                        >
                            <BsListUl />
                        </div>
                    </div>

                    {/* Search Form */}
                    <div className='relative w-6/12' onMouseLeave={() => closeSearchResult()}>

                        {/* Form */}
                        <div className={`relative flex items-center border-2 border-red-800 bg-white ${searchForm.showResult ? "rounded-t" : "rounded"}`}>
                            <input type="text" name='product' value={searchForm["product"]} onChange={handleProductChange} className="flex grow py-2 pl-2 focus:outline-none bg-white" />
                            <div className='flex items-center'>
                                <div onClick={() => closeSearchResult()}>
                                    <ListBox items={category_data} value={searchForm["category"]} handleChange={handleCatSelect} />
                                </div>
                                <button onClick={() => handleSearch()} className='h-auto bg-red-800 border border-red-800 p-2'><BsSearch className='text-white text-2xl' /></button>
                            </div>
                        </div>

                        {/* Search Result */}
                        <div
                            onMouseOut={() => { }}
                            className={`absolute h-auto z-50 w-full border-x border-x-gray-300 border-b border-b-gray-300 bg-white rounded-b-md shadow-lg ${!searchForm.showResult && "hidden"}`}>
                            <ul className='my-4 w-full'>
                                {searchResult.map((result, index) => <li key={index + 1} onClickCapture={() => closeSearchResult()} className='my-1 px-7 cursor-pointer hover:bg-gray-100 rounded text-gray-700 hover:text-gray-500 hover:px-5 py-1 text-sm'>{result}</li>)}
                            </ul>
                        </div>
                    </div>


                    <div className='flex items-center'>
                        {/* Cart */}
                        <Link to={isCartEmpty ? "empty-cart" : "view-cart"} className='relative ml-20 p-3 focus:outline-none'>
                            <div className='absolute -top-2 -right-1 bg-orange-600 border border-gray-200 px-[6px] py-[2px] rounded-[50%] shadow'>
                                <span className='text-white text-xl'>{totalCartQty}</span>
                            </div>
                            <span className='text-4xl text-gray-500'><BsCart3 /></span>
                        </Link>


                        {/* Wish List */}
                        <button className='relative flex items-center ml-10 p-3 focus:outline-none'>
                            <div className='absolute -top-2 -right-1 bg-orange-500 border border-gray-200 px-[6px] py-[2px] rounded-[50%] shadow'>
                                <span className='text-white text-xl'>{totalWishlist}</span>
                            </div>
                            <span className='text-3xl text-gray-500'><BsSuitHeart /></span>
                            <span className='capitalize text-gray-400 text-lg mx-1'>wish list</span>
                        </button>
                    </div>

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
        <div className='w-auto z-auto'>
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
                            <Menu.Items className="absolute w-48 top-9 right-0 z-10 border border-gray-200 rounded-tl-sm rounded-b-sm bg-white shadow-md">
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
                            <div className="absolute w-40 top-9 right-0 z-10 border border-gray-200 rounded-tl-sm rounded-b-sm bg-white shadow-md">
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


function ListBox({ items, value, handleChange }) {

    return (
        <Listbox value={value} onChange={handleChange} as="div" className="relative pl-2 z-50">
            {
                ({ open }) => (
                    <>
                        <Listbox.Button className="relative flex items-center border-l border-red-800 py-[11px] px-3 focus:outline-none bg-white ">
                            <span className='text-sm text-gray-500 capitalize'>{value.name}</span>
                            <span className={`ml-2 mr-1 text-gray-400 text-xs ${open ? 'rotate-180' : 'rotate-0'}`}><BsFillCaretDownFill /></span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute w-48 bg-white border border-gray-100 py-3 px-1 mt-1 max-h-80 overflow-y-auto rounded-b-sm shadow-md scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-md scrollbar-track-rounded-md">
                            {items.map((item) => (
                                <Listbox.Option
                                    key={item.id}
                                    value={item}
                                    disabled={item.unavailable}
                                    className={({ active }) => `w-full flex items-center text-gray-500 px-1 my-1 cursor-default ${active && 'bg-orange-500 text-white rounded'}`}
                                >
                                    {
                                        value.name === item.name ?
                                            <span className='text-lg w-1/6 text-right'><BsCheck /></span> : <span className='w-1/6'></span>
                                    }
                                    <span className='w-5/6 truncate text-sm text-left capitalize'>{item.name}</span>
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </>
                )
            }
        </Listbox>
    )
}
