import { useNavigate } from "react-router-dom";
import { AuthConsumer } from "../Hooks/AuthConsumer";

// eslint-disable-next-line react/prop-types
function AppLayout({ children }) {
   const context = AuthConsumer();
   const { user, isAuthenticated, dispatch, role } = context;
   const navigate = useNavigate();

   function onClickSignUp() {
      navigate('/signup');
   }

   function onClickHomePage() {
      navigate("/");
   }

   function onClickLogin() {
      navigate("/login");
   }

   function onClickLogout() {
      dispatch({ type: "logout" });
      navigate("/");
   }

   return (
      <div className="max-h-screen flex flex-col">
         <nav className="bg-blue-600 p-4 shadow-md flex flex-col gap-y-4 sm:flex-row">
            <h1 className="text-white text-2xl text-center font-bold basis-1/3 sm:text-left cursor-pointer"
            onClick={onClickHomePage}>
               Health Care
            </h1>
            {
               !isAuthenticated ? 
               (<div className="space-x-4 flex w-full justify-center sm:justify-end basis-2/3">
                  <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-blue-500 hover:text-white" onClick={onClickSignUp}>
                     Sign Up
                  </button>
                  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-white hover:text-blue-600 transition" onClick={onClickLogin}>
                     Login
                  </button>
               </div>) : 
               (<div className="space-x-4 flex w-full justify-center sm:justify-end basis-2/3 items-center">
                  <h1 className="text-white text-md text-center font-bold">
                     { role } : { user }
                  </h1>
                  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-white hover:text-blue-600 transition" onClick={onClickLogout}>
                     Login Out
                  </button>
               </div> )
            }
         </nav>

         <div className="flex-grow container mx-auto p-4">
            {children}
         </div>
      </div>

   )
}

export { AppLayout };
