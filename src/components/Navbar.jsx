import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side - Logo and title */}
        <div className="flex items-center">
          <img
            src="crms.png"
            alt="logo"
            className="h-6 w-6 mr-2"
          />
          <span className="text-lg font-bold">CRMS</span>
        </div>

        {/* Center - Navbar items */}
        <div className="flex space-x-6 text-gray-700">
          <a href="#projects" className="hover:underline">
            Projects
          </a>
          <a href="#apis" className="hover:underline">
            APIs & Services
          </a>
          <a href="#billing" className="hover:underline">
            Billing
          </a>
          <a href="#iam" className="hover:underline">
            Admin
          </a>
          <a href="#marketplace" className="hover:underline">
            Marketplace
          </a>
        </div>

        {/* Right side - Sign Up button */}
        <div>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
