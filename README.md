# 📖 Blog Application

A **full-stack blog platform** built with **Next.js (App Router)**, **MongoDB**, and **Mongoose**.  
It includes **role-based authentication, blog management, and user profiles** with interests & profile pictures.  

---

## 🚀 Features

### 👥 Authentication
- User Signup & Login  
- LocalStorage-based session handling  
- Role-based access control (Admin vs Normal User)  

### 📝 Blog Management
- Create new blog posts  
- Read blogs (list view + detail view)  
- Update blog posts (admin only)  
- Delete blogs with confirmation (admin only)  

### 🧑 User Profile
- Profile picture upload (Base64 storage)  
- Edit username  
- Select blog interests (Tech, AI/ML, Travel, Food, Design)  
- Save & update profile data  

### 📊 Admin Dashboard
- View all blogs in one place  
- Add, edit, and delete blogs  
- Navigate to edit page for specific blogs  

### 🎨 UI/UX
- Clean & responsive layout with **CSS Modules**  
- Styled buttons, inputs, and dashboard controls  
- Alerts & confirmations for key actions  

---

## 🛠 Tech Stack

**Frontend**  
- Next.js (React, App Router)  
- React Hooks (`useState`, `useEffect`, `useRouter`)  
- CSS Modules for styling  

**Backend**  
- Next.js API Routes (serverless backend)  
- MongoDB with **Mongoose ODM**  

**Database**  
- MongoDB Atlas (cloud) / Local MongoDB  

---

## 📂 Project Structure

```plaintext
.
├── app/
│   ├── api/
│   │   └── blogs/        # Blog API routes (CRUD)
│   ├── blog/[id]/        # Dynamic route for blog details
│   ├── dashboard/        # Admin dashboard
│   └── profile/          # User profile page
├── models/
│   └── Blog.js           # Mongoose schema for Blog
├── styles/
│   └── *.module.css      # Component-level styles
├── utils/
│   └── connectDB.js      # MongoDB connection handler
└── README.md

```

## 🔗 Deployment Link
https://blogwebsitenext.vercel.app/
