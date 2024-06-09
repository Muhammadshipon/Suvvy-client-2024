import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/SectionTitle";
import { FaVoteYea } from "react-icons/fa";
import {  FaChartPie,  FaTable } from "react-icons/fa6";
import { useState } from "react";


const SurveyResponseDetails = () => {
  const [toggle,setToggle] = useState(false);
  const {id} = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: survey = {}, } = useQuery({
    queryKey: ['survey', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/surveys/${id}`);
      return data;
    },
  });
  console.log(survey);

  const totalVotes = survey?.questions?.reduce((total, question) => {
    return total + question.options.yes + question.options.no;
  }, 0);
  const yesVotes = survey?.questions?.reduce((total, question) => {
    return total + question.options.yes;
  }, 0);
  const noVotes = survey?.questions?.reduce((total, question) => {
    return total + question.options.no;
  }, 0);


  const handleToggle=()=>{
    setToggle(!toggle);
  }

  return (
    <div>
       
   <div className="flex justify-around items-center md:mr-32">
   <SectionTitle >{survey.title}</SectionTitle> 
   <div onClick={handleToggle}>
    {
      toggle?<FaTable className="text-3xl animate-bounce text-violet-700"/>: <FaChartPie className="text-3xl animate-spin text-pink-600"/>
    }
   
   </div>
   </div>



   {
    toggle?
     <h1 className="text-5xl">Pi chart</h1>
    :
    <div className="overflow-x-auto max-w-5xl px-10 mx-auto mb-10">
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>SI</th>
          <th>User Name</th>
         
          <th>User Email</th>

          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}



        {
          survey?.response?.map((item,idx)=>(

            <tr key={item._id}>
            <td>{idx+1}</td>
            <td>
              
                <p>{item.userName}</p>
            </td>
           
           

            <td>
              {item.userEmail}
            </td>
            <th>
         <span className=" text-pink-600 flex items-center gap-2"><FaVoteYea/>Voted</span>
            </th>
          </tr>
         





          ))
        }
       
       
      </tbody>

      <tfoot>
     <tr>
       <th></th>
       <th>Yes Vote: <span className="text-green-600">{yesVotes}</span></th>
       <th>No Vote: <span className="text-red-600">{noVotes}</span></th>
       <th>Total Vote: <span className="text-blue-600">{totalVotes}</span></th>
       <th></th>
     </tr>
   </tfoot>
     
     {survey?.response?.length===0 && <p className="text-xl mt-10 ml-5">No Data Available...</p>}

    </table>
  </div> 
   }
  
  </div>


    
  );
};

export default SurveyResponseDetails;