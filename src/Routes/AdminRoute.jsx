import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";



const AdminRoute = ({ children }) => {
    const { user, loading, logOut } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    // const location = useLocation() 

    if (loading || isAdminLoading) {
        return <div className="w-screen mx-auto">
          <progress className="progress text-center "></progress>
        </div>
    }

    if (user && isAdmin) {
        return children;
    }

    else{
        // return <Navigate to={"/login"} state={location.pathname}></Navigate>
        return logOut();
    }
  

};

export default AdminRoute;