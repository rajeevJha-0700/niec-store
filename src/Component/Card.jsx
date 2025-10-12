
import { useState } from "react";
function Card({ imgPath, description, sellerName, price, productName }) {
  
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform ${
        isHovered ? "scale-105 shadow-xl" : "scale-100"
      } w-full max-w-sm mx-auto`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={imgPath || "https://via.placeholder.com/300"}
          alt={productName}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
          New
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 capitalize truncate">
          {productName}
        </h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {description}
        </p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-gray-500 text-sm">{sellerName}</span>
          <span className="text-indigo-600 font-semibold text-lg">
            ₹{parseFloat(price).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
