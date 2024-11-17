import { useNavigate } from "react-router-dom";

function PageNotFound() {
   const navigate = useNavigate();

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
         <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
            <h1 className="text-5xl font-bold text-blue-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
            <button
               className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
               onClick={() => navigate("/")}
            >
               Go to Previous Page
            </button>
         </div>
    </div>
    
   )
}

export { PageNotFound }
