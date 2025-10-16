import { useSelector } from "react-redux";
import { warehouse } from "../Database/Warehouse";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";

function PushProduct({ ProductObject }) {
  const navigate = useNavigate();
  const { slug, id } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      productName: ProductObject?.productName || "",
      description: ProductObject?.description || "",
      price: ProductObject?.price || "",
      imageUrl: ProductObject?.imageUrl || "",
      category: ProductObject?.category || "Stationary",
    },
  });

  const userData = useSelector((state) => state.authorization.userData);
  const u_id = userData?.data?.user_metadata?.sub;

  const goodsInclusion = async (data) => {
    try {
      const fileName = data.image[0]?.name + "-" + Date.now();
      if (ProductObject && Object.keys(ProductObject).length > 0) {
        console.log("Updation initiated");
        const response = await warehouse.uploadFile(fileName, data.image[0]);
        if (response) {
          const { data: publicUrlData } = warehouse.getPublicUrl(fileName);
          const publicUrl = publicUrlData.publicUrl;
          const { error } = await warehouse.updateInProduct({
            productName: data.productName,
            price: data.price,
            pid: id,
            imageUrl: publicUrl,
            description: data.description,
            category: data.category,
          });
          if (error) {
            console.error("Problem while updating the product (ERR): ", error);
          } else {
            navigate(`/product/${slug}/${id}`);
          }
        } else {
          console.warn("DB RESPONSE FAILED");
        }
      } else {
        const response = await warehouse.uploadFile(fileName, data.image[0]);
        if (response) {
          const { data: publicUrlData } = warehouse.getPublicUrl(fileName);
          const publicUrl = publicUrlData.publicUrl;
          const { error } = await warehouse.contributeToStore({
            productName: data.productName,
            price: data.price,
            imageUrl: publicUrl,
            description: data.description,
            category: data.category,
            seller_id: u_id,
          });
          if (error) {
            console.error("ERROR...", error);
          } else {
            console.log("Product added successfully...");
            navigate("/");
          }
        } else {
          console.error("DB response error (file)");
          navigate("/add-product");
        }
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-12rem)] bg-gradient-to-br from-white to-red-100">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-red-200 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 text-center mb-8 tracking-tight">
          {ProductObject && Object.keys(ProductObject).length > 0
            ? "Update Product"
            : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit(goodsInclusion)} className="space-y-6">
          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Product Name
            </label>
            <Input
              id="productName"
              type="text"
              placeholder="Enter product name (with model/variant/company)"
              {...register("productName", {
                required: "Product Name is required",
                pattern: {
                  value: /^[a-zA-Z0-9\s\-]+$/i,
                  message: "Only letters, numbers, spaces, and hyphens allowed",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                errors.productName ? "border-red-400" : "border-gray-200"
              } bg-gray-50 text-gray-900 placeholder-gray-400 focus:shadow-md hover:border-red-300`}
            />
            {errors.productName && (
              <p className="mt-2 text-sm text-red-500 font-medium animate-pulse">
                {errors.productName.message}
              </p>
            )}
          </div>

          {/* Category Dropdown */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                {...register("category", {
                  required: "Category is required",
                })}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none bg-gray-50 text-gray-900 placeholder-gray-400 hover:border-red-300 ${
                  errors.category ? "border-red-400" : "border-gray-200"
                } focus:shadow-md bg-gradient-to-r from-white to-red-50 pr-10`}
              >
                <option value="Stationary">Stationary</option>
                <option value="Fashion">Fashion</option>
                <option value="Electronics">Electronics</option>
                <option value="Akash">Akash</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {errors.category && (
              <p className="mt-2 text-sm text-red-500 font-medium animate-pulse">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Brief description of your product"
              {...register("description", {
                required: "Description is required",
                maxLength: {
                  value: 200,
                  message: "Description cannot exceed 200 characters",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                errors.description ? "border-red-400" : "border-gray-200"
              } bg-gray-50 text-gray-900 placeholder-gray-400 focus:shadow-md hover:border-red-300 resize-y min-h-[100px]`}
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-500 font-medium animate-pulse">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Price (in ₹)
            </label>
            <Input
              id="price"
              type="number"
              placeholder="Price of your product (in INR)"
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 1,
                  message: "Price must be at least 1",
                },
                max: {
                  value: 99999,
                  message: "Price cannot exceed ₹99,999",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                errors.price ? "border-red-400" : "border-gray-200"
              } bg-gray-50 text-gray-900 placeholder-gray-400 focus:shadow-md hover:border-red-300`}
            />
            {errors.price && (
              <p className="mt-2 text-sm text-red-500 font-medium animate-pulse">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Product Image
            </label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              {...register("image", {
                required: "Image is required",
              })}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                errors.image ? "border-red-400" : "border-gray-200"
              } bg-gray-50 text-gray-900 placeholder-gray-400 focus:shadow-md hover:border-red-300`}
            />
            {errors.image && (
              <p className="mt-2 text-sm text-red-500 font-medium animate-pulse">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all duration-300 ${
              ProductObject ? "bg-green-600 hover:bg-green-700 hover:scale-105" : "bg-red-500 hover:bg-red-600 hover:scale-105"
            } focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md hover:shadow-lg`}
            assign={ProductObject && Object.keys(ProductObject).length > 0 ? "Update" : "Submit"}
          />
        </form>
      </div>
    </div>
  );
}

export default PushProduct;
