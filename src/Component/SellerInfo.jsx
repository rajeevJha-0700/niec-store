import { useParams } from "react-router-dom";
import { Auth } from "../Database/Auth";
import { warehouse } from "../Database/Warehouse";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

function SellerInfo() {
  const { slug } = useParams();
  const [sellerInfo, setSellerInfo] = useState({});
  const [sellerProducts, setSellerProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSellerInfo = async () => {
      try {
        setIsLoading(true);
        const info = await Auth.getSellerInfo(slug);
        setSellerInfo(info || {});
      } catch (err) {
        console.error("Error while fetching seller info...", err);
      }
    };

    const fetchSellerProducts = async () => {
      try {
        const products = await warehouse.getUserProduct(slug);
        setSellerProducts(products.data || []);
      } catch (err) {
        console.error("Error while fetching seller products...", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSellerInfo();
    fetchSellerProducts();
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-12rem)]">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 text-center mb-8">
        Seller_Info
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
        </div>
      ) : (
        <>
          {/* Seller Info Section */}
          <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 mb-12">
            <h3 className="text-xl font-serif font-semibold text-gray-800 mb-4">
              {sellerInfo.name || "Unknown Seller"}
            </h3>
            <div className="space-y-3 text-gray-600">
              <p className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <span>Email: {sellerInfo.email || "N/A"}</span>
              </p>
              <p className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>Phone: +91 {sellerInfo.phone || "N/A"}</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Products by {sellerInfo.name || "Seller"}
            </h3>
            <hr className="border-gray-300 mb-6" />
            {sellerProducts && sellerProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sellerProducts.map((product) => (
                  <Link
                    key={product.pid}
                    to={`/product/${product.seller_id}/${product.pid}`}
                    className="block transition-transform duration-300 hover:scale-105"
                  >
                    <Card
                      productName={product.productName}
                      imgPath={product.imageUrl}
                      description={product.description}
                      sellerName={product.sellerName}
                      price={product.price}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-md">
                <p className="text-gray-600 text-lg mb-4">
                  No products available from this seller.
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
                  Shop Other Products
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SellerInfo;
