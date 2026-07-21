# 🍳 Recipe Sharing Platform

A full-stack Node.js & Express application featuring JWT Authentication, Role-Based Access Control (RBAC), Cookie Parsing, MongoDB Population, Multi-user support, and an interactive Culinary-themed EJS UI.

---

## 📌 Features

* **Authentication & Security:**
  * User Registration & Login
  * Password hashing using `bcryptjs`
  * JWT (JSON Web Token) based authentication stored securely in `HTTP-Only` cookies
  * Role-Based Access Control (RBAC) (`User` vs `Admin`)
  * Logout functionality to clear token cookies

* **Data Modeling & Relations:**
  * **User Model:** Hashes password, stores user role (`user`/`admin`), and references created recipes.
  * **Recipe Model:** Belongs to a user (`author`), includes ingredients, instructions, category, and comments array.
  * **Comment Model:** Stores user reviews and ratings linked with Mongoose `.populate()`.

* **Multiuser & Role Features:**
  * View all public recipes submitted by all users (`recipeList.ejs`).
  * Filter and manage user-specific recipes (`myRecipes.ejs`).
  * Protected CRUD operations (Users can edit/delete only their own recipes; Admins have full control).

* **Culinary Theme & UI:**
  * Rich culinary design using food-inspired color palettes, typography, and responsive cards.
  * Reusable EJS components (`navbar.ejs`, `recipeItem.ejs`).

---

## 📁 Project Directory Structure

```text
final_pr_recipe/
│
├── config/
│   └── db.js               # MongoDB Connection setup
│
├── models/
│   ├── User.js             # User Schema with Roles
│   ├── Recipe.js           # Recipe Schema with User reference
│   └── Comment.js          # Comment Schema
│
├── controllers/
│   ├── authController.js   # Register, Login, Logout logic
│   ├── recipeController.js # Recipe CRUD operations
│   └── commentController.js# Comments CRUD logic
│
├── middleware/
│   ├── authMiddleware.js   # Verify JWT Token from Cookie
│   └── roleMiddleware.js   # Check User Roles (User/Admin)
│
├── routes/
│   ├── authRoutes.js       # Auth Routes (/login, /register, /logout)
│   ├── recipeRoutes.js     # Protected Recipe Routes
│   └── commentRoutes.js    # Comment Routes
│
├── views/
│   ├── partials/
│   │   └── navbar.ejs      # Navigation Bar Partial
│   ├── recipeList.ejs      # All Recipes List
│   ├── myRecipes.ejs       # User-specific Recipes List
│   ├── recipeForm.ejs      # Add / Edit Recipe Form
│   ├── recipeItem.ejs      # Single Recipe View + Comments
│   ├── login.ejs           # Login Page
│   └── register.ejs        # Registration Page
│
├── public/
│   ├── css/                # Culinary CSS styles
│   └── images/             # Culinary background/food assets
│
├── .env                    # Environment Variables (PORT, MONGO_URI, JWT_SECRET)
├── server.js               # Main Express Server File
├── package.json            # Project dependencies
└── README.md               # Project documentation