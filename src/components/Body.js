import React, { useState } from 'react'
import { BsListUl } from 'react-icons/bs';
import { category_data } from '../dummyData/Categories';

export default function Body() {



    function topMostSection() {
        return (
            <div className='relative grid grid-cols-5 gap-1 divide-x-2'>
                {/* Category List */}
                <CategoryList data={category_data} />

                <div className='col-span-3 text-center flex justify-center'>
                    02
                </div>
                <div className='text-center'>
                    03
                </div>
            </div>

        )
    }


    return (
        <div className='container mx-auto'>
            {topMostSection()}

        </div>
    )
}


function CategoryList({ data }) {

    const [catActive, setCatActive] = useState({ status: false, index: null, des_act: false });

    const isCatActive = (index) => {
        if ((catActive.status && (catActive.index === index) && !catActive.des_act) ||
            (catActive.status && (catActive.index === index) && catActive.des_act))
            return true;
        else if (!catActive.status && !catActive.des_act)
            return false;
    }


    return (
        <div className="inline-flex">
            {/* <div className='relative'> */}
            <div className='relative w-full m-2 p-4 border border-gray-200 bg-white rounded-md shadow-sm'>
                {/* List title */}
                <div className='flex items-center my-2'>
                    <span className='text-2xl text-gray-900 font-semibold mx-2'><BsListUl /></span>
                    <span className='capitalize font-medium text-gray-600 text-lg'>categories</span>
                </div>
                <ul className='list-inside'>
                    {
                        data.map((category, index) => (
                            <li key={category.id}
                                onMouseEnter={(e) => setCatActive(prev => ({ ...prev, status: true, index }))}
                                onMouseLeave={(e) => setCatActive(prev => ({ ...prev, status: prev.des_act ? true : false, index: prev.des_act ? index : null }))}
                                className={`flex items-center my-1 py-1 cursor-pointer ${isCatActive(index) ? "border-b border-gray-200" : ""}`}
                            >
                                <span className={`mx-4 ${isCatActive(index) ? "text-orange-500 text-xl" : " text-gray-500 text-lg"} `}><category.Icon /></span>
                                <span className={`capitalize truncate ${isCatActive(index) ? 'text-orange-500 font-normal' : 'text-gray-800 font-light'}`}>{category.name}</span>
                                <div
                                    onMouseEnter={(e) => setCatActive(prev => ({ ...prev, status: true, index, des_act: true }))}
                                    onMouseLeave={(e) => setCatActive(prev => ({ ...prev, index, des_act: false }))}
                                    className={`absolute -right-4 transition ease-in-out duration-100 opacity-0 ${isCatActive(index) && "opacity-100"} bg-white h-6 w-6 z-50 border-b border-b-gray-200 border-l border-gray-200 -translate-x-3 -translate-y-0 rotate-45`}>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            {/* </div> */}
            <div
                onMouseLeave={(e) => setCatActive(prev => ({ ...prev, status: false, index: null, des_act: false }))}
                className={`absolute top-12 left-[288px] transition ease-in-out duration-100 opacity-0 ${catActive.status && 'opacity-100'}`}
            >
                <div className='shadow-lg border border-gray-200 rounded bg-white min-h-[40.9em] max-h-[40.9em] w-48'>
                    {/* <div  style={{top: `${pageAxis.pageY - 220}px`}} className={`absolute bg-white h-6 w-6 z-50 border-b border-b-gray-200 border-l border-gray-200 -translate-x-3 -translate-y-0 rotate-45`}></div> */}
                </div>
            </div>
        </div>
    )
}
