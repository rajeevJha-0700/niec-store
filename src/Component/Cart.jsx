import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card.jsx";
import { cart } from "../Database/cart.js";
import { useEffect, useState } from "react";

function Cart() {
  const userData = useSelector((state) => state.authorization.userData);
  const u_id = userData?.data?.user_metadata?.sub;
  const [CART, setCART] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const val = await cart.getTheUserCart(u_id);
        setCART(val || []);
      } catch (err) {
        console.error("(ERR:", err, ")");
      } finally {
        setIsLoading(false);
      }
    };
    if (u_id) {
      fetchCart();
    }
  }, [u_id]);

  const totalPrice = CART.reduce((sum, product) => sum + parseFloat(product.price || 0), 0).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-12rem)] bg-gradient-to-br from-white to-red-100">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500"></div>
        </div>
      ) : CART && CART.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CART.map((product) => (
            <Link
              key={product.pid}
              to={`/product/${product.seller_id}/${product.pid}`}
              className="block transition-transform duration-300 hover:scale-105"
            >
              <Card
                productName={product.productName || "Untitled Product"}
                imgPath={product.imageUrl || "https://via.placeholder.com/300"}
                description={product.description || "No description available"}
                sellerName={product.seller_id || "Unknown Seller"}
                price={product.price || "N/A"}
                category={product.category || "Stationary"}
              />
            </Link>
          ))}
          {/* Cart Summary */}
          <div className="col-span-full mt-8 bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-red-200 transition-all duration-300 hover:shadow-2xl">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-4">
              Cart Summary
            </h3>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Subtotal ({CART.length} items):</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-4">
              <span>Shipping:</span>
              <span className="text-gray-500">Calculated at checkout</span>
            </div>
            <div className="flex justify-between text-lg md:text-xl font-bold text-gray-900">
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>
            
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl shadow-xl border border-red-200">
          <p className="text-gray-600 text-lg mb-4">
            Your cart is empty. Start shopping now!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
