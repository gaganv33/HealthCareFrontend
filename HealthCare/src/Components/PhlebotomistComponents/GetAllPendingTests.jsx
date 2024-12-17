import { useEffect, useState } from "react";
import { AuthConsumer } from "../../Hooks/AuthConsumer";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axios";
import { isUnauthorized, setCurrentPathInLocalStorage } from "../../Hooks/UtilFunctions";

function GetAllPendingTests() {
   const context = AuthConsumer();
   const { dispatch } = context;
   const navigate = useNavigate();

   const [data, setData] = useState([]);

   useEffect(() => {
      async function getAllPendingTests() {
         dispatch({ type: "setLoading" });
         try {
            const response = await axiosInstance.get("/phlebotomist/getAllPendingTests");
            console.log(response);
            let modifiedData = [];
            response.data.map((record) => {
               modifiedData.push({
                  ...record, result : ""
               });
            });
            console.log("modified ", modifiedData);
            setData(modifiedData);
         } catch(e) {
            console.log(e);
            if(isUnauthorized(e)) {
               dispatch({ type: "logout" });
               setCurrentPathInLocalStorage("/");
               navigate("/");
            } else {
               dispatch({ type: "setErrorMessage", payload: e?.response?.data?.error });
            }
         } finally {
            dispatch({ type: "unsetLoading" });
         }
      }

      getAllPendingTests();
   }, [dispatch, navigate]);

   async function saveTest(e, test) {
      e.preventDefault();
      dispatch({ type: "setLoading" });
      try {
         const response = await axiosInstance.post("/phlebotomist/saveLabTestRecords", {
            "phlebotomistTestId": test?.phlebotomistTestId,
            "appointmentId": test?.appointmentEntity?.appointmentId,
            "labTestRecords": test?.result
         });
         dispatch({ type: "setSuccessMessage", payload: response?.data });
      } catch(e) {
         console.log(e);
         if(isUnauthorized(e)) {
            dispatch({ type: "logout" });
            setCurrentPathInLocalStorage("/");
            navigate("/");
         } else {
            dispatch({ type: "setErrorMessage", payload: e?.response?.data?.error });
         }
      } finally {
         dispatch({ type: "unsetLoading" });
      }
   }

   function changeResult(test, result) {
      setData((prev) => {
         let newData = [];
         prev.map((record) => {
            if(record === test) {
               record.result = result;
            }
            newData.push(record);
         })
         return newData;
      });
   }

   return (
      <div className="p-6">
         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Get All Pending Tests
         </h1>

         <div>
            {data !== null && data?.length === 0 && (
               <h3 className="text-center text-lg text-gray-600 font-medium">
                  No Tests Found
               </h3>
            )}
         </div>

         <div className="flex flex-col lg:flex-row lg:flex-wrap gap-6">
            {data.map((test) => (
               <div 
                  key={test?.phlebotomistTestId} 
                  className="bg-white rounded-lg shadow-lg p-6 space-y-4 border border-gray-200 w-full lg:w-[calc(50%-1.5rem)] xl:w-[calc(33.33%-1.5rem)]"
               >
                  <div className="text-gray-700">
                     <span className="font-semibold">Patient Name: </span>
                     <span className="font-medium">
                        {test?.appointmentEntity?.patient?.userEntity?.firstName}{" "}
                        {test?.appointmentEntity?.patient?.userEntity?.lastName}
                     </span>
                  </div>

                  <div className="text-gray-700">
                     <span className="font-semibold">Doctor Name: </span>
                     <span className="font-medium">
                        {test?.appointmentEntity?.doctor?.userEntity?.firstName}{" "}
                        {test?.appointmentEntity?.doctor?.userEntity?.lastName}
                     </span>
                  </div>

                  {test?.labTestsEntityList !== null && test?.labTestsEntityList.length > 0 && (
                     <div className="space-y-4">
                        {test?.labTestsEntityList.map((labTest) => (
                           <div 
                              key={labTest?.labTestId} 
                              className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-300"
                           >
                              <div className="text-gray-700 mb-2">
                                 <span className="font-semibold">Lab Test Name: </span>
                                 <span className="font-medium">{labTest?.labTestName}</span>
                              </div>
                              <div className="text-gray-700">
                                 <span className="font-semibold">Lab Test Fields: </span>
                                 <span className="font-medium">
                                    {labTest?.labTestFields.join(", ")}
                                 </span>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}

                  <div className="flex flex-col space-y-2">
                     <label className="text-gray-700 font-medium">Result</label>
                     <input 
                        type="text" 
                        value={test?.result} 
                        onChange={(e) => changeResult(test, e.target.value)} 
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     />
                  </div>

                  <button 
                     onClick={(e) => saveTest(e, test)} 
                     className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                     Save Test
                  </button>
               </div>
            ))}
         </div>
      </div>
   )
}

export { GetAllPendingTests };
