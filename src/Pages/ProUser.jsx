import {  useState } from "react";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import useLoggedUser from "../hooks/useLoggedUser";
import useAuth from "../hooks/useAuth";
import SectionTitle from "../Shared/SectionTitle";
import useAxiosPublic from "../hooks/useAxiosPublic";


const ProUser = () => {
  const axiosPublic = useAxiosPublic();
  const  [loggedUser] = useLoggedUser();
  const {user} = useAuth();
  const [role,setRole] = useState('Pro User');
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');

  

  const handleButtonClick = (value) => {
    setInputValue(value);
  };
  

  const handleSubmit = async(e) => {

    e.preventDefault();
    const form = e.target;
    const amount =parseInt(form.donation.value);
    console.log(amount)

   if(amount===500||amount===1000) setRole('Surveyor') 

    const paymentInf = {
      amount,
      email:user?.email,
      role:role
     
    }

  const {data} = await axiosPublic.post('/payment',paymentInf)

  console.log(data);
  if(data.insertedId){
    navigate('/payment')
  }
   
  }
  return (
    <div className="p-24 text-center">
          <SectionTitle>Pay For Pro-user/Surveyor</SectionTitle>
      <div className="flex justify-center items-center">
    
     <ScrollRestoration></ScrollRestoration>
     
     

     <div className="md:w-1/3 text-center" >
    <div className="flex flex-col gap-4">

    <button className="btn bg-violet-700 text-white" onClick={() => handleButtonClick(10)}>$<span className="text-orange-400">10</span>/week for<span className="text-yellow-400">Pro</span>User</button>

      <button className="btn bg-violet-700 text-white" onClick={() => handleButtonClick(30)}>$<span className="text-orange-400">30</span>/month for<span className="text-yellow-400">Pro</span>User</button>

      <button className="btn bg-violet-700 text-white" onClick={() => handleButtonClick(150)}>$<span className="text-orange-400">150</span>/6 month for<span className="text-yellow-400">Pro</span>User</button>

      <button className="btn bg-blue-700 text-white text-xl" onClick={() => handleButtonClick(500)}>$<span className="text-orange-400">500</span>/month for<span className="text-pink-400">Surveyor</span></button>

      <button className="btn text-xl bg-blue-700 text-white" onClick={() => handleButtonClick(1000)}>$<span className="text-orange-400">1000</span>/month for<span className="text-pink-400">Surveyor</span></button>
    
    </div>
     <form className="my-8"  onSubmit={handleSubmit}>
    <label className="flex ">
    <span className="left-5 top-3 relative">$</span>
     <input 
       name="donation"
        type="text" 
        value={inputValue} 
        // onChange={handleInputChange} 
        className="input input-bordered w-full mr-2  px-5"
      />
    </label>
      <br />

      {
        user?  
        loggedUser?.role === 'user'?
        <input required type="submit" className="btn ml-1 my-5 bg-yellow-600 w-full " value="Pay Now" />
        :
        <input disabled required type="submit" className="btn ml-1 my-5 bg-yellow-600 w-full " value="Pay Now" />
        :
      <input disabled required type="submit" className="btn ml-1 my-5 bg-yellow-600 w-full " value="Pay Now" />
      }
      
     

     </form>
    </div>
    </div>
    </div>
  );
};

export default ProUser;