
import SectionTitle from "../Shared/SectionTitle";
import SurveyCard from "../Shared/SurveyCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";


const LatestSurveySection = () => {
  const axiosPublic = useAxiosPublic();

  const {data:surveys=[]} = useQuery({
    queryKey:['latestSurveys'],
    queryFn:async()=>{
      const {data} = await axiosPublic.get('/surveys/latest');
      return data;
    }
  })

  const publishSurveys = surveys?.filter(survey=>survey.status === 'publish')
  return (
    <div className="px-5 relative bottom-48 bg-white  rounded-t-[100px]   flex flex-col justify-center items-center">
       <SectionTitle>Latest Surveys</SectionTitle>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20 ">
      {
        publishSurveys.map((survey,idx)=><SurveyCard className='bg-yellow-500' survey={survey} key={idx}></SurveyCard>)
      }
      
      </div>  
    </div>
  );
};

export default LatestSurveySection;