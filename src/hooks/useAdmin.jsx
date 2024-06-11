import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";



const useAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const {user, loading} = useAuth();

 
  const {data:isAdmin, isLoading} = useQuery({
    queryKey:[user?.email,'isAdmin'], 
    enabled: !loading ,
    queryFn:async() => {
        const {data} = await axiosSecure.get(`/users/admin/${user.email}`)
        console.log(data);
        return data?.admin;
    }
  })
  return [isAdmin,isLoading];
};

export default useAdmin;