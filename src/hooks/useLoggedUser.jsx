import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useLoggedUser = () => {
  const {user} = useAuth();
  const axiosPublic = useAxiosPublic();
  const {data:loggedUser=[]} = useQuery({
    queryKey:['user'],
    enabled:!!user?.email,
    queryFn:async()=>{
      const {data} = await axiosPublic.get(`/users?email=${user?.email}`);
      console.log(data);
      return data;
    }
  })
  return [loggedUser]
};

export default useLoggedUser;