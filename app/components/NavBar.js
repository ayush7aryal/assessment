import React, { useState } from "react";

const Navbar = ({
  email,
  categories,
  setSelectedCategory,
  selectedCategory,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {email && <p className="mr-4">Welcome {email}</p>}
          <button onClick={toggleDropdown} className="lg:hidden">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex space-x-4">
          <button
            onClick={() => setSelectedCategory("")}
            className={`${
              selectedCategory === "" ? "bg-blue-500" : "bg-gray-700"
            } text-white px-3 py-2 rounded-md`}
          >
            All Categories
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category ? "bg-blue-500" : "bg-gray-700"
              } text-white px-3 py-2 rounded-md`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className={`${isDropdownOpen ? "block" : "hidden"} lg:hidden`}>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <button
              onClick={() => setSelectedCategory("")}
              className={`${
                selectedCategory === "" ? "bg-blue-500" : "bg-gray-700"
              } text-white px-3 py-2 rounded-md w-full text-left`}
            >
              All Categories
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category ? "bg-blue-500" : "bg-gray-700"
                } text-white px-3 py-2 rounded-md w-full text-left`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
