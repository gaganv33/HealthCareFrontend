import { AuthConsumer } from "../../Hooks/AuthConsumer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";
import { axiosInstance } from "../../axios/axios";

function Login() {
   const context = AuthConsumer();
   const { dispatch } = context;
   const navigate = useNavigate();

   const [username, setUsername] = useState();
   const [password, setPassword] = useState();

   async function onSubmitForm(e) {
      e.preventDefault();
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValid = emailPattern.test(username);

      if(!isValid) {
         dispatch({ type: "setErrorMessage", payload: "Enter a valid username / email" });
         return;
      }

      const length = password === null || password === undefined ? 0 : password.length;

      if(length < 4) {
         dispatch({ type: "setErrorMessage", payload: "Minimum length of password is 4" });
         return;
      }

      if(length > 20) {
         dispatch({ type: "setErrorMessage", payload: "Maximum length of password is 20" });
         return;
      }
      
      dispatch({ type: "setLoading" });
      try {
         const data = await axiosInstance.post("auth/login", 
         { 
            username: username, 
            password: password 
         });
         console.log(data);
         if(data.status === 200) {
            // Need to change according to the role.
            if(data.data.user.role === "ROLE_ADMIN") {
               setCurrentPathInLocalStorage("/admin");
               navigate("/admin");
            } else if(data.data.user.role === "ROLE_DOCTOR") {
               setCurrentPathInLocalStorage("/doctor");
               navigate("/doctor");
            } else if(data.data.user.role === "ROLE_PATIENT") {
               setCurrentPathInLocalStorage("/patient");
               navigate("/patient");
            } else if(data.data.user.role === "ROLE_RECEPTIONIST") {
               setCurrentPathInLocalStorage("/receptionist");
               navigate("/receptionist");
            } 
            // 
            dispatch({ 
               type: "login", 
               payload: { 
                  user: data.data.user.username, 
                  role: data.data.user.role, 
                  access_token: data.data.token, 
                  firstName: data.data.user.firstName, 
                  lastName: data.data.user.lastName 
               }
            });
         } else {
            dispatch({ type: "setErrorMessage", payload: "Incorrect credentials" });
         }
      } catch(e) {
         console.log(e);
         dispatch({ type: "setErrorMessage", payload: e?.response?.data?.detail });
      } finally {
         dispatch({ type: "unsetLoading" });
      }
   }

   return (
      <div className="flex flex-col items-center justify-center p-4">
         <h2 className="text-3xl font-bold mb-6">Login</h2>
         <form className="bg-white shadow-lg  rounded-lg p-8 w-full max-w-sm" onSubmit={(e) => onSubmitForm(e)}>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
               <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
               <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>
            <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition">
               Login
            </button>
         </form>
      </div>
   );
}

export { Login };
