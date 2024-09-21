import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
   const [username, setUsername] = useState();
   const [password, setPassword] = useState();
   const navigate = useNavigate();

   function onSubmitForm(e) {
      e.preventDefault();
      navigate("/login");
   }

   return (
      <div className="flex flex-col items-center justify-center h-full p-4">
         <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
         <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm" onSubmit={(e) => onSubmitForm(e)}>
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
               Sign Up
            </button>
         </form>
      </div>
   );
}

export {SignUp};
