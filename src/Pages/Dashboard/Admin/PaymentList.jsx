import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/SectionTitle";


const PaymentList = () => {
 
  const axiosSecure = useAxiosSecure();

  const {data:payments=[],refetch} = useQuery({
    queryKey:['payments'],
    queryFn:async()=>{
      const {data} = await axiosSecure.get('/payments')
      return data;
    }
  })
  console.log(payments);
  return (
    <div className="text-center">
    <SectionTitle>Payment History</SectionTitle>

    <div className="overflow-x-auto max-w-5xl px-10 mx-auto mb-10">
     <table className="table">
       {/* head */}
       <thead>
         <tr>
           <th>SI</th>
           <th>User Email</th>
          <th>Date</th>
           <th>Transaction Id</th>

           <th>Amount</th>
         </tr>
       </thead>
       <tbody>
         {/* row 1 */}



         {
           payments.map((item,idx)=>(

             <tr key={item._id}>
             <td>{idx+1}</td>
             <td>
               
                 <p>{item.email}</p>
             </td>
            
            

             <td>
             <td>{new Date(item.date).toDateString()}</td>
             </td>
             <td>
               {item.transactionId}
             </td>
             <th>
               ${item.amount}
             </th>
           </tr>
          





           ))
         }
        
        
       </tbody>
      
       {payments.length===0 && <p className="text-xl mt-10 ml-5">No Data Available...</p>}

     </table>
   </div> 
  </div>
  );
};

export default PaymentList;