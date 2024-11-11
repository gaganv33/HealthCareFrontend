function UnAuthorized() {
   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
         <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
         <p className="text-gray-700 mb-6">You do not have permission to view this page.</p>
         <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
            onClick={() => window.history.back()}
         >
            Go Back
         </button>
      </div>
   </div>
   )
}

export { UnAuthorized }
