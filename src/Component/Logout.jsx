
import { Auth } from "../Database/Auth"
import { logout } from "../Store/Slice/AuthSlice.js"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate()
   const dispatch = useDispatch();
   const logoutHandler = async ()=>{
    const {error} = await Auth.signout();
    if(error) {
        console.log(error);
    }else{
        dispatch(logout());
        navigate("/")
    }

  }

  return (
    <div>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default Logout
