import PushProduct from "./PushProduct";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { warehouse } from "../Database/Warehouse";
function EditProduct() {
    const {slug,id} = useParams();
    const [productData,setProductData] = useState({});
    useEffect(()=>{
            async function _getProduct(pid) {
              const product = await warehouse.getProduct(pid) 
              setProductData(product.data[0]); 
            };
            _getProduct(id);
        },[slug])
 return (
  <>
    {Object.keys(productData).length === 0 ? (
      <p>Loading product...</p>
    ) : (
      <PushProduct ProductObject={productData} />
    )}
  </>
);

}
export default EditProduct
