import { master } from "./Master";

class AuthService {
 signUpNewUser = async ({name,email,phone,password})=> {
   try {
    const {data,error} = await master.auth.signUp({
    email: email,
    password: password,
  });
  
  if(!error){
    const u_id = data.user.id;
    const {error} = await master.from("carts").insert([{cart_id:u_id}]);
    if(error){
      console.error("cart can't be created ...",error);
      return 
    }
      return await master.from("users").insert([{id:u_id,name:name,email:email,phone:phone,password:password}])

  }else{
    console.error("user can't be created : ",error);
    return ;
  }
   } catch (error) {
    console.error("user can't be created : ",error)
   }
 }

 signIn = async ({email,password})=> {
  try {
    return await master.auth.signInWithPassword({
    email: email,
    password: password,
  });

  } catch (error) {
    console.error("login error in Auth.js : ",error)
  }
 }

 getCurrentUser = async ()=>{
    try {
        const {data,error} = await master.auth.getUser();
         if (error) {
          return {
            data: null,
            error: error.message,
          };
        }
        return {
          data: data.user,
          error:null
        }  
    } catch (error) {
        console.error("error in fetching current user (ERR): ",error)
    }
 }

 signout = async()=>{
      try {
        return await master.auth.signOut()
      } catch (error) {
        console.error("error while signout : ",error)
      }
 };

  getSellerInfo = async(seller_id) => {
  const { data, error } = await master
    .from("users")
    .select("name,email,phone")
    .eq("id", seller_id)
    .single();

  if (error) {
    console.error("Error fetching seller info:", error);
    return null;
  }
  return data;
}


}

export const Auth = new AuthService();


