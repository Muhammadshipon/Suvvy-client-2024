// import { useEffect, useState } from "react";
import SectionTitle from "../Shared/SectionTitle";
import SurveyCard from "../Shared/SurveyCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";


const FeaturedSurveySection = () => {

  const axiosPublic = useAxiosPublic();
  // const [surveys,setSurveys] = useState([]);
  // useEffect(()=>{
  //   fetch('survey.json')
  //   .then(res=>res.json())
  //   .then(data=>setSurveys(data));
    
  // },[])

  const {data:surveys=[]} = useQuery({
    queryKey:['surveys'],
    queryFn:async()=>{
      const {data} = await axiosPublic.get('/surveys');
      return data;
    }
  })


  return (
    <div className="px-5 pb-40 bg-gradient-to-r  from-gray-200 to-[#A0ABEB]    rounded-t-[100px]  relative bottom-24 flex flex-col justify-center items-center">
       <SectionTitle>Featured Surveys</SectionTitle>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  ">
      {
        surveys.map((survey,idx)=><SurveyCard survey={survey} key={idx}></SurveyCard>)
      }
      
      </div>  
    </div>
  );
};

export default FeaturedSurveySection;