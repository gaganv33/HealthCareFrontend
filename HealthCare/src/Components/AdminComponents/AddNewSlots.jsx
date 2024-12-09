import { useState } from "react";
import { AuthConsumer } from "../../Hooks/AuthConsumer";
import { axiosInstance } from "../../axios/axios";
import { isUnauthorized, setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";
import { useNavigate } from "react-router-dom";

function AddNewSlots() {
   const context = AuthConsumer();
   const { dispatch } = context;
   const navigate = useNavigate();

   const [startTime, setStartTime] = useState("");
   const [endTime, setEndTime] = useState("");

   async function onSubmit(e) {
      e.preventDefault();
      
      dispatch({ type: "setLoading" });
      try {
         const data = await axiosInstance.post("/admin/addNewSlots", [
            {
               "startTime" : startTime,
               "endTime" : endTime
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
            dispatch({ type: "setErrorMessage", payload: e?.response?.data?.detail });
         }
      } finally {
         dispatch({ type: "unsetLoading" });
      }
   }

   return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
         <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Slots</h1>
            <form onSubmit={(e) => onSubmit(e)} className="space-y-4">
               <div>
                  <label className="block text-gray-700 font-medium mb-2">Enter Start Time</label>
                  <input
                     type="time"
                     value={startTime}
                     onChange={(e) => setStartTime(e.target.value)}
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>
               <div>
                  <label className="block text-gray-700 font-medium mb-2">Enter End Time</label>
                  <input
                     type="time"
                     value={endTime}
                     onChange={(e) => setEndTime(e.target.value)}
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

export { AddNewSlots };
