import logo from "../assets/file.svg";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Logout from "./Logout";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector((state) => state.authorization.status);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavigationItems = [
    { btn: "Home", path: "/", presentOrNot: true, icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-10 0a1 1 0 01-1-1v-3a1 1 0 011-1h3a1 1 0 011 1v3" },
    { btn: "My Store", path: "/my-store", presentOrNot: authStatus, icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { btn: "Cart", path: "/cart", presentOrNot: authStatus, icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" },
    { btn: "Login", path: "/login", presentOrNot: !authStatus, icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" },
    { btn: "Add Product", path: "/add-product", presentOrNot: authStatus, icon: "M12 4.5v15m7.5-7.5h-15" },
    { btn: "Signup", path: "/signup", presentOrNot: !authStatus, icon: "M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <button onClick={() => navigate("/")} className="flex items-center hover:opacity-80 transition-all duration-300 transform hover:scale-105">
           <div className="relative inline-flex items-center text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-bold tracking-tight transition-all duration-300 group">
              <span className="px-0 py-1.5 text-red-600 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:drop-shadow-[0_1px_3px_rgba(239,68,68,0.3)]">
                NEVER
              </span>
              <span className="px-0 py-1.5 text-gray-900 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
                OLD
              </span>
           </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-4">
          {NavigationItems.map((item) =>
            item.presentOrNot ? (
              <li key={item.btn}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out ${
                    isActive(item.path)
                      ? "bg-red-100 text-red-600 font-semibold shadow-sm transform scale-105"
                      : "text-gray-700 hover:bg-red-50 hover:text-red-600 hover:shadow-sm hover:scale-105"
                  }`}
                >
                  <svg className="w-5 h-5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                  <span className="capitalize transition-all duration-300">{item.btn}</span>
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <Logout
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300 ease-in-out hover:shadow-sm hover:scale-105"
              />
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-red-600 transition-all duration-300 ease-in-out transform hover:scale-110"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg className="w-6 h-6 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } bg-white shadow-md`}
      >
        <ul className="container mx-auto px-4 py-4 flex flex-col space-y-3">
          {NavigationItems.map((item) =>
            item.presentOrNot ? (
              <li key={item.btn}>
                <button
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium w-full text-left transition-all duration-300 ease-in-out ${
                    isActive(item.path) ? "bg-red-100 text-red-600 font-semibold transform scale-105" : "text-gray-700 hover:bg-red-50 hover:text-red-600 hover:scale-105"
                  }`}
                >
                  <svg className="w-5 h-5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                  <span className="capitalize transition-all duration-300">{item.btn}</span>
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <Logout
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium w-full text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300 ease-in-out hover:scale-105"
              />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;