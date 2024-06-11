import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const usePayment = () => {
  const {user} = useAuth();
  const axiosPublic = useAxiosPublic();

  return [payment]
};

export default usePayment;