import { useEffect, useState } from "react";
import { AuthConsumer } from "../../Hooks/AuthConsumer";
import { useNavigate } from "react-router-dom";
import { isUnauthorized, setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";
import { axiosInstance } from "../../axios/axios";

// eslint-disable-next-line react/prop-types
function DiagnosisPage({ appointmentId, closeDiagnosisButton }) {
   const context = AuthConsumer();
   const { dispatch } = context;
   const navigate = useNavigate();

   const [appointment, setAppointment] = useState({});
   const [labTestData, setLabTestData] = useState([]);
   const [medicineData, setMedicineData] = useState([]);
   const [formData, setFormData] = useState({
      "labTestIds": [],
      "role": "",
      "medicineIds": [],
      "doctorFeedback": ""
   });

   useEffect(() => {
      async function getAppointmentData() {
         dispatch({ type: "setLoading" });

         try {
            const data = await axiosInstance.get("/doctor/appointment/getUpcomingAppointmentBYId", {
               params: {
                  aptId: appointmentId
               }
            });
            console.log(data);
            setAppointment(data?.data[0])
            
            if(data?.data[0].stage === "doctor_v1") {
               console.log("lab test data");
               const labTestRecords = await axiosInstance.get("/doctor/diagnose/getAllLabTests");
               console.log(labTestRecords);
               setLabTestData(labTestRecords.data);
            }
            const medicineRecords = await axiosInstance.get("/doctor/diagnose/getAllMedicineInventory");
            console.log(medicineRecords);
            setMedicineData(medicineRecords.data);
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

      getAppointmentData();
   }, [navigate, dispatch, appointmentId]);

   function onClickLabTestCard(e, labTestId) {
      e.preventDefault();
      if(formData.labTestIds.includes(labTestId)) {
         setFormData(data => {
            return {
               ...data,
               "labTestIds": data.labTestIds.filter(id => id !== labTestId)
            }
         });
         return;
      }
      setFormData((data) => {
         return {
            ...data,
            "labTestIds": [...data.labTestIds, labTestId]
         }
      });
   }

   function onClickMedicineCard(e, medicineId) {
      e.preventDefault();
      if(formData.medicineIds.includes(medicineId)) {
         setFormData(data => {
            return {
               ...data,
               "medicineIds": data.medicineIds.filter(id => id !== medicineId)
            }
         });
         return;
      }
      setFormData((data) => {
         return {
            ...data,
            "medicineIds": [...data.medicineIds, medicineId]
         }
      });
   }

   async function onSubmit(e) {
      e.preventDefault();
      if(formData.role === "") {
         dispatch({ type: "setErrorMessage", payload: "Role has to be selected" });
         return;
      }
      dispatch({ type: "setLoading" });

      try {
         if(formData.role === "receptionist") {
            const recepData = await axiosInstance.post("/doctor/diagnose/createPrescriptionRecord", {
               "appointmentId" : appointment?.appointmentId,
               "medicineIds" : formData.medicineIds
            });
            console.log(recepData);
         } else if(formData.role === "phlebotomist") {
            const phlebData = await axiosInstance.post("/doctor/diagnose/createPhlebotomistTestRecord", {
               "appointmentId" : appointment?.appointmentId,
               "labTestIds" : formData.labTestIds
            });
            console.log(phlebData);
         }

         const feedbackData = await axiosInstance.post("/doctor/diagnose/createDoctorFeedbackRecord", {
            "appointmentId" : appointment?.appointmentId,
            "doctorFeedback" : formData.doctorFeedback
         });
         console.log(feedbackData);

         if(formData.role === "receptionist") {
            const updateStage = await axiosInstance.post("/doctor/diagnose/updateStage", {
               "appointmentId" : appointment?.appointmentId,
               "stageName" : "receptionist"
            });
            console.log("Receptionist stage updated: " + updateStage);
         } else if(formData.role === "phlebotomist") {
            const updateStage = await axiosInstance.post("/doctor/diagnose/updateStage", {
               "appointmentId" : appointment?.appointmentId,
               "stageName" : "phlebotomist"
            });
            console.log("Phlebotomist stage updated: " + updateStage);
         }

         closeDiagnosisButton();
         dispatch({ type: "setSuccessMessage", payload: "Diagnosis form submitted" });
      } catch(e) {
         console.log(e);
         if(isUnauthorized(e)) {
            dispatch({ type: "logout" });
            setCurrentPathInLocalStorage("/");
            navigate("/");
         } else {
            dispatch({ type: "setErrorMessage", payload: e?.response?.data?.error });
         }
         return;
      } finally {
         dispatch({ type: "unsetLoading" });
      }
   }

   function isContainsLabTestId(labTestId) {
      return formData.labTestIds.includes(labTestId);
   }

   function isContainsMedicineId(medicineId) {
      return formData.medicineIds.includes(medicineId);
   }

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
         <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 sm:p-8 space-y-6 overflow-y-auto max-h-screen mx-4">
            <h1 className="text-2xl font-bold text-center text-gray-800">Diagnosis Form</h1>
            <div>
               <div className="text-gray-700 mb-4">
               <span className="font-semibold">Patient Name: </span>
               <span className="font-medium">
                  {appointment?.patient?.userEntity?.firstName}{" "}
                  {appointment?.patient?.userEntity?.lastName}
               </span>
               </div>

               <form onSubmit={(e) => onSubmit(e)} className="space-y-6">
               <div>
                  <label className="block text-gray-700 font-medium mb-2">
                     Forward Appointment
                  </label>
                  <select
                     value={formData.role}
                     onChange={(e) =>
                     setFormData((data) => ({
                        ...data,
                        role: e.target.value,
                     }))
                     }
                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                     <option value="">Forward appointment to...</option>
                     <option value="receptionist">Receptionist</option>
                     {appointment.stage === "doctor_v1" && (
                     <option value="phlebotomist">Phlebotomist</option>
                     )}
                  </select>
               </div>

               {  
                  labTestData.length > 0 && formData.role === "phlebotomist" && (
                  <div>
                     <label className="block text-gray-700 font-medium mb-2">
                     Select Lab Test
                     </label>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {
                        labTestData.map((labTest) => (
                        <div
                           key={labTest?.labTestId}
                           className={`p-4 border rounded-lg cursor-pointer ${
                           isContainsLabTestId(labTest?.labTestId)
                              ? "bg-blue-100 border-blue-500"
                              : "bg-gray-100 border-gray-300"
                           }`}
                           onClick={(e) => onClickLabTestCard(e, labTest?.labTestId)}
                        >
                           {labTest?.labTestName}
                        </div>
                     ))}
                     </div>
                  </div>)
               }

               {
                  medicineData.length > 0 && formData.role === "receptionist" && (
                  <div>
                     <label className="block text-gray-700 font-medium mb-2">
                     Select Medicine
                     </label>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {medicineData.map((medicine) => (
                        <div
                           key={medicine?.medicineId}
                           className={`p-4 border rounded-lg cursor-pointer ${
                           isContainsMedicineId(medicine?.medicineId)
                              ? "bg-green-100 border-green-500"
                              : "bg-gray-100 border-gray-300"
                           }`}
                           onClick={(e) => onClickMedicineCard(e, medicine?.medicineId)}
                        >
                           {medicine?.medicineName}
                        </div>
                     ))}
                     </div>
                  </div>)
               }

               <div>
                  <label className="block text-gray-700 font-medium mb-2">
                     Doctor Feedback
                  </label>
                  <textarea
                     placeholder="Doctor Feedback..."
                     value={formData.doctorFeedback}
                     onChange={(e) =>
                     setFormData((data) => ({
                        ...data,
                        doctorFeedback: e.target.value,
                     }))
                     }
                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
               </div>

               <div className="flex justify-end space-x-4">
                  <button
                     onClick={() => closeDiagnosisButton()}
                     type="button"
                     className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 transition"
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
                  >
                     Submit
                  </button>
               </div>
               </form>
            </div>
         </div>
      </div>
   )
}

export { DiagnosisPage };
