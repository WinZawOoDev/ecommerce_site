import React, { useContext } from 'react'
import { CartViewContext } from './index'

export default function Stepper() {

    const { steps } = useContext(CartViewContext);

    const Step = ({ isFirst, name, isFinished }) => {
        return (
            <li className={`relative w-1/2 text-center text-sm font-light italic ${isFirst ? `after:content-['\\2713'] after:text-center after:flex after:justify-center after:items-center after:text-gray-100 after:shadow-2xl after:pr-1 after:text-xl after:font-bold after:absolute after:left-[45%] after:top-[195%] after:w-5 after:h-5 after:bg-gray-300  after:rounded-full after:z-40 ${isFinished && "after:bg-orange-600"}` : `before:content-[''] before:absolute before:left-[-50%] before:top-[calc(200%+0.5rem)] before:w-full before:h-[2px] before:bg-gray-300 after:content-['\\2713'] after:text-center after:flex after:justify-center after:items-center after:text-gray-100 after:shadow-2xl after:pr-1 after:text-xl after:font-bold  after:absolute after:left-[45%] after:top-[195%] after:w-5 after:h-5 after:bg-gray-300 after:rounded-full after:z-40 ${isFinished && "before:bg-orange-600 after:bg-orange-600"}`}`}>
                {name}
            </li>
        )
    }

    return (
        <nav className='relative'>
            <ol className="flex justify-between items-center w-full relative">
                {steps.map((step, index) => <Step key={step.id} isFirst={index === 0 ? true : false} name={step.name} isFinished={step.isFinished} />)}
            </ol>
        </nav>
    )
}
