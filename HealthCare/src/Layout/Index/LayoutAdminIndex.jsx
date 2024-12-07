import { Outlet, useNavigate } from "react-router-dom";
import { setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";

function LayoutAdminIndex() {
   const navigate = useNavigate();

   function onClickFetchDisabledUsers(e) {
      e.preventDefault();
      setCurrentPathInLocalStorage("/admin");
      navigate("/admin");
      console.log("Fetch Diabled users");
   }

   function onClickUpdateDashboardPassword(e) {
      e.preventDefault();
      setCurrentPathInLocalStorage("/admin/updateDashboardPassword");
      navigate("/admin/updateDashboardPassword");
      console.log("Update dashboard password");
   }

   function onClickAddNewStage(e) {
      e.preventDefault();
      setCurrentPathInLocalStorage("/admin/addNewStage");
      navigate("/admin/addNewStage");
      console.log("Add new stage");
   }

   function onClickAddNewMedicines(e) {
      e.preventDefault();
      setCurrentPathInLocalStorage("/admin/addNewMedicines");
      navigate("/admin/addNewMedicines");
      console.log("Add new medicines");
   }

   function onClickAddLabTest(e) {
      e.preventDefault();
      setCurrentPathInLocalStorage("/admin/addNewLabTests");
      navigate("/admin/addNewLabTests");
      console.log("Add lab test");
   }

   function onClickAddNewSlots(e) {
      e.preventDefault();
      setCurrentPathInLocalStorage("/admin/addNewSlots");
      navigate("/admin/addNewSlots");
      console.log("Add new slots");
   }

   return (
      <div className="min-h-screen bg-gray-100 p-4">
         <h1 className="text-xl font-bold text-center mb-4 text-gray-800">
            Admin Home Page
         </h1>
         <nav className="flex flex-wrap gap-2 justify-center mb-6">
            <button
               className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition text-sm"
               onClick={ (e) => onClickFetchDisabledUsers(e) }
            >
               Fetch Disabled Users
            </button>
            <button
               className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition text-sm"
               onClick={ (e) => onClickUpdateDashboardPassword(e) }
            >
               Update Dashboard Password
            </button>
            <button
               className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition text-sm"
               onClick={ (e) => onClickAddNewStage(e) }
            >
               Add New Stage
            </button>
            <button
               className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition text-sm"
               onClick={ (e) => onClickAddNewMedicines(e) }
            >
               Add New Medicines
            </button>
            <button
               className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition text-sm"
               onClick={ (e) => onClickAddLabTest(e) }
            >
               Add Lab Test
            </button>
            <button
               className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition text-sm"
               onClick={ (e) => onClickAddNewSlots(e) }
            >
               Add New Slots
            </button>
         </nav>
         <div className="container mx-auto">
            <Outlet />
         </div>
      </div>

   )
}

export { LayoutAdminIndex }
