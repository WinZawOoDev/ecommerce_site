import React, { useContext, useEffect, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { BsCreditCard, BsPaypal, BsFillCheckCircleFill, BsCashCoin, BsChevronDown, BsSim, BsPencilSquare } from 'react-icons/bs'
import { FaCcVisa, FaCcMastercard, FaCcJcb, FaGooglePay } from 'react-icons/fa'
import { useImmer } from 'use-immer';
import Stepper from './Stepper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CartViewContext } from './index'
import OrderSummary from './OrderSummary';

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
            if (value) { status = true };
        })

        return status;
    }

    const form = useFormik({
        initialValues: { name: "", number: "", expired: { month: "", year: "" }, cvc: "" },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(),
            number: Yup.number().integer().required(),
            expired: Yup.object({ month: Yup.string().required("month is a required field"), year: Yup.string().required("year is a required field") }),
            cvc: Yup.number("cvc must be number").integer("cvc must be number").required()
        }),
        onSubmit: handleFormSubmit
    });

    const [formResult, setFormResult] = useImmer({ values: {}, submited: false, edit: false });
    const isEmptyResult = () => Object.keys(formResult.values).length === 0;

    function handleFormSubmit(values) {
        console.log(values);
        setFormResult(prev => {
            prev.values = values
            if (!prev.edit) prev.submited = true;
            if (prev.edit) prev.edit = !prev.edit;
        });
        form.resetForm();
    }

    useEffect(() => {
        changeStepperState({ name: stepNames.payment, isFinished: true })
    }, [])


    function renderButtons() {

        const choosePaymentMethods = (partner) => setPaymentMethods(prev => {
            Object.entries(prev).forEach(([key, value]) => {
                if (value) {
                    prev[key] = !prev[key]
                    if (key !== partner) {
                        form.resetForm();
                        setFormResult(prev => {
                            prev.values = {};
                            prev.submited = false;
                            prev.edit = false;
                        });
                    };
                    return;
                };
            })
            prev[partner] = !prev[partner]
        });

        const Button = ({ paymentName, Icon }) => (
            <button onClick={() => choosePaymentMethods(paymentName)} className={`relative flex items-center justify-center border border-gray-300  h-14 w-16 rounded mx-2 ${paymentMethods[paymentName] && "border-orange-600"}`}>
                <span className={`absolute -top-2 -right-2  bg-white rounded-full opacity-0 transition duration-100 ease-in-out ${paymentMethods[paymentName] && "opacity-100"}`}>
                    <BsFillCheckCircleFill className='text-orange-700' />
                </span>
                <span className=''><Icon className='text-4xl' /></span>
            </button>
        )

        return (
            <div className='flex items-center mt-5'>
                {Object.entries(PAY_PARTNERS).map(([key, partner]) => <Button key={key} paymentName={partner.name} Icon={partner.Icon} />)}
            </div>
        )
    }

    function renderIcons() {
        let name;
        Object.entries(paymentMethods).forEach(([key, value]) => {
            if (value) {
                name = key;
                return;
            }
        })
        const Icon = name ? PAY_PARTNERS[name].Icon : <></>
        return <Icon className='text-5xl h-9 w-11' />
    }

    function renderForms() {

        const addSpace2Str = (string) => {
            if (string) {
                let count = 1;
                let newStr = "";
                string.split('').forEach((str) => {
                    newStr += str;
                    count++;
                    if (count === 5) {
                        newStr += " ";
                        count = 1;
                    }
                });
                return newStr;
            }
        }

        const inputs = () => (
            <div className='px-5 w-full'>
                <div className='relative mt-5 mb-7'>
                    <label htmlFor='name' className='block my-2 text-xs font-medium text-gray-800'>Name on Card</label>
                    <input type="text" name='name' onChange={form.handleChange} value={form.values.name} className='w-full border border-gray-200 focus-within:border-orange-600 outline-none pl-6 pr-4 py-2 rounded placeholder:text-sm placeholder:font-light' placeholder='eg.  John doe' />
                    <span className={`absolute left-0 -bottom-5 text-xs font-medium text-red-700 opacity-0 transition duration-100 ease-in-out ${(form.touched.name && form.errors.name) && "opacity-100"}`}>{form.errors.name}</span>
                </div>
                <div className='relative   mt-5 mb-7'>
                    <label htmlFor='number' className='block my-2 text-xs font-medium text-gray-800'>Card Number</label>
                    <div className='relative'>
                        <input type="text" name='number' onChange={form.handleChange} value={form.values.number} className='w-full border border-gray-200 focus-within:border-orange-600 outline-none pl-6 pr-14 py-2 rounded placeholder:text-sm placeholder:font-light' placeholder='eg. 4003 30803 983 0903' />
                        <span className='absolute right-1 inset-y-[3px] text-gray-400'>{renderIcons()}</span>
                        <span className={`absolute left-0 -bottom-5 text-xs font-medium text-red-700 opacity-0 transition duration-100 ease-in-out ${(form.touched.number && form.errors.number) && "opacity-100"}`}>{form.errors.number}</span>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className=''>
                        <span className='text-xs font-medium text-gray-800'>Expire date</span>
                        <div className='flex items-center mt-2'>
                            <div className='relative max-w-[25em]'>
                                <SelectBox placeholder="Month" name="expired.month" options={months} selectedValue={form.values.expired.month} onBlur={() => form.setFieldTouched("expired.month", true)} onChange={(value) => form.setFieldValue("expired.month", value)} />
                                <span className={`absolute block truncate left-0 -bottom-[1.8em] text-xs font-medium text-red-700 opacity-0 transition duration-100 ease-in-out ${(form.touched.expired?.month && form.errors.expired?.month) && "opacity-100"}`}>{form.errors.expired?.month}</span>
                            </div>
                            <div className='relative max-w-[25em] mx-4'>
                                <SelectBox placeholder="Year" name="expired.year" options={years} selectedValue={form.values.expired.year} onBlur={() => form.setFieldTouched("expired.year", true)} onChange={(value) => form.setFieldValue("expired.year", value)} />
                                <span className={`absolute block truncate left-0 -bottom-[1.8em] text-xs font-medium text-red-700 opacity-0 transition duration-100 ease-in-out ${(form.touched.expired?.year && form.errors.expired?.year) && "opacity-100"}`}>{form.errors.expired?.year}</span>
                            </div>
                        </div>
                    </div>
                    <div className='relative'>
                        <label htmlFor='cvc' className='block my-2 text-xs font-medium text-gray-800'>CVC</label>
                        <input type="text" name='cvc' onChange={form.handleChange} value={form.values.cvc} className='w-full border border-gray-200 focus-within:border-orange-600 outline-none pl-2 py-2 rounded placeholder:text-sm placeholder:font-light' placeholder='eg. 454' />
                        <span className={`absolute block truncate left-0 -bottom-5 text-xs font-medium text-red-700 opacity-0 transition duration-100 ease-in-out ${(form.touched.cvc && form.errors.cvc) && "opacity-100"}`}>{form.errors.cvc}</span>
                    </div>
                </div>
                <button onClick={form.handleSubmit} type='submit' className='py-2 my-7 w-full rounded-md bg-cyan-600 tracking-wide'>
                    <span className='uppercase text-sm text-white font-medium'>{formResult.edit ? "update" : "submit"}</span>
                </button>
            </div>
        )

        const result = () => (
            <div className='relative'>
                {!isEmptyResult() && <button onClick={() => { form.setValues(formResult.values); setFormResult(prev => { prev.edit = true }) }} className='absolute right-0 top-0'><BsPencilSquare className='text-xl text-cyan-700' /></button>}
                <div className='absolute inset-x-0 inset-y-0 m-auto w-96 h-52 bg-gray-100 rounded-lg shadow-lg'>
                    {/* <div className='absolute bg-gray-500 bg-opacity-75 inset-x-0 inset-y-0 m-auto h-full w-full rounded-lg z-10'></div> */}
                    <div className='relative'>
                        <div className='flex justify-between items-center mt-5 px-5'>
                            <div className='flex justify-center items-center border border-gray-100 bg-gray-50 h-8 w-12 rounded-md'>
                                <BsSim className='text-3xl text-gray-200 transform -rotate-90' />
                            </div>
                            <span className="block text-gray-700">{renderIcons()}</span>
                        </div>
                        <div className='flex justify-center items-center px-5'>
                            <div className='mt-2'>
                                <span className='block text-sm font-thin text-gray-600 mt-3 mb-1'>card number</span>
                                <span className='text-xl text-gray-700 tracking-widest font-medium font-mono'>{addSpace2Str(formResult.values?.number)}</span>
                            </div>
                        </div>
                        <div className='flex justify-between items-center mt-3'>
                            <div className='px-5'>
                                <span className='block text-xs font-thin text-gray-600 mt-3'>cardholder name</span>
                                <span className='text-gray-600 font-serif'>{formResult.values?.name}</span>
                            </div>
                            <div className='px-5'>
                                <span className='block text-xs font-thin text-gray-600 mt-3'>expiration</span>
                                <div className='flext items-center'>
                                    <span className='text-gray-600 font-serif'>{formResult.values?.expired?.month}</span>
                                    <span className='px-1 text-gray-500'>/</span>
                                    <span className='text-gray-500'>{formResult.values?.expired?.year}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <span className='absolute inset-x-0 inset-y-0 m-auto top-9 left-5 font-light text-2xl text-gray-800 z-20'>Please fill card information</span> */}
                </div>
            </div>
        )

        return (
            <div className='grid grid-cols-2 gap-x-4'>
                {inputs()}
                {result()}
            </div>
        )
    }

    const renderNoPaymentChoose = () => (
        <div className='flex justify-center items-center h-[19em] bg-gray-100 rounded-md'>
            <span className='text-base font-medium text-gray-600'>No payment choosen !</span>
        </div>
    )

    return (
        <div className='container mx-auto'>
            <div className='grid grid-cols-6 gap-x-2'>
                <div className='col-span-4'>
                    <div className='h-24 pt-3 bg-white rounded-t'>
                        <Stepper />
                    </div>
                    <div className='bg-white rounded p-5 mb-2 min-h-[40em] max-h-[40em]'>
                        <span className='text-xl text-gray-700 font-medium'>Payment</span>
                        <div className='p-5'>
                            <span className='font-light text-gray-700'>Choose payment methods</span>
                            {renderButtons()}
                            <div className='my-14'>
                                {isPaymentChoose() ? renderForms() : renderNoPaymentChoose()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-2'>
                    <OrderSummary checkout={{ disable: isEmptyResult() ? true : false, to: "confirm" }} />
                </div>
            </div>
        </div>
    )
}

function SelectBox({ placeholder, name, options, selectedValue, onBlur, onChange }) {

    return (
        <Listbox as="div" name={name} onBlur={onBlur} value={selectedValue} onChange={onChange}>
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
