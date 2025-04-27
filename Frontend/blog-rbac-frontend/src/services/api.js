import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

// Axios instance to make API requests
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to register a user
export const registerUser = async (data) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to login a user
export const loginUser = async (data) => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to get all blog posts
export const getBlogs = async () => {
  try {
    // Retrieve the token from sessionStorage
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      throw new Error("No token found. Please login.");
    }

    // Include the token in the Authorization header
    const response = await api.get('/blogs', {
      headers: {
        'Authorization': `Bearer ${token}`, // Add token here
      },
    });

    return response.data; // Return the data from the response
  } catch (error) {
    // Handle any errors (like token not found, or invalid token)
    throw error.response ? error.response.data : error.message;
  }
};


// Function to create a new blog (for admin)
export const createBlog = async (data, token) => {
  try {
    const response = await api.post('/blogs', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to update a blog (for admin)
export const updateBlog = async (id, data, token) => {
  try {
    const response = await api.put(`/blogs/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to delete a blog (for admin)
export const deleteBlog = async (id, token) => {
  try {
    const response = await api.delete(`/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
