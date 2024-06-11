import {  useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLoggedUser from "../hooks/useLoggedUser";
import useAuth from "../hooks/useAuth";
import SectionTitle from "../Shared/SectionTitle";
import useAxiosPublic from "../hooks/useAxiosPublic";


const ProUser = () => {
  const axiosPublic = useAxiosPublic();
  const  [loggedUser] = useLoggedUser();
  const {user} = useAuth();
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


    const paymentInf = {
      amount,
      email:user?.email,
     
    }

  const {data} = await axiosPublic.post('/payment',paymentInf)

  console.log(data);
  if(data.insertedId){
    navigate('/payment')
  }
   
  }
  return (
    <div className="p-24 text-center">
          <SectionTitle>Please Pay For Be a Pro-user</SectionTitle>
      <div className="flex justify-center items-center">
    
     
     
     

     <div className="md:w-1/4 text-center" >
    <div className="flex flex-col gap-4">
    <button className="btn bg-blue-700 text-white" onClick={() => handleButtonClick(30)}>$30 / 1 Week</button>
      <button className="btn bg-blue-700 text-white" onClick={() => handleButtonClick(50)}>$100 / 1 month</button>
      <button className="btn bg-blue-700 text-white" onClick={() => handleButtonClick(500)}>$500 / 1 year</button>
    
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