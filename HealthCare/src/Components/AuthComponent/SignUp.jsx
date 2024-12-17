import { useState } from "react";
import { axiosInstance } from "../../axios/axios";
import { AuthConsumer } from "../../Hooks/AuthConsumer";

function SignUp() {
   const context = AuthConsumer();
   const { dispatch } = context;

   const [username, setUsername] = useState();
   const [password, setPassword] = useState();
   const [confirmPassword, setconfirmPassword] = useState();
   const [firstName, setFirstName] = useState();
   const [lastName, setLastName] = useState();
   const [roles, setRoles] = useState("ROLE_ADMIN");

   async function onSubmitForm(e) {
      e.preventDefault();
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValid = emailPattern.test(username);

      if(!isValid) {
         dispatch({ type: "setErrorMessage", payload: "Enter a valid username / email" });
         return;
      }

      if(password !== confirmPassword) {
         dispatch({ type: "setErrorMessage", payload: "Passwords and not matching" });
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
         const data = await axiosInstance.post("auth/register", {
            firstName : firstName, 
            lastName : lastName, 
            username : username,
            password: password,
            confirmPassword: confirmPassword,
            role : roles
         });
         console.log(data);
         if(data.status === 201) {
            dispatch({ type: "setSuccessMessage", payload: data?.data });
         }
         else {
            dispatch({ type: "setErrorMessage", payload: "Registration Failed. Try Again" });
         }
      } catch(e) {
         console.log(e);
         dispatch({ type: "setErrorMessage", payload: e?.response?.data?.detail });
      } finally {
         dispatch({ type: "unsetLoading" });
      }
   }

   return (
      <div className="flex flex-col items-center justify-center h-full p-4">
         <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
         <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm" onSubmit={(e) => onSubmitForm(e)}>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-semibold mb-2">First Name</label>
               <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-semibold mb-2">Last Name</label>
               <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>
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
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
               <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-semibold mb-2">Role</label>
               <select value={roles} onChange={(e) => setRoles(e.target.value)} 
               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="ROLE_ADMIN">ADMIN</option>
                  <option value="ROLE_DOCTOR">DOCTOR</option>
                  <option value="ROLE_PATIENT">PATIENT</option>
                  <option value="ROLE_PHLEBOTOMIST">PHLEBOTOMIST</option>
                  <option value="ROLE_RECEPTIONIST">RECEPTIONIST</option>
               </select>
            </div>
            <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition">
               Sign Up
            </button>
         </form>
      </div>
   );
}

export { SignUp };
