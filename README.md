# Blog Project

# Live Url - https://blog-project-one-theta.vercel.app

Welcome to the Blog Project! This README provides an overview of the project, including setup instructions, features, and usage guidelines.

## Introduction

The Blog Project is a backend application designed to allow users to create, edit, and view blog posts. It is built using node js, express and MongoDB with Mongoose

## Features

- User authentication and authorization
- Create, edit, and delete blog posts
- View a list of all blog posts

## Used Node Packages

- Typescript (for type checking)
- Express (for building the server)
- Mongoose (for interacting with MongoDB)
- Bcrypt (for password hashing)
- dotenv (for environment variables)
- jsonwebtoken (for authentication)
- cors (for cross-origin resource sharing)
- pretter (for code formatting)
- Eslint (for linting)

## Installation

To get started with the Blog Project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Faisal146/blog-project.git
   ```
2. Navigate to the project directory:
   ```bash
   cd blog-project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the database:
   ```bash
   npm run setup-db
   ```
5. Start the development server:
   ```bash
   npm start
   ```

## Technologies

- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**

## admin crediantial

{
"email": "faisal@gmail.com",
"password": "securepassword"
}

## Endpoints of this project

### 1 register a new user

**POST** `/api/auth/register`
live-link - https://blog-project-one-theta.vercel.app/api/auth/register

**Request Body:**

````json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

### 2 Login User

 **POST** `/api/auth/login`

 live-link - https://blog-project-one-theta.vercel.app/api/auth/login

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
````

### 3 Create Blog

**POST** `/api/blogs`

live-link - https://blog-project-one-theta.vercel.app/api/blogs/

**Request Header:**`Authorization: Bearer <token>`

**Request Body:**

```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

### 4 Update a Blog

**PATCH** `/api/blogs/:id`

live-link - https://blog-project-one-theta.vercel.app/api/blogs/:id

**Request Header:**`Authorization: Bearer <token>`

**Request Body:**

```json
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

### 5 Delete a Blog

**DELETE** `/api/blogs/:id`

live-link - https://blog-project-one-theta.vercel.app/api/blogs/:id

**Request Header:**`Authorization: Bearer <token>`

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

### 6 Get All Blogs (Public)

**GET** `/api/blogs`

live-link - https://blog-project-one-theta.vercel.app/api/blogs/

Provides a public API to fetch all blogs with options for searching, sorting, and filtering.

**Example Request URL**:

```sql
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18
```

### 9 Block User (admin action)

**PATCH** `/api/admin/users/:userId/block`

live-link - https://blog-project-one-theta.vercel.app/api/admin/users/:userId/block

**Request Header:**`Authorization: Bearer <admin_token>`

### 10 Delete any blog (admin action)

**DELETE** `/api/admin/blogs/:userId`

live-link - https://blog-project-one-theta.vercel.app/api/admin/blogs/:userId

**Request Header:**`Authorization: Bearer <admin_token>`
