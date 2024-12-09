import { useState } from "react";
import { AuthConsumer } from "../../Hooks/AuthConsumer"
import { axiosInstance } from "../../axios/axios";
import { isUnauthorized, setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";
import { useNavigate } from "react-router-dom";

function AddNewStage() {
   const context = AuthConsumer();
   const { dispatch } = context;
   const navigate = useNavigate();

   const [stage, setStage] = useState("");

   async function onSubmit(e) {
      e.preventDefault();
      if(stage.length === 0) {
         dispatch({ type: "setErrorMessage", payload: "stage field should not be empty" });
         return;
      }
      try {
         const data = await axiosInstance.post("/admin/addNewStages", {
            "stageList": stage.trim().split(",")
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
            dispatch({ type: "setErrorMessage", payload: e?.response?.data?.detail });
         }
      } finally {
         dispatch({ type: "unsetLoading" });
      }
   }

   return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-xl font-bold text-center text-gray-800 mb-6">
               Add New Stage
            </h1>

            <form onSubmit={(e) => onSubmit(e)} className="space-y-4">
               <div className="flex flex-col">
               <label className="text-gray-700 font-medium mb-2">Stage</label>
               <input
                  type="text"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter stage name (seperated by ,)"
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

export { AddNewStage }
