export const products = [
    {
        id: 1,
        name: "logiTech G502 mouse",
        brand: "logitech",
        description: "Logitech G502 Lightspeed Wireless Gaming Mouse with Hero 25K Sensor, PowerPlay Compatible, Tunable Weights and Lightsync RGB - Black",
        price: 150000,
        qa: "200 answers and questions",
        rating: 140,
        total: 10,
        images: [
            { id: 1, name: "image0", src: "/items/mouse.png", view: true },
            { id: 2, name: "image1", src: "/items/logi_1.jpg", view: false },
            { id: 3, name: "image2", src: "/items/logi_2.jpg", view: false },
            { id: 4, name: "image3", src: "/items/logi_3.jpg", view: false },
            { id: 5, name: "image4", src: "/items/logi_4.jpg", view: false },
        ],
        details: {
            features: [
                { id: 1, name: "brand", value: "logitech" },
                { id: 2, name: "color", value: "black" },
                { id: 3, name: "connectivity technology", value: "wireless, USB" },
                { id: 4, name: "special features", value: "wireless" },
                { id: 5, name: "number of buttons", value: "11" },
                { id: 6, name: "hand orientations", value: "right" }
            ],
            desc: [
                "World’s Selling Wireless Gaming Gear Brand - Based on independent sales data (FEB ‘19 - FEB’20) of Wireless Gaming Keyboard, Mice, and PC Headset in units from: US, CA, CN, JP, KR, TW, TH, IN, DE, FR, RU, UK, SE, TR",
                "PowerPlay wireless charging: Never worry about your battery life again. Add the power play wireless charging system to keep your G502 Lightspeed Wireless Mouse and other compatible G mice charged while at rest and at play. Powerplay wireless charging system sold separately",
                "Light speed wireless gaming mouse: Exclusive Logitech G ultra-fast wireless technology used by Pro gamers in competitions worldwide",
                "11 customizable buttons and hyper fast scroll wheel: Assign custom macro and shortcut commands to the buttons for each game with Logitech G hub software. Use hyper fast scrolling to rapidly review menus, long web pages and more",
                "Hero 25K sensor through a software update from G HUB, this upgrade is free to all players: Our most advanced, with 1:1 tracking, 400plus ips, and 100 - 25,600 max dpi sensitivity plus zero smoothing, filtering, or acceleration"
            ]
        },
        reviews: [
            {
                id: 1,
                user: "John Smith",
                rating: 5,
                date: "September 13 2022 ",
                desc: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            },
            {
                id: 2,
                user: "Nicky James",
                rating: 4,
                date: "August 4 2022 ",
                desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
            }
        ]
    }
];