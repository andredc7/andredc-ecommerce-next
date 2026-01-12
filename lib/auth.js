// auth.js — Authentication utilities
const USERS_KEY = "andre_users";
const CUR_KEY = "andre_user_current";

export function getUsers() {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

export function saveUsers(list) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  return JSON.parse(localStorage.getItem(CUR_KEY) || "null");
}

export function setCurrentUser(user) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CUR_KEY, JSON.stringify(user));
}

export function logout() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CUR_KEY);
}

export function registerUser(name, email, password, role = 'user') {
  const users = getUsers();

  // Check if email already exists
  if (users.find(u => u.email === email)) {
    throw new Error("Email already registered");
  }

  const newUser = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: password, // In production, hash this
    role: role, // 'user' or 'admin'
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);

  return newUser;
}

export function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u =>
    u.email === email.trim().toLowerCase() &&
    u.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  setCurrentUser(user);
  return user;
}

export function isLoggedIn() {
  return getCurrentUser() !== null;
}