import { useNavigate } from "react-router-dom";
import { AuthConsumer } from "../../Hooks/AuthConsumer";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function PatientLayout({ children }) {
   const navigate = useNavigate();
   const context = AuthConsumer();
   const { isAuthenticated, role } = context;

   useEffect(function() {
      if(!isAuthenticated && role !== "ROLE_PATIENT") {
         // setCurrentPathInLocalStorage("/unauthorized");
         navigate("/unauthorized");
      }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated, role]);

   return (
      isAuthenticated && (role === "ROLE_PATIENT") && <> { children } </>
   )
}

export { PatientLayout }
