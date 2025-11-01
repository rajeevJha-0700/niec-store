// src/components/Card.jsx
import { useState } from "react";

function Card({ 
  imgPath, 
  description, 
  sellerName, 
  price, 
  productName, 
  isVerified = "false"  
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  const bool = isVerified.toLowerCase() === "true" ? true : false;
 
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform ${
        isHovered ? "scale-105 shadow-xl border-red-100" : "scale-100 border-transparent"
      } w-full max-w-sm mx-auto border`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={imgPath || "https://via.placeholder.com/300"}
          alt={productName || "Product"}
          className="w-full h-48 sm:h-56 object-cover"
        />

        {/* "New" Badge */}
        <div
          className={`absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full transition-all duration-300 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        >
          New
        </div>

        {/* Verified Seller Tag */}
        {bool && (
          <div
            className={`absolute top-2 left-2 flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full transition-all duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          >
            <svg
              className="w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Verified
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-serif font-bold text-gray-900 capitalize truncate">
          {productName || "Untitled Product"}
        </h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {description || "No description available"}
        </p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-gray-500 text-sm truncate">
            {sellerName || "Unknown Seller"}
          </span>
          <span className="text-red-600 font-semibold text-lg">
            ₹{price ? parseFloat(price).toFixed(2) : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;