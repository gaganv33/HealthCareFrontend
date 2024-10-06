import { createContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

const intialState = {
   firstName: "",
   lastName: "",
   user : "",
   access_token: "",
   isAuthenticated : false,
   role: ""
};

function setLocalStorageValueOnLogin(firstName, lastName, user, role, access_token) {
   localStorage.setItem('firstName', JSON.stringify(firstName));
   localStorage.setItem('lastName', JSON.stringify(lastName));
   localStorage.setItem('user', JSON.stringify(user));
   localStorage.setItem('access_token', JSON.stringify(access_token));
   localStorage.setItem('isAuthenticated', JSON.stringify("true"));
   localStorage.setItem('role', JSON.stringify(role));
}

function setLocalStorageOnLogout() {
   localStorage.setItem('firstName', JSON.stringify(""));
   localStorage.setItem('lastName', JSON.stringify(""));
   localStorage.setItem('user', JSON.stringify(""));
   localStorage.setItem('access_token', JSON.stringify(""));
   localStorage.setItem('isAuthenticated', JSON.stringify("false"));
   localStorage.setItem('role', JSON.stringify(""));
}

function reducer(state, action) {
   switch(action.type) {
      case "login":
         setLocalStorageValueOnLogin(action.payload.firstName, action.payload.lastName, action.payload.user, action.payload.role, action.payload.access_token);
         return { ...state, user: action.payload.user, isAuthenticated: true, role: action.payload.role, 
            access_token: action.payload.access_token, firstName: action.payload.firstName, lastName: action.payload.lastName };
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
      default:
         throw new Error("Invalid action type.");
   }
}

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
   const [{ firstName, lastName, user, isAuthenticated, role, access_token }, dispatch] = useReducer(reducer, intialState);

   useEffect(function() {
      const firstNameLocalStorage = JSON.parse(localStorage.getItem('firstName'));
      const lastNameLocalStorage = JSON.parse(localStorage.getItem('lastName'));
      const userLocalStorage = JSON.parse(localStorage.getItem('user'));
      const isAuthenticatedLocalStorage = JSON.parse(localStorage.getItem('isAuthenticated'));
      const roleLocalStorage = JSON.parse(localStorage.getItem('role'));
      const accessTokenLocalStorage = JSON.parse(localStorage.getItem('access_token'));

      if(firstNameLocalStorage) {
         dispatch({ type: "setFirstName", payload: firstNameLocalStorage });
      }
      if(lastNameLocalStorage) {
         dispatch({ type: "setLastName", payload: lastNameLocalStorage });
      }
      if(userLocalStorage) {
         dispatch({ type: "setUser", payload: userLocalStorage });
      }
      if(isAuthenticatedLocalStorage) {
         dispatch({ type: "setIsAuthenticated", payload: isAuthenticatedLocalStorage });
      }
      if(roleLocalStorage) {
         dispatch({ type: "setRole", payload: roleLocalStorage });
      }
      if(accessTokenLocalStorage) {
         dispatch({ type: "setAccessToken", payload: accessTokenLocalStorage });
      }
   }, []);
   
   return(
      <AuthContext.Provider value={{ firstName, lastName, user, isAuthenticated, role, access_token, dispatch }}>
         {children}
      </AuthContext.Provider>
   );
}

export { AuthProvider, AuthContext };
