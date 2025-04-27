import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      sessionStorage.setItem('token', response.token); // Store JWT token in sessionStorage
      navigate('/blogs'); // Redirect to blogs page after successful login
    } catch (err) {
      setError('Invalid credentials or server error. Please try again!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
