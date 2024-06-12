import { useState } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import ScrollTrigger from "react-scroll-trigger";


const SurveyCard = ({survey}) => {
  const [countOn,setCountOn] = useState(false);
  const {title,description,category,deadline,questions=[],_id} =survey;

  const totalVotes = questions.reduce((total, question) => {
    return total + question.options.yes + question.options.no;
  }, 0);

  return (
    <Link to={`/survey/details/${_id}`}>
       <ScrollTrigger onEnter={()=>setCountOn(true)} onExit={()=>setCountOn(false)}></ScrollTrigger>
      <div className="card w-full bg-base-100 shadow-xl hover:bg-slate-400">

  <div className="card-body ">
    <h2 className="card-title text-blue-700">{title}</h2>
    <div className="md:h-[100px]">
    <h3 className="text-pink-600 font-semibold">{category}</h3>
    <p>{description}</p>
    </div>
    <div className="card-actions justify-center">
    <button className="btn">
  Total Votes
  <div className="badge badge-secondary">
  {countOn&&<CountUp end={totalVotes}  duration={4}/>}

  </div>
</button>

    </div>
  </div>
</div>
    </Link>
  );
};

export default SurveyCard;