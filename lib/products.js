// products.js — Product data and utilities
export const PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 450000,
    cat: 'electronics',
    img: '/images/wirelessheadphones.jpeg',
    description: 'High-quality wireless headphones with noise cancellation and long battery life for immersive audio experience.'
  },
  {
    id: 2,
    name: 'Smartwatch Series 5',
    price: 950000,
    cat: 'electronics',
    img: '/images/Smartwatch.jpg',
    description: 'Advanced smartwatch with health tracking, GPS, and customizable watch faces for fitness enthusiasts.'
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 380000,
    cat: 'electronics',
    img: '/images/bluetoothspeaker.jpg',
    description: 'Portable Bluetooth speaker with waterproof design and powerful sound for outdoor adventures.'
  },
  {
    id: 4,
    name: 'Casual T-Shirt',
    price: 120000,
    cat: 'fashion',
    img: '/images/casualtshirt.webp',
    description: 'Comfortable cotton t-shirt perfect for everyday wear, available in various colors.'
  },
  {
    id: 5,
    name: 'Hoodie Jacket',
    price: 280000,
    cat: 'fashion',
    img: '/images/hoodiejacket.jpg',
    description: 'Warm and stylish hoodie jacket ideal for casual outings and cooler weather.'
  },
  {
    id: 6,
    name: 'Slimfit Pants',
    price: 220000,
    cat: 'fashion',
    img: '/images/slimfitpants.webp',
    description: 'Slim-fit pants made from durable fabric, offering comfort and a modern look.'
  },
  {
    id: 7,
    name: 'Leather Wallet',
    price: 150000,
    cat: 'accessories',
    img: '/images/wallet.png',
    description: 'Genuine leather wallet with multiple compartments for cards and cash.'
  },
  {
    id: 8,
    name: 'Wristband',
    price: 95000,
    cat: 'accessories',
    img: '/images/wristband.jpg',
    description: 'Adjustable wristband made from soft material, great for sports and casual use.'
  },
  {
    id: 9,
    name: 'Street Cap',
    price: 90000,
    cat: 'accessories',
    img: '/images/hat.jpg',
    description: 'Stylish street cap with adjustable strap for sun protection and fashion.'
  }
];

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

export function getProductsByCategory(category) {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.cat === category);
}

export function searchProducts(query) {
  if (!query) return PRODUCTS;
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
}