import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Home from "../Pages/Home";


const MainLayouts = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      <Navbar></Navbar>
     <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayouts;