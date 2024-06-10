import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const StatusModal = ({closeModal,id,fetch}) => {
  const axiosSecure = useAxiosSecure();
  
  const handleStatus=async (e)=>{
    e.preventDefault();
   
   const updatedStatus ={
        status: 'unpublished',
        feedback: e.target.feedback.value
   }

    const {data} = await axiosSecure.patch(`/surveys-status/${id}`, updatedStatus);
    console.log('Survey created successfully:', data);

    if(data.modifiedCount>0){
      fetch();
      Swal.fire({
        title: "Survey Unpublished SUCCESSFULLY!",
         timer:2000,
        icon: "success"
      });
    closeModal(false);
    }


  }
  return (
    <div className="w-full h-full flex flex-row justify-center items-center  " >

     {/* modal container  */}
      <div className="z-50 shadow-xl absolute  md:w-1/3  w-[300px] p-8 rounded-3xl  bg-gray-200 ">

        {/* header  */}
    <div>
      <h1 className="text-3xl font-bold">Are You Sure?</h1>
    </div>


       {/* body  */}
   <div className="text-left mt-5">
  <form onSubmit={handleStatus}>
  <label className="font-bold mb-5">Feedback</label>
  <textarea required name="feedback" placeholder="Why unpublished this? " className="textarea textarea-bordered textarea-xs w-full max-w-xs" ></textarea>

  <div className="text-center my-2">
  <button onClick={()=>closeModal(false)} className="btn btn-error bg-red-600 text-white">cancel</button>
  <input type="submit" className="btn btn-secondary bg-pink-700 ml-10" value="Unpublished" />
  </div>
  </form>
   </div>

    
      </div>




    </div>
  );
};

export default StatusModal;