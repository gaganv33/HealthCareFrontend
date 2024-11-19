import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorPage } from "../MessageComponents/ErrorPage";
import { SuccessPage } from "../MessageComponents/SuccessPage";
import { setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";
import { axiosInstance } from "../../axios/axios";

function SignUp() {
   const [username, setUsername] = useState();
   const [password, setPassword] = useState();
   const [confirmPassword, setconfirmPassword] = useState();
   const [firstName, setFirstName] = useState();
   const [lastName, setLastName] = useState();
   const [roles, setRoles] = useState("ROLE_ADMIN");

   const [isError, setIsError] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");

   const [isSuccess, setIsSuccess] = useState(false);
   const [successMessage, setSuccessMessage] = useState("");

   const navigate = useNavigate();

   async function onSubmitForm(e) {
      e.preventDefault();
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValid = emailPattern.test(username);

      if(!isValid) {
         setErrorMessage(() => { return "Enter a valid username / email."; });
         setIsError(() => { return true; });
         return;
      }

      if(password !== confirmPassword) {
         setErrorMessage(() => { return "Passwords and not matching."; });
         setIsError(() => { return true; });
         return;
      }
      
      const length = password === null || password === undefined ? 0 : password.length;

      if(length < 4) {
         setErrorMessage(() => { return "Minimum length of password is 4."; });
         setIsError(() => { return true; });
         return;
      }

      if(length > 20) {
         setErrorMessage(() => { return "Maximum length of password is 20."; });
         setIsError(() => { return true; });
         return;
      }
      
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
            setIsSuccess(() => { return true; });
            setSuccessMessage(() => { return data.data; });
         }
         else {
            setErrorMessage(() => { return "Registration Failed. Try Again."; });
            setIsError(() => { return true; });
         }
      } catch(e) {
         console.log(e);
         setErrorMessage(() => { 
            return e?.response?.data 
         });
         setIsError(() => { return true; });
      }
   }

   function onErrorButtonClose() {
      setIsError(() => { return false; });
      setErrorMessage(() => { return ""; });
   }

   function onSuccessButtonClose() {
      setIsSuccess(() => { return false; });
      setSuccessMessage(() => { return ""; });
      setCurrentPathInLocalStorage("/login");
      navigate("/login");
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
         {
            isError && <ErrorPage message={ errorMessage } onErrorButtonClose={ onErrorButtonClose } />
         }
         {
            isSuccess && <SuccessPage message={ successMessage } onSuccessButtonClose={ onSuccessButtonClose } />
         }
      </div>
   );
}

export {SignUp};
