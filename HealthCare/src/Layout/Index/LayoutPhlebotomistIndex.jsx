import { Outlet, useNavigate } from "react-router-dom";
import { setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";

function LayoutPhlebotomistIndex() {
   const navigate = useNavigate();

   function onClickGetAllPendingTests(e) {
      e.preventDefault();
      setCurrentPathInLocalStorage("/phlebotomist");
      navigate("/phlebotomist");
      console.log("Get All Pending Appointment");
   }

   return (
         <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-xl font-bold text-center mb-4 text-gray-800">
               Phlebotomist Home Page
            </h1>
            <nav className="flex flex-wrap gap-2 justify-center mb-6">
               <button
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition text-sm"
                  onClick={(e) => onClickGetAllPendingTests(e)}
               >
                  Get All pending Tests
               </button>
            </nav>
            <div className="container mx-auto">
               <Outlet />
            </div>
         </div>
   )
}

export { LayoutPhlebotomistIndex };
