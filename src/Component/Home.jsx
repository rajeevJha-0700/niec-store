
import { warehouse } from "../Database/Warehouse.js";
import Card from "./Card.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [objects, setObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="container mx-auto px-4 py-12">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
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
          <p className="text-gray-600 text-lg">
            Store is empty... Be the first to contribute!
          </p>
          <Link
            to="/add-product"
            className="mt-4 inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
          >
            Add a Product
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
