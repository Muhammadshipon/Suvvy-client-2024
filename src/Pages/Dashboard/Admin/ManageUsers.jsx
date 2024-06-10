import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Shared/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {  useEffect, useState } from "react";



const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [filter,setFilter] = useState('all');
  const [displayUsers,setDisplayUsers] = useState([]);
  
  const {data:users=[],refetch} = useQuery({
    queryKey:['users'],
    queryFn:async()=>{
      const {data} = await axiosSecure.get(`/all-users`)
      return data;
    }
  })
  console.log(filter);


useEffect(()=>{

  if(filter==='all'){
    setDisplayUsers(users)
  }
  if(filter==='admin'){
    const admin = users.filter(user=>user.role==='admin');
    setDisplayUsers(admin);
  }
  if(filter==='surveyor'){
    const surveyor = users.filter(user=>user.role==='surveyor');
    setDisplayUsers(surveyor);
  }
  if(filter==='prouser'){
    const prouser = users.filter(user=>user.role==='prouser');
    setDisplayUsers(prouser);
  }
  if(filter==='user'){
    const user = users.filter(user=>user.role==='user');
    setDisplayUsers(user);
  }



},[filter,users])
  


const handleUserRole =async(id,role)=>{
  console.log(id,role);
  const {data} = await axiosSecure.patch(`/users/${id}`,{role:role});
  console.log(data);
   if(data.modifiedCount>0){
    refetch();
    Swal.fire({
      title: `Role Changed Successfully`,
       timer:2000,
      icon: "success"
    });
   }

}

  return (
    <div className="text-center">
    <div className="flex flex-col md:flex-row items-center ">
    <SectionTitle>All Users</SectionTitle>

    <select value={filter} onChange={(e)=>setFilter(e.target.value)}  className="select select-full max-w-xs  bg-gray-200 md:mr-20 ">
                
                <option value='all'>All User</option>              
                <option value='admin'>admin</option>              
                <option value='surveyor'>surveyor</option>
                <option value='prouser'>Pro user</option>
                <option value='user'>user</option>
                
           </select>
    </div>
    <div className="overflow-x-auto max-w-5xl px-10 mx-auto mb-10">
     <table className="table">
       {/* head */}
       <thead>
         <tr>

           <th>SI</th>
           <th>Name</th>
            <th>Email</th>
           <th>Role </th>
           <th>Change Role</th>
          

         </tr>
       </thead>
       <tbody>
         {/* row 1 */}



         {
           displayUsers.map((user,idx)=>(

             <tr key={user._id}>
             <td>{idx+1}</td>
             <td>
               
                 <p>{user.name}</p>
             </td>
            
            <td>{user.email}</td>
            <td className="text-pink-600 font-bold">{user.role}</td>

             <td>
           
            
             <select value={user.role} onChange={(e)=>handleUserRole(user._id, e.target.value)}  className="select select-xs max-w-xs bg-violet-800 text-white">
                
                 <option value='admin'>admin</option>              
                 <option value='surveyor'>surveyor</option>
                 <option value='prouser'>Pro user</option>
                 <option value='user'>user</option>
                 
            </select> 
           
             
             </td>
            
           </tr>
          





           ))
         }
        
        
       </tbody>
      
      {users.length===0 && <p className="text-xl mt-10 ml-5">No Data Available...</p>}

     </table>
   </div> 
  </div>
  );
};

export default ManageUsers;