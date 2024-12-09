import { AuthConsumer } from "../../Hooks/AuthConsumer"

// eslint-disable-next-line react/prop-types
function Profile({ onCloseProfile }) {
   const context = AuthConsumer();

   const { user, role, firstName, lastName } = context;

   return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black p-4 space-y-6 bg-opacity-50 backdrop-blur-sm">
         <h1 className="text-white text-2xl md:text-4xl lg:text-5xl mb-4">Profile Data</h1>

         <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-auto">
            <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl mb-4">First Name: {firstName}</p>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl mb-4">Last Name: {lastName}</p>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl mb-4">Username: {user}</p>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl">Role: {role}</p>
         </div>

         <button 
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-sm md:text-base lg:text-lg"
            onClick={onCloseProfile}
         >
            Close
         </button>
      </div>
   )
}

export { Profile };