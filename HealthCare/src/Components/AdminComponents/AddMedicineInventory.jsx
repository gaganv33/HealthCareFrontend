import { useState } from "react";
import { AuthConsumer } from "../../Hooks/AuthConsumer"
import { isUnauthorized, setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axios";

function AddMedicineInventory() {
   const context = AuthConsumer();
   const { dispatch } = context;
   const navigate = useNavigate();

   const [medicineName, setMedicineName] = useState("");
   const [medicineQuantity, setMedicineQuantity] = useState("");
   const [medicineSerialNumber, setMedicineSerialNumber] = useState("");
   const [medicinePrice, setMedicinePrice] = useState(0);

   async function onSubmit(e) {
      e.preventDefault();
      
      if(isNaN(medicineQuantity)) {
         dispatch({ type: "setErrorMessage", payload: "Medicine quantity should be a number" });
         return;
      }

      dispatch({ type: "setLoading" });
      try {
         const data = await axiosInstance.post("/admin/addNewMedicines", [
            {
               "medicineName": medicineName,
               "medicineQuantity": parseInt(medicineQuantity, 10),
               "medicineSerialNumber": medicineSerialNumber,
               "medicinePrice" : medicinePrice
            }
         ]);
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
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
         <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
               Add Medicine Inventory
            </h1>

            <form onSubmit={(e) => onSubmit(e)} className="space-y-4">
               <div>
                  <label className="block text-gray-700 font-medium mb-2">Medicine Name</label>
                  <input
                     type="text"
                     placeholder="Enter medicine name"
                     value={medicineName}
                     onChange={(e) => setMedicineName(e.target.value)}
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>

               <div>
                  <label className="block text-gray-700 font-medium mb-2">Medicine Quantity</label>
                  <input
                     type="text"
                     placeholder="Enter the medicine quantity"
                     value={medicineQuantity}
                     onChange={(e) => setMedicineQuantity(e.target.value)}
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>

               <div>
                  <label className="block text-gray-700 font-medium mb-2">Medicine Serial Number</label>
                  <input
                     type="text"
                     placeholder="Enter medicine serial number"
                     value={medicineSerialNumber}
                     onChange={(e) => setMedicineSerialNumber(e.target.value)}
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>

               <div>
                  <label className="block text-gray-700 font-medium mb-2">Medicine Price</label>
                  <input
                     type="number"
                     placeholder="Enter medicine price"
                     value={medicinePrice}
                     onChange={(e) => setMedicinePrice(e.target.value)}
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>

               <button
               type="submit"
               className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
               >
               Submit
               </button>
            </form>
         </div>
      </div>
   )
}

export { AddMedicineInventory }
