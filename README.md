# 🚀 Scalable Task Management API (MERN)

A production-ready backend system with authentication, role-based access control, caching, and logging — built using the MERN stack.

---

## 📌 Overview

This project is a **scalable REST API** that supports:

* User authentication using JWT
* Role-Based Access Control (User/Admin)
* Task management (CRUD operations)
* Redis caching for performance optimization
* Centralized logging using Winston
* Clean architecture (Controller → Service → Repository)

A basic frontend UI (React) is also included to interact with the APIs.

---

## 🧱 Tech Stack

**Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)
* Redis (ioredis)
* JWT Authentication
* Winston Logger

**Frontend**

* React.js

---

## ⚙️ Features

### 🔐 Authentication & Authorization

* User Registration & Login
* Password hashing using bcrypt
* JWT-based authentication
* Role-based access:

  * User → Manage own tasks
  * Admin → Access all tasks

---

### 📋 Task Management (CRUD)

* Create Task
* Get User Tasks (with Redis caching)
* Update Task (ownership enforced)
* Delete Task (ownership enforced)
* Admin:

  * View all tasks
  * Delete any task

---

### ⚡ Performance Optimization

* Redis caching implemented for GET APIs
* Cache invalidation on update/delete

---

### 📊 Logging

* Winston logger integrated
* Logs:

  * API requests
  * Cache hits/misses
  * Errors

---

### 🛡️ Security Practices

* JWT token validation
* Password hashing (bcrypt)
* Input validation using express-validator
* Role + ownership checks

---

### 🏗️ Scalable Architecture

Project follows clean architecture:

Controller → Service → Repository → Database

This ensures:

* Separation of concerns
* Easy scalability
* Maintainability

---

## 📁 Project Structure

```
src/
│
├── config/        # DB & Redis config
├── controllers/   # Request handlers
├── services/      # Business logic
├── repositories/  # DB queries
├── models/        # Mongoose schemas
├── routes/        # API routes
├── middlewares/   # Auth, validation, error handling
├── validators/    # Input validation
├── utils/         # Logger
```

---

## 🚀 API Endpoints

### 🔐 Auth Routes

```
POST /api/v1/auth/register
POST /api/v1/auth/login
```

---

### 📋 Task Routes (User)

```
POST   /api/v1/tasks
GET    /api/v1/tasks
PUT    /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
```

---

### 👑 Admin Routes

```
GET    /api/v1/tasks/all
DELETE /api/v1/tasks/admin/:id
```

---

## 🔑 Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
REDIS_URL=redis://127.0.0.1:6379
```

---

## 🛠️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/your-repo.git
cd backend
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Start Redis server

Make sure Redis is running locally on port 6379

---

### 4. Run the server

```
npm run dev
```

---

## 🧪 Testing

Use Postman or any API client:

* Register user
* Login to get JWT
* Pass token in headers:

```
Authorization: Bearer <token>
```

---

## 📌 Scalability Considerations

* Modular architecture allows easy feature addition
* Redis caching reduces database load
* Logging helps monitor system behavior
* Can be extended into microservices
* Ready for containerization (Docker support can be added)

---

## 🌟 Future Improvements

* API rate limiting
* Refresh tokens
* Pagination for tasks
* Docker deployment
* CI/CD pipeline

---

## 📎 GitHub Repository

👉 [Your Repository Link Here]

---

## 👨‍💻 Author

Yash
Backend Developer | MERN Stack | Scalable Systems Enthusiast

---
