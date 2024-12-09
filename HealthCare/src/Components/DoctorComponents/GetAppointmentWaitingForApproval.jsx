import { useEffect, useState } from "react"
import { AuthConsumer } from "../../Hooks/AuthConsumer";
import { useNavigate } from "react-router-dom";
import { isUnauthorized, setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";
import { axiosInstance } from "../../axios/axios";

function GetAppointmentWaitingForApproval() {
   const context = AuthConsumer();
   const { dispatch } = context;
   const navigate = useNavigate();

   const [data, setData] = useState([]);

   useEffect(() => {
      async function getAppointmentWaitingForApproval() {
         dispatch({ type: "setLoading" });

         try {
            const data = await axiosInstance.get("/doctor/appointment/getAllAppointmentsWaitingForApproval");
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

      getAppointmentWaitingForApproval();
   }, [navigate, dispatch]);

   async function onClickApproveButton(e, appointmentId) {
      e.preventDefault();
      dispatch({ type: "setLoading" });

      try {
         const data = await axiosInstance.post("/doctor/appointment/updateStage", {
            "appointmentId" : appointmentId,
            "stageName" : "doctor_v1"
         });
         console.log(data);
         dispatch({ type: "setSuccessMessage", payload: data.data });
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

   async function onClickRejectButton(e, appointmentId) {
      e.preventDefault();
      dispatch({ type: "setLoading" });

      try {
         const data = await axiosInstance.post("/doctor/appointment/updateStage", {
            "appointmentId" : appointmentId,
            "stageName" : "rejected"
         });
         console.log(data);
         dispatch({ type: "setSuccessMessage", payload: data.data });
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

   return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
         <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
            Get Appointments Waiting for Approval
         </h1>
         {
            data.length === 0 && (
            <h3 className="text-center text-lg text-gray-600 font-medium">
               No data found
            </h3>)
         }
         <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
            {
               data.map((appointment) => (
                  <div
                  key={appointment?.appointmentId}
                  className="p-4 sm:p-6 bg-white rounded-lg shadow-md border border-gray-200 space-y-3"
                  >
                  <div className="text-gray-700">
                     <span className="font-semibold text-gray-900">Appointment ID:</span>{" "}
                     <b>{appointment?.appointmentId}</b>
                  </div>
                  <div className="text-gray-700">
                     <span className="font-semibold text-gray-900">Date of Appointment:</span>{" "}
                     <b>{appointment?.dateOfAppointment}</b>
                  </div>
                  <div className="text-gray-700">
                     <span className="font-semibold text-gray-900">Patient Name:</span>{" "}
                     <b>
                        {appointment?.patient?.userEntity?.firstName}{" "}
                        {appointment?.patient?.userEntity?.lastName}
                     </b>
                  </div>
                  <div className="text-gray-700">
                     <h5 className="font-bold text-gray-900 mb-2">Slot Details</h5>
                     <div className="space-y-1">
                        <div>
                           <span className="font-semibold text-gray-900">Start Time:</span>{" "}
                           <b>{appointment?.slot?.startTime}</b>
                        </div>
                        <div>
                           <span className="font-semibold text-gray-900">End Time:</span>{" "}
                           <b>{appointment?.slot?.endTime}</b>
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                     <button
                        className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
                        onClick={(e) => onClickApproveButton(e, appointment?.appointmentId)}
                     >
                        Approve Appointment
                     </button>
                     <button
                        className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
                        onClick={(e) => onClickRejectButton(e, appointment?.appointmentId)}
                     >
                        Reject Appointment
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export { GetAppointmentWaitingForApproval }
