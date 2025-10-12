import { master } from "./Master.js";

class Cart {
  addInUserCart = async(u_id,productDetail={})=>{
    try {

        const { data:existingData, error } = await master.from('carts').select("*").eq("cart_id",u_id);
        if(error){
            console.error("cannot be added in cart(.2):",error)
        }
        let currentArray = existingData[0]?.user_cart || [];
        
        currentArray.push(productDetail); 
        
        const {data,error: updateError } = await master
          .from('carts')
          .update({"user_cart": currentArray })
          .eq('cart_id', u_id);
          if (updateError) {
              console.error('Error updating array:', updateError);
             
            }
            
    } catch (error) {
       console.error("cannot be added in cart(.1):",error) ;
      }
  };

  removeFromUserCart = async(u_id,productDetail = {})=>{
    try {
       const { data: existingData, error: fetchError } = await master
      .from("carts")
      .select("*")
      .eq("cart_id", u_id)

    if (fetchError) {
      console.error("Error fetching cart:", fetchError);
      return;
    }
    let currentArray = existingData[0]?.user_cart || [];

    
    const updatedArray = currentArray.filter(
      (item) => item.pid!==productDetail.pid 
    );

    
    const { data: updatedData, error: updateError } = await master
      .from("carts")
      .update({ user_cart: updatedArray })
      .eq("cart_id", u_id);

    if (updateError) {
      console.error("Error updating cart:", updateError);
    } 
    } catch (error) {
        console.error("cannot be removed from cart(.1):",error)  
    }
  }

  getTheUserCart = async (u_id)=>{
        const { data:existingData, error } = await master.from('carts').select("*").eq("cart_id",u_id);
        if(error){
            console.error("can't fetch cart at this moment",error);
        }
        return existingData
  }
};

export const cart = new Cart();