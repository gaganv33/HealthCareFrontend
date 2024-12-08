import { useEffect, useState } from "react";
import { AuthConsumer } from "../../Hooks/AuthConsumer";
import { setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axios";

function BookAppointment() {
   const context = AuthConsumer();
   const { dispatch } = context;

   const [doctors, setDoctors] = useState([]);
   const [openSlots, setOpenSlots] = useState([]);
   const navigate = useNavigate();

   const currentDate = new Date();
   const yyyy = currentDate.getFullYear();
   const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
   const dd = String(currentDate.getDate()).padStart(2, '0');
   const formattedDate = `${yyyy}-${mm}-${dd}`;

   const [selectedDoctor, setSelectedDoctor] = useState(-1);
   const [appointmentDate, setAppointmentDate] = useState(formattedDate);
   const [selectedSlotId, setSelectedSlotId] = useState(-1);

   useEffect(() => {
      async function getData() {
         dispatch({ type: "setLoading" });

         try {
            const data = await axiosInstance.get('patient/appointment/getAllDoctors');
            console.log(data);
            setDoctors(data.data);
         } catch(e) {
            console.log(e);
            if(e.status === 403 || e.status === 401) {
               dispatch({ type: "logout" });
               setCurrentPathInLocalStorage("/");
               navigate("/");
            } else {
               dispatch({ type: "setErrorMessage", payload: e?.response?.data?.detail });
            }
         } finally {
            dispatch({ type: "unsetLoading" });
         }
      }

      getData();
   }, [navigate, dispatch]);


   async function onClickGetOpenSlots(e) {
      e.preventDefault();
      dispatch({ type: "setLoading" });

      if(selectedDoctor === -1) {
         dispatch({ type: "setErrorMessage", payload: "Select a doctor" });
         return;
      }

      const requestData = {
         'doctorId' : selectedDoctor,
         'dateOfAppointment': appointmentDate
      }

      try {
         const data = await axiosInstance.post('patient/appointment/getOpenSlots', requestData);
         console.log(data); 
         setOpenSlots(() => { return data.data; });
      } catch(e) {
         console.log(e);
         if(e.status === 403 || e.status === 401) {
            dispatch({ type: "logout" });
            setCurrentPathInLocalStorage("/");
            navigate("/");
         } else {
            dispatch({ type: "setErrorMessage", payload: e?.response?.data?.detail });
         }
      } finally {
         dispatch({ type: "unsetLoading" });
      }
   }

   async function onClickBookAnAppointment(e) {
      e.preventDefault();
      dispatch({ type: "setLoading" });

      if(selectedDoctor === -1) {
         dispatch({ type: "setErrorMessage", payload: "Select a doctor" });
         return;
      }

      if(selectedSlotId === -1) {
         dispatch({ type: "setErrorMessage", payload: "Select a slot" });
         return;
      }

      try {
         const requestData = {
            'doctorId' : selectedDoctor,
            'dateOfAppointment': appointmentDate,
            'slotId': selectedSlotId
         }

         const data = await axiosInstance.post('patient/appointment/bookAppointment', requestData);
         console.log(data);
         dispatch({ type: "setSuccessMessage", payload: data.data });
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
   
   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
         <h1 className="text-2xl font-bold text-gray-800 mb-6">Book Appointment</h1>
         <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
            <div>
               <label className="block text-gray-700 font-medium mb-2">
                  Select a doctor
               </label>
               <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                  <option value={-1}>
                     Select a doctor
                  </option>
                  {
                     doctors.map((doctor) => (
                     <option key={doctor?.doctorId} value={doctor?.doctorId}>
                        {doctor?.firstName} {doctor?.lastName}
                     </option>))
                  }
               </select>
            </div>

            <div>
               <label className="block text-gray-700 font-medium mb-2">
                  Choose the date of appointment
               </label>
               <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>

            <div>
               <button
                  onClick={(e) => onClickGetOpenSlots(e)}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition w-full mb-4"
               >
                  Get open slots
               </button>
               <select
                  value={selectedSlotId}
                  onChange={(e) => setSelectedSlotId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                  <option value={-1}>
                     Select a slot
                  </option>
                  {
                     openSlots.map((slots) => (
                     <option key={slots?.slotId} value={slots?.slotId}>
                        {slots?.startTime}-{slots?.endTime}
                     </option>))
                  }
               </select>
            </div>

            <div>
               <button
                  onClick={(e) => onClickBookAnAppointment(e)}
                  className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition w-full"
               >
                  Book an appointment
               </button>
            </div>
         </form>
      </div>
   );
}

export { BookAppointment }
