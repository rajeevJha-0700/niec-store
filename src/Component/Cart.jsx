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
    <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-12rem)]">
    
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
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
                productName={product.productName}
                imgPath={product.imageUrl}
                description={product.description}
                sellerName={product.seller_id}
                price={product.price}
              />
            </Link>
          ))}
          {/* Cart Summary */}
          <div className="col-span-full mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
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
            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>
            <Link
              to="/checkout"
              className="mt-6 block w-full bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-300 text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <p className="text-gray-600 text-lg mb-4">
            Your cart is empty. Start shopping now!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
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
