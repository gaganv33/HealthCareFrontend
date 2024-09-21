import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function AuthConsumer() {
   const authContext = useContext(AuthContext);
   if(!authContext) {
      throw new Error("This context cannot be accessed.");
   }
   return authContext;
}

export {AuthConsumer};
