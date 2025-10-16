import { warehouse } from "../Database/Warehouse.js";
import Card from "./Card.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [objects, setObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await warehouse.getAllProducts();
        if (error) {
          console.error("Error while fetching products...", error);
        } else {
          setObjects(data);
        }
      } catch (error) {
        console.error("Error while fetching data...(ERR:1000)", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Updated categories to match PushProduct.jsx
  const categories = ["All", "Stationary", "Fashion", "Electronics","Akash"];

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? objects
      : objects.filter((product) => product.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-12rem)] bg-gradient-to-br from-white to-red-50">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
          Discover Unique Finds at NEVEROLD
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Explore a curated selection of products crafted by seniors, from electronics to handmade treasures.
        </p>
        <Link
          to="/add-product"
          className="mt-4 inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:scale-105 transition-all duration-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Your Product
        </Link>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-red-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600"
            }`}
            aria-label={`Filter by ${category}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Section */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500"></div>
        </div>
      ) : filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
                category={product.category}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <p className="text-gray-600 text-lg">
            {selectedCategory === "All"
              ? "Store is empty... Be the first to contribute!"
              : `No products in ${selectedCategory} category.`}
          </p>
          <Link
            to="/add-product"
            className="mt-4 inline-block bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:scale-105 transition-all duration-300"
          >
            Add a Product
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
