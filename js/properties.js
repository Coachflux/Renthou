const properties = [
    {
        id: 1, title: "Luxury 2 Bedroom Flat", type: "Apartment", city: "Lagos", location: "Lekki, Lagos",
        price: 1200000, period: "year", bedrooms: 2, bathrooms: 2, parking: 1, area: 120,
        rating: 4.8, reviews: 32, verified: true, featured: true,
        amenities: ["Security","Parking","Water","Generator","Air Conditioning","Kitchen","Balcony"],
        description: "Beautiful modern two-bedroom apartment in a secure neighborhood. Features spacious living areas, modern kitchen fittings, 24/7 power supply, and excellent road network.",
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop"
        ],
        agent: { name: "Daniel Properties", phone: "+234 801 234 5678", verified: true, rating: 4.9,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 2, title: "Spacious Mini Flat", type: "Self Contain", city: "Lagos", location: "Yaba, Lagos",
        price: 850000, period: "year", bedrooms: 1, bathrooms: 1, parking: 1, area: 65,
        rating: 4.5, reviews: 18, verified: true, featured: true,
        amenities: ["Security","Water","Electricity","Kitchen","POP Ceiling"],
        description: "Cozy mini flat in Yaba, close to tech hubs and universities. Modern finishing and reliable utilities.",
        images: [
            "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=600&h=400&fit=crop"
        ],
        agent: { name: "Adebola Realty", phone: "+234 802 345 6789", verified: true, rating: 4.7,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 3, title: "4 Bedroom Duplex", type: "Duplex", city: "Lagos", location: "Ajah, Lagos",
        price: 1800000, period: "year", bedrooms: 4, bathrooms: 4, parking: 2, area: 280,
        rating: 4.9, reviews: 45, verified: true, featured: true,
        amenities: ["Security","Parking","Water","Generator","Air Conditioning","Swimming Pool","Kitchen","Fenced Compound","BQ"],
        description: "Stunning 4-bedroom duplex with private compound, swimming pool, boys quarters, and top-tier security.",
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop"
        ],
        agent: { name: "Grand Homes Ltd", phone: "+234 803 456 7890", verified: true, rating: 4.8,
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 4, title: "Self Contain Apartment", type: "Self Contain", city: "Lagos", location: "Surulere, Lagos",
        price: 600000, period: "year", bedrooms: 1, bathrooms: 1, parking: 0, area: 45,
        rating: 4.2, reviews: 12, verified: false, featured: false,
        amenities: ["Water","Electricity","Kitchen"],
        description: "Affordable self-contained in Surulere. Close to markets and transport. Great for single occupants.",
        images: ["https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&h=400&fit=crop"],
        agent: { name: "City Rentals", phone: "+234 804 567 8901", verified: false, rating: 4.0,
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 5, title: "2 Bedroom Flat", type: "Apartment", city: "Abuja", location: "Maitama, Abuja",
        price: 2500000, period: "year", bedrooms: 2, bathrooms: 2, parking: 2, area: 150,
        rating: 4.9, reviews: 28, verified: true, featured: true,
        amenities: ["Security","Parking","Water","Generator","Air Conditioning","Kitchen","Gym","Elevator"],
        description: "Premium 2-bedroom in Maitama. Features gym, elevator, 24/7 security. Ideal for diplomats.",
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop"
        ],
        agent: { name: "Abuja Prime Properties", phone: "+234 805 678 9012", verified: true, rating: 4.9,
            avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 6, title: "Mini Flat", type: "Self Contain", city: "Abuja", location: "Gwarinpa, Abuja",
        price: 700000, period: "year", bedrooms: 1, bathrooms: 1, parking: 1, area: 55,
        rating: 4.3, reviews: 15, verified: true, featured: false,
        amenities: ["Security","Water","Electricity","Kitchen","POP Ceiling"],
        description: "Well-finished mini flat in Gwarinpa estate. Close to shopping and schools.",
        images: ["https://images.unsplash.com/photo-1499916078039-922301b0eb9b?w=600&h=400&fit=crop"],
        agent: { name: "Gwarinpa Homes", phone: "+234 806 789 0123", verified: true, rating: 4.4,
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 7, title: "3 Bedroom Bungalow", type: "Bungalow", city: "Port Harcourt", location: "GRA Phase 2, Port Harcourt",
        price: 1500000, period: "year", bedrooms: 3, bathrooms: 3, parking: 2, area: 200,
        rating: 4.7, reviews: 22, verified: true, featured: true,
        amenities: ["Security","Parking","Water","Generator","Air Conditioning","Kitchen","Garden","Fenced Compound"],
        description: "Beautiful standalone bungalow in PHC GRA. Features garden, spacious compound, modern interior.",
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&h=400&fit=crop"
        ],
        agent: { name: "PHC Elite Homes", phone: "+234 807 890 1234", verified: true, rating: 4.8,
            avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 8, title: "Luxury Shortlet Apartment", type: "Shortlet", city: "Lagos", location: "Victoria Island, Lagos",
        price: 80000, period: "night", bedrooms: 2, bathrooms: 2, parking: 1, area: 110,
        rating: 4.9, reviews: 56, verified: true, featured: true,
        amenities: ["Security","Parking","Water","Generator","Air Conditioning","Swimming Pool","Kitchen","WiFi","Smart TV"],
        description: "Premium shortlet on Victoria Island. Fully furnished with smart home features and concierge.",
        images: [
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1598928506311-c55ezded4d62?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop"
        ],
        agent: { name: "VI Shortlets", phone: "+234 808 901 2345", verified: true, rating: 4.9,
            avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 9, title: "3 Bedroom Flat", type: "Apartment", city: "Enugu", location: "GRA, Enugu",
        price: 900000, period: "year", bedrooms: 3, bathrooms: 3, parking: 1, area: 160,
        rating: 4.6, reviews: 19, verified: true, featured: false,
        amenities: ["Security","Parking","Water","Generator","Air Conditioning","Kitchen"],
        description: "Spacious 3-bedroom in Enugu GRA. Quiet neighborhood with good road access.",
        images: ["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop"],
        agent: { name: "Enugu Homes", phone: "+234 809 012 3456", verified: true, rating: 4.5,
            avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 10, title: "5 Bedroom Duplex", type: "Duplex", city: "Ibadan", location: "Bodija, Ibadan",
        price: 2200000, period: "year", bedrooms: 5, bathrooms: 5, parking: 3, area: 350,
        rating: 4.8, reviews: 14, verified: true, featured: true,
        amenities: ["Security","Parking","Water","Generator","Air Conditioning","Swimming Pool","Kitchen","BQ","Fenced Compound"],
        description: "Majestic 5-bedroom duplex in Bodija. Swimming pool, BQ, expansive compound.",
        images: [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop"
        ],
        agent: { name: "Bodija Estates", phone: "+234 810 123 4567", verified: true, rating: 4.8,
            avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 11, title: "1 Bedroom Apartment", type: "Apartment", city: "Lagos", location: "Ikeja, Lagos",
        price: 950000, period: "year", bedrooms: 1, bathrooms: 1, parking: 1, area: 70,
        rating: 4.4, reviews: 21, verified: true, featured: false,
        amenities: ["Security","Parking","Water","Generator","Air Conditioning","Kitchen"],
        description: "Modern 1-bedroom in Ikeja, close to airport and business district.",
        images: ["https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=600&h=400&fit=crop"],
        agent: { name: "Ikeja Property Hub", phone: "+234 811 234 5678", verified: true, rating: 4.5,
            avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 12, title: "Office Space", type: "Office", city: "Lagos", location: "Marina, Lagos",
        price: 3500000, period: "year", bedrooms: 0, bathrooms: 2, parking: 3, area: 180,
        rating: 4.7, reviews: 8, verified: true, featured: false,
        amenities: ["Security","Parking","Water","Generator","Air Conditioning","Elevator","Reception"],
        description: "Prime office space on Lagos Island with waterfront views.",
        images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop"],
        agent: { name: "Marina Commercial", phone: "+234 812 345 6789", verified: true, rating: 4.7,
            avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 13, title: "Shop Space", type: "Shop", city: "Abuja", location: "Wuse, Abuja",
        price: 1800000, period: "year", bedrooms: 0, bathrooms: 1, parking: 0, area: 45,
        rating: 4.3, reviews: 11, verified: true, featured: false,
        amenities: ["Security","Water","Electricity"],
        description: "Strategic shop in Wuse market area. High foot traffic.",
        images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"],
        agent: { name: "Wuse Market Agents", phone: "+234 813 456 7890", verified: false, rating: 4.2,
            avatar: "https://images.unsplash.com/photo-1544168190-79c17527004f?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 14, title: "Luxury 3 Bedroom Flat", type: "Apartment", city: "Port Harcourt", location: "Trans Amadi, Port Harcourt",
        price: 1100000, period: "year", bedrooms: 3, bathrooms: 3, parking: 2, area: 170,
        rating: 4.5, reviews: 16, verified: true, featured: false,
        amenities: ["Security","Parking","Water","Generator","Air Conditioning","Kitchen","Fenced Compound"],
        description: "Executive 3-bedroom in Trans Amadi. Close to industrial areas.",
        images: ["https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&h=400&fit=crop"],
        agent: { name: "PHC Rentals", phone: "+234 814 567 8901", verified: true, rating: 4.5,
            avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 15, title: "2 Bedroom Bungalow", type: "Bungalow", city: "Ibadan", location: "Ring Road, Ibadan",
        price: 650000, period: "year", bedrooms: 2, bathrooms: 2, parking: 1, area: 130,
        rating: 4.1, reviews: 9, verified: false, featured: false,
        amenities: ["Water","Electricity","Kitchen","Fenced Compound"],
        description: "Affordable 2-bedroom bungalow on Ring Road. Good transport access.",
        images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop"],
        agent: { name: "Ibadan Affordable Homes", phone: "+234 815 678 9012", verified: false, rating: 4.0,
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 16, title: "Executive Shortlet", type: "Shortlet", city: "Abuja", location: "Asokoro, Abuja",
        price: 120000, period: "night", bedrooms: 3, bathrooms: 3, parking: 2, area: 200,
        rating: 5.0, reviews: 34, verified: true, featured: true,
        amenities: ["Security","Parking","Water","Generator","Air Conditioning","Swimming Pool","Kitchen","WiFi","Smart TV","Gym"],
        description: "Ultra-luxury shortlet in Asokoro. Presidential suite-level amenities.",
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&h=400&fit=crop"
        ],
        agent: { name: "Asokoro Luxury Stays", phone: "+234 816 789 0123", verified: true, rating: 5.0,
            avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 17, title: "4 Bedroom Flat", type: "Apartment", city: "Enugu", location: "Independence Layout, Enugu",
        price: 1200000, period: "year", bedrooms: 4, bathrooms: 4, parking: 2, area: 220,
        rating: 4.6, reviews: 13, verified: true, featured: false,
        amenities: ["Security","Parking","Water","Generator","Air Conditioning","Kitchen","Fenced Compound"],
        description: "Spacious 4-bedroom in Independence Layout. Quiet residential area.",
        images: ["https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&h=400&fit=crop"],
        agent: { name: "Enugu Prime Realty", phone: "+234 817 890 1234", verified: true, rating: 4.6,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 18, title: "Self Contain", type: "Self Contain", city: "Port Harcourt", location: "Rumukrushi, Port Harcourt",
        price: 550000, period: "year", bedrooms: 1, bathrooms: 1, parking: 0, area: 40,
        rating: 4.0, reviews: 7, verified: false, featured: false,
        amenities: ["Water","Electricity","Kitchen"],
        description: "Budget-friendly self-contained in Rumukrushi. Clean and well-maintained.",
        images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&h=400&fit=crop"],
        agent: { name: "Rumukrushi Agents", phone: "+234 818 901 2345", verified: false, rating: 3.9,
            avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 19, title: "Luxury Duplex", type: "Duplex", city: "Lagos", location: "Ikoyi, Lagos",
        price: 5000000, period: "year", bedrooms: 5, bathrooms: 5, parking: 3, area: 400,
        rating: 5.0, reviews: 20, verified: true, featured: true,
        amenities: ["Security","Parking","Water","Generator","Air Conditioning","Swimming Pool","Kitchen","Elevator","Smart Home","Cinema","BQ"],
        description: "Ultra-luxury 5-bedroom duplex in Ikoyi. Private cinema, smart home, elevator.",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&h=400&fit=crop"
        ],
        agent: { name: "Ikoyi Luxury Estates", phone: "+234 819 012 3456", verified: true, rating: 5.0,
            avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face" }
    },
    {
        id: 20, title: "3 Bedroom Bungalow", type: "Bungalow", city: "Ibadan", location: "Moniya, Ibadan",
        price: 500000, period: "year", bedrooms: 3, bathrooms: 2, parking: 1, area: 160,
        rating: 4.2, reviews: 6, verified: false, featured: false,
        amenities: ["Water","Electricity","Kitchen","Fenced Compound"],
        description: "Affordable 3-bedroom bungalow in Moniya. Large compound with gardening space.",
        images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop"],
        agent: { name: "Moniya Homes", phone: "+234 820 123 4567", verified: false, rating: 4.1,
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" }
    }
];

const categories = [
    { id: "all", label: "All" },
    { id: "Apartment", label: "Apartment" },
    { id: "Self Contain", label: "Self Contain" },
    { id: "Duplex", label: "Duplex" },
    { id: "Bungalow", label: "Bungalow" },
    { id: "Shortlet", label: "Shortlet" }
];

const heroSlides = [
    { title: "Find Your\n<span>Dream</span> Home", subtitle: "Thousands of verified houses for rent near you.", cta: "Explore Now", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop" },
    { title: "Verified Homes\n<span>Near You</span>", subtitle: "Every property is inspected and verified.", cta: "Browse Now", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop" },
    { title: "Affordable\n<span>Rentals</span>", subtitle: "Best prices on quality homes across Nigeria.", cta: "Search Now", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop" },
    { title: "Move Into Your\n<span>New Home</span>", subtitle: "Schedule inspections and book today.", cta: "Get Started", image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=400&fit=crop" }
];

const demoNotifications = [
    { id: 1, title: "New property available", description: "A 2-bedroom apartment matching your search is now available in Lekki.", time: "2h ago", type: "property", unread: true },
    { id: 2, title: "Price update", description: "Luxury 2 Bedroom Flat price reduced by ₦100,000.", time: "5h ago", type: "price", unread: true },
    { id: 3, title: "Inspection reminder", description: "Your inspection for 4 Bedroom Duplex is tomorrow at 10 AM.", time: "1d ago", type: "reminder", unread: false },
    { id: 4, title: "Message from agent", description: "Daniel Properties replied to your inquiry.", time: "2d ago", type: "message", unread: false }
];

const demoMessages = [
    { id: 1, agentId: 1, agentName: "Daniel Properties", propertyTitle: "Luxury 2 Bedroom Flat", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", lastMessage: "Yes, the property is still available. When would you like to schedule an inspection?", time: "10:30 AM", unread: 2, messages: [
        { text: "Is this property still available?", sent: true, time: "10:15 AM" },
        { text: "Yes, the property is still available. When would you like to schedule an inspection?", sent: false, time: "10:30 AM" }
    ]},
    { id: 2, agentId: 2, agentName: "Adebola Realty", propertyTitle: "Spacious Mini Flat", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", lastMessage: "The price is slightly negotiable. Can we discuss further?", time: "Yesterday", unread: 0, messages: [
        { text: "Is the price negotiable?", sent: true, time: "Yesterday" },
        { text: "The price is slightly negotiable. Can we discuss further?", sent: false, time: "Yesterday" }
    ]},
    { id: 3, agentId: 3, agentName: "Grand Homes Ltd", propertyTitle: "4 Bedroom Duplex", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", lastMessage: "Your inspection has been confirmed for Saturday at 2 PM.", time: "2d ago", unread: 1, messages: [
        { text: "Can I schedule an inspection for this weekend?", sent: true, time: "2d ago" },
        { text: "Your inspection has been confirmed for Saturday at 2 PM.", sent: false, time: "2d ago" }
    ]}
];

let demoInspections = [
    { id: 1, propertyId: 3, propertyTitle: "4 Bedroom Duplex", date: "2026-08-30", time: "14:00", name: "Abumchukwu", phone: "+234 801 000 0000", message: "Looking forward to seeing the property.", status: "confirmed" }
];

const userProfile = {
    name: "Abumchukwu", email: "abumchukwu@email.com", phone: "+234 801 000 0000",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face"
};

function formatPrice(price) { return "₦" + price.toLocaleString("en-NG"); }
function formatPricePeriod(p) { return formatPrice(p.price) + " <span>/ " + p.period + "</span>"; }
