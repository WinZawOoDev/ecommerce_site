import React from 'react'
import moment from 'moment'
import { BsFacebook, BsApple, BsTelephone, BsEnvelope, BsCreditCard, BsPaypal } from 'react-icons/bs'
import { FaViber, FaTwitter, FaTelegramPlane, FaGooglePlay, FaCcVisa, FaCcMastercard, FaCcJcb, FaGooglePay } from 'react-icons/fa'


const data_list = [
    {
        id: 1,
        title: "Customer services",
        list: ["help center", "report abuse", "file a case", "policies & rules", "get padi for your feedback"]
    },
    {
        id: 2,
        title: "About",
        list: ["About us", "Carriers", "News & Letters", "Our Story", "Site Map"]
    },
    {
        id: 3,
        title: "Colaborate us",
        list: ["Partnership", "Ds Center"]
    },
    {
        id: 4,
        title: "Follow us",
        list: [
            <div className='my-3'>
                <BsFacebook className='text-3xl text-gray-200' />
            </div>,
            <div className='my-3'>
                <FaTwitter className='text-3xl text-gray-200' />
            </div>,
            <div className='my-3'>
                <FaViber className='text-3xl text-gray-200' />
            </div>,
            <div className='my-3'>
                <FaTelegramPlane className='text-3xl text-gray-200' />
            </div>
        ]
    }
]

export default function Footer() {
    return (
        <footer className='absolute w-full bg-gray-900 mt-3 p-5'>
            <div className='container mx-auto'>
                <div className='text-center mb-10'>
                    <span className='block text-gray-300 text-sm font-medium my-3'>Delivering the latest product trends and industry news straight to your inbox</span>
                    <div className='flex justify-center items-center'>
                        <input className='w-80 h-10 pl-6 border border-gray-200 focus:outline-none bg-gray-300 -ml-14 mr-5 rounded-md  placeholder:text-gray-700 placeholder:font-light placeholder:text-sm' placeholder='Your Mail' />
                        <button className='bg-gray-400 py-[0.6em] px-2 rounded capitalize text-gray-700 font-medium text-sm'>subscribe</button>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='grid grid-cols-4 gap-x-32 gap-y-5'>
                        {
                            data_list.map(data => (
                                <div key={data.id} className='w-56 flex justify-center'>
                                    <div className='px-5'>
                                        <span className='text-gray-300 font-semibold'>{data.title}</span>
                                        <ul className='mt-3'>
                                            {
                                                data.list.map(d => <li className='text-gray-200 text-sm font-light my-[0.3em] cursor-pointer hover:underline hover:text-orange-500'>{d}</li>)
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }
                        <div className='col-span-2 px-5'>
                            <div className='w-fit'>
                                <div className='text-center'>
                                    <span className='text-gray-200 font-medium'>Download app</span>
                                </div>
                                <div className='flex items-center mt-2'>
                                    <button className='flex items-center bg-black border border-gray-200 px-2 py-[0.8px] rounded-md mr-2'>
                                        <span className='block mr-2'><BsApple className='text-3xl text-white' /></span>
                                        <div className='mt-1 text-left'>
                                            <span className='block text-gray-50 text-xs font-thin'>Download on the </span>
                                            <span className='block text-gray-50 text-md font-medium'>App Store</span>
                                        </div>
                                    </button>
                                    <button className='flex items-center bg-black border border-gray-200 px-2 py-[0.8px] rounded-md'>
                                        <span className='block mr-2'><FaGooglePlay className='text-3xl text-white' /></span>
                                        <div className='mt-1 text-left'>
                                            <span className='block text-gray-50 text-xs font-thin'>Get it on the</span>
                                            <span className='block text-gray-50 text-md font-medium'>Play Store</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-2 px-14'>
                            <span className='block text-gray-200 font-medium'>Contact</span>
                            <div className='flex items-center mt-2 mb-2'>
                                <span className='mr-3'><BsTelephone className='text-gray-100 text-xl' /></span>
                                <span className='text-gray-100 font-light text-sm'>+959099802</span>
                            </div>
                            <div className='flex items-center mt-1'>
                                <span className='mr-3'><BsEnvelope className='text-gray-100 text-xl' /></span>
                                <span className='text-gray-100 font-light text-sm cursor-pointer'>service@mail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-center mt-5'>
                    <span className='block text-gray-300 font-light text-sm'>Payment Partners</span>
                    <div className='flex items-center justify-center mt-2 mb-5'>
                        <span className='m-1 cursor-pointer'><FaCcVisa className='text-3xl text-gray-300' /></span>
                        <span className='m-1 cursor-pointer'><FaCcMastercard className='text-3xl text-gray-300' /></span>
                        <span className='m-1 cursor-pointer'><BsPaypal className='text-3xl text-gray-300' /></span>
                        <span className='m-1 cursor-pointer'><BsCreditCard className='text-3xl text-gray-300' /></span>
                        <span className='m-1 cursor-pointer'><FaCcJcb className='text-3xl text-gray-300' /></span>
                        <span className='m-1 cursor-pointer'><FaGooglePay className='text-3xl text-gray-300' /></span>
                    </div>

                    <div className='flex items-center justify-center mt-10 -mb-2'>
                        <span className='text-gray-100 text-sm font-light'>Copyright</span>
                        <span className='mx-2 text-gray-100 text-3xl font-light'>&#169;</span>
                        <span className='mr-2 text-gray-100 text-sm font-light'>{moment().format('YYYY')}</span>
                        <span className='text-gray-100 text-sm font-light'>ecommercesite.com.mm</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
