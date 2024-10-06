import { Outlet } from "react-router-dom";

function LayoutAdminIndex() {
   return (
      <div>
         <h1 className="text-center">Admin Page</h1>
         <Outlet />
      </div>
   )
}

export { LayoutAdminIndex }
