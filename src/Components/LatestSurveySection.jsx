import { useEffect, useState } from "react";
import SectionTitle from "../Shared/SectionTitle";
import SurveyCard from "../Shared/SurveyCard";


const LatestSurveySection = () => {
  const [surveys,setSurveys] = useState([]);
  useEffect(()=>{
    fetch('survey.json')
    .then(res=>res.json())
    .then(data=>setSurveys(data));
    
  },[])
  return (
    <div className="px-5 relative bottom-48 bg-white  rounded-t-[100px]   flex flex-col justify-center items-center">
       <SectionTitle>Latest Surveys</SectionTitle>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20 ">
      {
        surveys.map((survey,idx)=><SurveyCard className='bg-yellow-500' survey={survey} key={idx}></SurveyCard>)
      }
      
      </div>  
    </div>
  );
};

export default LatestSurveySection;