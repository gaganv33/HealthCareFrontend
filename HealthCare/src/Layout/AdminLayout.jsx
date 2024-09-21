import { AuthConsumer } from "../Hooks/AuthConsumer"


// eslint-disable-next-line react/prop-types
function AdminLayout({ children }) {
   const context = AuthConsumer();
   const { isAuthenticated, role } = context;

   return (
      isAuthenticated && role == "admin" && <>{ children }</>
   )
}

export { AdminLayout }
