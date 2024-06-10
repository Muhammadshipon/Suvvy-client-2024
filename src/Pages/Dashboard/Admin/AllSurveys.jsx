import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import SectionTitle from "../../../Shared/SectionTitle";
import { FaListCheck } from "react-icons/fa6";
import StatusModal from "./StatusModal";
import { useState } from "react";


const AllSurveys = () => {
  const [openModal,setOpenModal] = useState(false);
  const [id,setId] = useState(null);
  const axiosSecure = useAxiosSecure();

  const {data:surveys=[],refetch} = useQuery({
    queryKey:['users'],
    queryFn:async()=>{
      const {data} = await axiosSecure.get('/surveys')
      return data;
    }
  })
  console.log(surveys);

const handleModal =(_id)=>{
  
   setId(_id);
  setOpenModal(true);
}

console.log('the id is',id);
  return (
    <div className="text-center">
    <SectionTitle>All Surveys</SectionTitle>

    {
            openModal &&  <StatusModal id={id} fetch={refetch}  closeModal={setOpenModal} ></StatusModal>
           }

    <div className="overflow-x-auto max-w-5xl px-10 mx-auto mb-10">
     <table className="table">
       {/* head */}
       <thead>
         <tr>  
           <th>SI</th>
           <th>Survey Title</th>
            <th>Surveyor Email</th>
           <th>Status</th>

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
            
            <td>{item.surveyor}</td>

             <td>
              <button disabled={item.status==="unpublished"} onClick={()=>handleModal(item._id)} className={` text-white px-2 rounded-full hover:scale-105 ${item.status=="publish"? 'bg-violet-600' : 'bg-pink-600 hover:scale-100'}`}> {item.status}</button>
             
              
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

export default AllSurveys;