import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SectionTitle from "../Shared/SectionTitle";
import SurveyCard from "../Shared/SurveyCard";
import { useEffect, useState } from "react";



const SurveysPage = () => {
  const [filter,setFilter] = useState('all')
  const [sort, setSort] = useState('all')
  const [displaySurveys,setDisplaySurveys] = useState([]);
  const axiosPublic = useAxiosPublic();

  const {data:surveys=[]} = useQuery({
    queryKey:['surveys',sort],
    queryFn:async()=>{
      const {data} = await axiosPublic.get(`/surveys?sort=${sort}`)
      return data;
    }
  })
  console.log(surveys);

  const publishSurveys = surveys?.filter(survey=>survey.status === 'publish')
  useEffect(()=>{

    if(filter==='all'){
      setDisplaySurveys(publishSurveys)
    }
    if(filter==='customer satisfaction'){
      const survey = publishSurveys.filter(survey=>survey.category==='customer satisfaction');
      setDisplaySurveys(survey);
    }
    if(filter==='employee engagement'){
      const survey = publishSurveys.filter(survey=>survey.category==='employee engagement');
      setDisplaySurveys(survey);
    }
    if(filter==='market research'){
      const survey = publishSurveys.filter(survey=>survey.category==='market research');
      setDisplaySurveys(survey);
    }
    if(filter==='political opinion'){
      const survey = publishSurveys.filter(survey=>survey.category==='political opinion');
      setDisplaySurveys(survey);
    } 
    if(filter==='product feedback'){
      const survey = publishSurveys.filter(survey=>survey.category==='product feedback');
      setDisplaySurveys(survey);
    } 
    if(filter==='health and wellness'){
      const survey = publishSurveys.filter(survey=>survey.category==='health and wellness');
      setDisplaySurveys(survey);
    } 
  },[filter,surveys])
  

  return (
    <div className="px-5 pt-24 pb-14     flex flex-col justify-center items-center">
  <div className="flex flex-col md:flex-row justify-between md:gap-20 md:ml-20 items-center">

  <select
          onChange={e => {
            setSort(e.target.value)
            
          }}
          value={sort}
          name='sort'         
          className='select select-full max-w-xs  bg-gray-200'
        >
          <option value='all'>Sort By No. of Vote</option>
          <option value='dsc'>Descending Order</option>
          <option value='asc'>Ascending Order</option>
        </select>



  <SectionTitle>All Surveys</SectionTitle>

<select value={filter} onChange={(e)=>setFilter(e.target.value)}  className="select select-full max-w-xs  bg-gray-200 md:mr-20 ">
            
                          
  <option value='all'>All Surveys</option>              
  <option value="customer satisfaction">Customer Satisfaction</option>
  <option value="employee engagement">Employee Engagement</option>
  <option value="market research">Market Research</option>
  <option value="political opinion">Political Opinion</option>
  <option value="product feedback">Product Feedback</option>
  <option value="health and wellness">Health and Wellness</option>
            
       </select>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  ">
   {
     displaySurveys.map((survey,idx)=><SurveyCard survey={survey} key={idx}></SurveyCard>)
   }
  
   </div> 
   {
     displaySurveys.length===0 && <p className="mt-10 ml-8">No Data Available...</p>
   } 
 </div>
  );
};

export default SurveysPage;