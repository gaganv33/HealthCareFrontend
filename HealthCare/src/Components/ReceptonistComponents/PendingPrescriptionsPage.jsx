import { useNavigate } from "react-router-dom";
import { AuthConsumer } from "../../Hooks/AuthConsumer";
import { useEffect, useState } from "react";
import { isUnauthorized, setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";
import { axiosInstance } from "../../axios/axios";

function PendingPrescriptionsPage() {
   const context = AuthConsumer();
   const { dispatch } = context;
   const navigate = useNavigate();

   const [data, setData] = useState([]);

   useEffect(() => {
      async function getAllPendingPrescription() {
         dispatch({ type: "setLoading" });
         try {
            const data = await axiosInstance.get("/receptionist/getAllPendingPrescriptions");
            console.log(data);
            setData(data.data);
         } catch(e) {
            console.log(e);
            if(isUnauthorized(e)) {
               dispatch({ type: "logout" });
               setCurrentPathInLocalStorage("/");
               navigate("/");
            } else {
               dispatch({ type: "setErrorMessage", payload: e?.response?.data?.error });
            }
         } finally {
            dispatch({ type: "unsetLoading" });
         }
      }

      getAllPendingPrescription();
   }, []);

   return (
      <div>
         <h1>
            Get all pending prescriptions
         </h1>
      </div>
   )
}

export { PendingPrescriptionsPage };
