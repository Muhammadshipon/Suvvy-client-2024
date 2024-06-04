

const SurveyCard = ({survey}) => {
  const {title,short_description,total_votes,category} =survey;
  return (
    <div>
      <div className="card w-full bg-base-100 shadow-xl hover:bg-slate-400">
  <div className="card-body ">
    <h2 className="card-title text-blue-700">{title}</h2>
    <div className="md:h-[100px]">
    <h3 className="text-pink-600 font-semibold">{category}</h3>
    <p>{short_description}</p>
    </div>
    <div className="card-actions justify-center">
    <button className="btn">
  Total Votes
  <div className="badge badge-secondary">{total_votes}</div>
</button>

    </div>
  </div>
</div>
    </div>
  );
};

export default SurveyCard;