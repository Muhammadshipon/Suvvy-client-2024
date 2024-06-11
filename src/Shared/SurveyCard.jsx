import { Link } from "react-router-dom";


const SurveyCard = ({survey}) => {
  const {title,description,category,deadline,questions=[],_id} =survey;

  const totalVotes = questions.reduce((total, question) => {
    return total + question.options.yes + question.options.no;
  }, 0);

  return (
    <Link to={`/survey/details/${_id}`}>
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
  <div className="badge badge-secondary">{totalVotes}</div>
</button>

    </div>
  </div>
</div>
    </Link>
  );
};

export default SurveyCard;