import { Outlet, useNavigate } from "react-router-dom";
import { setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";

function LayoutPatientIndex() {
   const navigate = useNavigate();

   function onClickBookAppointment(e) {
      e.preventDefault();
      setCurrentPathInLocalStorage("/patient");
      navigate("/patient");
      console.log("Book Appointment");
   }

   return (
      <div>
         <h1 className="text-xl font-bold text-center mb-2">
            Patient Home Page
         </h1>

         <nav className="flex flex-row space-x-2 justify-center">
            <button 
               className="bg-blue-500 text-white font-semibold py-1 px-2 rounded hover:bg-blue-600 transition text-sm" 
               onClick={(e) => onClickBookAppointment(e)}
            >
               Book Appointment
            </button>
         </nav>

         <Outlet />
      </div>
   )
}

export { LayoutPatientIndex }
