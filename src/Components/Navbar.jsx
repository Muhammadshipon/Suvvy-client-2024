import { Link, NavLink } from "react-router-dom";




const Navbar = () => {
  const link = <>
         <NavLink><li><a>Home</a></li></NavLink>
         <NavLink><li><a>Surveys</a></li></NavLink>
         <NavLink><li><a><span className="text-yellow-400">Pro</span>User</a></li></NavLink>
        
         </>
  return (
    <div className="navbar pr-8 z-50 lg:px-20 opacity-90 fixed bg-gradient-to-r from-[#36347C] to-[#A0ABEB] rounded-b-full max-w-7xl mx-auto ">
    <div className="navbar-start ">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <ul tabIndex={0} className=" text-black menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          {link}
        </ul>
      </div>
      <a className="btn  btn-ghost text-4xl font-sans text-white">Suvvy</a>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1 text-white">
       {link}
      </ul>
    </div>
    <div className="navbar-end">
      <Link className="0">
      <button className=" text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-sm px-8 py-2 rounded-full hover:scale-105 ">Login</button>
      </Link>
    </div>
  </div>
  );
};

export default Navbar;