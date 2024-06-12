import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();


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