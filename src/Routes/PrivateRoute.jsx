import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {
  const location = useLocation();
  const {user,loading} = useContext(AuthContext);
  if(loading){
    return <>
     <span className="loading loading-ring loading-xs"></span>
     <span className="loading loading-ring loading-sm"></span>
     <span className="loading loading-ring loading-md"></span>
     <span className="loading loading-ring loading-lg"></span>
    </>
  }
  if(user){
    return children;
  }
  return <Navigate to={'/login'} state={{from:location}} replace></Navigate>

};

export default PrivateRoute;