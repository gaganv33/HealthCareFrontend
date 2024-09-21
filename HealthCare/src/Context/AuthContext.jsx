import { createContext, useReducer } from "react";

const AuthContext = createContext();

const intialState = {
   user : "",
   isAuthenticated : false,
   role: ""
};

function reducer(state, action) {
   switch(action.type) {
      case "login":
         return {...state, user: action.payload.user, isAuthenticated: true, role:action.payload.role};
      case "logout":
         return {...state, user: "", isAuthenticated: false};
      default:
         throw new Error("Invalid action type.");
   }
}

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
   const [{ user, isAuthenticated, role }, dispatch] = useReducer(reducer, intialState);
   
   return(
      <AuthContext.Provider value={{ user, isAuthenticated, role, dispatch }}>
         {children}
      </AuthContext.Provider>
   );
}

export { AuthProvider, AuthContext };
