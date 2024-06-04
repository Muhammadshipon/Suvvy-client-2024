import { FaArrowRight } from "react-icons/fa6";


const BuildSurveySection = () => {
  return (
    <section className="bg-blue-800 relative bottom-20 text-gray-100 rounded-[100px]">
	<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between items-center">
		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<img src="https://lh4.googleusercontent.com/vEWjWBBjFQAFleYzoUUt9tbKmZlpp_t0YHq4y04PxtRQ1_es91dvkMUNlPIZcD9ol5QHbtNEYOEBLZ9TmDTKWWbEpp18Th2htIOpvZyVGuCOtJvHoBUNFCh0XF5RQChx1dB3xw5Mvocce8nX4IvtvpQ4p0Jofc3Iv1Rp77Zwd4Ad4PwOsBj4DC--2p_JRw" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 hover:scale-110" />
		</div>
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
			<h1 className="text-5xl font-bold leading-none sm:text-6xl"> Build Your<span className="bg-gradient-to-r from-pink-600  to-pink-400 inline-block text-transparent bg-clip-text mb-5">Surveys</span>
			</h1>
			<p className="mt-6 mb-8 text-lg sm:mb-12">Create and customize engaging surveys in minutes with an easy-to-use WYSIWYG editor.
			</p>
      <div className="space-y-5">
        <h3 className="font-bold text-xl text-pink-500"> Dynamic Surveys</h3>
        <p>
Use skip logic, survey redirection, answer piping, themes, languages and more to create Dynamic Surveys. </p>
        <h3 className="font-bold text-xl text-pink-500">Build Experience</h3>
        <p>
Build different customer experiences: Measure NPS, CES, CSAT. Conduct Surveys, Polls & Quizzes.</p>
        <h3 className="font-bold text-xl text-pink-500"> Variables & Pre-Fill Data</h3>
        <p>
With Custom Variables & Attributes, pass data to your surveys, pre-fill survey fields and enrich your responses and reports. .</p>
      </div>
			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
				<a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg hover:gap-5 font-semibold rounded text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center my-8 hover:scale-95"><p>Build Your First Survey</p> <FaArrowRight className="ml-2  relative"></FaArrowRight></a>
				
			</div>
		</div>
	</div>
</section>
  );
};

export default BuildSurveySection;