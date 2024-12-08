import { useEffect, useState } from "react";
import { AuthConsumer } from "../../Hooks/AuthConsumer";
import { axiosInstance } from "../../axios/axios";
import { setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";
import { useNavigate } from "react-router-dom";
import { DiagnosisPage } from "./DiagnosisPage";

function GetUpcomingAppointment() {
   const context = AuthConsumer();
   const { dispatch } = context;
   const navigate = useNavigate();

   const [data, setData] = useState([]);
   const [isDiagnosis, setIsDiagnosis] = useState(false);
   const [appointmentId, setAppointmentId] = useState(-1);

   useEffect(() => {
      async function getAllUpcomingAppointments() {
         dispatch({ type: "setLoading" });

         try {
            const data = await axiosInstance.get("/doctor/appointment/getAllUpcomingAppointments");
            console.log(data);
            setData(data.data);
         } catch(e) {
            console.log(e);
            if(e.status === 403 || e.status === 401) {
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

      getAllUpcomingAppointments();
   }, [navigate, dispatch]);

   function onClickDiagnosis(e, appointmentId) {
      e.preventDefault();
      setIsDiagnosis(data => {
         return !data;
      });
      setAppointmentId(() => appointmentId);
   }

   function closeDiagnosisButton() {
      setIsDiagnosis(data => {
         return !data;
      });
      setAppointmentId(() => -1);
   }

   return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
         <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
            Get All Upcoming Appointments
         </h1>
         {
            data.length === 0 && (
            <h3 className="text-center text-lg text-gray-600 font-medium">
               No data found
            </h3>)
         }
         <div className="space-y-4 max-w-4xl mx-auto">
            {
               data.map((appointment) => (
               <div
               key={appointment?.appointmentId}
               className="p-4 sm:p-6 bg-white rounded-lg shadow-md border border-gray-200 space-y-3"
               >
                  <div className="text-gray-700">
                     <span className="font-semibold text-gray-900">
                        Appointment ID:
                     </span>
                     {" "}
                     <span className="font-medium">{appointment?.appointmentId}</span>
                  </div>
                  <div className="text-gray-700">
                     <span className="font-semibold text-gray-900">
                        Patient Name:
                     </span>
                     {" "}
                     <span className="font-medium">
                        {appointment?.patient?.userEntity?.firstName}{" "}
                        {appointment?.patient?.userEntity?.lastName}
                     </span>
                  </div>
                  <div> 
                     <button
                     className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
                     onClick={(e) => 
                     onClickDiagnosis(e, appointment?.appointmentId)}>
                        Diagnosis
                     </button>
                  </div>
               </div>
            ))}
         </div>
         {
            isDiagnosis && (appointmentId !== -1) && 
            <DiagnosisPage appointmentId={appointmentId} closeDiagnosisButton={closeDiagnosisButton} />
         }
      </div>
   )
}

export { GetUpcomingAppointment }
