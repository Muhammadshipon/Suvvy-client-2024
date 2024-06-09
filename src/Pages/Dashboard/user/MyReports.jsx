import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import SectionTitle from "../../../Shared/SectionTitle";
import { FaEye } from "react-icons/fa6";


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
    <div className="text-center">
    <SectionTitle>My Reports </SectionTitle>

    <div className="overflow-x-auto max-w-5xl px-10 mx-auto mb-10">
     <table className="table">
       {/* head */}
       <thead>
         <tr>
           <th>SI</th>
           <th>Survey Title</th>
          
           <th>Report</th>

           <th>View Survey</th>
         </tr>
       </thead>
       <tbody>
         {/* row 1 */}



         {
           myReports.map((item,idx)=>(

             <tr key={item._id}>
             <td>{idx+1}</td>
             <td>
               
                 <p>{item.title}</p>
             </td>
            
            

             <td>
               {item.report}
             </td>
             <th>
           <Link to={`/survey/details/${item.surveyId}`}><span className="flex items-center gap-2"><FaEye></FaEye>view</span></Link>
             </th>
           </tr>
          





           ))
         }
        
        
       </tbody>
      
       {myReports.length===0 && <p className="text-xl mt-10 ml-5">No Data Available...</p>}

     </table>
   </div> 
  </div>
  );
};

export default MyReports;