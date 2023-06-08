import React from 'react';
import { RiHome2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white p-4 flex items-center">
      <div className="flex items-center">
        <Link to="/">
        <button className="mr-4">
          <RiHome2Line className="text-white w-6 h-6" />
        </button>
        <span className="text-xl font-bold">Home</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
