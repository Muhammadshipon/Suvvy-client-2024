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
import MyComments from "../Pages/Dashboard/proUser/MyComments";
import UpdateSurveys from "../Pages/Dashboard/surveyor/UpdateSurveys";
import UpdateSurveyForm from "../Pages/Dashboard/surveyor/UpdateSurveyForm";
import SurveyResponse from "../Pages/Dashboard/surveyor/SurveyResponse";
import SurveyResponseDetails from "../Pages/Dashboard/surveyor/SurveyResponseDetails";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import AllSurveys from "../Pages/Dashboard/Admin/AllSurveys";
import Feedbacks from "../Pages/Dashboard/surveyor/Feedbacks";
import SurveysPage from "../Pages/SurveysPage";

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
        path:"/surveys",
        element:<SurveysPage></SurveysPage>
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
      {
        path:'/dashboard/update-surveys',
        element:<PrivateRoute><UpdateSurveys></UpdateSurveys></PrivateRoute>
      },
      {
        path:'/dashboard/update/:id',
        element:<PrivateRoute><UpdateSurveyForm></UpdateSurveyForm></PrivateRoute>
      },
      {
        path:"/dashboard/surveyor/response",
        element:<PrivateRoute><SurveyResponse></SurveyResponse></PrivateRoute>
      },
      {
        path:"/dashboard/surveyor/feedback",
        element:<PrivateRoute><Feedbacks></Feedbacks></PrivateRoute>
      },
      {
        path:"/dashboard/response/:id",
        element:<PrivateRoute><SurveyResponseDetails></SurveyResponseDetails></PrivateRoute>
      },

          //  user 
      {
        path:'/dashboard/user/my-surveys',
        element:<PrivateRoute><MySurveys></MySurveys></PrivateRoute>
      },    
      {
        path:'/dashboard/user/my-reports',
        element:<PrivateRoute><MyReports></MyReports></PrivateRoute>
      } ,
            // pro User    
      {
        path:'/dashboard/user/my-comments',
        element:<PrivateRoute><MyComments></MyComments></PrivateRoute>
      },    
            //  Admin 
      {
        path:'/dashboard/admin/manage-users',
        element:<PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
      },    
      {
        path:'/dashboard/admin/all-surveys',
        element:<PrivateRoute><AllSurveys></AllSurveys></PrivateRoute>
      },    
    ]
  }
]);