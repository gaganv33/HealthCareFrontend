import { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axios";
import { AuthConsumer } from "../../Hooks/AuthConsumer";
import { setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";
import { useNavigate } from "react-router-dom";

function FetchDisabledUsers() {
   const context = AuthConsumer();
   const { dispatch } = context;
   const navigate = useNavigate();

   const [data, setData] = useState([]);

   async function onClickEnableDisabledUser(e, username) {
      e.preventDefault();
      dispatch({ type: "setLoading" });
      try {
         const data = await axiosInstance.put("/admin/enableDisabledUser", {
            "username" : username
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
            dispatch({ type: "setErrorMessage", payload: e?.response?.data?.detail });
         }
      } finally {
         dispatch({ type: "unsetLoading" });
      }
   }

   async function onClickDeleteDisabledUser(e, username, role) {
      e.preventDefault();
      dispatch({ type: "setLoading" });
      try {
         const data = await axiosInstance.put("/admin/deleteDisabledUser", {
            "username" : username, "role": role
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
            dispatch({ type: "setErrorMessage", payload: e?.response?.data?.detail });
         }
      } finally {
         dispatch({ type: "unsetLoading" });
      }
   }

   useEffect(() => {
      dispatch({ type: "setLoading" });
      async function getDisabledUsers() {
         try {
            const data = await axiosInstance.get("/admin/fetchDisabledUsers")
            console.log(data);
            setData(data?.data);
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

      getDisabledUsers();
   }, [navigate, dispatch])

   return (
      <div className="min-h-screen bg-gray-100 p-4">
         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Fetch Disabled Users
         </h1>

         {data.length === 0 ? (
            <h4 className="text-center text-lg text-gray-600 font-medium">
               No user accounts are disabled
            </h4>
         ) : (
            <div className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
               {data.map((user) => (
               <div
                  key={user.username}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex flex-col gap-y-2"
               >
                  <p className="text-gray-700">
                     First Name: <b className="text-gray-800">{user.firstName}</b>
                  </p>
                  <p className="text-gray-700">
                     Last Name: <b className="text-gray-800">{user.lastName}</b>
                  </p>
                  <p className="text-gray-700">
                     Username: <b className="text-gray-800">{user.username}</b>
                  </p>

                  <button
                     className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
                     onClick={(e) => onClickEnableDisabledUser(e, user.username)}
                  >
                     Enable User
                  </button>

                  <button
                     className="mt-2 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
                     onClick={(e) => onClickDeleteDisabledUser(e, user.username, user.role)}
                  >
                     Delete User
                  </button>
               </div>
               ))}
            </div>
         )}
      </div>
   )
}

export { FetchDisabledUsers }
