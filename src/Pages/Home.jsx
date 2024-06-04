import { ScrollRestoration } from "react-router-dom";
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
      <ScrollRestoration></ScrollRestoration>
    </div>
  );
};

export default Home;