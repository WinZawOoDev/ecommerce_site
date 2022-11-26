import React, { useState, useContext, useEffect } from 'react'
import { Listbox } from '@headlessui/react'
import { BsCreditCard, BsPaypal, BsFillCheckCircleFill, BsCashCoin, BsChevronDown, BsCheckCircle, BsCheck } from 'react-icons/bs'
import { FaCcVisa, FaCcMastercard, FaCcJcb, FaGooglePay } from 'react-icons/fa'
import { useImmer } from 'use-immer';
import Stepper from './Stepper'
import { CartViewContext } from './index'

const PAY_PARTNERS = {
    visa: {
        name: "visa",
        Icon: FaCcVisa
    },
    master: {
        name: "master",
        Icon: FaCcMastercard
    },
    paypal: {
        name: "paypal",
        Icon: BsPaypal
    },
    credit: {
        name: "credit",
        Icon: BsCreditCard
    },
    jcb: {
        name: "jcb",
        Icon: FaCcJcb
    },
    google: {
        name: "google",
        Icon: FaGooglePay
    },
    cashOnDeli: {
        name: "cashOnDeli",
        Icon: BsCashCoin
    }
};

const months = Array.from({ length: 12 }, (item, i) => new Date(0, i).toLocaleString('en-US', { month: "long" }));

const years = ["2022", "2023", "2024", "2025", "2026", "2027"]


