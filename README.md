# 🛒 E-Commerce Backend (Watches Category)

This is a Node.js + Express + MongoDB backend for an e-commerce app (watches category).  
It includes **user authentication, role-based access control (admin & user), and product management**.

---

## 🚀 Features
- **User Authentication** (Register, Login, Logout)
- **Password Hashing** using bcrypt
- **JWT Authentication** stored in HTTP-only cookies
- **Role-based Access**
  - Normal users → Register, login, view products
  - Admin (only one) → Add, update, delete products
- **Product Management**
  - Create, read, update, delete products
  - Fields: `title`, `description`, `price`, `brand`, `category`, `stock`, `images`, `ratings`, etc.

---

## 📂 Project Structure
backend/
│── src/
│ ├── controllers/
│ │ ├── auth.controller.js # User & admin login/register
│ │ └── product.controller.js # CRUD for products
│ │
│ ├── middleware/
│ │ ├── auth.middleware.js # JWT verification
│ │ └── admin.middleware.js # Restrict admin-only routes
│ │
│ ├── models/
│ │ ├── user.model.js # User schema (with role)
│ │ └── product.model.js # Product schema
│ │
│ ├── routes/
│ │ ├── auth.routes.js # /api/auth (register, login)
│ │ └── product.routes.js # /api/products CRUD
│ │
│ ├── db/
│ │ └── db.js # MongoDB connection
│ │
│ └── app.js # Express app setup
│
├── .env # Environment variables
├── package.json
└── README.md


