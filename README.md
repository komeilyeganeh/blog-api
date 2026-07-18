# NestJS Blog API

A production-inspired RESTful Blog API built with **NestJS**, **Prisma**, **PostgreSQL**, **JWT Authentication**, **Role-Based Authorization**, and **Redis Caching**.

This project was developed as a learning project to practice modern backend development concepts while following clean architecture principles and NestJS best practices.

---

## ✨ Features

### Authentication

- User Registration
- User Login
- Password Hashing with bcrypt
- JWT Authentication
- JWT Strategy (Passport)
- JWT Guard
- Current User Decorator

### Authorization

- Role-Based Access Control (RBAC)
- Custom `@Roles()` Decorator
- Roles Guard

### Users

- Full CRUD Operations
- Pagination
- Search
- Sorting
- Validation using DTOs
- Secure API Responses (Sensitive fields excluded)

### Posts

- Full CRUD Operations
- User ↔ Posts Relationship
- Cascade Delete
- Ownership Support

### Redis

- Redis Module
- Redis Service
- Dependency Injection
- Cache Aside Pattern
- Cache Invalidation

### Database

- PostgreSQL
- Prisma ORM
- Prisma Migrations
- Relationships
- Type-safe Queries

### Validation

- DTOs
- ValidationPipe
- class-validator
- class-transformer

### Exception Handling

- Built-in NestJS Exceptions
- Global Validation Errors

---

# 🛠 Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- Redis
- ioredis
- JWT
- Passport
- bcrypt
- class-validator
- class-transformer

---

# 📁 Project Structure

```
src
│
├── auth
├── users
├── posts
├── prisma
├── redis
├── common
└── main.ts
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/your-username/blog-api.git
```

```bash
cd blog-api
```

---

## Install dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/blog"

JWT_SECRET=your-secret-key

REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## Prisma Migration

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

---

## Run the application

Development

```bash
npm run start:dev
```

Production

```bash
npm run start:prod
```

---

# 📦 API Features

## Authentication

```
POST /auth/register
POST /auth/login
```

---

## Users

```
GET    /users
GET    /users/:id
POST   /users
PATCH  /users/:id
DELETE /users/:id
```

Supports:

- Pagination
- Search
- Sorting

---

## Posts

```
GET    /posts
POST   /posts
PATCH  /posts/:id
DELETE /posts/:id
```

Posts are automatically cached using Redis.

Cache is invalidated whenever a post is created, updated, or deleted.

---

# 🔐 Authentication

Protected routes require a valid JWT token.

```
Authorization: Bearer <your_token>
```

---

# 🧠 Redis Caching

This project implements the **Cache Aside Pattern**.

Flow:

```
Client
   │
   ▼
Redis
   │
Hit?
 ├── Yes → Return Cached Data
 │
 └── No
        │
        ▼
 PostgreSQL
        │
        ▼
 Save to Redis
        │
        ▼
     Return Response
```

Whenever a post changes:

- Create Post
- Update Post
- Delete Post

The cache is automatically invalidated.

---

# 📌 Learning Objectives

This project demonstrates practical implementation of:

- Dependency Injection
- Modular Architecture
- DTO Validation
- Authentication
- Authorization
- Guards
- Custom Decorators
- Prisma ORM
- Database Relationships
- Exception Handling
- Redis Integration
- Cache Aside Pattern
- Clean Service Design

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the project and submit a pull request.

---

# 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed with ❤️ using **NestJS**, **Prisma**, and **Redis** as part of a backend learning journey.