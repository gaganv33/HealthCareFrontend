import { Outlet } from "react-router-dom";

function LayoutDoctorIndex() {
   return (
      <div>
         <h1 className="text-center">Doctor Page</h1>
         <Outlet />
      </div>
   )
}

export { LayoutDoctorIndex }
