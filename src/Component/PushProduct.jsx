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
    },
  });

  const userData = useSelector((state) => state.authorization.userData);
  const u_id = userData?.data?.user_metadata?.sub;

  const goodsInclusion = async (data) => {
    try {
      const fileName = data.image[0]?.name + "-" + Date.now();
      if (ProductObject && Object.keys(ProductObject).length > 0) {
        // Update existing product
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
        // Add new product
        const response = await warehouse.uploadFile(fileName, data.image[0]);
        if (response) {
          const { data: publicUrlData } = warehouse.getPublicUrl(fileName);
          const publicUrl = publicUrlData.publicUrl;
          const { error } = await warehouse.contributeToStore({
            ...data,
            imageUrl: publicUrl,
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
    <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-12rem)]">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
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
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.productName ? "border-red-400" : "border-gray-200"
              } bg-gray-50 text-gray-900 placeholder-gray-400`}
            />
            {errors.productName && (
              <p className="mt-2 text-sm text-red-500 font-medium animate-fade-in">
                {errors.productName.message}
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
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.description ? "border-red-400" : "border-gray-200"
              } bg-gray-50 text-gray-900 placeholder-gray-400 resize-y min-h-[100px]`}
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-500 font-medium animate-fade-in">
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
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.price ? "border-red-400" : "border-gray-200"
              } bg-gray-50 text-gray-900 placeholder-gray-400`}
            />
            {errors.price && (
              <p className="mt-2 text-sm text-red-500 font-medium animate-fade-in">
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
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.image ? "border-red-400" : "border-gray-200"
              } bg-gray-50 text-gray-900 placeholder-gray-400`}
            />
            {errors.image && (
              <p className="mt-2 text-sm text-red-500 font-medium animate-fade-in">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all duration-300 ${
              ProductObject ? "bg-green-600 hover:bg-green-700 hover:scale-105" : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
            }`}
            assign={ProductObject && Object.keys(ProductObject).length > 0 ? "Update" : "Submit"}
          />
        </form>
      </div>
    </div>
  );
}

export default PushProduct;
