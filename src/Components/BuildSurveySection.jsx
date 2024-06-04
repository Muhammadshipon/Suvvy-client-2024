

const BuildSurveySection = () => {
  return (
    <section className="bg-blue-800 text-gray-100">
	<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<img src="https://lh4.googleusercontent.com/vEWjWBBjFQAFleYzoUUt9tbKmZlpp_t0YHq4y04PxtRQ1_es91dvkMUNlPIZcD9ol5QHbtNEYOEBLZ9TmDTKWWbEpp18Th2htIOpvZyVGuCOtJvHoBUNFCh0XF5RQChx1dB3xw5Mvocce8nX4IvtvpQ4p0Jofc3Iv1Rp77Zwd4Ad4PwOsBj4DC--2p_JRw" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
		</div>
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
			<h1 className="text-5xl font-bold leading-none sm:text-6xl">Build Your Surveys
			</h1>
			<p className="mt-6 mb-8 text-lg sm:mb-12">Create and customize engaging surveys in minutes with an easy-to-use WYSIWYG editor.
			</p>
      <div>
        <h3 className="font-bold text-xl text-pink-500">Build Experience</h3>
        <p>
Build different customer experiences: Measure NPS, CES, CSAT. Conduct Surveys, Polls & Quizzes.</p>
      </div>
			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
				<a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold rounded bg-violet-400 text-gray-900">Suspendisse</a>
				<a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold border rounded border-gray-100">Malesuada</a>
			</div>
		</div>
	</div>
</section>
  );
};

export default BuildSurveySection;