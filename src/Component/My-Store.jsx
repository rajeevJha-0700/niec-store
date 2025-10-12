import { warehouse } from "../Database/Warehouse.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Card.jsx";
import { useSelector } from "react-redux";

function MyStore() {
  const userData = useSelector((state) => state.authorization.userData);
  const u_id = userData?.data?.user_metadata?.sub;
  const [objects, setObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMyProducts() {
      if (!u_id) {
        setError("User not authenticated. Please log in.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const { data, error } = await warehouse.getUserProduct(u_id);
        if (data) {
          setObjects(data);
        } else if (error) {
          console.error("Error while fetching client record...", error);
          setError("Failed to fetch your products. Please try again.");
        }
      } catch (error) {
        console.error("ERR1000::", error);
        setError("An error occurred while fetching your products.");
      } finally {
        setIsLoading(false);
      }
    }

    getMyProducts();
  }, [u_id]);

  return (
    <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-12rem)]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800">
          MY STORE
        </h2>
        <Link
          to="/add-product"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-300 flex items-center gap-2"
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
          Add Product
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
          >
            Go to Home
          </Link>
        </div>
      ) : objects && objects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {objects.map((product) => (
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
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <svg
            className="mx-auto h-16 w-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Products Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Your store is empty. Start by adding your first product!
          </p>
          <Link
            to="/add-product"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
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
            Add Your First Product
          </Link>
        </div>
      )}
    </div>
  );
}

export default MyStore;