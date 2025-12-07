# 🍽️ BlizzBazar — Full Stack Food Ordering Application

A modern, responsive full-stack food ordering system built with **React**, **Node.js**, and **MongoDB**. Users can browse a dynamic menu, manage their cart, place orders, and verify payments. Includes a powerful admin dashboard for managing food items and orders.

**Author:** Ram  
**Version:** 1.0.0  
**License:** ISC

---

## ✨ Key Features

### 👨‍🍳 Frontend (React + Vite)

- 📋 **Dynamic Menu Browsing** - Browse food items with category filtering
- 🛒 **Smart Cart Management** - Add/remove items with real-time quantity updates
- 💳 **Stripe Payment Integration** - Secure payment verification flow
- 🔐 **JWT Authentication** - Token-based user authentication with persistent login
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- 🗺️ **React Router** - Client-side routing for seamless navigation
- 📦 **State Management** - React Context API for global store state
- ⏱️ **Toast Notifications** - User-friendly feedback with react-toastify

### 🛠️ Backend (Node.js + Express)

- 🔑 **JWT Authentication** - Secure token-based user authentication
- 🗂️ **RESTful API** - Complete API routes for all resources (food, cart, orders, users)
- 🗄️ **MongoDB Integration** - Persistent data storage with Mongoose ODM
- 💳 **Stripe Payment Processing** - Payment gateway integration
- 🖼️ **File Upload** - Multer for image uploads (admin food items)
- 🔒 **Password Hashing** - Bcrypt for secure password storage
- ✅ **Input Validation** - Validator.js for data validation
- 📊 **CORS Support** - Cross-origin request handling

### 🧑‍💼 Admin Dashboard (React + Vite)

- 📦 **Food Management** - Add, edit, and delete food items
- 📈 **Order Dashboard** - View and manage all orders with status tracking
- 📊 **Analytics Charts** - Recharts for visual order analytics
- 🖼️ **Image Upload** - Upload food images to backend
- 👥 **User Activity** - Monitor user orders and activity

---

## 🏗️ Tech Stack

### Frontend & Admin

| Technology       | Version   | Purpose                    |
| ---------------- | --------- | -------------------------- |
| React            | 19.1.0    | UI framework               |
| Vite             | 7.0.4     | Build tool & dev server    |
| React Router DOM | 7.7.0     | Client-side routing        |
| Axios            | 1.10-1.11 | HTTP client                |
| React Toastify   | 11.0.5    | Notifications              |
| Recharts         | 3.5.1     | Data visualization (admin) |

### Backend

| Technology | Version | Purpose               |
| ---------- | ------- | --------------------- |
| Express    | 5.1.0   | Web framework         |
| Node.js    | -       | Runtime environment   |
| MongoDB    | -       | Database              |
| Mongoose   | 8.16.4  | ODM for MongoDB       |
| JWT        | 9.0.2   | Authentication tokens |
| Bcrypt     | 6.0.0   | Password hashing      |
| Stripe     | 18.3.0  | Payment processing    |
| Multer     | 2.0.2   | File uploads          |
| CORS       | 2.8.5   | Cross-origin support  |
| Dotenv     | 17.2.0  | Environment variables |

---

## 📁 Project Structure

```
BlizzBazar/
│
├── frontend/                 # User-facing frontend (Vite + React)
│   ├── src/
│   │   ├── assets/          # Images and icons
│   │   ├── components/      # Reusable components
│   │   │   ├── navbar/
│   │   │   ├── Footer/
│   │   │   ├── FoodItem/
│   │   │   ├── FoodDisplay/
│   │   │   ├── ExploreMenu/
│   │   │   ├── LoginPopup/
│   │   │   ├── AppDownload/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home/
│   │   │   ├── Cart/
│   │   │   ├── PlaceOrder/
│   │   │   ├── MyOrders/
│   │   │   └── Verify/
│   │   ├── context/         # React Context (StoreContext)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── index.html
│
├── backend/                  # Express.js API server
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/        # Business logic
│   │   ├── foodController.js
│   │   ├── userController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── models/             # MongoDB schemas
│   │   ├── foodModel.js
│   │   ├── userModel.js
│   │   └── orderModel.js
│   ├── routes/             # API endpoints
│   │   ├── foodRoute.js
│   │   ├── userRoute.js
│   │   ├── cartRoute.js
│   │   └── orderRoute.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js         # JWT verification
│   │   └── admin.js        # Admin authorization
│   ├── uploads/            # Image uploads directory
│   ├── server.js           # Express app entry point
│   ├── package.json
│   ├── .env                # Environment variables
│   └── .gitignore
│
├── admin/                   # Admin dashboard (Vite + React)
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   ├── Sidebar/
│   │   │   └── AdminProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Add/        # Add food items
│   │   │   ├── List/       # List all items
│   │   │   ├── Orders/     # View orders
│   │   │   ├── Dashboard/  # Dashboard overview
│   │   │   └── AdminLogin/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── index.html
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and npm/yarn
- **MongoDB** (local or Atlas cloud database)
- **Git** for version control
- **Stripe Account** (for payment integration)

### Installation & Setup

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ram8528/BlizzBazar-Food-Application.git
cd BlizzBazar
```

