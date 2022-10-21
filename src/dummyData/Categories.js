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
    MdOutlineSportsFootball,
    MdOutlineCategory
} from 'react-icons/md'

import { BiHealth } from 'react-icons/bi'
import { IoShirtOutline } from 'react-icons/io5'
import { RiTShirtLine } from 'react-icons/ri'



export const category_data = [
    { id: 1, name: "all categories", unavailable: false, Icon: MdOutlineCategory },
    { id: 2, name: "pc & components", unavailable: false, Icon: BsLaptop },
    { id: 3, name: "phone & accessoires", unavailable: false, Icon: BsPhone },
    { id: 4, name: "electronics", unavailable: false, Icon: BsPlug },
    { id: 5, name: "office & stationary", unavailable: false, Icon: BsStickies },
    { id: 6, name: "kitchen accessories", unavailable: false, Icon: MdKitchen },
    { id: 7, name: "tools & home appliances", unavailable: false, Icon: BsTools },
    { id: 8, name: "toys & outdoor", unavailable: false, Icon: MdOutlineSmartToy },
    { id: 9, name: "pet appliances", unavailable: true, Icon: MdPets },
    { id: 10, name: "watches & jewellary", unavailable: false, Icon: BsWatch },
    { id: 11, name: "outdoor fun & sport", unavailable: false, Icon: MdOutlineSportsFootball },
    { id: 12, name: "beauty, health & hair", unavailable: false, Icon: BiHealth },
    { id: 13, name: "bags & shoes", unavailable: false, Icon: BsHandbag },
    { id: 14, name: "men's wear", unavailable: false, Icon: IoShirtOutline },
    { id: 15, name: "womens's wear", unavailable: false, Icon: RiTShirtLine },
];
