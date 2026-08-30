import { Property, SiteContentConfig } from '../types';

export const INITIAL_SITE_CONTENT: SiteContentConfig = {
  heroHeadline: "Connecting you to the home you love",
  heroSubheadline: "Exclusive luxury residences, bespoke villas, and sky penthouses curated for discerning homeowners.",
  heroQuote: "Turning your dreams into reality, one home at a time. Let us guide you to your perfect place.",
  heroQuoteAuthor: "Abdul Malik, Founder & Managing Director",
  highlightedPropertyId: "prop-1",
  trustedBuyersCount: "100M+",
  clientReviewsCount: "40M+",
  ratingScore: "4.9 / 5.0",
  companyPhone: "+1 (800) 555-REAL",
  companyEmail: "concierge@abdulsrealestate.com",
  companyAddress: "740 Park Avenue, Penthouse Level, New York & Downtown Dubai",
  announcementBanner: {
    enabled: true,
    text: "✨ Exclusive Private Island Collection & Palm Jumeirah Waterfront Estates Now Open For Viewings",
    linkText: "Explore Collection"
  }
};

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    title: "Bismillah House & Modern Villa",
    subtitle: "Contemporary architectural masterpiece featuring bespoke warm timber & floor-to-ceiling glass",
    type: "villa",
    price: 560000,
    listingType: "sale",
    status: "for_sale",
    location: "Beverly Hills, California",
    neighborhood: "Trousdale Estates",
    address: "1028 Loma Vista Drive, Beverly Hills, CA 90210",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 6850,
    garageSpaces: 3,
    yearBuilt: 2024,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "Welcome to Bismillah House, an architectural tour-de-force nestled in the prestigious Trousdale Estates. Featuring soaring cantilevered roofs, natural teak cladding, seamless indoor-outdoor transition, and zero-edge infinity pool overlooking the city skyline. Crafted with honed Italian travertine, custom Poliform cabinetry, and integrated Lutron lighting automation.",
    headline: "Unrivaled Architectural Prowess with Skyline Views",
    keyHighlights: [
      "Cantilevered cedar wood ceiling with seamless glass pocket doors",
      "Zero-edge heated infinity pool with integrated sunken fire pit lounge",
      "Master suite with private terrace, dual custom marble spa baths, and walk-in dressing room",
      "Sub-Zero & Wolf designer gourmet kitchen with 14-foot waterfall marble island"
    ],
    amenities: [
      "Infinity Pool",
      "Private Cinema",
      "Smart Home Automation",
      "Wine Cellar",
      "Spa & Sauna",
      "Panoramic City View",
      "Security System",
      "EV Charging Station"
    ],
    isFeatured: true,
    isHeroHighlight: true,
    featuredOrder: 1,
    agent: {
      name: "Abdul Malik",
      title: "Principal & Luxury Portfolio Director",
      phone: "+1 (310) 880-4921",
      email: "abdul@abdulsrealestate.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      rating: 5.0,
      dealsClosed: 142
    },
    virtualTourUrl: "https://my.matterport.com/show/?m=sample",
    createdAt: "2026-08-20T10:00:00Z",
    views: 18420,
    rating: 4.95,
    tags: ["New Listing", "Architectural", "Infinity Pool", "Featured"]
  },
  {
    id: "prop-2",
    title: "The Royal Sky Penthouse",
    subtitle: "Duplex penthouse with 360-degree skyline views & private rooftop heli-lounge",
    type: "penthouse",
    price: 18500000,
    listingType: "sale",
    status: "for_sale",
    location: "Downtown Dubai, UAE",
    neighborhood: "Burj Crown Enclave",
    address: "Sheikh Mohammed bin Rashid Blvd, Downtown Dubai",
    bedrooms: 6,
    bathrooms: 8,
    sqft: 11200,
    garageSpaces: 4,
    yearBuilt: 2025,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1502005229762-ee152da915d6?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "Suspended 80 stories above Downtown Dubai, The Royal Sky Penthouse is the pinnacle of ultra-luxury high-rise living. Boasting triple-height 24-foot glass facades with unobstructed views of the Burj Khalifa and the Dubai Fountains. Features a private glass elevator, climate-controlled collector car showcase, and private rooftop sky pool.",
    headline: "The Ultimate Crown of Downtown Dubai Skyline",
    keyHighlights: [
      "Triple-height floor-to-ceiling curtain wall with Burj Khalifa panorama",
      "Private internal glass elevator connecting duplex levels",
      "Rooftop infinity glass pool with 360-degree sunset deck",
      "24/7 dedicated butler service and concierge lobby"
    ],
    amenities: [
      "Private Sky Pool",
      "Helipad Access",
      "Private Elevator",
      "Concierge 24/7",
      "Valet Parking",
      "Burj Khalifa View",
      "Cigar Lounge",
      "Fitness Studio"
    ],
    isFeatured: true,
    isHeroHighlight: false,
    featuredOrder: 2,
    agent: {
      name: "Tariq Al-Mansoor",
      title: "Senior VP of Middle East Acquisitions",
      phone: "+971 4 555 9821",
      email: "tariq@abdulsrealestate.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      dealsClosed: 89
    },
    createdAt: "2026-08-22T14:30:00Z",
    views: 29400,
    rating: 4.98,
    tags: ["Ultra Luxury", "Penthouse", "Dubai Iconic"]
  },
  {
    id: "prop-3",
    title: "Villa Mirasol Waterfront Haven",
    subtitle: "Mediterranean coastal sanctuary with private yacht berth and botanical gardens",
    type: "mansion",
    price: 12400000,
    listingType: "sale",
    status: "for_sale",
    location: "Miami Beach, Florida",
    neighborhood: "Star Island",
    address: "44 Star Island Dr, Miami Beach, FL 33139",
    bedrooms: 7,
    bathrooms: 9,
    sqft: 9800,
    garageSpaces: 4,
    yearBuilt: 2023,
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "A secure waterfront estate situated on guarded Star Island. Offering 120 feet of deepwater frontage accommodating up to a 130-foot superyacht. Complete with palm-fringed swimming lagoon, outdoor summer kitchen, tennis court, and detached 2-bedroom guest cottage.",
    headline: "Private Island Living with Deepwater Yacht Dockage",
    keyHighlights: [
      "120 ft deepwater dock with direct ocean access and no fixed bridges",
      "Lush private botanical grounds with cascading fountain courtyards",
      "Commercial-grade catering kitchen plus outdoor BBQ pavilion",
      "Gated Star Island 24/7 armed private security"
    ],
    amenities: [
      "Private Yacht Dock",
      "Lagoon Pool",
      "Tennis Court",
      "Guest House",
      "Outdoor Kitchen",
      "Gated Security",
      "Ocean Access"
    ],
    isFeatured: true,
    isHeroHighlight: false,
    featuredOrder: 3,
    agent: {
      name: "Sophia Rodriguez",
      title: "Waterfront Specialist",
      phone: "+1 (305) 912-3344",
      email: "sophia@abdulsrealestate.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      rating: 4.88,
      dealsClosed: 95
    },
    createdAt: "2026-08-15T09:15:00Z",
    views: 15200,
    rating: 4.92,
    tags: ["Waterfront", "Yacht Berth", "Gated Island"]
  },
  {
    id: "prop-4",
    title: "Kensington Palace Gardens Residence",
    subtitle: "Historic Georgian manor meticulously restored with private mews house",
    type: "house",
    price: 32000, // Rent per month
    listingType: "rent",
    status: "for_rent",
    location: "London, United Kingdom",
    neighborhood: "Kensington",
    address: "18 Kensington Palace Green, London W8 4QQ",
    bedrooms: 4,
    bathrooms: 5,
    sqft: 4500,
    garageSpaces: 2,
    yearBuilt: 2022,
    imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "An exceptional rental opportunity on London's most prestigious private road. This Georgian family residence combines classical period moldings and fireplaces with cutting-edge comfort cooling, private wellness spa, and secluded south-facing walled garden.",
    headline: "Regal Elegance in London's Billionaires Row",
    keyHighlights: [
      "Private diplomatic security road with barrier control",
      "Walled private English garden with mature olive trees",
      "Basement wellness level with 15m indoor pool, hammam, and gym",
      "Self-contained staff quarters and private 2-car mews garage"
    ],
    amenities: [
      "Indoor Pool",
      "Private Garden",
      "Hammam Spa",
      "Staff Quarters",
      "Diplomatic Security",
      "Wine Cellar"
    ],
    isFeatured: false,
    isHeroHighlight: false,
    agent: {
      name: "Arthur Sterling",
      title: "UK Prime Residential Partner",
      phone: "+44 20 7946 0912",
      email: "arthur@abdulsrealestate.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      rating: 4.95,
      dealsClosed: 68
    },
    createdAt: "2026-08-18T11:20:00Z",
    views: 11300,
    rating: 4.85,
    tags: ["Prime London", "For Rent", "Diplomatic"]
  },
  {
    id: "prop-5",
    title: "Le Marais Glass Loft & Terrace",
    subtitle: "Haussmannian building reinvented into an ultra-modern artistic loft",
    type: "apartment",
    price: 14500, // Rent per month
    listingType: "rent",
    status: "for_rent",
    location: "Paris, France",
    neighborhood: "4th Arrondissement (Le Marais)",
    address: "24 Rue des Francs-Bourgeois, 75004 Paris",
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2800,
    garageSpaces: 1,
    yearBuilt: 2023,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "Located in the beating heart of historic Paris, this designer triplex loft features soaring beamed ceilings, customized steel crittall glass partitions, and a rooftop viewing terrace with romantic views of Parisian zinc roofs and monuments.",
    headline: "Chic Parisian Triplex with Rooftop Skyline Terrace",
    keyHighlights: [
      "Double-height gallery space with original 18th-century exposed oak beams",
      "Rooftop terrace overlooking Notre-Dame and Parisian landmarks",
      "Designer kitchen equipped with Gaggenau appliances and marble island",
      "Quiet courtyard setting ensuring absolute serenity"
    ],
    amenities: [
      "Rooftop Terrace",
      "Crittall Glasswork",
      "Fireplace",
      "Courtyard View",
      "Designer Kitchen",
      "Air Conditioning"
    ],
    isFeatured: false,
    isHeroHighlight: false,
    agent: {
      name: "Amelie Laurent",
      title: "European Luxury Consultant",
      phone: "+33 1 42 68 55 00",
      email: "amelie@abdulsrealestate.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      rating: 4.92,
      dealsClosed: 74
    },
    createdAt: "2026-08-10T16:00:00Z",
    views: 9400,
    rating: 4.89,
    tags: ["Parisian Loft", "For Rent", "Rooftop"]
  },
  {
    id: "prop-6",
    title: "Al-Zahra Grand Palm Villa",
    subtitle: "Custom beachfront villa on Palm Jumeirah with private white sand beach",
    type: "villa",
    price: 24500000,
    listingType: "sale",
    status: "for_sale",
    location: "Palm Jumeirah, Dubai, UAE",
    neighborhood: "Frond G VIP Enclave",
    address: "Frond G, Villa 14, Palm Jumeirah, Dubai",
    bedrooms: 6,
    bathrooms: 8,
    sqft: 13500,
    garageSpaces: 4,
    yearBuilt: 2025,
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "Direct beachfront magnificence on Palm Jumeirah's most private frond. Stepping directly onto private powdery white sand and turquoise Arabian Gulf waters. Complete with infinity pool, sunken majlis, private spa, and cinema.",
    headline: "Ultra-Private Beachfront Estate on Palm Jumeirah",
    keyHighlights: [
      "Private 150 ft pristine white sand beach directly on the Arabian Gulf",
      "Sunken fireside majlis lounge overlooking private water-facing infinity pool",
      "Italian custom furniture packages curated by Minotti and B&B Italia",
      "Direct sunrise views of Dubai Marina skyline"
    ],
    amenities: [
      "Private Beach",
      "Infinity Pool",
      "Sunken Majlis",
      "Private Cinema",
      "Smart Home",
      "Staff Accommodation",
      "Security"
    ],
    isFeatured: true,
    isHeroHighlight: false,
    featuredOrder: 4,
    agent: {
      name: "Abdul Malik",
      title: "Principal & Luxury Portfolio Director",
      phone: "+971 4 800 7700",
      email: "abdul@abdulsrealestate.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      rating: 5.0,
      dealsClosed: 142
    },
    createdAt: "2026-08-25T08:00:00Z",
    views: 34100,
    rating: 5.0,
    tags: ["Beachfront", "Palm Jumeirah", "Exclusive VIP"]
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: "apt-101",
    propertyId: "prop-1",
    propertyTitle: "Bismillah House & Modern Villa",
    propertyImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
    propertyLocation: "Beverly Hills, California",
    propertyPrice: 560000,
    propertyListingType: "sale" as const,
    userId: "user-demo-1",
    userName: "Sheikh Mansoor Al-Khalifa",
    userEmail: "mansoor.khalifa@investcorp.com",
    userPhone: "+1 (310) 902-8811",
    date: "2026-09-04",
    time: "02:00 PM",
    viewingType: "vip_chauffeur" as const,
    guests: 3,
    notes: "Client requires private gate access and security team escort. Interested in all-cash purchase.",
    status: "confirmed" as const,
    adminNotes: "Assigned senior advisor Abdul Malik. Chauffeur S-Class booked.",
    createdAt: "2026-08-28T09:12:00Z"
  },
  {
    id: "apt-102",
    propertyId: "prop-2",
    propertyTitle: "The Royal Sky Penthouse",
    propertyImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
    propertyLocation: "Downtown Dubai, UAE",
    propertyPrice: 18500000,
    propertyListingType: "sale" as const,
    userId: "user-demo-2",
    userName: "Elena Rostova",
    userEmail: "elena.r@swisshedge.ch",
    userPhone: "+41 79 555 4920",
    date: "2026-09-06",
    time: "11:30 AM",
    viewingType: "in_person" as const,
    guests: 2,
    notes: "Visiting from Geneva. Wants to view during daylight to inspect Burj Khalifa views.",
    status: "pending" as const,
    adminNotes: "Send concierge greeting to Armani Hotel.",
    createdAt: "2026-08-29T14:40:00Z"
  }
];

export const CLIENT_AVATARS = [
  { name: "David Sterling", role: "Venture Partner", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
  { name: "Michael Chen", role: "Tech Founder", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
  { name: "Sarah Al-Hassan", role: "Investor", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
  { name: "Robert Vance", role: "Private Equity", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" }
];
