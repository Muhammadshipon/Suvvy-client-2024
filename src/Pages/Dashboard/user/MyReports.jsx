import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MyReports = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const {data:myReports=[]} = useQuery({
    queryKey:['mySurveys'],
    enabled:!!user?.email,
    queryFn:async()=>{
      const {data} = await axiosSecure.get(`/my-reports?email=${user?.email}`);
      console.log(data);
      return data;
    }
  })
  console.log(myReports);
  return (
    <div>
      
    </div>
  );
};

export default MyReports;