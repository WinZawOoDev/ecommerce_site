import React, { useContext, useState } from 'react'
import { useImmer } from 'use-immer'
import { useParams } from 'react-router-dom'
import {
    BsChevronRight,
    BsStar,
    BsStarFill,
    BsHeart,
    BsHeartFill,
    BsShare,
    BsFillGeoAltFill,
    BsCashStack,
    BsQuestionCircle,
    BsFillReplyFill,
    BsShieldCheck,
    BsPersonCircle
} from 'react-icons/bs'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import { AppContext } from '../App';
import { products } from '../dummyData/Products';

export default function ProductDetails() {
    const urlParams = useParams();
    const { checkWishList, addToWishList, addToCart } = useContext(AppContext);

    const [product, setProduct] = useImmer(products[0]);

    const [similarItem, setSimilarItem] = useState([
        { id: 1, img: "/items/similar/itm_1.png", dsc: "Logitech G203 LIGHTSYNC Wired Gaming Mouse - Black" },
        { id: 2, img: "/items/similar/itm_2.png", dsc: "Lightweight and portable—with smooth scrolling, sculpted comfortable design and dongle" },
        { id: 3, img: "/items/similar/itm_3.png", dsc: "Alienware Tri-Mode Wireless Gaming Mouse - AW720M" },
        { id: 4, img: "/items/similar/itm_4.png", dsc: "Logitech M190 Full-Size Wireless Mouse" }
    ]);

    const handleChangeImage = (currentImage) => setProduct(prev => {
        const prevView = prev.images.findIndex(img => img.view === true);
        if (prevView !== -1) prev.images[prevView].view = false;
        const index = prev.images.findIndex(img => img.id === currentImage.id);
        if (index !== -1) prev.images[index].view = true;
    });


    const [qty, setQty] = useImmer({ current: 0, avaiable: product.total });
    const noQty = qty.current === 0;
    const itmNotAvaiable = qty.avaiable === 0;

    const decreQty = () => {
        if (noQty) return;
        setQty(prevQty => {
            prevQty.current--;
        });
    }

    const increQty = () => {
        if (itmNotAvaiable) return;
        setQty(prevQty => {
            if (prevQty.current < prevQty.avaiable)
                prevQty.current++;
        });
    }

    const handleAddToWishList = () => addToWishList({ id: product.id, name: product.name });

    const handleAddToCart = () => {
        if (!noQty && !itmNotAvaiable) {
            addToCart({ id: product.id, name: product.name, qty: qty.current });
            setQty(prevQty => {
                prevQty.avaiable = prevQty.avaiable - prevQty.current;
                prevQty.current = 0;
            });
        }
    };

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
                        <p className='block text-xl font-semibold text-gray-800'>{product.description}</p>
                        <div className='flex items-center mt-4'>
                            <div className='flex items-center mr-3'>
                                <BsStarFill className='mx-[2px] text-yellow-600 text-lg' />
                                <BsStarFill className='mx-[2px] text-yellow-600 text-lg' />
                                <BsStarFill className='mx-[2px] text-yellow-600 text-lg' />
                                <BsStarFill className='mx-[2px] text-yellow-600 text-lg' />
                                <BsStar className='mx-[2px] text-lg' />
                            </div>
                            <div className='text-center'>
                                <span className="font-light">{product.rating} rating</span>
                                <span className='mx-2 text-xl font-thin'>|</span>
                                <span className='font-light'>{product.qa}</span>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <span className='mr-2 font-thin text-sm'>Brand :</span>
                            <span className='font-light text-sm capitalize'>{product.brand}</span>
                        </div>
                    </div>
                    <div className='py-5'>
                        <div className='flex items-center justify-between'>
                            <div className='text-orange-500 text-xl'>
                                <span className='mr-4'>MMK</span>
                                <span className='font-medium'>{product.price}</span>
                            </div>
                            <div className='flex items-center text-gray-600'>
                                <button onClick={() => handleAddToWishList()}>
                                    {checkWishList({ id: product.id, name: product.name }) ? <BsHeartFill className='text-2xl' /> : <BsHeart className='text-2xl' />}
                                </button>
                                <button><BsShare className='ml-6 text-2xl' /></button>
                            </div>
                        </div>
                        <div className='my-5'>
                            <span className='font-light text-sm block text-gray-600'>Quantity : </span>
                            <div className='flex items-center mt-2'>
                                <button onClick={() => decreQty()} className={`px-6 border border-gray-300 rounded text-2xl text-gray-500 outline-none transition duration-500 ease-in-out ${noQty && "cursor-default border-gray-100 text-gray-200"}`}>-</button>
                                <span className={`mx-3 text-2xl text-gray-700 transition duration-500 ease-in-out ${itmNotAvaiable && "text-gray-400"}`}>{qty.current}</span>
                                <button onClick={() => increQty()} className={`px-6 border border-gray-300 rounded text-2xl text-gray-500 outline-none transition duration-500 ease-in-out ${(itmNotAvaiable || (qty.current === qty.avaiable)) && "cursor-default border-gray-100 text-gray-200"}`}>+</button>
                                <span className={`mx-5 font-thin ${itmNotAvaiable && "line-through"}`}>{itmNotAvaiable ? "no" : qty.avaiable} items aviables</span>
                            </div>
                        </div>
                    </div>
                    <div className='my-2'>
                        <button className={`px-6 py-2 mr-5 bg-red-700 rounded-md border border-gray-200 shadow-sm outline-none transition duration-500 ease-in-out ${(noQty || itmNotAvaiable) && "bg-red-200 border-gray-50 cursor-default"}`}>
                            <span className='text-white font-semibold'>Buy Now</span>
                        </button>
                        <button onClick={() => handleAddToCart()} className={`px-6 py-2 ml-5 bg-orange-500 rounded-md border border-gray-200 shadow-sm outline-none transition duration-500 ease-in-out ${(noQty || itmNotAvaiable) && "bg-orange-200 border-gray-50 cursor-default"}`}>
                            <span className='text-white font-semibold'>Add to Cart</span>
                        </button>
                    </div>
                </div>
                <div className='w-1/4 m-1 px-5'>
                    <div className='border border-gray-300  rounded'>
                        <div className='border-b border-gray-300 flex items-center justify-between p-2'>
                            <div className='m-1'>
                                <span className='block capitalize text-xs text-gray-700'>delivery</span>
                                <div className='flex items-center'>
                                    <BsFillGeoAltFill className='text-lg text-gray-600' />
                                    <div className='text-sm font-thin m-2'>
                                        <p>Yangon, Yangon City </p>
                                        <p>Hlaing township</p>
                                    </div>
                                </div>
                            </div>
                            <span className='block uppercase text-xs text-cyan-600 cursor-pointer font-medium'>change</span>
                        </div>
                        <div className='border-b border-gray-300 flex items-center justify-between p-2'>
                            <div className='m-1'>
                                <div className='my-2'>
                                    <div className='flex items-center'>
                                        <AiOutlineFieldTime className='text-xl text-gray-700' />
                                        <span className='text-xs font-light block ml-2'>Delivery Standard Time</span>
                                    </div>
                                    <span className='text-xs font-thin block mt-1 ml-7'> 4 - 7 Days</span>
                                </div>
                                <div className='flex my-2 items-center'>
                                    <BsCashStack className='text-xl text-gray-700' />
                                    <span className='text-xs font-light block ml-2'>Cash on Delivery availables</span>
                                </div>
                            </div>
                            <span className='block uppercase text-sm text-gray-600 font-medium'>2,500ks</span>
                        </div>
                        <div className='border-b border-gray-300 flex justify-between p-2'>
                            <div className='m-1'>
                                <span className='text-sm font-thin'>Service</span>
                                <div className='mb-2 mt-1'>
                                    <div className='flex items-center'>
                                        <BsFillReplyFill className='text-2xl text-gray-600' />
                                        <span className='text-xs font-light block ml-2'>7 days return</span>
                                    </div>
                                </div>
                                <div className='flex mb-2 mt-3 items-center'>
                                    <BsShieldCheck className='text-xl text-gray-700' />
                                    <span className='text-xs font-light block ml-2'>1 year warranty by supplier</span>
                                </div>
                            </div>
                            <span className='block mt-3 uppercase text-sm text-gray-600 font-medium'><BsQuestionCircle /></span>
                        </div>
                        <div className='p-2'>
                            <div className='m-1 flex justify-between'>
                                <div>
                                    <span className='text-sm font-thin'>Sold By</span>
                                    <span className='block capitalize text-sm text-gray-700 mt-2'>tech accessories vendors</span>
                                </div>
                                <div className='mt-3'>
                                    <button className='block text-sm text-gray-600 '><BsQuestionCircle /></button>
                                    <button ><HiOutlineChatBubbleLeftRight className='text-cyan-600 text-2xl mt-2 -ml-1' /></button>
                                </div>
                            </div>
                            <hr className='m-3' />
                            <div className='flex justify-between  mx-1 pb-2'>
                                <div className='relative py-3 text-center min-h-[5.5em]'>
                                    <span className='block text-xs text-gray-500 capitalize'>customer's positive reviews</span>
                                    <span className='block absolute bottom-0 inset-x-0 text-gray-600 font-light'>90%</span>
                                </div>
                                <div className='relative p-3 text-center min-h-[5.5em]'>
                                    <span className='block text-xs text-gray-500 capitalize'>ship on time</span>
                                    <span className='block absolute bottom-0 inset-x-0 text-gray-600 font-light'>85%</span>
                                </div>
                                <div className='relative py-3 text-center min-h-[5.5em]'>
                                    <span className='block text-xs text-gray-500 capitalize'>response</span>
                                    <span className='block absolute bottom-0 inset-x-0 text-gray-600 font-light'>100%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-5 gap-y-2 mt-2'>
                <div className=' col-span-4 mr-1 '>
                    <div className='mb-2'>
                        <span className='mx-2 text-lg font-medium text-gray-700'>Product Details</span>
                        <div className='bg-white mt-2 px-5 py-1 rounded'>
                            {
                                product.details.features.map(feature => (
                                    <div key={feature.id} className='w-full my-10 flex items-center'>
                                        <div className='w-1/2'>
                                            <span className='capitalize'>{feature.name}</span>
                                        </div>
                                        <div className='w-1/2 px-5'>
                                            <span className='text-gray-500 text-sm capitalize'>{feature.value}</span>
                                        </div>
                                    </div>
                                ))
                            }
                            <ul className='list-disc mx-3'>
                                {product.details.desc.map((dsc, index) => <li key={index + 1} className='my-4 text-sm font-medium text-gray-800'>{dsc}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div className='mb-2'>
                        <span className='mx-2 text-lg font-medium text-gray-700'>Product Ratings</span>
                        <div className='flex items-center bg-white mt-2 px-5 py-1 rounded'>
                            <div className='w-1/2 text-center py-10'>
                                <span className='text-3xl text-gray-700'>5.0 / 4.0</span>
                                <div className='flex items-center justify-center mr-3 m-4'>
                                    <BsStarFill className='mx-[8px] text-yellow-600 text-3xl' />
                                    <BsStarFill className='mx-[8px] text-yellow-600 text-3xl' />
                                    <BsStarFill className='mx-[8px] text-yellow-600 text-3xl' />
                                    <BsStarFill className='mx-[8px] text-yellow-600 text-3xl' />
                                    <BsStar className='mx-[8px] text-3xl' />
                                </div>
                                <span className='-ml-[3.1em] text-xl font-medium text-gray-500'>30 total ratings</span>
                            </div>
                            <div className='w-1/2 py-5'>
                                <div className='flex items-center my-3'>
                                    <div className='flex items-center justify-center mr-3 m-4'>
                                        <BsStarFill className='mx-[8px] text-yellow-600 text-xl' />
                                        <BsStarFill className='mx-[8px] text-yellow-600 text-xl' />
                                        <BsStarFill className='mx-[8px] text-yellow-600 text-xl' />
                                        <BsStarFill className='mx-[8px] text-yellow-600 text-xl' />
                                        <BsStarFill className='mx-[8px] text-yellow-600 text-xl' />
                                    </div>
                                    <div className='relative ml-3 h-4 w-60 bg-gray-200 rounded'>
                                        <div className='bg-yellow-600 h-full rounded'></div>
                                    </div>
                                </div>
                                <div className='flex items-center my-3'>
                                    <div className='flex items-center justify-center mr-3 m-4'>
                                        <BsStarFill className='mx-[8px] text-yellow-600 text-xl' />
                                        <BsStarFill className='mx-[8px] text-yellow-600 text-xl' />
                                        <BsStarFill className='mx-[8px] text-yellow-600 text-xl' />
                                        <BsStarFill className='mx-[8px] text-yellow-600 text-xl' />
                                        <BsStar className='mx-[8px] text-xl' />
                                    </div>
                                    <div className='relative ml-3 h-4 w-60 bg-gray-200 rounded'>
                                        <div className='bg-yellow-600 h-full w-5/6 rounded-l'></div>
                                    </div>
                                </div>
                                <div className='flex items-center my-3'>
                                    <div className='flex items-center justify-center mr-3 m-4'>
                                        <BsStarFill className='mx-[8px] text-yellow-600 text-xl' />
                                        <BsStarFill className='mx-[8px] text-yellow-600 text-xl' />
                                        <BsStarFill className='mx-[8px] text-yellow-600 text-xl' />
                                        <BsStar className='mx-[8px] text-xl' />
                                        <BsStar className='mx-[8px] text-xl' />
                                    </div>
                                    <div className='relative ml-3 h-4 w-60 bg-gray-200 rounded'>
                                        <div className='bg-yellow-600 h-full w-2/3 rounded-l'></div>
                                    </div>
                                </div>
                                <div className='flex items-center my-3'>
                                    <div className='flex items-center justify-center mr-3 m-4'>
                                        <BsStarFill className='mx-[8px] text-yellow-600 text-xl' />
                                        <BsStarFill className='mx-[8px] text-yellow-600 text-xl' />
                                        <BsStar className='mx-[8px] text-xl' />
                                        <BsStar className='mx-[8px] text-xl' />
                                        <BsStar className='mx-[8px] text-xl' />
                                    </div>
                                    <div className='relative ml-3 h-4 w-60 bg-gray-200 rounded'>
                                        <div className='bg-yellow-600 h-full w-2/5 rounded-l'></div>
                                    </div>
                                </div>
                                <div className='flex items-center my-3'>
                                    <div className='flex items-center justify-center mr-3 m-4'>
                                        <BsStarFill className='mx-[8px] text-yellow-600 text-xl' />
                                        <BsStar className='mx-[8px] text-xl' />
                                        <BsStar className='mx-[8px] text-xl' />
                                        <BsStar className='mx-[8px] text-xl' />
                                        <BsStar className='mx-[8px] text-xl' />
                                    </div>
                                    <div className='relative ml-3 h-4 w-60 bg-gray-200 rounded'>
                                        <div className='bg-yellow-600 h-full w-1/4 rounded-l'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-2'>
                        <span className='mx-2 text-lg font-medium text-gray-700'>Product Reviews</span>
                        <div className='bg-white mt-2 px-5 py-1 rounded'>
                            {
                                product.reviews.map((review, index, arr) => (
                                    <>
                                        <div key={review.id} className='p-10'>
                                            <div className='flex items-center'>
                                                <BsPersonCircle className='mr-4 text-2xl text-gray-500' />
                                                <span className='text-gray-700 font-medium'>{review.user}</span>
                                            </div>
                                            <div className='flex items-center mt-3 mb-2'>
                                                <div className='flex items-center justify-center -ml-[0.1em] mr-3'>
                                                    <BsStarFill className='mx-[3px] text-yellow-600 text-xs' />
                                                    <BsStarFill className='mx-[3px] text-yellow-600 text-xs' />
                                                    <BsStarFill className='mx-[3px] text-yellow-600 text-xs' />
                                                    <BsStar className='mx-[3px] text-xs' />
                                                    <BsStar className='mx-[3px] text-xs' />
                                                </div>
                                                <span className='font-extralight text-xs text-gray-900'>Reviewed at {review.date}</span>
                                            </div>
                                            <span className='text-xs font-medium text-teal-700'>Verified Purchases</span>
                                            <p className='mt-4 text-sm font-light'>{review.desc}</p>
                                        </div>
                                        {(index !== (arr.length - 1)) && <hr />}
                                    </>
                                ))
                            }
                            <div className='flex justify-center my-5'>
                                <button className='flex items-center text-cyan-600'>
                                    <span className='text-sm font-light'>sell all reviews</span>
                                    <BsChevronRight className='text-base ml-2' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='ml-1'>
                    <span className='mx-2 text-lg font-medium text-gray-700'>Similar Items</span>
                    <div className='bg-white mt-2 px-5 rounded text-center'>
                        {
                            similarItem.map((item, index, arr) => (
                                <div key={item.id} className='mb-5 pb-5'>
                                    <img className="max-h-64 w-full object-contain mb-5" src={require(`../images${item.img}`)} />
                                    <span className='text-gray-800'>{item.dsc}</span>
                                    {(index !== (arr.length - 1)) && <hr className='mt-5' />}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


function ViewImage({ images, handleChangeImage }) {

    const [{ visible, zoomLen, offset, img, zoomLevel }, setState] = useImmer({ visible: false, zoomLen: { width: 0, height: 0 }, offset: { x: 0, y: 0 }, img: { width: 0, height: 0 }, zoomLevel: 4.5 })

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
                className={`${!visible && "hidden"} absolute pointer-events-none right-[12em]  min-w-[53em] min-h-[53em] max-w-[53em] max-h-[53em] bg-no-repeat bg-cover bg-white z-50 border border-gray-300 rounded shadow-2xl overflow-hidden`}
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
