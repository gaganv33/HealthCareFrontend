import { useNavigate } from "react-router-dom";
import { AuthConsumer } from "../Hooks/AuthConsumer";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function DoctorLayout({ children }) {
   const navigate = useNavigate();
   const context = AuthConsumer();
   const { isAuthenticated, role } = context;

   useEffect(function() {
      if(!isAuthenticated && role != "doctor") {
         navigate("/unauthorized");
      }
   }, [isAuthenticated, navigate, role]);

   return (
      isAuthenticated && role == "doctor" && <>{ children }</>
   )
}

export { DoctorLayout }
