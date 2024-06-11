import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";




const AdminRoute = ({children}) => {
  const location = useLocation();
  const {user,loading} = useAuth();
  const [isAdmin,isLoading] = useAdmin();

  if(loading || isLoading){
    return  <div className="flex flex-row justify-center items-center h-full w-full">
    <span className="loading loading-ring loading-xs"></span>
     <span className="loading loading-ring loading-sm"></span>
     <span className="loading loading-ring loading-md"></span>
     <span className="loading loading-ring loading-lg"></span>
    </div>
  }
  if(user && isAdmin){
    return children;
  }
  return<Navigate to={"/login"} state={location.pathname}></Navigate>

};


export default AdminRoute;