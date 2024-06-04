import Banner from "../Components/Banner";
import BuildSurveySection from "../Components/BuildSurveySection";
import FAQSection from "../Components/FAQSection";
import FeaturedSurveySection from "../Components/FeaturedSurveySection";
import LatestSurveySection from "../Components/LatestSurveySection";


const Home = () => {
  return (
    <div>
      <Banner></Banner>

      <FeaturedSurveySection></FeaturedSurveySection>

      <LatestSurveySection></LatestSurveySection>
       <BuildSurveySection></BuildSurveySection>
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;