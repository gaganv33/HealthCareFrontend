import { useCallback, useEffect, useState } from "react";
import { AuthConsumer } from "../Hooks/AuthConsumer";
import { useNavigate } from "react-router-dom";
import { Profile } from "../Components/ProfileComponent/Profile";
import { setCurrentPathInLocalStorage } from "../Hooks/UtilFunctions";

// eslint-disable-next-line react/prop-types
function AppLayout({ children }) {
   let context = AuthConsumer();
   const { isAuthenticated, dispatch, currentPath } = context;
   const navigate = useNavigate();
   const [isProfile, setIsProfile] = useState(false);

   function onClickSignUp() {
      setCurrentPathInLocalStorage("/signup");
      navigate('/signup');
   }

   function onClickHomePage() {
      if(!isAuthenticated) {
         setCurrentPathInLocalStorage("/");
         navigate("/");
      } else {
         // Need to change according to the role type.
         setCurrentPathInLocalStorage("/admin");
         navigate("/admin");
         //
      }
   }

   function onClickLogin() {
      setCurrentPathInLocalStorage("/login");
      navigate("/login");
   }

   const onClickLogout = useCallback(() => {
      dispatch({ type: "logout" });
      setCurrentPathInLocalStorage("/");
      navigate("/");
   }, [dispatch, navigate]);

   function onClickProfile() {
      setIsProfile(() => { return true; });
   }

   function onCloseProfile() {
      setIsProfile(() => { return false; });
   }


   // *** Note: Dont add "navigate" in dependency array, since it does not allow to change the url. ***
   useEffect(function() {
      navigate(currentPath);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentPath]);


   return (
      <div className="max-h-screen flex flex-col">
         <nav className="bg-blue-600 p-4 shadow-md flex flex-wrap gap-y-4 justify-center sm:justify-between items-center">
            <h2 className="text-white text-md sm:text-2xl font-semibold cursor-pointer flex items-center justify-center sm:basis-1/3"
               onClick={onClickHomePage}>
               Health Care
            </h2>
            
         {!isAuthenticated ? (
               <div className="space-x-4 flex w-full justify-center sm:justify-end sm:basis-2/3">
                  <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition"
                     onClick={onClickSignUp}>
                     Sign Up
                  </button>
                  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-white hover:text-blue-600 transition"
                     onClick={onClickLogin}>
                     Login
                  </button>
               </div>
            ) : (
               <div className="space-x-5 flex w-full justify-center sm:justify-end sm:basis-2/3 items-center">
                  <button className="bg-blue-500 text-white font-semibold py-2 px-2 rounded hover:bg-white hover:text-blue-600 transition"
                     onClick={onClickProfile}>
                     Profile
                  </button>
                  <button className="bg-blue-500 text-white font-semibold py-2 px-2 rounded hover:bg-white hover:text-blue-600 transition"
                     onClick={onClickLogout}>
                     Logout
                  </button>
               </div>
            )}
         </nav>

         <div className="flex-grow container mx-auto p-4 sm:p-8 sm:w-3/4 text-justify">
            {children}
         </div>

         { isProfile && <Profile onCloseProfile={onCloseProfile} /> }
      </div>
   )
}

export { AppLayout };
