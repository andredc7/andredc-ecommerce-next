# Andre DC E-Commerce

A modern, scalable e-commerce platform built with Next.js 14, featuring separate admin and user interfaces for optimal user experience and management.

Proyek ini merupakan aplikasi Front End E-Commerce yang dibangun menggunakan Next.js untuk menampilkan pengalaman belanja online yang modern, cepat, dan responsif. Aplikasi ini dirancang sebagai portofolio Front End Developer, dengan fokus pada UI/UX, struktur komponen, dan performansi web.

Pengguna dapat melihat daftar produk, detail produk, mengelola keranjang belanja, serta melakukan simulasi proses checkout. Proyek ini mengimplementasikan konsep Single Page Application (SPA) dengan dukungan Server-Side Rendering (SSR) dan Static Site Generation (SSG) untuk meningkatkan kecepatan akses dan SEO.

## 🚀 Features

### User Features
- **Product Catalog**: Browse products by categories with advanced filtering
- **Product Details**: Comprehensive product pages with images and specifications
- **Shopping Cart**: Persistent cart with local storage
- **User Authentication**: Secure login and registration system
- **Wishlist**: Save favorite products for later
- **Checkout Process**: Streamlined order placement
- **Responsive Design**: Optimized for all devices

### Admin Features
- **Dashboard**: Overview of key metrics and statistics
- **Product Management**: Add, edit, and manage product inventory
- **Order Management**: Process and track customer orders
- **User Management**: Manage user accounts and permissions
- **Admin Layout**: Dedicated sidebar navigation for efficient admin tasks

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18
- **Styling**: CSS Modules with custom responsive design
- **State Management**: React Hooks + Local Storage
- **Authentication**: Custom auth system with role-based access
- **Data Persistence**: Local Storage (easily replaceable with database)

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout
│   ├── page.jsx           # Home page
│   ├── admin/             # Admin routes (protected)
│   │   ├── layout.js      # Admin layout with sidebar
│   │   ├── page.jsx       # Admin dashboard
│   │   ├── products/      # Product management
│   │   ├── orders/        # Order management
│   │   └── users/         # User management
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── login/             # Authentication
│   ├── products/          # Product catalog
│   └── profile/           # User profile
├── components/            # Reusable React components
├── lib/                   # Utility functions and data
├── public/                # Static assets
└── styles/                # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd andre-ecommerce-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

## 📱 Available Routes

### Public Routes
- `/` - Home page with featured products
- `/products` - Product catalog
- `/products/[id]` - Individual product details
- `/login` - User login
- `/register` - User registration
- `/forgot-password` - Password recovery

### User Routes (Authenticated)
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/wishlist` - User wishlist
- `/profile` - User profile management

### Admin Routes (Admin Only)
- `/admin` - Admin dashboard
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/users` - User management

## 🔐 Authentication

The application uses a role-based authentication system:
- **Users**: Can browse, purchase, and manage their accounts
- **Admins**: Full access to user and product management

Default admin credentials (for development):
- Email: admin@example.com
- Password: admin123

## 🎨 Design System

- **Colors**: Modern color palette with consistent branding
- **Typography**: Clean, readable fonts
- **Components**: Reusable UI components
- **Responsive**: Mobile-first design approach

## 🔧 Development

### Adding New Features
1. Create components in `/components`
2. Add pages in `/app` following Next.js conventions
3. Update styles in `/styles` or component files
4. Test authentication and permissions

### Code Style
- Use functional components with hooks
- Follow React best practices
- Maintain consistent naming conventions
- Add proper error handling

## 📈 Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Payment gateway integration
- Email notifications
- Advanced search and filtering
- Product reviews and ratings
- Inventory management
- Analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Andre DC**
- Portfolio: [Your Portfolio Link]
- LinkedIn: [Your LinkedIn]

---

Built with ❤️ using Next.js
- `/profile` - User profile
