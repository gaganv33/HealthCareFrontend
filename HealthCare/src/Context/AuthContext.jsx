import { createContext, useEffect, useReducer } from "react";
import { setLocalStorageValueOnLogin, setLocalStorageOnLogout } from "../Hooks/UtilFunctions";

const AuthContext = createContext();

const intialState = {
   firstName: "",
   lastName: "",
   user : "",
   access_token: "",
   isAuthenticated : false,
   role: "",
   currentPath: "/",
   isError: false,
   errorMessage: "",
   isSuccess: false,
   successMessage: "",
   isLoading: false
};

function reducer(state, action) {
   switch(action.type) {
      case "login":
         setLocalStorageValueOnLogin(
            action.payload.firstName, 
            action.payload.lastName, 
            action.payload.user, 
            action.payload.role, 
            action.payload.access_token
         );
         return { 
            ...state, 
            user: action.payload.user, 
            isAuthenticated: true, 
            role: action.payload.role, 
            access_token: action.payload.access_token, 
            firstName: action.payload.firstName, 
            lastName: action.payload.lastName 
         };
      case "logout":
         setLocalStorageOnLogout();
         return { ...state, user: "", isAuthenticated: false, role: "", firstName: "", lastName: "", access_token: "" };
      case "setUser":
         return { ...state, user: action.payload };
      case "setIsAuthenticated": 
         return { ...state, isAuthenticated: action.payload };
      case "setRole": 
         return { ...state, role: action.payload };
      case "setAccessToken":
         return { ...state, access_token: action.payload };
      case "setFirstName":
         return { ...state, firstName: action.payload };
      case "setLastName":
         return { ...state, lastName: action.payload };
      case "setCurrentPath":
         return { ...state, currentPath: action.payload };
      case "setSuccessMessage":
         return { ...state, successMessage: action.payload, isSuccess: true };
      case "unsetSuccessMessage":
         return { ...state, successMessage: "", isSuccess: false };
      case "setErrorMessage":
         return { ...state, errorMessage: action.payload, isError: true };
      case "unsetErrorMessage":
         return { ...state, errorMessage: "", isError: false };
      case "setLoading":
         return { ...state, isLoading: true };
      case "unsetLoading":
         return { ...state, isLoading: false };
      default:
         throw new Error("Invalid action type.");
   }
}

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
   const [{ firstName, lastName, user, isAuthenticated, role, access_token, currentPath, isSuccess, successMessage, isError, errorMessage, isLoading }, dispatch] = useReducer(reducer, intialState);

   useEffect(function() {
      const firstNameLocalStorage = JSON.parse(localStorage.getItem('firstName'));
      const lastNameLocalStorage = JSON.parse(localStorage.getItem('lastName'));
      const userLocalStorage = JSON.parse(localStorage.getItem('user'));
      const isAuthenticatedLocalStorage = JSON.parse(localStorage.getItem('isAuthenticated'));
      const roleLocalStorage = JSON.parse(localStorage.getItem('role'));
      const accessTokenLocalStorage = JSON.parse(localStorage.getItem('access_token'));
      const currentPathLocalStorage = JSON.parse(localStorage.getItem('currentPath'));

      if(firstNameLocalStorage !== null) {
         dispatch({ type: "setFirstName", payload: firstNameLocalStorage });
      }
      if(lastNameLocalStorage !== null) {
         dispatch({ type: "setLastName", payload: lastNameLocalStorage });
      }
      if(userLocalStorage !== null) {
         dispatch({ type: "setUser", payload: userLocalStorage });
      }
      if(isAuthenticatedLocalStorage !== null) {
         if(isAuthenticatedLocalStorage === "false") {
            dispatch({ type: "setIsAuthenticated", payload: false });
         } else if(isAuthenticatedLocalStorage === "true") {
            dispatch({ type: "setIsAuthenticated", payload: true });
         }
      }
      if(roleLocalStorage !== null) {
         dispatch({ type: "setRole", payload: roleLocalStorage });
      }
      if(accessTokenLocalStorage !== null) {
         dispatch({ type: "setAccessToken", payload: accessTokenLocalStorage });
      }
      if(currentPathLocalStorage !== null) {
         dispatch({ type: "setCurrentPath", payload: currentPathLocalStorage });
      }
   }, []);
   
   return(
      <AuthContext.Provider value={{ firstName, lastName, user, isAuthenticated, role, access_token, currentPath, isError, errorMessage, isSuccess, successMessage, isLoading, dispatch }}>
         {children}
      </AuthContext.Provider>
   );
}

export { AuthProvider, AuthContext };
