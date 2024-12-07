import { useEffect, useState } from "react"
import { axiosInstance } from "../../axios/axios";
import { ErrorPage } from "../MessageComponents/ErrorPage";
import { Loading } from "../LoadingComponent/Loading";
import { AuthConsumer } from "../../Hooks/AuthConsumer";
import { setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";
import { useNavigate } from "react-router-dom";

function AppointmentDetails() {
   const context = AuthConsumer();
   const { dispatch } = context;
   const navigate = useNavigate();

   const [isError, setIsError] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   function onErrorButtonClose() {
      setIsError(() => { return false; });
      setErrorMessage(() => { return ""; });
   }

   useEffect(() => {
      async function getAppointmentDetails() {
         setIsLoading(true);
         try {
            const data = await axiosInstance.get("/getAppointmentDetails");
            console.log(data);
         } catch(e) {
            console.log(e);
            if(e.status === 403 || e.status === 401) {
               dispatch({ type: "logout" });
               setCurrentPathInLocalStorage("/");
               navigate("/");
            } else {
               setIsError(() => { return true; });
               setErrorMessage(() => { return e?.response?.data?.detail; });
            }
         } finally {
            setIsLoading(false);
         }
      }
      getAppointmentDetails();
   }, [navigate, dispatch])

   return (
      <div>
         <h1>Appointment details</h1>

         {/* Error Page */}
         {
            isError && ( <ErrorPage message={errorMessage} onErrorButtonClose={onErrorButtonClose} />)
         }
         {
            isLoading && <Loading />
         }
      </div>
   )
}

export { AppointmentDetails }
