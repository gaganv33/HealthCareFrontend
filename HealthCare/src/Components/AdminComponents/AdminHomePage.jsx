import axios from "axios";
import { AuthConsumer } from "../../Hooks/AuthConsumer"

function AdminHomePage() {
   const context = AuthConsumer();

   const { access_token } = context;

   async function onClickButton() {
      try {
         console.log("Bearer " + access_token);
         const config = {
            headers: {
               'Authorization' : 'Bearer ' + access_token,
               'Access-Control-Allow-Origin': '*',
               'Content-Type': 'application/json',
               withCredentials: true,
               // mode: 'no-cors',
            }
         };
         const data = await axios.get('http://localhost:8080/products/all', config);
         console.log(data);
      } catch(e) {
         console.log(e);
      }
   }

   return (
      <div>
         <h1>
            Admin Home Page
         </h1>
         <button onClick={onClickButton}>Click</button>
      </div>
   )
}

export { AdminHomePage }
