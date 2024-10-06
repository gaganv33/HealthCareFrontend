// eslint-disable-next-line react/prop-types
function ErrorPage({ message, onErrorButtonClose }) {
   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
         <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
            <p className="text-gray-700 mb-6">{message}</p>
            <button
               onClick={onErrorButtonClose}
               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
               Close
            </button>
         </div>
      </div>
   );
}

export { ErrorPage };
