import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import CreateSurvey from "../Pages/Dashboard/surveyor/CreateSurvey";
import SurveyDetails from "../Pages/SurveyDetails";
import MySurveys from "../Pages/Dashboard/user/MySurveys";
import PrivateRoute from "./PrivateRoute";
import MyReports from "../Pages/Dashboard/user/MyReports";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Register></Register>
      },
      {
      path:"/survey/details/:surveyId",
      element:<SurveyDetails></SurveyDetails>
      }
    ]
  },
  {
    path:'/dashboard',
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
          // surveyor
      {
        path:'/dashboard/create-survey',
        element:<PrivateRoute><CreateSurvey></CreateSurvey></PrivateRoute>
      },

          //  user 
      {
        path:'/dashboard/user/my-surveys',
        element:<PrivateRoute><MySurveys></MySurveys></PrivateRoute>
      },    
      {
        path:'/dashboard/user/my-reports',
        element:<PrivateRoute><MyReports></MyReports></PrivateRoute>
      }    
    ]
  }
]);