import { axiosInstance } from "../../axios/axios";

function FetchDisabledUsers() {

   async function onClickButton() {
      try {
         const data = await axiosInstance.get('products/all');
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
