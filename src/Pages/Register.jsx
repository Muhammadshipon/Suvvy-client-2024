import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, ScrollRestoration } from "react-router-dom";


const Register = () => {
  const [showPassword,setShowPassword] = useState(false);
  const handleRegister = e =>{
    e.preventDefault();
  }

  return (
    <div className="flex justify-center item-center px-5">
  
 <ScrollRestoration></ScrollRestoration>
     <div 
     data-aos="zoom-up"
     data-aos-delay="50"
    data-aos-duration="1000"
     className="w-full  mb-14 max-w-md p-4 mt-32 rounded-3xl shadow-xl border-2 border-gray-400 sm:p-8 ">
 <h2 className="mb-3 text-3xl font-semibold text-center ">Create your account</h2>
 <form onSubmit={handleRegister}  className="space-y-8 ">
   <div className="space-y-4">
     <div className="space-y-2">
       <label htmlFor="name" className="block text-sm ">Name</label>
       <input type="text"  required name="name" id="name" placeholder="Your Full Name" className="w-full px-3 py-3 border rounded-md border-gray-700 bg-gray-200 text-gray-900 focus:border-violet-400" />
     </div>
     <div className="space-y-2">
       <label htmlFor="email" className="block text-sm " >Email address</label>
       <input type="email" required name="email" id="email" placeholder="Your Email" className="w-full px-3 py-3 border rounded-md border-gray-700 bg-gray-200 text-gray-900 focus:border-violet-400" />
     </div>
     
     <div className="space-y-2">
       <label htmlFor="photo" className="block text-sm " >Photo</label>
       <input required type="text" name="photo" id="photo" placeholder="Photo Url" className="w-full px-3 py-3 border rounded-md border-gray-700 bg-gray-200 text-gray-900 focus:border-violet-400" />
     </div>
     <div className="space-y-2">
       <div className="flex justify-between">
         <label htmlFor="password" className="text-sm ">Password</label>
         <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400">Forgot password?</a>
       </div>
       <div className="flex items-center w-full relative">
       <input required type={showPassword? "text":"password"}  name="password" id="password" placeholder="Enter Your Password" className="w-full px-3 py-3 border rounded-md border-gray-700 bg-gray-200 text-gray-900 focus:border-violet-400" />
       <span className="right-3 text-gray-500 absolute  text-2xl" onClick={()=>setShowPassword(!showPassword)}>
       {showPassword?<IoMdEyeOff />
        : <IoMdEye />
       
       }
       </span>
       </div>
     </div>
   </div>
   <button className="btn bg-cyan-500 font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg  hover:scale-105 w-full">Register</button>
 </form>
 <p className="text-sm text-center mt-3 ">Already have an account?
 <Link to={"/login"}><p className="focus:underline hover:underline text-green-400">log in here</p></Link>
 </p>

 


 

 
</div>
   </div>
  );
};

export default Register;