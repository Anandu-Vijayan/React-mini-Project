import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";  
 
import { AddUserContext,  } from "../../Context/AuthPageContext";
 
function AddSeat() {
  const navigate = useNavigate();
  const { showAddUser, setShowAddUser } = useContext(AddUserContext);
 
 
  const [seat, setSeat] = useState("");
 

  const handleSeat = () => {
    if (seat == "" || seat == " ") {
    
      return false;
    } else {
   
      return true;
    }
  };
 
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (  handleSeat()  ) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

 

        const { data } = await axios.post(
          "/admin/add-seat",
          {
            seat_number:parseInt(seat),
            name:null,
            email:null,
            user_id:null,
            status:true

          
          },
          config
        );
        console.log("data");
        console.log(data);
        setShowAddUser(false)
      
       
       
      } catch (error) {
        
      
      }
    } else if (
     
      !handleSeat()  
     
    ) {
    }
  };

 
  const [message, setMessage] = useState("");
  return (
    <div>
      {showAddUser ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              {/*content*/}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
               
                <button
                  onClick={() => {
                    setShowAddUser(false);
                  }}
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-toggle="authentication-modal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="py-6 px-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Add seat
                  </h3>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      
                      
          
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Room Number
                      </label>
                      <input
                     
                        onChange={(e) => setSeat(e.target.value)}
                        type="number"
                        name="number"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="number  "
                      />
                   
                    </div>
                    <div>
                     
                      

                    </div>
                    <div>
                    
                     
                    
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-start"></div>
                    </div>
                    
                    <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  
                      Add seat
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default AddSeat;
