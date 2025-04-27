# Blog RBAC API (Backend)

This is the backend server for the Blog RBAC (Role-Based Access Control) application.  
It handles user authentication, authorization, and CRUD operations for blogs.

## 🛠 Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- dotenv
- CORS

## 🚀 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/blog-rbac-backend.git
   cd blog-rbac-backend

Install dependencies

bash
Copy
Edit
npm install
Create .env file

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start the server

bash
Copy
Edit
npm start
Server will run on: http://localhost:5000

📚 Available APIs

Method	Endpoint	Description	Authentication
POST	/api/auth/signup	User signup	No
POST	/api/auth/login	User login	No
GET	/api/blogs	Get all blogs	Yes
POST	/api/blogs	Create a blog	Yes (Admin)
PUT	/api/blogs/:id	Update a blog	Yes (Admin)
DELETE	/api/blogs/:id	Delete a blog	Yes (Admin)