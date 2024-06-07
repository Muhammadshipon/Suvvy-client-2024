import { useQuery } from "@tanstack/react-query";
import { ScrollRestoration, useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";



const SurveyDetails = () => {
 
  const {user} = useAuth();
  const axiosPublic = useAxiosPublic();
  const {surveyId} = useParams();
  // console.log(surveyId);

  const {data:survey=[],refetch} = useQuery({
    queryKey:['survey'],
    queryFn:async()=>{
      const {data} = await axiosPublic.get(`/surveys/${surveyId}`);
      return data;
    }
  })
 
  const {data:loggedUser=[]} = useQuery({
    queryKey:['user'],
    enabled:!!user?.email,
    queryFn:async()=>{
      const {data} = await axiosPublic.get(`/users?email=${user?.email}`);
      console.log(data);
      return data;
    }
  })
  console.log(loggedUser);

  

  const [selectedOptions, setSelectedOptions] = useState({});
  
  const handleOptionChange = (questionId, option) => {
        setSelectedOptions({
          ...selectedOptions,
          [questionId]: option
        });
      };

//  console.log(survey)

 const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        for (const questionId in selectedOptions) {
          const vote = selectedOptions[questionId];
          await axiosPublic.post('/vote', {
            surveyId,
            questionId,
            vote
          });
        }


        const {data} = await axiosPublic.patch(`/surveys/${surveyId}`,{userEmail:user?.email,
          userName:user?.displayName
        })
        // console.log(data);
        if(data.modifiedCount>0){
            refetch()
        Swal.fire({
          title: "Your Vote Submitted Successfully!",
         
          icon: "success"
        });
        setDisplayVote(true)
        }
       
       
      } catch (error) {
        console.error('Error recording vote:', error);
      
      }
    };
  const exist = survey?.response?.find(item=>item.userEmail===user?.email);
  console.log('already exist:',exist);

  const totalVotes = survey?.questions.reduce((total, question) => {
    return total + question.options.yes + question.options.no;
  }, 0);
  const yesVotes = survey?.questions.reduce((total, question) => {
    return total + question.options.yes;
  }, 0);
  const noVotes = survey?.questions.reduce((total, question) => {
    return total + question.options.no;
  }, 0);
     
  return (
    <div className="pt-20 pb-8 px-5">
      <ScrollRestoration></ScrollRestoration>
      <div className=" max-w-md mx-auto  ">
      <h2 className="text-3xl font-bold my-8">{survey.title}</h2>
     

     {
      exist?
      <>
       <h3 className="font-bold text-xl text-center">Total Votes: (<span className="text-blue-700 text-2xl">{totalVotes}</span>)</h3>
       <div className="flex flex-col md:flex-row justify-between gap-5 my-8"> 
      <button className="btn">
         Yes Votes
        <div className="badge badge-secondary bg-green-500">{yesVotes}</div>
        </button>
      <button className="btn">
         No Votes
        <div className="badge badge-secondary bg-red-500">{noVotes}</div>
        </button>
      </div>
      </>
       :
      ''
     }

      <p className="my-3 font-bold">{survey.description}</p>
      <p className="my-3">Deadline:{survey.deadline}</p>
      <form onSubmit={handleSubmit}>
        {survey.questions?.map((question,idx) => (
          <div key={question._id} className="mb-4">
            <h4><span className="mr-2">{idx+1}.</span>{question.title}</h4>
            <div>
              <label>
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  value="yes"
                  checked={selectedOptions[question._id] === 'yes'}
                  onChange={() => handleOptionChange(question._id, 'yes')}
                />
                Yes
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  value="no"
                  checked={selectedOptions[question._id] === 'no'}
                  onChange={() => handleOptionChange(question._id, 'no')}
                />
                No
              </label>
            </div>
          </div>
        ))} 
         
        {
        user?
        
        loggedUser?.role==='user' && !exist ?
        <button  type="submit" className="bg-blue-500 btn text-white p-2 rounded hover:scale-105">Submit Votes</button>
        :
        <button disabled type="submit" className="bg-blue-500 btn text-white p-2 rounded hover:scale-105">Submit Votes</button>
        :
        <button disabled type="submit" className="bg-blue-500 btn text-white p-2 rounded hover:scale-105">Submit Votes</button>
       
      } 



      {/* <button disabled type="submit" className="  p-2 rounded btn">Submit Votes</button> */}
       
      </form>
      </div>
    </div>
  );
};

export default SurveyDetails;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// function SurveyVote() {
//   const { surveyId } = useParams();
//  
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     fetchSurvey();
//   }, [surveyId]);

//   const fetchSurvey = async () => {
//     try {
//       const response = await axios.get(`/api/surveys/${surveyId}`);
//       setSurvey(response.data);
//     } catch (error) {
//       console.error('Error fetching survey:', error);
//       setErrorMessage('Failed to fetch survey. Please try again.');
//     }
//   };

//   

//  

//   if (!survey) return <div>Loading...</div>;

//   return (
   
