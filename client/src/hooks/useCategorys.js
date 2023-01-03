import React from 'react'
import { useSelector } from 'react-redux'
import { selectMainCategory, selectCategorys } from '../app/categorySlice'

import {
    BsLaptop,
    BsPhone,
    BsPlug,
    BsStickies,
    BsTools,
    BsWatch,
    BsHandbag,

} from 'react-icons/bs';

import {
    MdKitchen,
    MdOutlineSmartToy,
    MdPets,
    MdOutlineSportsFootball
} from 'react-icons/md'

import { BiHealth } from 'react-icons/bi'
import { IoShirtOutline } from 'react-icons/io5'
import { RiTShirtLine } from 'react-icons/ri'




export default function useCategorys() {

    const mainCat = useSelector(selectMainCategory);
    const category = useSelector(selectCategorys);

    const icons = {
        "pc & components": BsLaptop,
        "phone & accessoires": BsPhone,
        "electronics": BsPlug,
        "office & stationary": BsStickies,
        "kitchen accessories": MdKitchen,
        "tools & home appliances": BsTools,
        "toys & outdoor": MdOutlineSmartToy,
        "pet appliances": MdPets,
        "watches & jewellary": BsWatch,
        "outdoor fun & sport": MdOutlineSportsFootball,
        "beauty, health & hair": BiHealth,
        "bags & shoes": BsHandbag,
        "men's wear": IoShirtOutline,
        "womens's wear": RiTShirtLine
    }

    const mapWithIcon = categories => categories.map(cat => ({ ...cat, Icon: icons[cat.name] }));

    return { mainCat, category, mapWithIcon };
}
