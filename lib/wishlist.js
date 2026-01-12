// lib/wishlist.js — Wishlist management utilities

// Get wishlist from localStorage
export const getWishlist = () => {
  if (typeof window === 'undefined') return [];
  try {
    const wishlist = localStorage.getItem('andre_wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (error) {
    console.error('Error getting wishlist:', error);
    return [];
  }
};

// Add product to wishlist
export const addToWishlist = (product) => {
  const wishlist = getWishlist();
  const existingItem = wishlist.find(item => item.id === product.id);

  if (!existingItem) {
    wishlist.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      cat: product.cat
    });
    localStorage.setItem('andre_wishlist', JSON.stringify(wishlist));
    return true; // Added successfully
  }
  return false; // Already in wishlist
};

// Remove product from wishlist
export const removeFromWishlist = (productId) => {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter(item => item.id !== productId);
  localStorage.setItem('andre_wishlist', JSON.stringify(updatedWishlist));
};

// Check if product is in wishlist
export const isInWishlist = (productId) => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === productId);
};

// Clear wishlist
export const clearWishlist = () => {
  localStorage.setItem('andre_wishlist', JSON.stringify([]));
};