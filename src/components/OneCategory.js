import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BsChevronRight, BsChevronExpand, BsCheck, BsFillCaretRightSquareFill, BsChevronDoubleLeft, BsChevronDoubleRight, BsThreeDots } from 'react-icons/bs'
import ProductCard from './ProductCard'
import { Listbox, Transition } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

const people = [
    { name: 'Wade Cooper' },
    { name: 'Arlene Mccoy' },
    { name: 'Devon Webb' },
    { name: 'Tom Cook' },
    { name: 'Tanya Fox' },
    { name: 'Hellen Schmidt' },
]

const category_types = [
    {
        title: "brands",
        data: [
            { id: 1, name: "dell" },
            { id: 2, name: "hp" },
            { id: 3, name: "asus" },
            { id: 4, name: "acer" },
            { id: 5, name: "lenovo" },
            { id: 6, name: "msi" },
            { id: 7, name: "apple" },
            { id: 8, name: "huawei" },
            { id: 9, name: "xiaomi" }
        ],
    },
    {
        title: "Processor Type",
        data: [
            {
                title: "intel",
                data: [
                    { id: 1, name: "Core i9 - 11th Generatin" },
                    { id: 2, name: "Core i7 - 11th Generatin" },
                    { id: 3, name: "Core i5 - 11th Generatin" },
                    { id: 4, name: "Core i3 - 11th Generatin" },
                    { id: 5, name: "Pentium - 11th Generatin" },
                    { id: 6, name: "Celeron" }
                ]
            },
            {
                title: "amd",
                data: [
                    { id: 1, name: "Athlon Silver" },
                    { id: 2, name: "Threadripper Pro 3995WX" },
                    { id: 3, name: "Epyc 7702P" },
                    { id: 4, name: "Ryzen 3" },
                    { id: 5, name: "Ryzen 5" },
                    { id: 6, name: "Ryzen 7" }
                ]
            }
        ]
    },
    {
        title: "Random Access Memory",
        data: [
            { id: 1, name: "4GB" },
            { id: 2, name: "8GB" },
            { id: 3, name: "16GB" },
            { id: 4, name: "32GB" },
            { id: 5, name: "64GB" }
        ]
    },
    {
        title: "Storage",
        data: [
            {
                title: "SSD",
                data: [
                    { id: 1, name: "180GB" },
                    { id: 2, name: "256GB" },
                    { id: 3, name: "512GB" },
                    { id: 4, name: "1TB" }
                ]
            },
            {
                title: "HDD",
                data: [
                    { id: 1, name: "500GB" },
                    { id: 2, name: "1TB" },
                    { id: 3, name: "2TB" }
                ]
            }
        ]
    },
    {
        title: "display",
        data: [
            {
                title: "resolutions",
                data: [
                    { id: 1, name: "HD (720p)" },
                    { id: 2, name: "FULLHD (1080P)" },
                    { id: 3, name: "2k (2560P)" },
                    { id: 4, name: "4k (3820P)" }
                ]
            },
            {
                title: "sizes",
                data: [
                    { id: 1, name: "15.6 inches" },
                    { id: 2, name: "14 inchches" },
                    { id: 3, name: "13 inches" }
                ]
            }
        ]
    },
    {
        title: "graphics",
        data: [
            {
                title: "AMD",
                data: [
                    { id: 1, name: "Radeon RX 6600M" },
                    { id: 2, name: "Radeon RX 6800M" },
                    { id: 3, name: "Integrated" }
                ]
            },
            {
                title: "NVDIA",
                data: [
                    { id: 1, name: "GeForce RTX 30 Series" },
                    { id: 2, name: "GeForce RTX 50 Series" },
                    { id: 3, name: "GeForce GTX Series" }
                ]
            },
            {
                title: "INTEL",
                data: [
                    { id: 1, name: "Integrated" }
                ]
            }
        ]
    }
]


