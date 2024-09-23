import { useEffect } from "react";
import { AuthConsumer } from "../Hooks/AuthConsumer"
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function AdminLayout({ children }) {
   const context = AuthConsumer();
   const { isAuthenticated, role } = context;
   const navigate = useNavigate();

   useEffect(function() {
      console.log(isAuthenticated, role);
      if(!isAuthenticated && role != "admin") {
         navigate("/unauthorized");
      }
   }, [isAuthenticated, navigate, role]);

   return (
      isAuthenticated && role == "admin" && <>{ children }</>
   )
}

export { AdminLayout }
