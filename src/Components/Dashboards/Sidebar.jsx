import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { BsClipboardCheck, BsFillHouseAddFill, } from 'react-icons/bs'
import {  } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { MdHomeWork } from 'react-icons/md'
import useAuth from '../../hooks/useAuth'
import useLoggedUser from '../../hooks/useLoggedUser'
import { FaOptinMonster } from 'react-icons/fa6'

const Sidebar = () => {
  const { logOut } = useAuth();
  const [loggedUser] = useLoggedUser();
  const [isActive, setActive] = useState(false)

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  return (
    <>
   
      {/* Small Screen Navbar */}
         <div className=' bg-gradient-to-r  from-blue-500 via-purple-500 to-pink-500 text-gray-100 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
            <a className="btn  btn-ghost text-4xl font-sans text-white">Suvvy</a>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5 ' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10  md:fixed flex flex-col justify-between overflow-x-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white w-64  space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full '
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 rounded-lg justify-center items-center  mx-auto bg-gradient-to-r from-blue-700 via-purple-800 to-pink-700'>
              <Link to='/'>
              <a className="btn  btn-ghost text-4xl font-sans text-white">Suvvy</a>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}








            {/*  Menu Items */}

            <nav>

            <NavLink
            to='/dashboard' end
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-700'
              }`
            }
          >
            <FcSettings className='w-5 h-5' />

            <span className='mx-4 font-medium'>Profile</span>
          </NavLink>





            {/* surveyor  */}
            {loggedUser?.role === 'surveyor'&&<>
           
              <NavLink
                to='/dashboard/surveyor/surveys'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-gray-100' : 'text-gray-700'
                  }`
                }
              >
                <BsGraphUp className='w-5 h-5' />

                <span className='mx-4 font-medium'>Surveys</span>
              </NavLink>




              {/* Add Survey */}
              <NavLink
                to='/dashboard/create-survey'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-700'
                  }`
                }
              >
                <BsFillHouseAddFill className='w-5 h-5' />

                <span className='mx-4 font-medium'>Create Survey</span>
              </NavLink>
             
              <NavLink
                to='/dashboard/surveyor/response'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-700'
                  }`
                }
              >
                <MdHomeWork className='w-5 h-5' />

                <span className='mx-4 font-medium'>Response</span>
              </NavLink>
            
            
            
            
            </>}
          



            {/* user  */}


            {
              loggedUser?.role === 'user'&&<>
               
              {/* My surveys */}
              <NavLink
                to='/dashboard/user/my-surveys'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-gray-100' : 'text-gray-700'
                  }`
                }
              >
                
                 <BsClipboardCheck className='w-5 h-5'/>
                <span className='mx-4 font-medium'>My Surveys</span>
              </NavLink>

              
              <NavLink
                to='/dashboard/user/my-reports'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-700'
                  }`
                }
              >
                <BsFillHouseAddFill className='w-5 h-5' />

                <span className='mx-4 font-medium'>Reports</span>
              </NavLink>
              {/* My Listing */}
              <NavLink
                to='my-listings'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-700'
                  }`
                }
              >
                <MdHomeWork className='w-5 h-5' />

                <span className='mx-4 font-medium'>My Listings</span>
              </NavLink>
            
              
              </>
            }
            </nav>
                









          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
       
          <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar