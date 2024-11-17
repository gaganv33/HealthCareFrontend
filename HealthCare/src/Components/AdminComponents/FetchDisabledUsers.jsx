import axios from "axios";
import { AuthConsumer } from "../../Hooks/AuthConsumer"

function FetchDisabledUsers() {
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
               withCredentials: true
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
         Fetch disbaled users
         < br/>
         <button className="bg-blue-500 text-white font-semibold py-1 px-2 rounded hover:bg-blue-600 transition text-sm" onClick={ onClickButton }>
            Test button
         </button>
      </div>
   )
}

export { FetchDisabledUsers }