export default function Payment() {

    const { changeStepperState, stepNames } = useContext(CartViewContext);

    const [paymentMethods, setPaymentMethods] = useImmer({
        [PAY_PARTNERS.visa.name]: false,
        [PAY_PARTNERS.master.name]: false,
        [PAY_PARTNERS.paypal.name]: false,
        [PAY_PARTNERS.credit.name]: false,
        [PAY_PARTNERS.jcb.name]: false,
        [PAY_PARTNERS.google.name]: false,
        [PAY_PARTNERS.cashOnDeli.name]: false
    });

    const isPaymentChoose = () => {
        let status = false;
        Object.entries(paymentMethods).forEach(([key, value]) => {
            if (value) status = true;
        })

        return status;
    }

    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");


    function renderButtons() {

        const choosePaymentMethods = (partner) => setPaymentMethods(prev => {
            Object.entries(prev).forEach(([key, value]) => {
                if (value) {
                    prev[key] = !prev[key]
                    return;
                };
            })
            prev[partner] = !prev[partner]
        });

        const button = (paymentName, Icon) => (
            <button onClick={() => choosePaymentMethods(paymentName)} className={`relative flex items-center justify-center border border-gray-300  h-14 w-16 rounded mx-2 ${paymentMethods[paymentName] && "border-orange-600"}`}>
                <span className={`absolute -top-2 -right-2  bg-white rounded-full opacity-0 transition duration-100 ease-in-out ${paymentMethods[paymentName] && "opacity-100"}`}>
                    <BsFillCheckCircleFill className='text-orange-700' />
                </span>
                <span className=''><Icon className='text-4xl' /></span>
            </button>
        )

        return (
            <div className='flex items-center mt-5'>
                {button(PAY_PARTNERS.visa.name, PAY_PARTNERS.visa.Icon)}

                {button(PAY_PARTNERS.master.name, PAY_PARTNERS.master.Icon)}

                {button(PAY_PARTNERS.paypal.name, PAY_PARTNERS.paypal.Icon)}

                {button(PAY_PARTNERS.credit.name, PAY_PARTNERS.credit.Icon)}

                {button(PAY_PARTNERS.jcb.name, PAY_PARTNERS.jcb.Icon)}

                {button(PAY_PARTNERS.google.name, PAY_PARTNERS.google.Icon)}

                {button(PAY_PARTNERS.cashOnDeli.name, PAY_PARTNERS.cashOnDeli.Icon)}
            </div>
        )
    }

    useEffect(() => {
        changeStepperState({ name: stepNames.payment, isFinished: true })
    }, [])

    function renderIcons() {
        let name;
        Object.entries(paymentMethods).forEach(([key, value]) => {
            if (value) {
                name = key;
                return;
            }
        })
        const Icon = name ? PAY_PARTNERS[name].Icon : <></>
        return <Icon className='absolute text-5xl right-1 inset-y-[3px] h-9 w-11 text-gray-400' />
    }

    function renderForms() {
        return (
            <div className='m-5 grid grid-cols-2 gap-x-4'>
                <div className='px-5 max-w-[40em]'>
                    <div className='relative my-5'>
                        <label className='block my-2 text-xs font-medium text-gray-800'>Name on Card</label>
                        <input type="text" className='w-full border border-gray-200 focus-within:border-orange-600 outline-none pl-6 pr-4 py-2 rounded placeholder:text-sm placeholder:font-light' placeholder='eg.  John doe' />
                    </div>
                    <div className='relative  my-5'>
                        <label className='block my-2 text-xs font-medium text-gray-800'>Card Number</label>
                        <div className='relative'>
                            <input type="text" className='w-full border border-gray-200 focus-within:border-orange-600 outline-none pl-6 pr-14 py-2 rounded placeholder:text-sm placeholder:font-light' placeholder='eg. 4003 30803 983 0903' />
                            {renderIcons()}
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className=''>
                            <span className='text-xs font-medium text-gray-800'>Expire date</span>
                            <div className='flex items-center mt-2'>
                                <div className='relative max-w-[25em]'>
                                    <SelectBox placeholder="Month" options={months} selectedValue={month} onChange={setMonth} />
                                </div>
                                <div className='relative max-w-[25em] mx-4'>
                                    <SelectBox placeholder="Year" options={years} selectedValue={year} onChange={setYear} />
                                </div>
                            </div>
                        </div>
                        <div className='relative'>
                            <label className='block my-2 text-xs font-medium text-gray-800'>CVC</label>
                            <input type="text" className='w-full border border-gray-200 focus-within:border-orange-600 outline-none pl-6 py-2 rounded placeholder:text-sm placeholder:font-light' placeholder='eg. 454' />
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        )
    }

    const renderNoPaymentChoose = () => (
        <div className='flex justify-center items-center h-[20em] bg-gray-100 rounded-md  mt-3'>
            <span className='text-base font-medium text-gray-600'>No payment choosen !</span>
        </div>
    )

    return (
        <div className='container mx-auto'>
            <div className='bg-white rounded-t'>
                <div className='h-20 pt-3'>
                    <Stepper />
                </div>
            </div>
            <div className='p-5 bg-white round'>
                <span className='text-xl text-gray-700 font-medium'>Payment</span>
                <div className='p-5'>
                    <span className='font-light text-gray-700'>Choose payment methods</span>
                    {renderButtons()}
                    {isPaymentChoose() ? renderForms() : renderNoPaymentChoose()}
                </div>
            </div>
        </div>
    )
}

function SelectBox({ placeholder, options, selectedValue, onChange }) {

    return (
        <Listbox value={selectedValue} onChange={onChange}>
            <Listbox.Button className="relative w-full cursor-default border border-gray-200 rounded py-2 pl-6 pr-16 text-left  focus-within:border-orange-500">
                {selectedValue ?
                    <span className="block truncate text-sm text-gray-700">{selectedValue}</span>
                    :
                    <span className='block text-sm text-gray-400 font-light'>{placeholder}</span>
                }
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <BsChevronDown
                        className="text-base font-light text-gray-400"
                        aria-hidden="true"
                    />
                </span>
            </Listbox.Button>
            <Listbox.Options className="absolute z-50 bg-white rounded-b-md w-full shadow-lg border-b border-x border-gray-200 py-2 max-h-[15em] overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-md scrollbar-track-rounded-md">
                {options.map((option) => (
                    <Listbox.Option
                        key={option}
                        value={option}
                        className={({ active }) => `text-sm font-light py-1 pl-6 cursor-default ${active && "bg-orange-500 text-white font-medium"}`}
                    >
                        {option}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    )
}