#### 2️⃣ Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file with the following variables:
cat > .env << EOF
MONGODB_URI=your_mongodb_connection_string
PORT=4000
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_secret
ADMIN_EMAIL=admin@blizzbazar.com
ADMIN_PASSWORD=your_admin_password
CLIENT_URL=http://localhost:5173
EOF

# Start the server
npm run server
```

Backend runs on: `http://localhost:4000`

#### 3️⃣ Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:5173`

#### 4️⃣ Admin Dashboard Setup

```bash
cd ../admin

# Install dependencies
npm install

# Start development server
npm run dev
```

Admin runs on: `http://localhost:5174` (or next available port)

---

## 📚 API Documentation

### Base URL

```
http://localhost:4000/api
```

### Authentication Endpoints

| Method | Endpoint          | Description                      |
| ------ | ----------------- | -------------------------------- |
| POST   | `/users/register` | Register a new user              |
| POST   | `/users/login`    | Login user                       |
| GET    | `/users/profile`  | Get user profile (auth required) |

### Food Endpoints

| Method | Endpoint           | Description                   |
| ------ | ------------------ | ----------------------------- |
| GET    | `/food/list`       | Get all food items            |
| POST   | `/food/add`        | Add new food (admin only)     |
| PUT    | `/food/update/:id` | Update food item (admin only) |
| DELETE | `/food/delete/:id` | Delete food item (admin only) |

### Cart Endpoints

| Method | Endpoint       | Description                           |
| ------ | -------------- | ------------------------------------- |
| GET    | `/cart/get`    | Get user cart (auth required)         |
| POST   | `/cart/add`    | Add item to cart (auth required)      |
| POST   | `/cart/remove` | Remove item from cart (auth required) |

### Order Endpoints

| Method | Endpoint             | Description                     |
| ------ | -------------------- | ------------------------------- |
| POST   | `/orders/place`      | Place new order (auth required) |
| GET    | `/orders/list`       | Get user orders (auth required) |
| GET    | `/orders/admin/list` | Get all orders (admin only)     |
| POST   | `/orders/verify`     | Verify payment (Stripe)         |

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blizzbazar

# Server
PORT=4000
NODE_ENV=development

# Authentication
JWT_SECRET=your_very_secret_jwt_key_here

# Stripe Payment
STRIPE_SECRET_KEY=sk_test_your_stripe_key

# Admin Credentials
ADMIN_EMAIL=admin@blizzbazar.com
ADMIN_PASSWORD=secure_admin_password

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### Frontend (.env) - Optional

```env
VITE_API_URL=http://localhost:4000/api
VITE_APP_NAME=BlizzBazar
```

---

## 🏃 Running the Application

### Development Mode (All Services)

**Terminal 1 - Backend:**

```bash
cd backend
npm run server
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

**Terminal 3 - Admin:**

```bash
cd admin
npm run dev
```

### Production Build

**Frontend:**

```bash
cd frontend
npm run build
# Output in dist/
```

**Admin:**

```bash
cd admin
npm run build
# Output in dist/
```

**Backend:**

```bash
cd backend
npm run server
# Or use PM2: pm2 start server.js --name "blizzbazar-api"
```

---

## 🧪 Linting & Code Quality

```bash
# Frontend linting
cd frontend
npm run lint

# Admin linting
cd admin
npm run lint
```

---

## 📋 Features Breakdown

### 🛍️ Customer Features

- ✅ User registration & login with JWT
- ✅ Browse food items by category
- ✅ Add/remove items from cart with quantity control
- ✅ Place orders with delivery address
- ✅ Stripe payment integration
- ✅ Order history & tracking
- ✅ Order status verification
- ✅ Responsive mobile-first design

### 🏪 Admin Features

- ✅ Secure admin login
- ✅ Add new food items with images
- ✅ Edit & delete food items
- ✅ View all orders dashboard
- ✅ Update order status
- ✅ Order analytics with charts
- ✅ View customer information

---

## 🐛 Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running locally or check your Atlas connection string
- Verify `MONGODB_URI` in `.env` file
- Check firewall and network settings

### CORS Errors

- Frontend and backend must be on the same origin or properly configured
- Update `CLIENT_URL` in backend `.env`
- Ensure CORS middleware is enabled in `server.js`

### Port Already in Use

```bash
# Kill process on port 4000 (backend)
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Kill process on port 5173 (frontend)
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Authentication Issues

- Clear browser cookies/localStorage
- Verify JWT_SECRET is set correctly
- Check token expiration settings

---

## 📦 Deployment

### Deploy Backend on Render/Railway

1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables
4. Deploy with `npm run server`

### Deploy Frontend on Vercel/Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Output directory: `dist`
4. Deploy

### Deploy Admin on Vercel/Netlify

Same process as frontend

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **ISC License** - see LICENSE file for details.

---

## 👨‍💻 Author

**Ram** - Full Stack Developer

---

## 📞 Support

For issues, suggestions, or contributions:

- Open an issue on GitHub
- Check existing documentation
- Review API endpoints in the code

---

## 🎯 Future Enhancements

- [ ] Real-time order tracking with WebSocket
- [ ] Multi-language support (i18n)
- [ ] Dark mode UI
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] SMS alerts for orders
- [ ] Customer reviews & ratings
- [ ] Promotional codes/coupons
- [ ] Wishlist feature

---

**Built with ❤️ in India by Ramdeep Kesharwani**
