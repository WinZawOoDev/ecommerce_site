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
    // { id: 1, name: "all categories", unavailable: false, Icon: MdOutlineCategory },
    {
        id: 2,
        name: "pc & components",
        unavailable: false,
        Icon: BsLaptop,
        sub_cat: [
            {
                name: "component & peripherals",
                slug: "component-peripherals",
                products: ["cpus", "motherboards", "graphic cards", "mice", "keyborads"]
            },
            {
                name: "security & protection",
                slug: "security-protection",
                products: ["surveliances items", "access control system", "smoke detectors", "safety equipments", "alarms & sensors", "door intercoms systems"]
            },
            {
                name: "laptops",
                slug: "laptops",
                products: ["gaming laptops", "ultraslim laptops", "tablets", "laptop accessories", "tablet accessories", "laptop bags & cases"]
            },
            {
                name: "storage devices",
                slug: "storage-devices",
                products: ["usb flash drives", "memory cards", "external hard drives", "hdd box enclouses", "ssds"]
            },
            {
                name: "computer networkings",
                slug: "computer-network",
                products: ["wireless routers", "netword cards", "3G moderns", "modern-routers combos", "networking tools"]
            }
        ]
    },
    {
        id: 3,
        name: "phone & accessoires",
        unavailable: false,
        Icon: BsPhone,
        sub_cat: [
            {
                name: "mobile phones",
                slug: "mobile-phone",
                products: ["android phones", "iphones", "features phones", "refurbished phones"]
            },
            {
                name: "hot brands",
                slug: "hot-brand",
                products: ["realme", "oneplus", "heawei", "infinix", "poco"]
            },
            {
                name: "accessories",
                slug: "accessories",
                products: ["cases & covers", "cables", "chargers", "power banks", "holds & stands", "screen protectors"]
            }
        ]
    },
    {
        id: 4,
        name: "electronics",
        unavailable: false,
        Icon: BsPlug,
        sub_cat: [
            {
                name: "accessories & parts",
                slug: "accessoreses-parts",
                products: ["cables & adapters", "electronics cigrattes", "batteries", "charges", "home electronic accessories", "bags & cases"]
            },
            {
                name: "home audioes & videos",
                slug: "home-audio-videos",
                products: ["televisions", "tv recievers", "projectors", "audio ampliefiers band", "tv sticks"]
            }
        ]
    },
    {
        id: 5,
        name: "office & stationary",
        unavailable: false,
        Icon: BsStickies,
        sub_cat: [
            {
                name: "office",
                slug: "office",
                products: ["printers", "printer parts", "scanners", "chairs", "desks"]
            },
            {
                name: "stationary",
                slug: "statuonary",
                products: ["packagins & cartons", "paper products", "school & office equipments", "writings & corrections"]
            }
        ]
    },
    {
        id: 6,
        name: "kitchen accessories",
        unavailable: false,
        Icon: MdKitchen,
        sub_cat: [
            {
                name: "food preparation equipment",
                slug: "food-prepare-equipment",
                products: ["chef's knife", "paring knife", "chopping/cutting boards", "shears/scissors", "garlic press"]
            },
            {
                name: "serving equipment",
                slug: "serving-equipment",
                products: ["ladle", "pasta fork", "pizza cutter", "corkscrew", "bottle opener"]
            },
            {
                name: "cooking equipment",
                slug: "cooking-equipment",
                products: ["frying pan/skillet", "saucepans", "ovenproof dish", "roasting tin", "baking sheet", "tongs", "masher"]
            },
            {
                name: "storage equipment",
                slug: "stroage-equipment",
                products: ["plastic containers", "plastic zipper bags", "bread bgin"]
            },
            {
                name: "miscellaneous equipment",
                slug: "miscellaneous equipment",
                products: ["plastic wrap/clingfilm", "kitchen foil", "baking parchment", "tea towels", "kitchen tool organizer"]
            }
        ]
    },
    {
        id: 7,
        name: "tools & home appliances",
        unavailable: false,
        Icon: BsTools,
        sub_cat: [
            {
                name: "tools",
                slug: "tools",
                products: ["power tools", "hand tools", "garden tools", "tool parts", "tool sets", "cleaning tools"]
            },
            {
                name: "home appliances",
                slug: "home-appliance",
                products: ["electrical equipment", "storage boxes & bins", "holders & racks", "dust covers"]
            },
            {
                name: "furniture",
                slug: "furniture",
                products: ["living room furniture", "office furniture", "outdoor furniture", "kitchen furniture"]
            },
            {
                name: "home decor",
                slug: "home-decor",
                products: ["wall decor", "vasses", "figuring & miniatures", "candles & holders"]
            }
        ]
    },
    {
        id: 8,
        name: "toys & outdoor",
        unavailable: false,
        Icon: MdOutlineSmartToy,
        sub_cat: [
            {
                name: "remote control",
                slug: "remote-control",
                products: ["rc helicopters", "rc cars", "rc quadcopter"]
            },
            {
                name: "building & constructions",
                slug: "building-contructions",
                products: ["blocks", "modern building toys"]
            },
            {
                name: "toys & hobbies",
                slug: "toys-hobbies",
                products: ["squeeze toys", "action & toys figures", "dolls", "stuffed & push animals", "diecasts & toy vehicles", "game & collection cards", "stickers"]
            }
        ]
    },
    {
        id: 9,
        name: "pet appliances",
        unavailable: true,
        Icon: MdPets,
        sub_cat: [
            {
                name: "food & water bowls",
                slug: "food-water-bowls",
                products: ["iconic pet heavy stainless stell bowls", "adjustable raised feeder", "rice hull dog bowls"]
            },
            {
                name: "dog crate pads",
                slug: "dog-crate-pads",
                products: ["colling pad for dogs", "mictro terry bed", "heating & coling crate pad", "proselect crate fan", ""]
            },
            {
                name: "id tags",
                slug: "id-tags",
                products: ["stainless stell pet id tags", "license plage custom tags", "slide-on pet id tags"]
            },
            {
                name: "clothes",
                slug: "slothes",
                products: ["overcoat", "raincoat", "coald weather vest", "extreme warmer jacket"]
            }
        ]
    },
    {
        id: 10,
        name: "watches & jewellary",
        unavailable: false,
        Icon: BsWatch,
        sub_cat: [
            {
                name: "fine jewellery",
                slug: "fine-jewellery",
                products: ["925 sliver jewellery", "diamond jewellery", "pearl jewellery", "gear stones", "k-gold jewellery"]
            },
            {
                name: "men's watches",
                slug: "men-watches",
                products: ["mechanical watches", "quartz watches", "digital watches", "dual dispays watches", "sport watches"]
            },
            {
                name: "women's watches",
                slug: "women-watches",
                products: ["women's braclet watches", "elegant watches", "romantic watches", "sport watches", "innovative watches"]
            }
        ]
    },
    {
        id: 11,
        name: "outdoor fun & sport",
        unavailable: false,
        Icon: MdOutlineSportsFootball,
        sub_cat: [
            {
                name: "swimming",
                slug: "swimming",
                products: ["swimming", "one-piece suits", "two-piece suits", "cover-ups", "men's swimwear", "children's swimwears"]
            },
            {
                name: "sneakers",
                slug: "sneakers",
                products: ["running shoes", "hiking shoes", "socces shoes", "dance shoes", "skateboarding shoes", "basketgball shoes"]
            },
            {
                name: "sport wears",
                slug: "sport-wears",
                products: ["jersey", "hiking jackets", "pants", "shorts", "sports bag", "sport accessories"]
            },
            {
                name: "cycling",
                slug: "cycling",
                products: ["bicycles", "bicycle frames", "bicycle lights", "bicycle helmets", "cycling jerseys", "cycling eyewears"]
            }
        ]
    },
    {
        id: 12,
        name: "beauty, health & hair",
        unavailable: false,
        Icon: BiHealth,
        sub_cat: [
            {
                name: "health care",
                slug: "health-care",
                products: ["household health monitors", "contact lenses", "personal care", "hearing aids"]
            },
            {
                name: "hair weaves",
                slug: "hair-weaves",
                products: ["bundles with closure", "3/4 bundles", "pre-colored weaves", "closures"]
            },
            {
                name: "makeup",
                slug: "makeup",
                products: ["eyes", "lips", "faces", "makeup tools"]
            },
            {
                name: "skin care",
                slug: "skin-care",
                products: ["face", "eyes", "body", "skin care tools"]
            },
            {
                name: "nail arts & tools",
                slug: "nail-art-tool",
                products: ["gel nail polish", "nail drills", "nail dryers", "nail glitter"]
            },
            {
                name: "adult items",
                slug: "adult-item",
                products: ["condoms", "lubricants"]
            }
        ]
    },
    {
        id: 13,
        name: "bags & shoes",
        unavailable: false,
        Icon: BsHandbag,
        sub_cat: [
            {
                name: "women's luggage & bags",
                slug: "women-luggage-bag",
                products: ["stylish backpacks", "totes", "shoulder bags", "wallets", "evening bags", "cluthes"]
            },
            {
                name: "men's luggage & bags",
                slug: "men-luggarge-bag",
                products: ["men's backpacks", "crossbody bags", "brefcases", "luggage & travel bags", "wallets"]
            },
            {
                name: "best selling shoes",
                slug: "best-selling-shoes",
                products: ["wedge sandles", "classic heels", "large-sized flats", "indoor slippers", "trendy sneakers", "comfortable sandals"]
            }
        ]
    },
    {
        id: 14,
        name: "men's wear",
        unavailable: false,
        Icon: IoShirtOutline,
        sub_cat: [
            {
                name: "hot sales",
                slug: "hot-sales",
                products: ["hoodies and sweatshirts", "t-shirts", "shirts", "casual shorts", "men's sets", "jacket"]
            },
            {
                name: "outerwear & jackets",
                slug: "outerwear-jacket",
                products: ["jackets", "sweaters", "casual faux leather", "genuine leather", "parkas"]
            },
            {
                name: "accessories",
                slug: "accessories",
                products: ["searves", "skullies & beanies", "presseription glasses", "gloves  & mittens", "belts", "fedoras"]
            }
        ]
    },
    {
        id: 15,
        name: "womens's wear",
        unavailable: false,
        Icon: RiTShirtLine,
        sub_cat: [
            {
                name: "women's fashion",
                slug: "women-fashion",
                products: ["dresses", "tees", "blouses & shirts", "hoddies & sweatshirts", "women's sets", "suit & blazers", "body suits"]
            },
            {
                name: "bottoms",
                slug: "bottoms",
                products: ["leggings", "shirts", "shorts", "jeans", "pants & capris"]
            },
            {
                name: "accessories",
                slug: "accessories",
                products: ["hair accessories", "sunglesses", "bluelight blocking glasses", "baseball caps", "bucket hats", "belts"]
            }
        ]
    },
];
