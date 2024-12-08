import { useState } from "react";
import { AuthConsumer } from "../../Hooks/AuthConsumer";
import { axiosInstance } from "../../axios/axios";
import { setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";
import { useNavigate } from "react-router-dom";

function AddLabTest() {
   const context = AuthConsumer();
   const { dispatch } = context;
   const navigate = useNavigate();

   const [labTestName, setLabTestName] = useState("");
   const [labTestFields, setLabTestFields] = useState("");

   async function onSubmit(e) {
      e.preventDefault();

      dispatch({ type: "setLoading" });
      try {
         const data = await axiosInstance.post("/admin/addNewLabTests", [
            {
               "labTestName" : labTestName,
               "labTestFields": labTestFields.trim().split(",")
            }
         ]);
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
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
         <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Lab Test</h1>
            <form onSubmit={(e) => onSubmit(e)} className="space-y-4">
               <div>
                  <label className="block text-gray-700 font-medium mb-2">Lab Test Name</label>
                  <input
                     type="text"
                     placeholder="Enter lab test name"
                     value={labTestName}
                     onChange={(e) => setLabTestName(e.target.value)}
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>
               <div>
                  <label className="block text-gray-700 font-medium mb-2">Lab Test Fields</label>
                  <input
                     type="text"
                     placeholder="Enter lab test field (separated by ,)"
                     value={labTestFields}
                     onChange={(e) => setLabTestFields(e.target.value)}
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

export { AddLabTest };
