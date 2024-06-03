

const SurveyCard = ({survey}) => {
  const {title,short_description,total_votes,category} =survey;
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body card-actions">
    <h2 className="card-title">{title}</h2>
    <div className="">
    <h3>{category}</h3>
    <p>{short_description}</p>
    </div>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default SurveyCard;