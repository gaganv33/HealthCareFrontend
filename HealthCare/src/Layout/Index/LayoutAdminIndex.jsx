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

   return (
      <div>
         <h1 className="text-xl font-bold text-center mb-2">
            Admin Home Page
         </h1>
         <nav className="flex flex-row space-x-2 justify-center">
            <button 
               className="bg-blue-500 text-white font-semibold py-1 px-2 rounded hover:bg-blue-600 transition text-sm" 
               onClick={ (e) => onClickFetchDisabledUsers(e) }>
               Fetch Disabled Password
            </button>
            <button 
               className="bg-blue-500 text-white font-semibold py-1 px-2 rounded hover:bg-blue-600 transition text-sm" 
               onClick={ (e) => onClickUpdateDashboardPassword(e) }>
               Update Dashboard Password
            </button>
         </nav>

         <Outlet />
      </div>
   )
}

export { LayoutAdminIndex }
