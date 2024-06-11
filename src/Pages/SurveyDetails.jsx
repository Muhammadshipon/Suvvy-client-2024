import { useQuery } from "@tanstack/react-query";
import { ScrollRestoration, useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import {  useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useLoggedUser from "../hooks/useLoggedUser";




const SurveyDetails = () => {
 
  const {user} = useAuth();
  const [loggedUser] = useLoggedUser();
  const axiosPublic = useAxiosPublic();
  const {surveyId} = useParams();
  const [selectedOptions, setSelectedOptions] = useState({});
  


        // get survey data 
  const {data:survey=[],refetch:refetchForSurvey} = useQuery({
    queryKey:['survey'],
    queryFn:async()=>{
      const {data} = await axiosPublic.get(`/surveys/${surveyId}`);
      return data;
    }
  })
 

        

  
        // get survey report data 
        const {data:reports=[],refetch:refetchForReport} = useQuery({
          queryKey:['reports'],
           queryFn:async()=>{
            const {data} = await axiosPublic.get(`/reports`);
            return data;
          }
        })

        // console.log(reports);
   
     // get survey comment data 
     const {data:comments=[],refetch:refetchForComment} = useQuery({
      queryKey:['comments'],
       queryFn:async()=>{
        const {data} = await axiosPublic.get(`/comments`);
        return data;
      }
    })   
 
  
 
       

            
                   // exist condition 
  const exist = survey?.response?.find(item=>item.userEmail===user?.email);
  console.log('already exist:',exist);

  const existReport = reports.find(report=> report.email === user?.email &&report.surveyId === surveyId );
 

  const existComment = comments.find(comment=> comment.email === user?.email &&comment.surveyId === surveyId );
  console.log('comment already exist?',existComment);

  const dateOver = new Date() > new Date(survey?.deadline) ; 

            
              
              
                  // Vote Count 
  

    const totalVotes = survey?.questions?.reduce((total, question) => {
      return total + question.options.yes + question.options.no;
    }, 0);
    const yesVotes = survey?.questions?.reduce((total, question) => {
      return total + question.options.yes;
    }, 0);
    const noVotes = survey?.questions?.reduce((total, question) => {
      return total + question.options.no;
    }, 0);


   

 

  
  

                  // handle all form 
  const handleOptionChange = (questionId, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: option
    });
  };





// const handleSubmit = async (e) => {
//   e.preventDefault();
  

//   try {
//     for (const questionId in selectedOptions) {
//       const vote = selectedOptions[questionId];
//       await axiosPublic.post('/vote', {
//         surveyId,
//         questionId,
//         vote
//       });
//     }


    


//     const {data} = await axiosPublic.patch(`/surveys/${surveyId}`,{userEmail:user?.email,
//       userName:user?.displayName
//     })
//     // console.log(data);
//     if(data.modifiedCount>0){
//         refetchForSurvey();
       
//     Swal.fire({
//       title: "Your Vote Submitted Successfully!",
     
//       icon: "success"
//     });

  
    
//     const {data} = await axiosPublic.post('/my-surveys',{surveyId,title:survey?.title,category:survey?.category, email:user?.email});
//     console.log(data);
  
//     }
  
   
//   } catch (error) {
//     console.error('Error recording vote:', error);
  
//   }

 

// };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Submit votes
    for (const questionId in selectedOptions) {
      const vote = selectedOptions[questionId];
      await axiosPublic.post('/vote', {
        surveyId,
        questionId,
        vote
      });
    }

    // Fetch updated survey data after voting
    const updatedSurveyResponse = await axiosPublic.get(`/surveys/${surveyId}`);
    const updatedSurvey = updatedSurveyResponse.data;

    // Calculate new total votes, yes votes, and no votes
    const totalVotes = updatedSurvey.questions.reduce((total, question) => {
      return total + question.options.yes + question.options.no;
    }, 0);
    const yesVotes = updatedSurvey.questions.reduce((total, question) => {
      return total + question.options.yes;
    }, 0);
    const noVotes = updatedSurvey.questions.reduce((total, question) => {
      return total + question.options.no;
    }, 0);

    // Update the survey with new vote counts
    await axiosPublic.patch(`/surveys/${surveyId}/votes`, {
      totalVotes,
      yesVotes,
      noVotes
    });

    // Update survey participation record
    const participationData = await axiosPublic.patch(`/surveys/${surveyId}`, {
      userEmail: user?.email,
      userName: user?.displayName
    });

    if (participationData.data.modifiedCount > 0) {
      refetchForSurvey();
      Swal.fire({
        title: "Your Vote Submitted Successfully!",
        icon: "success"
      });

      await axiosPublic.post('/my-surveys', {
        surveyId,
        title: survey?.title,
        category: survey?.category,
        email: user?.email
      });
    }
  } catch (error) {
    console.error('Error recording vote:', error);
    Swal.fire({
      title: "Error",
      text: error.message,
      icon: "error"
    });
  }
};










  const handleReport=async (e)=>{
    e.preventDefault();
    const report = e.target.report.value;
    const reportInfo = {surveyId,title:survey?.title, email:user?.email,report}
  const {data} = await axiosPublic.post('/reports',reportInfo);
  console.log(data);
  if(data.insertedId){
       refetchForReport();
    Swal.fire({
      title: "Your Report Submitted Successfully!",
     
      icon: "success"
    });
    e.target.reset();
  }
     
  }




  const handleComment=async (e)=>{
    e.preventDefault();
    const comment = e.target.comment.value;
    const commentInfo = {surveyId,title:survey?.title, email:user?.email,comment}
  const {data} = await axiosPublic.post('/comments',commentInfo);
  console.log(data);
  if(data.insertedId){
       refetchForComment();
    Swal.fire({
      title: "Your Comment Submitted Successfully!",
     
      icon: "success"
    });
    e.target.reset();
  }
     
  }

  console.log(loggedUser)

  return (
    <div className="pt-20 pb-8 px-5">
      <ScrollRestoration></ScrollRestoration>
      <div className=" max-w-md mx-auto  ">
      <h2 className="text-3xl font-bold my-8">{survey.title}</h2>
     

     {
      exist || dateOver?
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
      <p className="my-3">Deadline : {survey.deadline}</p>
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
        
        loggedUser?.role==='user' && !exist && !dateOver ||loggedUser?.role==='prouser'&& !exist && !dateOver ?
        <button  type="submit" className="bg-blue-500 btn text-white p-2 rounded hover:scale-105">Submit Votes</button>
        :
        <button disabled type="submit" className="bg-blue-500 btn text-white p-2 rounded hover:scale-105">Submit Votes</button>
        :
        <button disabled type="submit" className="bg-blue-500 btn text-white p-2 rounded hover:scale-105">Submit Votes</button>
       
      } 



      
       
      </form>


          {/* comment  */}
          
          {
          user?
          
          loggedUser?.role ==='prouser' ?
            <div>
            <form onSubmit={handleComment} className="flex  mt-5">
            <input required type="text" name="comment"  placeholder="Comment here" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-slate-100  text-gray-600" />
            <input disabled={!!existComment} type="submit" value="Comment" className="btn bg-violet-600 ml-2 text-white" />
            </form>
             </div>
             :''


             : ''
          }
          
         

                {/* report  */}

                
        
               {
               user?
               
               
               loggedUser?.role==='user'|| loggedUser?.role==='prouser' ?
                 <div>
                 <form onSubmit={handleReport} className="flex  mt-5">
                 <input required type="text" name="report"  placeholder="report" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-slate-100  text-gray-600" />
                 <input disabled={!!existReport} type="submit" value="Report" className="btn bg-pink-600 ml-2 text-white" />
                 </form>
                  </div>
               :
                ''
                :
                ''
               } 
        
       
        


                
    
                 


      </div>
    </div>
  );
};

export default SurveyDetails;






   
