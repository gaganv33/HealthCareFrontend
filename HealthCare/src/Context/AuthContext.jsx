import { createContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

const intialState = {
   user : "",
   isAuthenticated : false,
   role: ""
};

function setLocalStorageValueOnLogin(user, role) {
   localStorage.setItem('user', JSON.stringify(user));
   localStorage.setItem('isAuthenticated', JSON.stringify("true"));
   localStorage.setItem('role', JSON.stringify(role));
}

function setLocalStorageOnLogout() {
   localStorage.setItem('user', JSON.stringify(""));
   localStorage.setItem('isAuthenticated', JSON.stringify("false"));
   localStorage.setItem('role', JSON.stringify(""));
}

function reducer(state, action) {
   switch(action.type) {
      case "login":
         setLocalStorageValueOnLogin(action.payload.user, action.payload.role);
         return { ...state, user: action.payload.user, isAuthenticated: true, role: action.payload.role };
      case "logout":
         setLocalStorageOnLogout();
         return { ...state, user: "", isAuthenticated: false };
      case "setUser":
         return { ...state, user: action.payload };
      case "seIsAuthenticated": 
         return { ...state, isAuthenticated: action.payload };
      case "setRole": 
         return { ...state, role: action.payload };
      default:
         throw new Error("Invalid action type.");
   }
}

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
   const [{ user, isAuthenticated, role }, dispatch] = useReducer(reducer, intialState);

   useEffect(function() {
      const userLocalStorage = JSON.parse(localStorage.getItem('user'));
      const isAuthenticatedLocalStorage = JSON.parse(localStorage.getItem('isAuthenticated'));
      const roleLocalStorage = JSON.parse(localStorage.getItem('role'));

      if(userLocalStorage) {
         dispatch({ type: "setUser", payload: userLocalStorage });
      }
      if(isAuthenticatedLocalStorage) {
         dispatch({ type: "seIsAuthenticated", payload: isAuthenticatedLocalStorage });
      }
      if(roleLocalStorage) {
         dispatch({ type: "setRole", payload: roleLocalStorage });
      }
   }, []);
   
   return(
      <AuthContext.Provider value={{ user, isAuthenticated, role, dispatch }}>
         {children}
      </AuthContext.Provider>
   );
}

export { AuthProvider, AuthContext };
