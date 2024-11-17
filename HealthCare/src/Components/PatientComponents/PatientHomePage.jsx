import { useEffect, useState } from "react";
import { AuthConsumer } from "../../Hooks/AuthConsumer";
import axios from "axios";
import { ErrorPage } from "../MessageComponents/ErrorPage";
import { setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";
import { useNavigate } from "react-router-dom";

function PatientHomePage() {
   const context = AuthConsumer();
   const { access_token, dispatch } = context;
   const [doctors, setDoctors] = useState([]);
   const navigate = useNavigate();

   const currentDate = new Date();
   const yyyy = currentDate.getFullYear();
   const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
   const dd = String(currentDate.getDate()).padStart(2, '0');
   const formattedDate = `${yyyy}-${mm}-${dd}`;

   const [selectedDoctor, setSelectedDoctor] = useState(-1);
   const [appointmentDate, setAppointmentDate] = useState(formattedDate);
   const [openSlots, setOpenSlots] = useState([]);

   const [isError, setIsError] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");

   function onErrorButtonClose() {
      setIsError(() => { return false; });
      setErrorMessage(() => { return ""; });
   }

   useEffect(() => {
      async function getData() {
         const config = {
            headers: {
               'Authorization' : 'Bearer ' + access_token,
               'Access-Control-Allow-Origin': '*',
               'Content-Type': 'application/json',
               withCredentials: true
            }
         };
         try {
            const data = await axios.get('http://localhost:8080/patient/getAllDoctors', config);
            console.log(data);
            setDoctors(data.data);
         } catch(e) {
            console.log(e);
         }
      }

      getData();
   }, [access_token]);


   async function onClickGetOpenSlots(e) {
      e.preventDefault();

      if(selectedDoctor === -1) {
         setIsError(() => { return true; });
         setErrorMessage(() => { return "Select a doctor"; });
         return;
      }

      const config = {
         headers: {
            'Authorization' : 'Bearer ' + access_token,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true
         }
      };

      const requestData = {
         'doctorId' : selectedDoctor,
         'dateOfAppointment': appointmentDate
      }

      try {
         const data = await axios.post('http://localhost:8080/patient/getOpenSlots', requestData, config);
         console.log(data); 
         setOpenSlots(() => { return data.data; });
      } catch(e) {
         console.log(e);
         if(e.status === 403 || e.status === 401) {
            dispatch({ type: "logout" });
            setCurrentPathInLocalStorage("/");
            navigate("/");
         } else {
            setIsError(() => { return true; });
            setErrorMessage(() => { return e.response.data; });
         }
      }
   }
   
   return (
      <div>
         <h1>
            Book Appointment
         </h1>
         <form>
            {/* Selecting a doctor components */}
            <label>
               Select a doctor
            </label>
            <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
               <option value={-1}>Select a doctor</option>
               {
                  doctors.map((doctor) => {
                     return (
                        <option key={doctor?.doctorId} value={doctor?.doctorId}>
                           {doctor?.firstName} {doctor?.lastName}
                        </option>
                     )
                  })
               }
            </select>

            {/* Date picker component */}
            <label>
               Choose the date of appointment
            </label>
            <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />

            <button onClick={(e) => onClickGetOpenSlots(e)}>
               Get open slots
            </button>
         </form>
         {
            isError && <ErrorPage message={ errorMessage } onErrorButtonClose={ onErrorButtonClose } />
         }
      </div>
   );
}

export { PatientHomePage }
