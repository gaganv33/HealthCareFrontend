import { Outlet, useNavigate } from "react-router-dom";
import { setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";

function LayoutDoctorIndex() {
   const navigate = useNavigate();

   function onClickGetAppointmentWaitingForApproval(e) {
      e.preventDefault();
      setCurrentPathInLocalStorage("/doctor");
      navigate("/doctor");
      console.log("Get appointment waiting for approval");
   }

   function onClickGetAllUpcomingAppointment(e) {
      e.preventDefault();
      setCurrentPathInLocalStorage("/doctor/getAllUpcomingAppointments");
      navigate("/doctor/getAllUpcomingAppointments");
      console.log("Get All Upcoming appointment");
   }

   return (
      <div className="min-h-screen bg-gray-100 p-4">
         <h1 className="text-xl font-bold text-center mb-4 text-gray-800">
            Doctor Home Page
         </h1>
         <nav className="flex flex-wrap gap-2 justify-center mb-6">
            <button
               className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition text-sm"
               onClick={(e) => onClickGetAppointmentWaitingForApproval(e)}
            >
               Get Appointment waiting for approval
            </button>
            <button
               className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition text-sm"
               onClick={(e) => onClickGetAllUpcomingAppointment(e)}
            >
               Get All upcoming Appointment
            </button>
         </nav>
         <div className="container mx-auto">
            <Outlet />
         </div>
      </div>
   )
}

export { LayoutDoctorIndex }
