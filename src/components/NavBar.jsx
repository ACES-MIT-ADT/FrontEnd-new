import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import menu from './menu.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle scroll to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowNavbar(false); // scrolling down → hide navbar
      } else {
        if (lastScrollY - currentScrollY > 30) {
          setShowNavbar(true); // scrolling up fast → show navbar
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="w-full flex justify-center"> {/* 👈 centers navbar */}
      <nav
        className={`fixed top-6 z-50 bg-[#1b1b1b]/90 shadow-lg 
        max-w-6xl w-[90%] rounded-[24px] px-6 py-3 
        flex flex-col md:flex-row md:items-center justify-between 
        border border-[#2e2e2e] transition-all duration-300 ease-in-out
        ${showNavbar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}
      >
        {/* Inner container */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo + Menu */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <img src={logo} alt="Logo" className="h-10 w-auto" />

            {/* Mobile menu icon */}
            <div className="flex md:hidden">
              <img
                src={menu}
                alt="Menu"
                className="h-10 w-10 cursor-pointer hover:scale-110 transition-transform duration-300"
                onClick={toggleMenu}
              />
            </div>
          </div>

          {/* Links */}
          <div
            className={`
              flex flex-col md:flex-row md:space-x-4 items-center
              transition-all duration-300 ease-in-out
              ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 md:opacity-100 invisible md:visible'}
            `}
          >
            {["Home", "About", "Our teams", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                className="relative group px-5 py-2 text-lg font-medium text-white 
                           border border-purple-400 rounded-full transition duration-300 
                           hover:bg-purple-600 hover:text-black"
              >
                {item}
                {/* Purple underline */}
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-[2px] bg-purple-400 rounded-full transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div
            className={`
              flex justify-center transition-all duration-300 ease-in-out
              ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 md:opacity-100 invisible md:visible'}
            `}
          >
            <Link
              to="/"
              className="flex items-center bg-[#252525] text-white px-6 py-2 rounded-full shadow-inner hover:bg-purple-600 transition"
            >
              <span className="h-3 w-3 mr-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-green-500 animate-blink"></span>
              </span>
              RECENT EVENTS
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
