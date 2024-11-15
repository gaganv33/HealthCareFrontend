import { AuthConsumer } from "../../Hooks/AuthConsumer";
import { useState } from "react";
import axios from "axios";
import { ErrorPage } from "../MessageComponents/ErrorPage";
import { useNavigate } from "react-router-dom";
import { setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";

function Login() {
   const context = AuthConsumer();
   const { dispatch } = context;
   const navigate = useNavigate();

   const [username, setUsername] = useState();
   const [password, setPassword] = useState();
   const [isError, setIsError] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");

   async function onSubmitForm(e) {
      e.preventDefault();
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValid = emailPattern.test(username);

      if(!isValid) {
         setErrorMessage(() => { return "Enter a valid username / email."; });
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
         const data = await axios.post("http://localhost:8080/auth/login", { userName: username, password: password });
         console.log(data);
         if(data.status === 200) {
            dispatch({ 
               type: "login", 
               payload: { 
                  user: data.data.userName, 
                  role: data.data.roles, 
                  access_token: data.data.token, 
                  firstName: data.data.firstName, 
                  lastName: data.data.lastName 
               }
            });
            // Need to change according to the role.
            setCurrentPathInLocalStorage("/admin");
            navigate("/admin");
            // 
         } else {
            setIsError(() => { return true; });
            setErrorMessage(() => { return "Incorrect credentials."; });
         }
      } catch(e) {
         console.log(e);
         setIsError(() => { return true; });
         setErrorMessage(() => { return e.response.data; });
      }
   }

   function onErrorButtonClose() {
      setIsError(() => { return false; });
      setErrorMessage(() => { return ""; });
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
         {
            isError && <ErrorPage message={ errorMessage } onErrorButtonClose={ onErrorButtonClose } />
         }
      </div>
   );
}

export { Login };
