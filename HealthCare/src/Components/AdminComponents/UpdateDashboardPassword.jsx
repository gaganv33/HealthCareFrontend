import { useState } from "react";
import { AuthConsumer } from "../../Hooks/AuthConsumer";
import { axiosInstance } from "../../axios/axios";
import { setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";
import { useNavigate } from "react-router-dom";

function UpdateDashboardPassword() {
   const context = AuthConsumer();
   const { dispatch } = context;
   const navigate = useNavigate();

   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [retypeNewPassword, setRetypeNewPassword] = useState("");

   async function onClickUpdateDashboardPasswordButton(e) {
      e.preventDefault();
      
      if(newPassword !== retypeNewPassword) {
         dispatch({ 
            type: "setErrorMessage", 
            payload: "new password and the retyped password are not matching" 
         });
         return;
      }

      dispatch({ type: "setLoading" });
      try {
         const data = await axiosInstance.put("/admin/updateDashboardPassword", {
            "oldPassword" : oldPassword,
            "newPassword" : newPassword,
            "retypeNewPassword": retypeNewPassword
         });
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-6">
         <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update Dashboard Password</h1>
         <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <div className="mb-4">
               <label className="block text-gray-700 font-medium mb-2">Old Password</label>
               <input
               type="password"
               placeholder="Old Password"
               value={oldPassword}
               onChange={(e) => setOldPassword(e.target.value)}
               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 font-medium mb-2">New Password</label>
               <input
               type="password"
               placeholder="New Password"
               value={newPassword}
               onChange={(e) => setNewPassword(e.target.value)}
               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
               />
            </div>
            <div className="mb-6">
               <label className="block text-gray-700 font-medium mb-2">Re-enter New Password</label>
               <input
               type="password"
               placeholder="Re-enter Password"
               value={retypeNewPassword}
               onChange={(e) => setRetypeNewPassword(e.target.value)}
               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
               />
            </div>
            <div>
               <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
                  onClick={(e) => onClickUpdateDashboardPasswordButton(e)}
               >
                  Update Dashboard Password
               </button>
            </div>
         </form>
      </div>
   );
}

export { UpdateDashboardPassword };
