import { AuthConsumer } from "../../Hooks/AuthConsumer"

function DoctorHomePage() {
   const context = AuthConsumer();

   const { access_token } = context;

   return (
      <div>
         <h1>
            Doctor Home Page
         </h1>
      </div>
   )
}

export { DoctorHomePage }
