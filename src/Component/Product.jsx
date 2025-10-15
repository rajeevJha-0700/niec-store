
import { useParams, Link, useNavigate } from "react-router-dom";
import { warehouse } from "../Database/Warehouse.js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Button.jsx";
import { addToCart, removeFromCart } from "../Store/Slice/CartSlice.js";
import { cart } from "../Database/cart.js";

function Product() {
  const userdata = useSelector((state) => state.authorization.userData);
  const u_id = userdata?.data?.user_metadata?.sub;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug, id } = useParams();
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isInCart = useSelector((state) => state.cart.productId_array.includes(id));
  const isAuthor = productData && userdata ? productData.seller_id === u_id : false;

  useEffect(() => {
    async function _getProduct(pid) {
      try {
        setIsLoading(true);
        const product = await warehouse.getProduct(pid);
        setProductData(product.data[0]);
      } catch (error) {
        console.error("Error while fetching product...(ERR:1001)", error);
      } finally {
        setIsLoading(false);
      }
    }
    _getProduct(id);
  }, [id]);

  async function deletePost() {
    try {
      const { error } = await warehouse.deleteProduct(id);
      if (!error) {
        console.log("Product deleted successfully");
        navigate("/");
      } else {
        console.error("Error deleting post", error);
      }
    } catch (error) {
      console.error("Error while deleting product...(ERR:1002)", error);
    }
  }

  async function handleAdd() {
    dispatch(addToCart(id));
    await cart.addInUserCart(u_id, productData);
   
  }

  async function handleRemove() {
    dispatch(removeFromCart(id));
    await cart.removeFromUserCart(u_id, productData);
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-12rem)]">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
        </div>
      ) : !productData ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <p className="text-gray-600 text-lg">Product not found.</p>
          <Link
            to="/"
            className="mt-4 inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="relative max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
          
          {isAuthor && (
            <div className="absolute top-4 right-4 flex space-x-3 z-10">
              <Link to={`/edit-product/${slug}/${id}`}>
                <Button
                  className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 hover:scale-105 transition-all duration-300"
                  assign="Edit"
                />
              </Link>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 hover:scale-105 transition-all duration-300"
                onClick={deletePost}
                assign="Delete"
              />
            </div>
          )}

          
          <div className="flex flex-col md:flex-row gap-8">
            
            <div className="flex-shrink-0">
              <img
                src={productData.imageUrl || "https://via.placeholder.com/300"}
                alt={productData.productName}
                className="w-full max-w-sm h-64 object-cover rounded-lg"
              />
            </div>

            
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 capitalize">
                {productData.productName}
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                {productData.description}
              </p>
              <p className="text-xl md:text-2xl text-indigo-600 font-bold mt-4">
                ₹{parseFloat(productData.price).toFixed(2)}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Sold by{" "}
                <Link
                  to={`/sellerInfo/${slug}`}
                  className="text-indigo-600 hover:underline"
                >
                  {productData.seller_id}
                </Link>
              </p>

              
              {!isAuthor && (
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  {isInCart ? (
                    <button
                      onClick={handleRemove}
                      className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-600 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Remove from Cart
                    </button>
                  ) : (
                    <button
                      onClick={handleAdd}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
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
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add to Cart
                    </button>
                  )}
                  <Link
                    to={`/sellerInfo/${slug}`}
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-300 hover:scale-105 transition-all duration-300 text-center"
                  >
                    Buy Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
