# 🍽️ BlizzBazar — Full Stack Food Ordering App

Welcome to **Foodie Delight**, a sleek and responsive full-stack food ordering application that allows users to explore delicious meals, add them to a cart, and place orders seamlessly. With a custom-built admin panel and RESTful backend, it's the perfect template for a modern food delivery system.

---

## 🚀 Features

### 👨‍🍳 Frontend (React.js)

- 📋 Browse a rich food menu with categories
- 🛒 Add to Cart / Remove from Cart with live quantity updates
- 💳 Integrated payment verification flow
- 🌟 Beautiful UI with dynamic image rendering
- 🔐 Token-based cart persistence

### 🛠️ Backend (Node.js + Express)

- 🔑 JWT token support
- 🗂️ API routes for cart, food list, and order handling
- ✅ Payment verification endpoint
- 🖼️ Image hosting for admin uploads (optional if not using static assets)

### 🧑‍💼 Admin Panel (Optional)

- 📦 Add, update, and manage food items
- 📈 View orders and user activity
- 🖼️ Upload food images to backend storage

---

## 🖼️ Screenshots

---

## 📁 Project Structure

root/
│
├── frontend/ # React-based user-facing frontend
│ ├── src/
│ │ ├── assets/ # All food images and static icons
│ │ ├── components/ # FoodItem, Header, Footer, etc.
│ │ ├── context/ # Global Store using React Context API
│ │ └── App.jsx
│ └── public/
│
├── backend/ # Express backend
│ ├── api/
│ ├── models/
│ ├── routes/
│ └── index.js
│
├── admin/ # (Optional) Admin dashboard
│ ├── src/
│ └── public/
│
└── README.md

---

## ⚙️ Setup Instructions

### 🖥️ Frontend

```bash
cd frontend
npm install
npm start

cd backend
npm install
node index.js

cd admin
npm install
npm start
```
