import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/SectionTitle";


const Feedbacks = () => {
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

  const unpublishedSurveys = surveys.filter(survey=>survey.status==='unpublished');
  
  return (
    <div className="text-center">
    <SectionTitle>Unpublished Surveys Feedback</SectionTitle>

    <div className="overflow-x-auto max-w-5xl px-10 mx-auto mb-10">
     <table className="table">
       {/* head */}
       <thead>
         <tr>
           <th>SI</th>
           <th>Survey Title</th>
            <th>Status</th>
          
           <th>Category</th>

           <th>Feedback</th>
         </tr>
       </thead>
       <tbody>
         {/* row 1 */}



         {
           unpublishedSurveys.map((item,idx)=>(

             <tr key={item._id}>
             <td>{idx+1}</td>
             <td>
               
                 <p>{item.title}</p>
             </td>
            
            <td>{item.status}</td>

             <td>
               {item.category}
             </td>
             <th>
               {item.feedback}
             </th>
           </tr>
          





           ))
         }
        
        
       </tbody>
      
      {unpublishedSurveys.length===0 && <p className="text-xl mt-10 ml-5">No Data Available...</p>}

     </table>
   </div> 
  </div>
  );
};

export default Feedbacks;