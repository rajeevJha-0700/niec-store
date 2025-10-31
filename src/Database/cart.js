import { master } from "./Master.js";

class Cart {
  addInUserCart = async(u_id,p_id)=>{
    try {

        const { data:existingData, error } = await master.from('carts').insert([{user_id:u_id,product_id:p_id}]);
        if(error){
            console.error("cannot be added in cart(.2):",error);
            return error;
        }
      } catch (error) {
       console.error("cannot be added in cart(.1):",error) ;
      }
  };

  removeFromUserCart = async(u_id,p_id)=>{
    try {
     const { error } = await master
     .from('carts')
     .delete()
     .match({ user_id: u_id, product_id: p_id });
     if (error) {
       console.error('Delete error:', error);
     }
    } catch (error) {
        console.error("cannot be removed from cart(.1):",error)  
    }
  }

  getTheUserCart = async (u_id)=>{
    try {
        // 1) Get product IDs in the user's cart
        const { data: cartData, error: cartErr } = await master
          .from('carts')
          .select('product_id')
          .eq('user_id', u_id);
        
        if (cartErr) {
          console.error('Error fetching cart:', cartErr);
          return;
        }
        const productIds = (cartData || []).map(row => row.product_id);//extracts values from object {product_id:xxxxxx} and returns the array of only productId's [xxxxx,yyyy,zzzz]
        
        if (productIds.length === 0) {
          // empty cart
          console.log('No products in cart');
          return;
        }
        
        // 2) Fetch product details
        const { data: products, error: productsErr } = await master
          .from('products')
          .select('*')
          .in('pid', productIds);
        
        if (productsErr) {
          console.error('Error fetching products:', productsErr);
          return productsErr
        } else {
          return products
        }
   } catch (error) {
      console.error("errMessage",error) 
    }
  }
};

export const cart = new Cart();