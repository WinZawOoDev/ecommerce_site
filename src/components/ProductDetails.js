import React, { useState } from 'react'
import { useImmer } from 'use-immer'
import { useParams } from 'react-router-dom'
import { BsChevronRight } from 'react-icons/bs'

export default function ProductDetails() {
    const urlParams = useParams();

    const [images, setImages] = useState([
        { id: 1, name: "image0", src: "/items/mouse.png", view: true },
        { id: 2, name: "image1", src: "/items/logi_1.jpg", view: false },
        { id: 3, name: "image2", src: "/items/logi_2.jpg", view: false },
        { id: 4, name: "image3", src: "/items/logi_3.jpg", view: false },
        { id: 5, name: "image4", src: "/items/logi_4.jpg", view: false },
    ]);

    const handleChangeImage = (currentImage) => setImages(prevs => prevs.map(prev => {
        if (prev.view === true)
            prev.view = false;
        return (prev.id === currentImage.id) ? { ...prev, view: true } : prev;
    }))

    return (
        <div className='container mx-auto'>
            <div className='mx-2 flex items-center'>
                {
                    ["Home", urlParams.mainCategory, urlParams.subCategory, urlParams.product].map((cat, index, arr) => (
                        <div key={index} className="flex items-center">
                            <span className='font-light text-sm mr-1 cursor-pointer hover:text-orange-600 hover:underline'>{cat}</span>
                            {((arr.length - 1) !== index) && <span className='mr-2'><BsChevronRight /></span>}
                        </div>))
                }
            </div>
            <div className='flex items-center bg-white my-2 p-2 rounded'>
                <ViewImage images={images} handleChangeImage={handleChangeImage} />
                <div className='border border-gray-400 h-96 w-1/2 m-1'></div>
                <div className='border border-gray-400 h-96 w-1/4 m-1'></div>
            </div>
        </div>
    )
}


function ViewImage({ images, handleChangeImage }) {

    const stateData = {
        visible: false,
        zoomLen: {
            width: 0,
            height: 0
        },
        offset: {
            x: 0,
            y: 0
        },
        img: {
            width: 0,
            height: 0
        },
        zoomLevel: 4.5
    };

    const [{ visible, zoomLen, offset, img, zoomLevel }, setState] = useImmer(stateData)

    const handleMouseMove = (event) => {
        const currentTarget = event.currentTarget;
        const { top, left } = currentTarget.getBoundingClientRect();
        const x = event.pageX - left - window.pageXOffset;
        const y = event.pageY - top - window.pageYOffset;
        setState(prev => {
            prev.offset.x = x;
            prev.offset.y = y;
        });
    };

    const handleMouseEnter = (event) => {
        const currentTarget = event.currentTarget;
        const { width, height } = currentTarget.getBoundingClientRect();
        setState(prev => {
            prev.visible = true;
            prev.zoomLen.width = 150;
            prev.zoomLen.height = 100;
            prev.img.width = width;
            prev.img.height = height;
        });
    }

    const handleMouseLeave = () => setState(prev => {
        prev.visible = false;
        prev.zoomLen.width = 0;
        prev.zoomLen.height = 0;
        prev.offset.x = 0;
        prev.offset.y = 0;
        prev.img.height = 0;
        prev.img.width = 0;
    });

    return (
        <div className='flex items-center justify-between h-auto w-3/5 m-1'>
            <div className='w-1/3 h-full pl-3'>
                {
                    images.map(image => (
                        <button key={image.id} onClick={() => handleChangeImage(image)} className={`border ${image.view === true ? "border-orange-500" : "border-gray-300"} m-1 rounded hover:shadow`}>
                            <img className='object-cover h-28 w-full' src={require(`../images${image.src}`)} />
                        </button>
                    ))
                }

            </div>
            <div className='relative m-1'>
                <img
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className='object-contain h-full w-full cursor-crosshair'
                    src={require(`../images${images.find(image => image.view === true)?.src}`)}
                />
                <div
                    style={{
                        top: `${offset.y - zoomLen.height / 2}px`,
                        left: `${offset.x - zoomLen.width / 2}px`,
                        width: `${zoomLen.width}px`,
                        height: `${zoomLen.height}px`,
                    }}
                    className={`absolute ${visible ? " opacity-25 " : " hidden opacity-0 "} bg-blue-300 border border-gray-100 rounded shadow-2xl cursor-crosshair pointer-events-none`}
                >
                </div>
            </div>
            <div
                className={`${!visible && "hidden"} absolute pointer-events-none right-[20em]  min-w-[45em] min-h-[45em] max-w-[45em] max-h-[45em] bg-no-repeat bg-cover bg-white z-50 border border-gray-300 rounded shadow-2xl overflow-hidden`}
                style={{
                    backgroundImage: `url('${require("../images" + images.find(image => image.view === true)?.src)}')`,
                    backgroundSize: `${img.width * zoomLevel}px ${img.height * zoomLevel}px`,
                    backgroundPositionX: `${(-offset.x * zoomLevel + zoomLen.width / 0.4)}px`,
                    backgroundPositionY: `${(-offset.y * zoomLevel + zoomLen.height / 0.3)}px`,
                }}
            >
            </div>
        </div >
    )

}
