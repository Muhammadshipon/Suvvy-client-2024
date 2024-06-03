

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-gray-100">
    <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
      <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
      
        <h1 className="text-5xl font-bold leading-none sm:text-6xl">Easiest

           <span className="bg-gradient-to-r from-pink-600  to-pink-400 inline-block text-transparent bg-clip-text ml-4">  Survey </span> Software with amazing Analytics — in real-time
        </h1>
        <p className="mt-6 mb-8 text-lg sm:mb-12">
Everything you need to survey your customers and employees, get powerful survey insights, 
          <br  className="hidden md:inline lg:hidden" />
          and close the feedback loop to create delightful experiences.
        </p>
        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
          <a rel="noopener noreferrer" href="#" className=" text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-xl px-8 py-2 rounded-full hover:scale-105 border-b-4 border-pink-500">Explore Now</a>
          <a rel="noopener noreferrer" href="#" className="px-8 py-2 text-xl font-semibold border hover:scale-105 border-gray-100 rounded-full">Try For Free</a>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 ">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/online-survey-form-6301264-5230250.png" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 rounded-3xl" />
      </div>
    </div>
  </section>
  );
};

export default Banner;