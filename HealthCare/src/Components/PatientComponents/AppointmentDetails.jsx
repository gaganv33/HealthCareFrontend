import { useEffect, useState } from "react"
import { axiosInstance } from "../../axios/axios";
import { AuthConsumer } from "../../Hooks/AuthConsumer";
import { setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";
import { useNavigate } from "react-router-dom";

function AppointmentDetails() {
   const context = AuthConsumer();
   const { dispatch } = context;
   const navigate = useNavigate();

   const [data, setData] = useState([]);

   useEffect(() => {
      async function getAppointmentDetails() {
         dispatch({ type: "setLoading" });

         try {
            const data = await axiosInstance.get("patient/appointment/getAppointmentDetails");
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

      getAppointmentDetails();
   }, [navigate, dispatch])

   return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
         <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-6 sm:mb-8">
            Appointment Details
         </h1>
         {
            data.length === 0 && (
            <h3 className="text-center text-base sm:text-lg text-gray-600 font-medium">
               No appointment details found
            </h3>)
         }
         <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
            {data.map((appointment) => (
               <div key={appointment?.appointmentId}
               className="p-4 sm:p-6 bg-white rounded-lg shadow-lg border border-gray-200 space-y-3 sm:space-y-4">
               <div className="text-gray-700">
                  <span className="font-semibold text-gray-900">Appointment ID:</span>{" "}
                  <span className="font-medium">{appointment?.appointmentId}</span>
               </div>
               <div className="text-gray-700">
                  <span className="font-semibold text-gray-900">Date of Appointment:</span>{" "}
                  <span className="font-medium">{appointment?.dateOfAppointment}</span>
               </div>
               <div className="text-gray-700">
                  <span className="font-semibold text-gray-900">Date of Booking:</span>{" "}
                  <span className="font-medium">
                     {appointment?.dateOfBooking?.substring(0, 10) || "N/A"}
                  </span>
               </div>
               <div className="text-gray-700">
                  <span className="font-semibold text-gray-900">Doctor Name:</span>{" "}
                  <span className="font-medium">
                     {appointment?.doctor?.userEntity?.firstName}{" "}
                     {appointment?.doctor?.userEntity?.lastName}
                  </span>
               </div>
               <div className="text-gray-700 space-y-1 sm:space-y-2">
                  <h5 className="font-bold text-gray-900">Slot Details</h5>
                  <div>
                     <span className="font-semibold text-gray-900">Start Time:</span>{" "}
                     <span className="font-medium">{appointment?.slot?.startTime}</span>
                  </div>
                  <div>
                     <span className="font-semibold text-gray-900">End Time:</span>{" "}
                     <span className="font-medium">{appointment?.slot?.endTime}</span>
                  </div>
               </div>
               <div className="flex flex-wrap gap-2 mt-4">
                  <span
                     className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-bold ${
                     appointment?.stage === "approval"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                     }`}
                  >
                     Waiting for approval
                  </span>
                  <span
                     className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-bold ${
                     appointment?.stage === "doctor_v1"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                     }`}
                  >
                     Doctor visit 1
                  </span>
                  <span
                     className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-bold ${
                     appointment?.stage === "phlebotomist"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-200 text-gray-600"
                     }`}
                  >
                     Phlebotomist
                  </span>
                  <span
                     className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-bold ${
                     appointment?.stage === "doctor_v2"
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-200 text-gray-600"
                     }`}
                  >
                     Doctor visit 2
                  </span>
                  <span
                     className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-bold ${
                     appointment?.stage === "receptionist"
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-200 text-gray-600"
                     }`}
                  >
                     Receptionist
                  </span>
                  <span
                     className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-bold ${
                     appointment?.stage === "completed"
                        ? "bg-teal-500 text-white"
                        : "bg-gray-200 text-gray-600"
                     }`}
                  >
                     Completed
                  </span>
                  <span
                     className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-bold ${
                     appointment?.stage === "rejected"
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-600"
                     }`}
                  >
                     Rejected
                  </span>
               </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export { AppointmentDetails }
