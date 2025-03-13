import { useEffect, useState } from "react";
import { AuthConsumer } from "../../Hooks/AuthConsumer";
import { axiosInstance } from "../../axios/axios";

// eslint-disable-next-line react/prop-types
function Bill({ closeBill, username }) {
   const context = AuthConsumer();
   const { dispatch } = context;

   const [doctorFee, setDoctorFee] = useState(0);
   const [labTestFee, setLabTestFee] = useState({});
   const [medicineFee, setMedicineFee] = useState({});

   useEffect(() => {
      async function getData() {
         try {
            const data = await axiosInstance.post("/bill/generate", {
               username: username
            });
            console.log(data.data);
            setDoctorFee(() => data.data.doctorFee);
            setLabTestFee(() => data.data.labTestBillData);
            setMedicineFee(() => data.data.medicineBillData);
         } catch (e) {
            console.log(e);
            dispatch({ type: "setErrorMessage", payload: "Error while fetching bill." });
         }
      }
      getData();
   }, [dispatch, username]);

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
         <div className="bg-white w-full max-w-lg md:max-w-2xl rounded-lg shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Bill</h1>

            {doctorFee !== 0 ? (
               <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">Doctor Fee: <span className="font-medium text-gray-900">Rs. {doctorFee}</span></h2>
               </div>
            ) : (
               <h2 className="text-center text-gray-500">Loading...</h2>
            )}

            {Object.keys(labTestFee).length !== 0 ? (
               <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">Lab Test Fee:</h2>
                  <ul className="mt-2 space-y-1">
                     {Object.keys(labTestFee).map((labTest, index) => (
                        <li key={index} className="text-gray-600">
                           <span className="font-medium">{labTest}:</span> Rs.{labTestFee[labTest]}
                        </li>
                     ))}
                  </ul>
               </div>
            ) : (
               <h2 className="text-center text-gray-500">Loading...</h2>
            )}

            {Object.keys(medicineFee).length !== 0 ? (
               <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">Medicine Fee:</h2>
                  <ul className="mt-2 space-y-1">
                     {Object.keys(medicineFee).map((medicine, index) => (
                        <li key={index} className="text-gray-600">
                           <span className="font-medium">{medicine}:</span> Rs.{medicineFee[medicine]}
                        </li>
                     ))}
                  </ul>
               </div>
            ) : (
               <h2 className="text-center text-gray-500">Loading...</h2>
            )}

            <div className="flex justify-center mt-6">
               <button 
                  onClick={closeBill} 
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
               >
                  Close
               </button>
            </div>
         </div>
      </div>
   );
}

export default Bill;
