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
  const [copied, setCopied] = useState(false);

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

  const buildWhatsAppLink = (phone, message = "") => {
    if (!phone) return null;
    const digits = phone.replace(/\D/g, "");
    const normalized = digits.length === 10 ? `91${digits}` : digits;
    if (!normalized) return null;
    const encodedMsg = encodeURIComponent(message);
    return encodedMsg
      ? `https://wa.me/${normalized}?text=${encodedMsg}`
      : `https://wa.me/${normalized}`;
  };

  const handleCopyPhone = (phone) => {
    if (!phone) return;
    const digits = phone.replace(/\D/g, "");
    const normalized = digits.length === 10 ? `+91${digits}` : digits;
    navigator.clipboard.writeText(normalized).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-12rem)] bg-gradient-to-br from-white to-red-100">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 text-center mb-10 tracking-tight">
        Seller Profile
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500"></div>
        </div>
      ) : (
        <>
          {/* Seller Info Section */}
          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 mb-12 relative overflow-hidden border border-red-200 transition-all duration-300 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 opacity-30 rounded-2xl pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-3xl font-bold text-red-600 border-2 border-red-200">
                  {sellerInfo.name ? sellerInfo.name[0].toUpperCase() : "S"}
                </div>
              </div>

              {/* Seller Name + Verification Badge */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <h3 className="text-2xl font-serif font-semibold text-gray-900 text-center">
                  {sellerInfo.name || "Unknown Seller"}
                </h3>

                {/* VERIFIED / NOT VERIFIED BADGE */}
                {sellerInfo.isVerified ? (
                  <div className="flex items-center gap-1 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verified
                  </div>
                ) : (
                  <div className="flex items-center gap-1 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full opacity-80">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Not Verified
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {/* Email Button */}
                {sellerInfo.email ? (
                  <a
                    href={`mailto:${sellerInfo.email}`}
                    className="flex items-center justify-center gap-3 bg-red-50 text-red-700 px-6 py-3 rounded-lg font-medium hover:bg-red-100 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    aria-label={`Email ${sellerInfo.name || "seller"}`}
                  >
                    <svg
                      className="w-6 h-6 text-red-600"
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
                    <span>{sellerInfo.email}</span>
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-3 bg-gray-100 text-gray-500 px-6 py-3 rounded-lg font-medium">
                    <svg
                      className="w-6 h-6 text-gray-400"
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
                    <span>Email: N/A</span>
                  </div>
                )}
                {/* Phone Button with Copy */}
                {sellerInfo.phone ? (
                  <div className="relative flex items-center gap-2">
                    <a
                      href={buildWhatsAppLink(sellerInfo.phone, "Product Enquiry: ")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-3 bg-red-50 text-red-700 px-6 py-3 rounded-lg font-medium hover:bg-red-100 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      aria-label={`Message ${sellerInfo.name || "seller"} on WhatsApp`}
                    >
                      <svg
                        className="w-6 h-6 text-red-600"
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
                      <span>+91 {sellerInfo.phone}</span>
                      <svg
                        className="w-5 h-5 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.174.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.611-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.099-.297-.198-.594-.347zM12 20.25c-5.385 0-9.75-4.365-9.75-9.75S6.615 0.75 12 0.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
                      </svg>
                    </a>
                    <button
                      onClick={() => handleCopyPhone(sellerInfo.phone)}
                      className="bg-red-100 text-red-700 p-3 rounded-lg hover:bg-red-200 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      aria-label="Copy phone number"
                      title="Copy phone number"
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
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                    {copied && (
                      <span className="absolute right-0 top-0 mt-12 mr-4 text-sm text-red-600 font-medium animate-pulse">
                        Copied!
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3 bg-gray-100 text-gray-500 px-6 py-3 rounded-lg font-medium">
                    <svg
                      className="w-6 h-6 text-gray-400"
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
                    <span>Phone: N/A</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Seller Products Section */}
          <div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-4 text-center">
              Products by {sellerInfo.name || "Seller"}
            </h3>
            <hr className="border-red-200 mb-6" />
            {sellerProducts && sellerProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sellerProducts.map((product) => (
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
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-xl border border-red-200 transition-all duration-300 hover:shadow-2xl">
                <p className="text-gray-600 text-lg mb-4">
                  No products available from this seller.
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