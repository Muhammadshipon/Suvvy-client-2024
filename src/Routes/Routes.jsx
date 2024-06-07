import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import CreateSurvey from "../Pages/Dashboard/surveyor/CreateSurvey";
import SurveyDetails from "../Pages/SurveyDetails";

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
    element:<DashboardLayout></DashboardLayout>,
    children:[
      {
        path:'/dashboard',
        element:<CreateSurvey></CreateSurvey>
      }
    ]
  }
]);