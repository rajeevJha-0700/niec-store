import { master } from "./Master.js";

class Warehouse {
   contributeToStore = async ({productName,price,seller_id,imageUrl,description,category,verifiedProduct})=>{
    try {
        return await master.from("products").insert([{productName:productName,price:price,seller_id:seller_id,imageUrl:imageUrl,description:description,category:category,verifiedProduct}]);
    } catch (error) {
        console.error("error in product contribution(wJS)....",error)
    }
   };

   getAllProducts = async()=>{
    try {
    return await master
    .from('products')
    .select("*")
    } catch (error) {
       console.error("error in product fetching(wJS)....",error); 
    }
   }

   getUserProduct = async (u_id)=>{
     try {
        return await master.from("products").select("*").eq("seller_id",u_id);
     } catch (error) {
        console.error("error while fetching(.1)(wJS-err)...",error)
     }
   }

   getProduct = async(pid)=>{
    try {
        return master.from("products").select("*").eq("pid",pid)
    } catch (error) {
        console.error("error while loading product details(wJS-err)....",error); 
    }
   }

   updateInProduct = async({productName,price,pid,imageUrl,description,category,verifiedProduct})=>{
    try {
        return await master
                .from('products')
                .update([{productName:productName,price:price,imageUrl:imageUrl,description:description,category:category,verifiedProduct:verifiedProduct}])
                .eq('pid', pid)
                
    } catch (error) {
        console.error("error in product updation(.2)??",error)
    }
   }

   deleteProduct = async(pid)=>{
        try {
            return await master.from("products").delete().eq("pid",pid);
        } catch (error) {
            console.error("DB req rejected ",error)
        }
   }

   uploadFile = async(filepath,file)=>{
       try {
        const {data,error} = await master.storage.from("Warehouse").upload(`productsImage/${filepath}`,file,{upsert:true});
        if(error) console.log("error in uploading the file,",error)
        return data;
       } catch (error) {
        console.error("file upload/update request failed ",error)
    }
   }

   getPublicUrl = (filePath)=>{
    try {
            const publicUrl = master.storage.from("Warehouse").getPublicUrl(`productsImage/${filePath}`);
            return publicUrl;
        }
     catch (error) {
        console.error("P-Url cannot be generated ",error)
    }
   }

   deleteFile = async(filepath)=>{
    try {
        return await master.from("productsImage").remove([`productsImage/${filepath}`])
    } catch (error) {
        console.log("file deletion error??",error)
    }
   }
                
}

export const warehouse = new Warehouse();