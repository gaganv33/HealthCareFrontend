// eslint-disable-next-line react/prop-types
function SuccessPage({ message, onSuccessButtonClose }) {
   return (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
       <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
         <h1 className="text-2xl font-bold text-green-600 mb-4">Success</h1>
         <p className="text-gray-700 text-lg mb-6">{message}</p>
         <button
           className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition"
           onClick={onSuccessButtonClose}
         >
           Close
         </button>
       </div>
     </div>
   );
 }
 
 export { SuccessPage };
 