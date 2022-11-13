import React, { useContext } from 'react'
import { useImmer } from 'use-immer'
import { useParams } from 'react-router-dom'
import { BsChevronRight, BsStar, BsStarFill, BsHeart, BsHeartFill, BsShare } from 'react-icons/bs'
import { AppContext } from '../App';

export default function ProductDetails() {
    const urlParams = useParams();
    const { wishList, setWishList } = useContext(AppContext);

    const [product, setProduct] = useImmer({
        id: 1,
        name: "logiTech G502 mouse",
        total: 10,
        images: [
            { id: 1, name: "image0", src: "/items/mouse.png", view: true },
            { id: 2, name: "image1", src: "/items/logi_1.jpg", view: false },
            { id: 3, name: "image2", src: "/items/logi_2.jpg", view: false },
            { id: 4, name: "image3", src: "/items/logi_3.jpg", view: false },
            { id: 5, name: "image4", src: "/items/logi_4.jpg", view: false },
        ]
    });

    const handleChangeImage = (currentImage) => setProduct(prev => {
        const prevView = prev.images.findIndex(img => img.view === true);
        if (prevView !== -1) prev.images[prevView].view = false;
        const index = prev.images.findIndex(img => img.id === currentImage.id);
        if (index !== -1) prev.images[index].view = true;
    });


    const [qty, setQty] = useImmer({ current: 0, avaiable: product.total });
    const noQty = qty.current === 0;
    const itmNotAvaiable = qty.current === product.total;

    const decreQty = () => {
        if (noQty) return;
        setQty(prevQty => {
            prevQty.current--;
            prevQty.avaiable++;
        });
    }

    const increQty = () => {
        if (itmNotAvaiable) return;
        setQty(prevQty => {
            prevQty.current++;
            prevQty.avaiable = product.total - prevQty.current;
        });
    }


    const handleWishList = () => setWishList(prev => {
        const index = prev.findIndex(list => (list.id === product.id) && (list.name === product.name));
        if (index)
            prev.push({ id: product.id, name: product.name });
        else
            if (index !== -1) prev.splice(index, 1);
    });


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
                <ViewImage images={product.images} handleChangeImage={handleChangeImage} />
                <div className='w-1/2 m-1'>
                    <div className='border-b border-b-gray-300 pb-5'>
                        <p className='block text-xl font-semibold text-gray-800'>Logitech G502 Lightspeed Wireless Gaming Mouse with Hero 25K Sensor, PowerPlay Compatible, Tunable Weights and Lightsync RGB - Black</p>
                        <div className='flex items-center mt-4'>
                            <div className='flex items-center mr-3'>
                                <BsStarFill className='mx-[0.9px] text-yellow-600 text-lg' />
                                <BsStarFill className='mx-[0.9px] text-yellow-600 text-lg' />
                                <BsStarFill className='mx-[0.9px] text-yellow-600 text-lg' />
                                <BsStarFill className='mx-[0.9px] text-yellow-600 text-lg' />
                                <BsStar className='mx-[0.9px] text-lg' />
                            </div>
                            <div className='text-center'>
                                <span className="font-light">140 rating</span>
                                <span className='mx-2 text-xl font-thin'>|</span>
                                <span className='font-light'>200 answers and questions</span>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <span className='mr-2 font-thin text-sm'>Brand :</span>
                            <span className='font-light text-sm'>Logitech</span>
                        </div>
                    </div>
                    <div className='py-5'>
                        <div className='flex items-center justify-between'>
                            <div className='text-orange-500 text-xl'>
                                <span className='mr-4'>MMK</span>
                                <span className='font-medium'>1500,000</span>
                            </div>
                            <div className='flex items-center text-gray-600'>
                                <button onClick={() => handleWishList()}>
                                    {wishList.find(list => (list.id === product.id) && (list.name === product.name)) ? <BsHeartFill className='text-2xl' /> : <BsHeart className='text-2xl' />}
                                </button>
                                <button><BsShare className='ml-6 text-2xl' /></button>
                            </div>
                        </div>
                        <div className='my-5'>
                            <span className='font-light text-sm block text-gray-600'>Quantity : </span>
                            <div className='flex items-center mt-2'>
                                <button onClick={() => decreQty()} className={`px-6 border border-gray-300 rounded text-2xl text-gray-500 outline-none transition duration-500 ease-in-out ${noQty && "cursor-default border-gray-100 text-gray-200"}`}>-</button>
                                <span className='mx-3 text-2xl text-gray-700'>{qty.current}</span>
                                <button onClick={() => increQty()} className={`px-6 border border-gray-300 rounded text-2xl text-gray-500 outline-none transition duration-500 ease-in-out ${itmNotAvaiable && "cursor-default border-gray-100 text-gray-200"}`}>+</button>
                                <span className={`mx-5 font-thin ${itmNotAvaiable && "line-through"}`}>{itmNotAvaiable ? "no" : qty.avaiable} items aviables</span>
                            </div>
                        </div>
                    </div>
                    <div className='my-2'>
                        <button className={`px-6 py-2 mr-5 bg-red-700 rounded-md border border-gray-200 shadow-sm outline-none transition duration-500 ease-in-out ${noQty && "bg-red-200 border-gray-50 cursor-default"}`}>
                            <span className='text-white font-semibold'>Buy Now</span>
                        </button>
                        <button className={`px-6 py-2 ml-5 bg-orange-500 rounded-md border border-gray-200 shadow-sm outline-none transition duration-500 ease-in-out ${noQty && "bg-orange-200 border-gray-50 cursor-default"}`}>
                            <span className='text-white font-semibold'>Add to Cart</span>
                        </button>
                    </div>
                </div>
                <div className=' h-96 w-1/4 m-1'>

                </div>
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
