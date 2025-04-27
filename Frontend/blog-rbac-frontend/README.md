# Blog RBAC Frontend (React)

This is the frontend application for the Blog RBAC system built using React.js.

## 🛠 Technologies Used
- React.js
- Tailwind CSS (or plain CSS)
- Axios
- React Router

## 🚀 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/blog-rbac-frontend.git
   cd blog-rbac-frontend


Install dependencies

bash
Copy
Edit
npm install
Start the development server

bash
Copy
Edit
npm run dev
Application will run on: http://localhost:5173 (Vite default)

Important:
Make sure your backend server (API) is running at http://localhost:5000 or adjust axios baseURL accordingly.

📚 Available Pages

Route	Component	Description
/signup	Signup	User registration page
/login	Login	User login page
/blogs	BlogList	Display all blogs
/admin	AdminDashboard	Manage blogs (Admin Only)