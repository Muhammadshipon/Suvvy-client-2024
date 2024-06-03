import Banner from "../Components/Banner";
import FeaturedSurveySection from "../Components/FeaturedSurveySection";
import LatestSurveySection from "../Components/LatestSurveySection";


const Home = () => {
  return (
    <div>
      <Banner></Banner>

      <FeaturedSurveySection></FeaturedSurveySection>

      <LatestSurveySection></LatestSurveySection>
    </div>
  );
};

export default Home;