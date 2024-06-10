import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";


const Login = () => {
const axiosPublic = useAxiosPublic();
 const navigate = useNavigate(); 
const {signIn,googleSignIn} = useAuth();

  const handleLogIn = e =>{
    e.preventDefault();
    const form = e.target;
     const email = form.email.value;
     const password = form.password.value;
     console.log(email,password);

     if(!/^(?=.*[a-z])(?=.*[A-Z]).*$/.test(password)){
      
      Swal.fire({
        title: "Password Type is Wrong",
        text: "Your password should have at least one upperCase and lowerCase character",
        icon: "error"
      });
      return ;
    }
   
    else if(password.length<6){
      Swal.fire({
        title: "Password Type is Wrong",
        text: "password must be at least 6 character",
        icon: "error"
      });
     return;
    }







     signIn(email,password)
     .then(result=>{
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "lOG IN SUCCESSFULLY!",
       
        icon: "success"
      });
      navigate(location?.state? location.state : "/")
     })
     .catch(error=>{
      console.log(error.message);
      Swal.fire({
        title: "Wrong Email or Password",
       
        icon: "error"
      });
     })
  }



  const handleGoogleLogIn =()=>{
    googleSignIn()
    .then(res=>{ 
      const userInf = {
      name: res.user.displayName,
      email: res.user.email,
      role:'user'
      }
      console.log(userInf)
      axiosPublic.post('/users',userInf)
      .then(res=>{
        console.log(res.data);
        navigate(location?.state? location.state : "/")
      })
      console.log(res.user);
      
    })
    .catch(err=>{console.log(err.message)})
  }
  return (
    <div className="flex justify-center items-center mb-16 px-5">
    
    <div 
    data-aos="zoom-in"
    data-aos-delay="50"
   data-aos-duration="1000"
    
    className="flex flex-col max-w-md p-6 rounded-3xl sm:p-10 shadow-xl border-2 border-gray-400 mt-36">
      <div className="mb-8 text-center ">
        <h1 className="my-3 text-4xl font-bold">Log in</h1>
        <p className="text-sm">Log in to access your account</p>
      </div>
      <form onSubmit={handleLogIn} noValidate="" action="" className="space-y-12 ">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
            <input type="email" name="email" id="email" placeholder="Your Email" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-slate-200  text-gray-600" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">Password</label>
              <a rel="noopener noreferrer" href="#" className="text-xs hover:underline ">Forgot password?</a>
            </div>
            <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-slate-200  text-gray-600" />
          </div>
        </div>
     
          <div>
           <input type="submit" value="Log In" className="w-full px-8 py-3 font-semibold rounded-md text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          </div>
          </form>

          <div className="space-y-2">
          <div className="flex items-center pt-4 space-x-1">
  <div className="flex-1 h-px sm:w-16 bg-white"></div>
  <p className="px-3 text-sm ">Login with social accounts</p>
  <div className="flex-1 h-px sm:w-16 bg-white"></div>
</div>
<div className="flex justify-center space-x-4">
  <button onClick={handleGoogleLogIn} aria-label="Log in with Google" className="p-3 hover:scale-150 rounded-sm">
  <svg viewBox="0 0 48 48" className="w-10 h-5 fill-current">

<clipPath id="g">
  <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
</clipPath>
<g className="colors" clipPath="url(#g)">
  <path fill="#FBBC05" d="M0 37V11l17 13z"/>
  <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/>
  <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/>
  <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/>
</g>
</svg>
  </button>
  

</div>








          <p className="px-6 text-sm text-center">Do not have an account yet?
            <Link to={"/register"}><a rel="noopener noreferrer" className="hover:underline text-indigo-400">Register</a>.</Link>
          </p>
        </div>
     



    </div>
<ScrollRestoration></ScrollRestoration>
  </div>
  );
};

export default Login;