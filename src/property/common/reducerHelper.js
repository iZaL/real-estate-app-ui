let salePrice1 = [
  'Any',
  '10K',
  '25K',
  '50K',
  '100K',
  '200K',
  '300K',
  '400K',
  '500K',
  '1M',
  '5M',
  '10M',
];

let salePrice2 = [
  'Any',
  '25K',
  '50K',
  '100K',
  '250K',
  '500K',
  '1M',
  '5M',
  '10M',
  '25M',
  '50M',
  '100M',
];

let rentPrice1 = [
  'Any',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '1000',
  '2000',
  '5000',
];
let rentPrice2 = [
  'Any',
  '1500',
  '3000',
  '4000',
  '5000',
  '6000',
  '7000',
  '8000',
  '9000',
  '10K',
  '15K',
  '20K',
];

let sharePrice1 = [
  'Any',
  '100',
  '150',
  '200',
  '250',
  '300',
  '350',
  '400',
  '450',
  '500',
  '1000',
  '2500',
  '5000',
];
let sharePrice2 = [
  'Any',
  '500',
  '750',
  '1000',
  '1500',
  '2000',
  '3000',
  '4000',
  '5000',
  '10K',
  '15K',
  '20K',
];

let countries = ['KW', 'OM', 'BH', 'SA', 'AE', 'QA'];
let [KW, OM, BH, SA, AE, QA] = countries;

let propertyTypes = ['For Sale', 'For Rent', 'For Share'];
let [ForSale, ForRent, ForShare] = propertyTypes;

let sortOptions = ['New', 'Price(Low-High)', 'Price(High-Low)', 'Old'];

let filters = {
  [ForSale]: {
    priceFrom: 'Any',
    priceTo: 'Any',
    parking: 'Any',
    bedroom: 'Any',
    bathroom: 'Any',
    category: 'Any',
    sortBy: sortOptions[0],
    searchString: '',
  },
  [ForRent]: {
    priceFrom: 'Any',
    priceTo: 'Any',
    parking: 'Any',
    bedroom: 'Any',
    bathroom: 'Any',
    category: 'Any',
    sortBy: sortOptions[0],
    searchString: '',
  },
  [ForShare]: {
    priceFrom: 'Any',
    priceTo: 'Any',
    parking: 'Any',
    bedroom: 'Any',
    bathroom: 'Any',
    category: 'Any',
    sortBy: sortOptions[0],
    searchString: '',
  },
};

let priceForRent = {
  [KW]: rentPrice1,
  [OM]: rentPrice1,
  [BH]: rentPrice1,
  [SA]: rentPrice2,
  [AE]: rentPrice2,
  [QA]: rentPrice2,
};
let priceForShare = {
  [KW]: sharePrice1,
  [OM]: sharePrice1,
  [BH]: sharePrice1,
  [SA]: sharePrice2,
  [AE]: sharePrice2,
  [QA]: sharePrice2,
};

let priceForSale = {
  [KW]: salePrice1,
  [OM]: salePrice1,
  [BH]: salePrice1,
  [SA]: salePrice2,
  [AE]: salePrice2,
  [QA]: salePrice2,
};

let categoriesArr = {
  [ForSale]: [
    'Villa',
    'House',
    'Apartment',
    'Chalet',
    'Land & Farm',
    'Store',
    'Storage',
    'Office',
  ],
  [ForRent]: [
    'Villa',
    'House',
    'Apartment',
    'Chalet',
    'Land & Farm',
    'Store',
    'Storage',
    'Office',
  ],
  [ForShare]: [
    'Villa',
    'House',
    'Apartment',
    'Chalet',
    'Land & Farm',
    'Store',
    'Storage',
    'Office',
  ],
};

let pricesArr = {
  [ForSale]: priceForSale,
  [ForRent]: priceForRent,
  [ForShare]: priceForShare,
};

let genders = ['Any', 'Family', 'Bachelor', 'Bachelorette'];

let addMetas = {
  bedroomsArr: ['Studio', '1', '2', '3', '4', '5', '6', '7', '7+'],
  bathroomsArr: ['1', '2', '3', '4', '5', '6', '7', '7+'],
  parkingArr: ['N/A', '1', '2', '3', '4', '4+'],
};

let searchMetas = {
  bedroomsArr: ['Any', 'Studio', '1', '1+', '2', '2+', '3', '3+', '4', '4+'],
  bathroomsArr: ['Any', '1', '1+', '2', '2+', '3', '3+', '4', '4+'],
  parkingArr: ['Any', '1', '1+', '2', '2+', '3', '3+', '4', '4+'],
};

let amenities = [
  'Swimming Pool',
  'Playground',
  'Gym',
  'Furnished',
  'Furnished Kitchen',
  'Central AC',
  'Balcony',
  'Lift',
];

let nearByPlaces = [
  'Mosque',
  'Hotels',
  'Gas Station',
  'Co-op',
  'Entertainment Park',
  'Beach',
  'Water Tank',
  'Malls',
  'Cinema',
  'Restaurants',
  'Schools',
];

let attributes = {
  type: '',
  category: '',
  address: {
    city: 'Kuwait City',
    state: 'Kuwait',
    country: 'Kuwait',
    latitude: 29.3667,
    longitude: 47.9667,
  },
  meta: {
    description: '',
    price: '',
    area: '',
    bedroom: 1,
    bathroom: 1,
    parking: 'N/A',
    gender: '',
    email: '',
    phone1: '',
    phone2: '',
  },
  images: [],
  amenities: [],
  nearByPlaces: [],
};

module.exports = {
  filters,
  amenities,
  nearByPlaces,
  attributes,
  propertyTypes,
  genders,
  searchMetas,
  addMetas,
  sortOptions,
  categories: categoriesArr,
  prices: pricesArr,
};
