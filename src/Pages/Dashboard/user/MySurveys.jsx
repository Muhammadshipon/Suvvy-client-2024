import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/SectionTitle";
import { Link } from "react-router-dom";


import { FaEye } from "react-icons/fa6";


const MySurveys = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const {data:mySurveys=[]} = useQuery({
    queryKey:['mySurveys'],
    enabled:!!user?.email,
    queryFn:async()=>{
      const {data} = await axiosSecure.get(`/my-Surveys?email=${user?.email}`);
      console.log(data);
      return data;
    }
  })
  console.log(mySurveys);
  return (
    <div className="text-center">
      <SectionTitle>Participate in surveys</SectionTitle>

      <div className="overflow-x-auto max-w-5xl px-10 mx-auto mb-10">
       <table className="table">
         {/* head */}
         <thead>
           <tr>
             <th>SI</th>
             <th>Survey Title</th>
            
             <th>Category</th>

             <th>Result</th>
           </tr>
         </thead>
         <tbody>
           {/* row 1 */}



           {
             mySurveys.map((item,idx)=>(

               <tr key={item._id}>
               <td>{idx+1}</td>
               <td>
                 
                   <p>{item.title}</p>
               </td>
              
              

               <td>
                 {item.category}
               </td>
               <th>
             <Link to={`/survey/details/${item.surveyId}`}><span className="flex items-center gap-2"><FaEye></FaEye>view</span></Link>
               </th>
             </tr>
            





             ))
           }
          
          
         </tbody>
        
        

       </table>
     </div> 
    </div>
  );
};

export default MySurveys;