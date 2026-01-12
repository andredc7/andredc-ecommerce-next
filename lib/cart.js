// cart.js — Shopping cart utilities
import { getCurrentUser } from './auth.js';
import { getProductById } from './products.js';

const CART_KEY = "andre_cart";

export function getCart() {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

export function saveCart(cart) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function updateCartCount() {
  if (typeof window === 'undefined') return;
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  // Update all cart count elements
  const countElements = document.querySelectorAll("#cart-count");
  countElements.forEach(el => {
    el.textContent = totalQty;
  });
}

export function addToCart(productId, quantity = 1) {
  // Check if user is logged in
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Please login first to add items to your cart.');
  }

  const product = getProductById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  let cart = getCart();

  // Check if product already exists in cart
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.img,
      qty: quantity
    });
  }

  saveCart(cart);
  updateCartCount();
  return cart;
}

export function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  updateCartCount();
  return cart;
}

export function updateCartItemQuantity(productId, quantity) {
  if (quantity <= 0) {
    return removeFromCart(productId);
  }

  let cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.qty = quantity;
    saveCart(cart);
    updateCartCount();
  }
  return cart;
}

export function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.qty), 0);
}

export function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.qty, 0);
}

export function clearCart() {
  saveCart([]);
  updateCartCount();
  return [];
}

export function checkout(orderData) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Please login first to checkout.');
  }

  const cart = getCart();
  if (cart.length === 0) {
    throw new Error('Your cart is empty.');
  }

  const total = getCartTotal();

  const order = {
    id: Date.now().toString(),
    customerId: currentUser.id,
    customerName: currentUser.name,
    customerEmail: currentUser.email,
    customerPhone: orderData.phone,
    shippingAddress: orderData.address,
    items: cart,
    total: total,
    status: 'pending',
    date: new Date().toISOString()
  };

  // Save order
  const orders = JSON.parse(localStorage.getItem('andre_orders') || '[]');
  orders.push(order);
  localStorage.setItem('andre_orders', JSON.stringify(orders));

  // Clear cart after successful checkout
  clearCart();

  return order;
}