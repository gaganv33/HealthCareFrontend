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
   }, [navigate, dispatch]);

   async function onClickCompleted(e, appointmentId) {
      e.preventDefault();
      dispatch({ type: "setLoading" });
      try {
         const data = await axiosInstance.post("/receptionist/updateStage", {
            "appointmentId": appointmentId
         });
         console.log(data);
         dispatch({ type: "setSuccessMessage", payload: data?.data });
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
      <div className="p-4">
         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Get All Pending Prescriptions
         </h1>
         <div>
            {
               data !== null && data?.length === 0 && (
               <h3 className="text-center text-lg text-gray-600 font-medium">
                  No Prescription Found
               </h3>
            )}
         </div>
         <div className="space-y-6">
            {
               data.map((prescription) => (
               <div
               key={prescription?.prescriptionId}
               className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white space-y-4">
               <div className="text-gray-700">
                  <span className="font-semibold">Patient Name: </span>
                  <span className="font-medium">
                     {prescription?.appointmentEntity?.patient?.userEntity?.firstName}{" "}
                     {prescription?.appointmentEntity?.patient?.userEntity?.lastName}
                  </span>
               </div>
               
               <div className="text-gray-700">
                  <span className="font-semibold">Doctor Name: </span>
                  <span className="font-medium">
                     {prescription?.appointmentEntity?.doctor?.userEntity?.firstName}{" "}
                     {prescription?.appointmentEntity?.doctor?.userEntity?.lastName}
                  </span>
               </div>

               {
                  prescription?.medicineInventoryEntities !== null && 
                  prescription?.medicineInventoryEntities?.length > 0 && (
                  <div>
                     <h4 className="text-gray-800 font-semibold mb-2">Medicines:</h4>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {
                        prescription?.medicineInventoryEntities.map((medicine) => (
                        <div
                           key={medicine?.medicineId}
                           className="border border-gray-300 rounded-md p-3 bg-gray-50 shadow-sm">
                           <span className="block text-sm text-gray-700 font-semibold">
                              Medicine Name:
                           </span>
                           <span className="block text-sm text-gray-600">
                              {medicine?.medicineName}
                           </span>
                           <span className="block text-sm text-gray-700 font-semibold">
                              Quantity:
                           </span>
                           <span className="block text-sm text-gray-600">
                              {medicine?.medicineQuantity}
                           </span>
                        </div>
                     ))}
                     </div>
                  </div>
               )}

               <div className="flex justify-end">
                  <button
                     onClick={(e) =>
                     onClickCompleted(e, prescription?.appointmentEntity?.appointmentId)
                     }
                     className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition">
                     Completed
                  </button>
               </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export { PendingPrescriptionsPage };
