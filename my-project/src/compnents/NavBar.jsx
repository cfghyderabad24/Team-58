import React, { useState } from "react";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav style={{ backgroundColor: '#088395', margin: '0', padding: '0' }} className="w-full">
        <div className="flex flex-wrap justify-between items-center w-full p-4">
          <a href="http://jaldhaara.org/#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="http://jaldhaara.org/wp-content/uploads/2022/04/jaldhaara-logo.png"
              className="h-8"
              alt="jaldhaara Logo"
              style={{ backgroundColor: 'white' }}
            />
          </a>
          <button
            className="block lg:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
            onClick={toggleNavbar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>

      <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} w-full`}>
        <nav style={{ backgroundColor: '#088395' }} className="w-full">
          <div className="w-full px-4 py-3">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <ul className="flex flex-col lg:flex-row font-medium mt-0 space-y-2 lg:space-y-0 lg:space-x-8 rtl:space-x-reverse text-sm w-full">
                <li>
                  <a href="#cards" className="text-white hover:underline" aria-current="page">
                    Recent
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:underline">
                    Statistics
                  </a>
                </li>
                <li>
                  <a href="http://jaldhaara.org/#" className="text-white hover:underline">
                    Donate
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:underline">
                    NGO Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
