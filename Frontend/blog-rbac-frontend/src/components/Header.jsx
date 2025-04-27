import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Blog RBAC</h1>
        <nav>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/signup" className="mr-4">Signup</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
