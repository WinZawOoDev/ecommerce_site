import React, { useState } from 'react'
import { BsEyeSlashFill, BsEyeFill, BsFacebook } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'


export function Input({ label, type, placeholder, name, value, onBlur, onChange, error, forgotPassword }) {

    const isPassType = (type) => type === "password";
    const [passInput, setPassInput] = useState({ eye: true, type: isPassType(type) ? type : "" });
    const handleShowPassword = (e) => {
        e.preventDefault()
        setPassInput(prev => ({ ...prev, eye: !prev.eye, type: isPassType(prev.type) ? "text" : "password" }))
    };


    return (
        <div className='relative my-6 mt-1'>
            <label className='block my-2 text-xs font-medium text-gray-700' htmlFor={name}>{label}</label>
            <input type={isPassType(type) ? passInput["type"] : type} name={name} placeholder={placeholder} value={value} onBlur={onBlur} onChange={onChange} className="border border-gray-200 rounded p-2 w-full placeholder:font-light placeholder:text-sm outline-none" />
            {(isPassType(type) || (passInput["type"] === "text")) && <button onClick={e => handleShowPassword(e)} className='absolute inset-y-9 my-auto right-3 outline-none text-gray-600'>{passInput["eye"] ? <BsEyeFill className='text-lg' /> : <BsEyeSlashFill className='text-lg' />}</button>}
            <span className={`absolute left-0 -bottom-5 text-red-600 text-xs opacity-0 transition duration-100 ease-in-out ${error && " opacity-100"}`}>{error}</span>
            {(isPassType(type) && forgotPassword) && <button className='absolute -bottom-6 right-1 text-xs text-cyan-600 outline-none underline tracking-wide font-light'>forgot password</button>}
        </div>
    )
}


export function Button({ title, onClick }) {
    return (
        <button type='submit' onClick={onClick} className='py-2 border border-gray-100 bg-orange-600 w-full rounded-md my-6'>
            <span className='text-gray-900 font-medium tracking-wide'>{title}</span>
        </button>
    )
}


export function WithSocial({ title }) {
    return (
        <>
            <div className='relative text-center h-[0.05em] bg-gray-300 flex justify-center items-center my-4'>
                <span className='absolute h-5 bg-white inset-y-0 my-auto -top-[0.1em] px-5 text-sm font-light'>{title}</span>
            </div>
            <div className='flex justify-center items-center py-5'>
                <button onClick={(e) => e.preventDefault()} className='mx-3 outline-none'>
                    <BsFacebook className='text-3xl text-[#3B5998]' />
                </button>
                <button onClick={e => e.preventDefault()} className='mx-3 outline-none'>
                    <FcGoogle className='text-3xl text-gray-700' />
                </button>
            </div>
        </>
    )
}


