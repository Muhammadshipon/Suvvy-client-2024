import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/SectionTitle";
import { FaVoteYea } from "react-icons/fa";
import {  FaChartPie,  FaTable } from "react-icons/fa6";
import { useState } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { PieChart, Pie, Legend } from 'recharts';

const colors = ['#0088FE',  'red', ];
const COLORS = ['#0088FE',  'red',];

const SurveyResponseDetails = () => {






  const [toggle,setToggle] = useState(false);
  const {id} = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: survey = {}, } = useQuery({
    queryKey: ['survey', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/surveys/${id}`);
      return data;
    },
  });
  console.log(survey);

  const totalVotes = survey?.questions?.reduce((total, question) => {
    return total + question.options.yes + question.options.no;
  }, 0);
  const yesVotes = survey?.questions?.reduce((total, question) => {
    return total + question.options.yes;
  }, 0);
  const noVotes = survey?.questions?.reduce((total, question) => {
    return total + question.options.no;
  }, 0);


  const handleToggle=()=>{
    setToggle(!toggle);
  }



           // pi chart 
       const RADIAN = Math.PI / 180;
       const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
         const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
         const x = cx + radius * Math.cos(-midAngle * RADIAN);
         const y = cy + radius * Math.sin(-midAngle * RADIAN);
       
         return (
           <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
             {`${(percent * 100).toFixed(0)}%`}
           </text>
         );
       };


        //  bar chart 
        const getPath = (x, y, width, height) => {
          return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
          ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
          Z`;
        };


        const TriangleBar = (props) => {
          const { fill, x, y, width, height } = props;
        
          return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
        };

  const data =[
    {name:'yes vote', value:yesVotes},
    {name:'no vote', value:noVotes}
  ]


  return (
    <div>
       
   <div className="flex justify-around items-center md:mr-32">
   <SectionTitle >{survey.title}</SectionTitle> 
   <div onClick={handleToggle}>
    {
      toggle?<FaTable className="text-3xl animate-bounce text-violet-700"/>: <FaChartPie className="text-3xl animate-spin text-pink-600"/>
    }
   
   </div>
   </div>



   {
    toggle?
    <div className="flex flex-col lg:flex-row md:justify-center md:items-center">
          {/* pi chart  */}
<div className="lg:w-1/2">

        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        <Legend></Legend>
        </PieChart>
    
    


</div>

       {/* bar chart  */}

<div className="w-1/2 ">
<BarChart
      width={350}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="value" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>


</div>






    </div>
     
    :
    <div className="overflow-x-auto max-w-5xl px-10 mx-auto mb-10">
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>SI</th>
          <th>User Name</th>
         
          <th>User Email</th>

          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}



        {
          survey?.response?.map((item,idx)=>(

            <tr key={item._id}>
            <td>{idx+1}</td>
            <td>
              
                <p>{item.userName}</p>
            </td>
           
           

            <td>
              {item.userEmail}
            </td>
            <th>
         <span className=" text-pink-600 flex items-center gap-2"><FaVoteYea/>Voted</span>
            </th>
          </tr>
         





          ))
        }
       
       
      </tbody>

      <tfoot>
     <tr>
       <th></th>
       <th>Yes Vote: <span className="text-green-600">{yesVotes}</span></th>
       <th>No Vote: <span className="text-red-600">{noVotes}</span></th>
       <th>Total Vote: <span className="text-blue-600">{totalVotes}</span></th>
       <th></th>
     </tr>
   </tfoot>
     
     {survey?.response?.length===0 && <p className="text-xl mt-10 ml-5">No Data Available...</p>}

    </table>
  </div> 
   }
  
  </div>


    
  );
};

export default SurveyResponseDetails;