function ListBox() {
    const [selected, setSelected] = useState(people[0])

    return (
        <div className="z-50 w-48">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded border border-gray-300 bg-white py-1 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate font-light">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <BsChevronExpand
                                className="h-4 w-4 text-gray-500"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {people.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-orange-400 text-amber-800' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {person.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <BsCheck className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}


export default function OneCategory() {

    const category_tree = ["Home", "pc & components", "laptop"];

    const urlParams = useParams();

    const [brandChecked, setBrandChecked] = useState([]);
    // const handleCheckBoxChange = ({ e: { currentTarget: { checked } }, item }) => item && setBrandChecked(prevs => prevs.map(prev => prev.id === item.id ? { ...prev, checked } : prev))

    const handleCheckBoxChange = ({ e: { currentTarget: { checked } }, item }) => setBrandChecked(prevs => {
        prevs.forEach(function update(category) {
            if ((item.id === category.id) && (item.name.toLocaleLowerCase() === category.name.toLocaleLowerCase()))
                category.checked = checked;
            Array.isArray(category.data) && category.data.forEach(update);
        })
        return prevs;
    });

    const [prices, setPrices] = useState({ min: "", max: "" });
    const handlePricesChange = ({ currentTarget }) => setPrices(prev => {
        const form = { ...prev };
        form[currentTarget["name"]] = currentTarget["value"];
        return form;
    });
    const handlePricesSubmit = (e) => {
        e.preventDefault();
        setPrices(prev => ({ ...prev, min: "", max: "" }));
    }



    useEffect(() => {
        // setBrandChecked(prev => [...brands.map(brand => ({ ...brand, checked: false }))]);
        setBrandChecked(() => {
            const temp = [...category_types];
            temp.splice(1, 0, { title: "prices", data: { min: "", max: "" } });
            return temp;
        });
    }, []);

    return (
        <div className='container mx-auto'>
            <div className='flex justify-between items-center mt-2'>
                <div className='mx-2 flex items-center'>
                    {
                        ["Home", urlParams.mainCategory, urlParams.subCategory, urlParams.product].map((cat, index, arr) => (
                            <div key={index} className="flex items-center">
                                <span className='font-light text-sm mr-1 cursor-pointer hover:text-orange-600 hover:underline'>{cat}</span>
                                {((arr.length - 1) !== index) && <span className='mr-2'><BsChevronRight /></span>}
                            </div>))
                    }
                    <span className='text-sm font-light text-gray-800 ml-14'>" 180 items found in laptops "</span>
                </div>
                <div className='mx-2 flex items-center'>
                    <span className='text-gray-500 text-sm mt-1 mx-2'>Sort By:</span>
                    <ListBox />
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='w-[18.2em] max-h-[91em] overflow-y-auto bg-white border border-gray-200 my-2 mx-1 p-5 rounded scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-md scrollbar-track-rounded-md'>
                    <div className='py-6 border-b border-b-gray-200'>
                        <span className='block my-1 text-sm font-semibold text-gray-600'>Related Category</span>
                        <span className='block text-sm font-light text-gray-500 hover:text-orange-500 hover:underline cursor-pointer'>monitors & components</span>
                    </div>
                    {
                        brandChecked.map((category, index, arr) => {
                            if (category.title.includes("price")) {
                                return <div key={index} className={`py-6 ${((arr.length - 1) !== index) && "border-b border-b-gray-200"}`}><PriceRange prices={prices} onChange={handlePricesChange} onSubmit={handlePricesSubmit} /></div>
                            } else if ("title" in category.data[0] && "data" in category.data[0]) {
                                return (
                                    <div key={index} className={`py-6 ${((arr.length - 1) !== index) && "border-b border-b-gray-200"}`}>
                                        <span className='text-sm text-gray-800 capitalize'>{category.title}</span>
                                        {category.data.map((cat, index2) => (<div key={index2} className='py-2'><CheckList title={cat.title} items={cat.data} onChange={handleCheckBoxChange} /></div>))}
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index} className={`py-6 ${((arr.length - 1) !== index) && "border-b border-b-gray-200"}`}>
                                        <span className='text-sm text-gray-800 capitalize'>{category.title}</span>
                                        <CheckList items={category.data} onChange={handleCheckBoxChange} />
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div className='grid grid-cols-4 gap-1'>
                    <ProductCard product={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]} />
                </div>
            </div>
            <div className='flex justify-center my-5'>
                <ul className='relative flex items-center bg-white p-1 rounded h-9'>
                    <li className='p-2 border border-gray-300 rounded m-[0.1em] bg-teal-600 h-full w-7  flex items-center justify-center cursor-pointer'>
                        <BsChevronDoubleLeft className='text-white font-bold' />
                    </li>
                    <li className='p-2 border border-gray-300 rounded m-[0.1em] text-sm font-light h-full w-7  flex items-center justify-center cursor-pointer'>1</li>
                    <li className='p-2 border border-teal-300 bg-teal-50 rounded m-[0.1em] text-sm font-light h-full w-7  flex items-center justify-center cursor-pointer'>2</li>
                    <li className='p-2 border border-gray-300 rounded m-[0.1em] text-sm font-light h-full w-7  flex items-center justify-center cursor-pointer'>3</li>
                    <li className='p-2 m-[0.1em] font-bold h-full w-7  flex items-center justify-center'>
                        <BsThreeDots />
                    </li>
                    <li className='p-2 border border-gray-300 rounded m-[0.1em] text-sm font-light h-full w-7  flex items-center justify-center cursor-pointer'>4</li>
                    <li className='p-2 border border-gray-300 rounded m-[0.1em] text-sm font-light h-full w-7  flex items-center justify-center cursor-pointer'>5</li>
                    <li className='p-2 border border-gray-300 rounded m-[0.1em] text-sm font-light h-full w-7  flex items-center justify-center cursor-pointer'>6</li>
                    <li className='p-2 border border-gray-300 rounded m-[0.1em] bg-teal-600 h-full w-7 flex items-center justify-center cursor-pointer'>
                        <BsChevronDoubleRight className='text-white font-bold' />
                    </li>
                </ul>
            </div>
        </div>
    )
}






function CheckList({ title, items, onChange }) {

    const [viewMore, setViewMore] = useState(false);

    return (
        <>
            {title && <span className='ml-2 text-sm font-light text-gray- capitalize'>{title}</span>}
            <ul className='mt-2 ml-2 h-fit'>
                {
                    items.map((item, index) => (index <= 4) && (
                        <li
                            key={index + 1}
                            className='flex items-center my-1'
                        >
                            <input onChange={(e) => onChange({ e, item })} type="checkbox" className='mr-2 w-[0.9em] h-[0.9em] default:border default:border-gray-100 checked:border p-1 checked:border-gray-200' />
                            <span className='font-light text-sm text-gray-600'>{item.name}</span>
                        </li>
                    ))
                }
                {
                    <AnimatePresence mode='wait'>
                        {
                            viewMore && (
                                <motion.div
                                    initial={{
                                        height: 0,
                                        opacity: 0
                                    }}

                                    animate={{
                                        height: "auto",
                                        opacity: 1,
                                        transition: {
                                            height: {
                                                duration: 0.3
                                            },
                                            opacity: {
                                                duration: 0.15,
                                                delay: 0.11,
                                            }
                                        }
                                    }}

                                    exit={{
                                        height: 0,
                                        opacity: 0,
                                        transition: {
                                            height: {
                                                duration: 0.3,
                                            },
                                            opacity: {
                                                duration: 0.15
                                            }
                                        }
                                    }}
                                >
                                    {
                                        items.map((item, index) => (index >= 5) && (
                                            <li
                                                key={index + 1}
                                                className='flex items-center my-1'
                                            >
                                                <input onChange={(e) => onChange({ e, item })} type="checkbox" className='mr-2 w-[0.9em] h-[0.9em] default:border default:border-gray-100 checked:border p-1 checked:border-gray-200' />
                                                <span className='font-light text-sm text-gray-600'>{item.name}</span>
                                            </li>
                                        ))
                                    }
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                }
                {
                    (items.length > 5) &&
                    (
                        <div className='flex justify-center items-center mt-3'>
                            <button onClick={() => setViewMore(prev => !prev)} className='text-xs font-light text-sky-700 capitalize outline-none'>view {viewMore ? "less" : "more"}</button>
                        </div>
                    )
                }
            </ul>

        </>
    );
}


function PriceRange({ prices, onChange, onSubmit }) {

    return (
        <>
            <span className='text-sm text-gray-800'>Prices</span>
            <form className='flex items-center justify-center w-fit mt-2'>
                <input type="number" value={prices["min"]} name="min" onChange={onChange} min={0} max={2000000} className='py-1 px-2 mr-2 border border-gray-300 rounded w-24 focus:outline-none text-gray-700 placeholder:font-light placeholder:text-sm placeholder:text-center' placeholder='min' />
                <input type="number" value={prices["max"]} name="max" onChange={onChange} min={0} max={2000000} className='py-1 px-2 mr-2 border border-gray-300 rounded w-24 focus:outline-none text-gray-700 placeholder:font-light placeholder:text-sm placeholder:text-center' placeholder='max' />
                <button type='submit' className='p-2' onClick={onSubmit}>
                    <span className='text-3xl'><BsFillCaretRightSquareFill className='text-sky-700' /></span>
                </button>
            </form>
        </>
    )
}