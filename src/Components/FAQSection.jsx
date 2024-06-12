import SectionTitle from "../Shared/SectionTitle";


const FAQSection = () => {
  return (
    <div data-aos="fade-up" data-aos-duration="2000" className="relative  top-20 rounded-t-[100px]  bg-gradient-to-r pb-36 pt-16 lg:pt-0 from-blue-200 via-purple-100 to-pink-200 text-pink-700 flex flex-col items-center justify-center px-10">
      <SectionTitle>FAQ Section</SectionTitle>
      <div className="collapse collapse-plus ">
  <input type="radio" name="my-accordion-3" defaultChecked /> 
  <div className="collapse-title text-xl font-medium">
  How do I participate in a survey?
  </div>
  <div className="collapse-content"> 
    <p className="text-pink-500">To participate in a survey, simply select the survey you are interested in from our list, read the question, and choose your answer (yes or no). Your vote will be counted immediately.</p>
  </div>
</div>
<div className="collapse collapse-plus ">
  <input type="radio" name="my-accordion-3" /> 
  <div className="collapse-title text-xl font-medium">
  Is my personal information safe when I participate in a survey?
  </div>
  <div className="collapse-content"> 
    <p className="text-pink-500">Yes, your privacy is our top priority. We do not collect any personal information that can identify you individually. All responses are recorded anonymously.</p>
  </div>
</div>
<div className="collapse collapse-plus ">
  <input type="radio" name="my-accordion-3" /> 
  <div className="collapse-title text-xl font-medium">
  Can I change my vote after submitting it?
  </div>
  <div className="collapse-content"> 
    <p className="text-pink-500">Once a vote is submitted, it cannot be changed. Please make sure to review your answer carefully before submitting.</p>
  </div>
</div>
<div className="collapse collapse-plus ">
  <input type="radio" name="my-accordion-3" /> 
  <div className="collapse-title text-xl font-medium">
  How often are new surveys added?
  </div>
  <div className="collapse-content"> 
    <p className="text-pink-500">New surveys are added regularly. We strive to provide fresh and relevant content to our users. Check back often to participate in the latest surveys.</p>
  </div>
</div>
<div className="collapse collapse-plus ">
  <input type="radio" name="my-accordion-3" /> 
  <div className="collapse-title text-xl font-medium">
  How can I suggest a new survey topic?
  </div>
  <div className="collapse-content"> 
    <p className="text-pink-500">We welcome your suggestions for new survey topics! Please use the //Contact Us // form on our website to submit your ideas. Our team will review your suggestion and consider it for future surveys.</p>
  </div>
</div>
    </div>
  );
};

export default FAQSection;