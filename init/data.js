const sampleListings = [
  {
    _id: "507f1f77bcf86cd799439011",
    title: "Luxury Beachfront Villa",
    description: "Stunning ocean views with private beach access",
    price: 350,
    location: "Malibu, California",
    geometry: {
      type: "Point",
      coordinates: [-118.668962, 34.025922],
    },
    image: {
      filename: "beach-villa",
      url: "https://www.theluxurysignature.com/wp-content/uploads/2015/02/villa-anavaya-samui-seaview-1140x641.jpg",
    },
    country: "United States",

    createdAt: "2023-05-15T10:00:00Z",
    category: "beachfront",
  },
  {
    _id: "507f1f77bcf86cd799439015",
    title: "Mountain Log Cabin",
    description: "Cozy cabin with panoramic mountain views",
    price: 180,
    location: "Aspen, Colorado",
    geometry: {
      type: "Point",
      coordinates: [-106.823486, 39.191097],
    },
    image: {
      filename: "mountain-cabin",
      url: "https://images.pexels.com/photos/206648/pexels-photo-206648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    country: "United States",

    createdAt: "2023-06-20T14:30:00Z",
    category: "mountain-city",
  },
  {
    _id: "507f1f77bcf86cd799439018",
    title: "Historic Castle Suite",
    description: "Live like royalty in this authentic medieval castle",
    price: 420,
    location: "Edinburgh, Scotland",
    geometry: {
      type: "Point",
      coordinates: [-3.188267, 55.953251],
    },
    image: {
      filename: "castle-suite",
      url: "https://th.bing.com/th/id/OIP.-3MjiQYrwrh69aB-FIYmrgHaE7?cb=iwp2&rs=1&pid=ImgDetMain",
    },
    country: "United Kingdom",

    createdAt: "2023-04-10T09:15:00Z",
    category: "castles",
  },
  {
    _id: "507f1f77bcf86cd799439023",
    title: "Arctic Glass Igloo",
    description: "Northern lights viewing from your warm bed",
    price: 300,
    location: "Rovaniemi, Finland",
    geometry: {
      type: "Point",
      coordinates: [25.724823, 66.503059],
    },
    image: {
      filename: "arctic-igloo",
      url: "https://www.finland-holiday.com/images/arctic-fox-glass-igloos-outside.jpg",
    },
    country: "Finland",

    createdAt: "2023-01-05T16:45:00Z",
    category: "arctic",
  },
  {
    _id: "507f1f77bcf86cd799439026",
    title: "Luxury Treehouse Retreat",
    description: "Eco-friendly treehouse with modern amenities",
    price: 220,
    location: "Portland, Oregon",
    geometry: {
      type: "Point",
      coordinates: [-122.676483, 45.523064],
    },
    image: {
      filename: "treehouse",
      url: "https://th.bing.com/th/id/OIP.l7_biW5E4YMhlodDrVnp1AHaE5?cb=iwp2&rs=1&pid=ImgDetMain",
    },
    country: "United States",

    createdAt: "2023-03-12T11:20:00Z",
    category: "treehouses",
  },
  {
    _id: "507f1f77bcf86cd799439030",
    title: "Parisian Luxury Apartment",
    description: "Eiffel Tower views from a Haussmann-style balcony",
    price: 275,
    location: "Paris, France",
    geometry: {
      type: "Point",
      coordinates: [2.294694, 48.858093],
    },
    image: {
      filename: "paris-apartment",
      url: "https://i.pinimg.com/originals/45/fd/29/45fd297ccb5308f6323f8047ebcb65cd.jpg",
    },
    country: "France",

    createdAt: "2023-07-01T08:45:00Z",
    category: "iconic-cities",
  },
  {
    _id: "507f1f77bcf86cd799439033",
    title: "Ski-in/Ski-out Chalet",
    description: "Direct slope access with hot tub and sauna",
    price: 400,
    location: "Whistler, Canada",
    geometry: {
      type: "Point",
      coordinates: [-122.957356, 50.114587],
    },
    image: {
      filename: "ski-chalet",
      url: "https://th.bing.com/th/id/OIP.yHAxoz9zo0A4UreLPGIzbwHaEK?cb=iwp2&rs=1&pid=ImgDetMain",
    },
    country: "Canada",

    createdAt: "2022-12-15T13:10:00Z",
    category: "ski-in-out",
  },
  {
    _id: "507f1f77bcf86cd799439037",
    title: "Infinity Pool Villa",
    description: "Private villa with 20m infinity pool overlooking the jungle",
    price: 500,
    location: "Bali, Indonesia",
    geometry: {
      type: "Point",
      coordinates: [115.092415, -8.455677],
    },
    image: {
      filename: "infinity-pool",
      url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    country: "Indonesia",

    createdAt: "2023-02-28T17:30:00Z",
    category: "amazing-pools",
  },
  {
    _id: "507f1f77bcf86cd799439040",
    title: "Organic Farm Stay",
    description: "Working farm with fresh breakfast and animal encounters",
    price: 120,
    location: "Tuscany, Italy",
    geometry: {
      type: "Point",
      coordinates: [11.255814, 43.77105],
    },
    image: {
      filename: "organic-farm",
      url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    country: "Italy",

    createdAt: "2023-08-10T09:05:00Z",
    category: "farms",
  },
  {
    _id: "507f1f77bcf86cd799439043",
    title: "Glamping Dome",
    description: "Luxury camping with stargazing roof and private deck",
    price: 160,
    location: "Sedona, Arizona",
    geometry: {
      type: "Point",
      coordinates: [-111.76099, 34.865971],
    },
    image: {
      filename: "glamping-dome",
      url: "https://www.wvglampingdomes.com/wp-content/uploads/2021/07/WV-Glamping-Domes-intfromkitchen-08647.jpg",
    },
    country: "United States",

    createdAt: "2023-09-05T12:15:00Z",
    category: "camping",
  },
  {
    _id: "6079b34e89d2a945f8d4e1a1",
    title: "Skyline Penthouse",
    description: "Floor-to-ceiling windows with panoramic city views",
    price: 450,
    location: "New York, NY",
    geometry: {
      type: "Point",
      coordinates: [-74.006, 40.7128],
    },
    image: {
      filename: "nyc-penthouse",
      url: "https://img.freepik.com/premium-photo/luxury-penthouse-with-view-city-skyline-modern-furnishings_124507-101852.jpg?w=2000",
    },
    country: "United States",
    createdAt: "2023-04-18T09:30:00Z",
    category: "iconic-cities",
  },
  {
    _id: "6079b34e89d2a945f8d4e1a2",
    title: "Alpine Ski Chalet",
    description: "Direct slope access with private hot tub",
    price: 380,
    location: "Zermatt, Switzerland",
    geometry: {
      type: "Point",
      coordinates: [7.7481, 46.0207],
    },
    image: {
      filename: "alpine-chalet",
      url: "https://th.bing.com/th/id/OIP.v7u1vI6qUrRZVDdiwGjlTAHaE-?cb=iwp2&w=1536&h=1032&rs=1&pid=ImgDetMain",
    },
    country: "Switzerland",
    createdAt: "2023-11-25T14:15:00Z",
    category: "ski-in-out",
  },
  {
    _id: "6079b34e89d2a945f8d4e1a3",
    title: "Cliffside Infinity Pool Villa",
    description: "Private villa with 25m infinity pool overlooking the ocean",
    price: 520,
    location: "Santorini, Greece",
    geometry: {
      type: "Point",
      coordinates: [25.4615, 36.3932],
    },
    image: {
      filename: "santorini-villa",
      url: "https://static.vecteezy.com/system/resources/previews/050/440/706/large_2x/modern-luxury-villa-overlooking-ocean-with-infinity-pool-on-cliffside-photo.jpg",
    },
    country: "Greece",
    createdAt: "2023-06-10T16:45:00Z",
    category: "amazing-pools",
  },
  {
    _id: "6079b34e89d2a945f8d4e1a4",
    title: "Lakeside Cabin",
    description: "Rustic charm with modern amenities and private dock",
    price: 195,
    location: "Lake Tahoe, California",
    geometry: {
      type: "Point",
      coordinates: [-120.0324, 39.0968],
    },
    image: {
      filename: "tahoe-cabin",
      url: "https://i.pinimg.com/originals/54/94/49/54944928898abe7ae072d7762b192764.jpg",
    },
    country: "United States",
    createdAt: "2023-08-05T11:20:00Z",
    category: "lakeside",
  },
  {
    _id: "6079b34e89d2a945f8d4e1a5",
    title: "Bamboo Treehouse",
    description: "Sustainable bamboo structure in tropical rainforest",
    price: 175,
    location: "Ubud, Bali",
    geometry: {
      type: "Point",
      coordinates: [115.2605, -8.5193],
    },
    image: {
      filename: "bali-treehouse",
      url: "https://th.bing.com/th/id/OIP.noMKOzSDcQqR3zOcvx5RDAHaE8?cb=iwp2&rs=1&pid=ImgDetMain",
    },
    country: "Indonesia",
    createdAt: "2023-09-15T13:10:00Z",
    category: "treehouses",
  },
];

module.exports = { data: sampleListings };
