import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import SectionTitle from "../../../Shared/SectionTitle";
import { FaListCheck } from "react-icons/fa6";


const SurveyResponse = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const {data:surveys=[]} = useQuery({
    queryKey:['surveys'],
    enabled:!!user?.email,
    queryFn: async()=>{
      const {data} = await axiosSecure.get(`/survey?email=${user?.email}`);
      return data; 
    }
  })
  console.log(surveys);
  return (
    <div className="text-center">
    <SectionTitle>surveys Responses</SectionTitle>

    <div className="overflow-x-auto max-w-5xl px-10 mx-auto mb-10">
     <table className="table">
       {/* head */}
       <thead>
         <tr>
           <th>SI</th>
           <th>Survey Title</th>
            <th>Deadline</th>
           <th>Category</th>

           <th>Responses</th>
         </tr>
       </thead>
       <tbody>
         {/* row 1 */}



         {
           surveys.map((item,idx)=>(

             <tr key={item._id}>
             <td>{idx+1}</td>
             <td>
               
                 <p>{item.title}</p>
             </td>
            
            <td>{item.deadline}</td>

             <td>
               {item.category}
             </td>
             <th>
           <Link to={`/dashboard/response/${item._id}`}><span className=" text-pink-600 flex items-center gap-2"><FaListCheck/>Details</span></Link>
             </th>
           </tr>
          





           ))
         }
        
        
       </tbody>
      
      {surveys.length===0 && <p className="text-xl mt-10 ml-5">No Data Available...</p>}

     </table>
   </div> 
  </div>
  );
};

export default SurveyResponse;