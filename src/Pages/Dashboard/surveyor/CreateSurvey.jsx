// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

// function CreateSurvey() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [deadline, setDeadline] = useState('');
//   const [questions, setQuestions] = useState([{ title: '' }]);
//   const [categories, setCategories] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('/api/categories');
//       setCategories(response.data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const handleQuestionChange = (index, event) => {
//     const newQuestions = [...questions];
//     newQuestions[index].title = event.target.value;
//     setQuestions(newQuestions);
//   };

//   const handleAddQuestion = () => {
//     setQuestions([...questions, { title: '' }]);
//   };

//   const handleRemoveQuestion = (index) => {
//     const newQuestions = questions.filter((_, i) => i !== index);
//     setQuestions(newQuestions);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const surveyData = {
//         title,
//         description,
//         category,
//         deadline,
//         questions,
//       };
//       const response = await axios.post('/api/surveys/create', surveyData);
//       console.log('Survey created successfully:', response.data);
//       setTitle('');
//       setDescription('');
//       setCategory('');
//       setDeadline('');
//       setQuestions([{ title: '' }]);
//       setErrorMessage('');
//     } catch (error) {
//       console.error('Error creating survey:', error);
//       setErrorMessage('Failed to create survey. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Create Survey</h2>
//       {errorMessage && <p>{errorMessage}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
//         </div>
//         <div>
//           <label>Category:</label>
//           <select value={category} onChange={(e) => setCategory(e.target.value)} required>
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.name}>{cat.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Deadline:</label>
//           <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
//         </div>
//         <div>
//           <label>Questions:</label>
//           {questions.map((question, index) => (
//             <div key={index}>
//               <input
//                 type="text"
//                 value={question.title}
//                 onChange={(e) => handleQuestionChange(index, e)}
//                 placeholder={`Question ${index + 1}`}
//                 required
//               />
//               <button type="button" onClick={() => handleRemoveQuestion(index)}>Remove</button>
//             </div>
//           ))}
//           <button type="button" onClick={handleAddQuestion}>Add Question</button>
//         </div>
//         <button type="submit">Create Survey</button>
//       </form>
//     </div>
//   );
// }

// export default CreateSurvey;











const CreateSurvey = () => {
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [questions, setQuestions] = useState([{ title: '' }]);


  const handleQuestionChange = (idx, e) => {
    const newQuestions = [...questions];
    newQuestions[idx].title = e.target.value;
    setQuestions(newQuestions);
  };


const handleAddQuestion = ()=>{
  setQuestions([...questions, {title:''}])
}
const handleRemoveQuestion=(idx)=>{
  const newQuestions = questions.filter(( q,i) => i !== idx);
  setQuestions(newQuestions);

}



const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const surveyData = {
          title,
          description,
          category,
          deadline,
          questions,
          status:'publish',
          surveyor: user?.email
        };
        console.log(surveyData);
        const {data} = await axiosPublic.post('/create', surveyData);
        console.log('Survey created successfully:', data);

        if(data.insertedId){
          Swal.fire({
            title: "Survey Created SUCCESSFULLY!",
           
            icon: "success"
          });
        }
        setTitle('');
        setDescription('');
        setCategory('');
        setDeadline('');
        setQuestions([{ title: '' }]);
       
      } catch (error) {
        console.error('Error creating survey:', error);
        
      }
    };



  return (
    <div className="relative z-0" >
     <h1 className="text-5xl text-center font-bold  bg-gradient-to-r from-blue-700  to-pink-500  text-transparent bg-clip-text ">Add Your Survey</h1>
    

            {/* form  */}
            <section className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
     
      <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Survey Title</label>
                  <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="title"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type survey title" required/>
                    
              </div>
            
            
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                  <select name="category" value={category} onChange={(e)=>setCategory(e.target.value)} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option selected="">Select category</option>
                      <option value="customer satisfaction">Customer Satisfaction</option>
                      <option value="employee engagement">Employee Engagement</option>
                      <option value="market research">Market Research</option>
                      <option value="political opinion">Political Opinion</option>
                      <option value="product feedback">Product Feedback</option>
                      <option value="health and wellness">Health and Wellness</option>
                  </select>
              </div>
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dateline</label>
                  <input type="date" value={deadline} onChange={(e)=>setDeadline(e.target.value)} name="dateline" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required=""/>
              </div> 
              <div className="sm:col-span-2">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <textarea value={description} onChange={(e)=>setDescription(e.target.value)} name="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
              </div>
         

              <div className="sm:col-span-2">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Questions</label>
                 {
                  questions.map((question,idx)=> (<div className="flex" key={idx}>

 <input type="text" name="question"
     value={question.title}
    onChange={(e) => handleQuestionChange(idx, e)}
 id="name" className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={`question - ${idx+1}`} required/>
  <button className="btn ml-2 bg-orange-600 text-white" onClick={()=>handleRemoveQuestion(idx)}  disabled={questions.length-1 !== idx}>Remove</button>



                  </div>))
                 }
 
      <button className="btn bg-cyan-600 text-white" onClick={handleAddQuestion}>Add Question</button>
                 
                    
              </div>

             
          </div>
          <button type="submit" className="w-full  hover:scale-95   items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-gradient-to-r from-blue-700  to-pink-500 text-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Create New Survey
          </button>
      </form>
  </div>
</section>          


    </div>
  );
};

export default CreateSurvey;