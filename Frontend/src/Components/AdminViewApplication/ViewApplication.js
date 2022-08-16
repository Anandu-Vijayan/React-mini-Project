import axios from "axios";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthPageContext } from "../../Context/AuthPageContext";
import Spinner from "../Spinner/Spinner";

function ViewApplication({ data }) {
  const [loading, setLoading] = useState(false);
  const { showModal, setShowModal } = useContext(AuthPageContext);
  const config = {
    headers: {
      headers: {
        "Content-type": "application/json",
      },
    },
  };
  const Approve = async (id) => {
    try {

        Swal.fire({
            title: "Are you sure you want to approve",
            showDenyButton: true,
            confirmButtonText: "yes",
            denyButtonText: "No",
            customClass: {
              actions: "my-actions",
              confirmButton: "order-2",
              denyButton: "order-3",
            },
          }).then(async (result) => {
            if (result.isConfirmed) {
                await axios
                .patch(
                    "/admin/approve-app",
                  {
                    _id: id,
                  },
                  config
                )
                .then((response) => {
                  console.log(response.data);
                  if (response.data.status == "approved") {
                   
                    setShowModal(false);
                    
                  }else{
                    throw new Error("error occured")
                  }
                });


            }
          });






      
    } catch (e) {
        Swal.fire({
            title: `${e.response.message}`,
            timer: "1000",
          });

    }
  };








  const Decline = async (id) => {
    try {
        Swal.fire({
            title: "Do you Want to Unblock this user?",
            showDenyButton: true,
            confirmButtonText: "yes",
            denyButtonText: "No",
            customClass: {
              actions: "my-actions",
              confirmButton: "order-2",
              denyButton: "order-3",
            },
          }).then(async (result) => {
            if (result.isConfirmed) {
                await axios
                .patch(
                  "/admin/decline-app",
                  {
                    _id: id,
                  },
                  config
                )
                .then((response) => {
                  console.log(response.data);
                  if (response.data.status == "declined") {
                   
                    setShowModal(false);
                    
                  }else{
                    throw new Error("error occured")
                  }
                });


            }
          });



      
    } catch (e) {
        Swal.fire({
            title: `${e.response.message}`,
            timer: "1000",
          });

    }
  };





  return (
    <div>
      <div>
        <>
          <div className="  justify-center items-baseline flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
              {/*content*/}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {loading ? <Spinner /> : null}
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  type="button"
                  className="absolute  right-2.5 text-gray-400 bg-transparent hover: hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
                <div className=" py-6 px-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white"></h3>

                  <div className="w-full max-w-lg">
                    <h1 className="mb-10 font-bold text-3xl"></h1>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide  text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          Name
                        </label>
                        <input
                          name="name"
                          className={`appearance-none block w-full    border  rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white`}
                          id="grid-first-name"
                          type="text"
                          defaultValue={data.name}
                          disabled
                        />
                      </div>
                      <div className="w-full md:w-2/3 px-3">
                        <label
                          className="block uppercase tracking-wide   text-xs font-bold mb-2"
                          htmlFor="grid-last-name"
                        >
                          Address
                        </label>
                        <input
                          name="address"
                          className={`appearance-none block w-full mb-2   border   rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                          id="grid-last-name"
                          type="text"
                          defaultValue={data.address}
                          disabled
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide  text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          City
                        </label>
                        <input
                          name="city"
                          className={`appearance-none block w-full   border  rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white`}
                          id="grid-first-name"
                          type="text"
                          defaultValue={data.city}
                          disabled
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide  text-xs font-bold mb-2"
                          htmlFor="grid-last-name"
                        >
                          State
                        </label>
                        <input
                          name="state"
                          className={`appearance-none block w-full   border 
                   "border-red-500"  
                   rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                          id="grid-last-name"
                          type="text"
                          defaultValue={data.state}
                          disabled
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide  text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          Email
                        </label>
                        <input
                          name="email"
                          className={`appearance-none block w-full   border  rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white`}
                          id="grid-first-name"
                          type="text"
                          defaultValue={data.email}
                          disabled
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide  text-xs font-bold mb-2"
                          htmlFor="grid-last-name"
                        >
                          Phone no
                        </label>
                        <input
                          name="phone"
                          className={`appearance-none block w-full   border   rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                          id="grid-last-name"
                          type="number"
                          defaultValue={data.phone}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2"></div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide  text-xs font-bold mb-2"
                          htmlFor="grid-city"
                        >
                          Company name
                        </label>
                        <input
                          className="appearance-none block w-full   border   rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-city"
                          type="text"
                          defaultValue={data.company_name}
                          disabled
                        />
                      </div>

                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide  text-xs font-bold mb-2"
                          htmlFor="grid-zip"
                        >
                          Zip
                        </label>
                        <input
                          className="appearance-none block w-full   border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-zip"
                          type="text"
                          required
                          defaultValue={data.zip}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide  text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Describe your team and backgroud
                        </label>
                        <textarea
                          name="team_decription"
                          className="appearance-none block w-full   border  rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          required
                          defaultValue={data.describe_team}
                          disabled
                        />
                      </div>
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide  text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Describe your company and product
                        </label>
                        <textarea
                          name="company_decription"
                          className="appearance-none block w-full   border  rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid"
                          type="text"
                          placeholder=""
                          defaultValue={data.describe_company}
                          disabled
                        />
                      </div>
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide  text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Describe the problem you are trying to solve?
                        </label>
                        <textarea
                          name="company_decription"
                          className="appearance-none block w-full   border  rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-password"
                          type="text"
                          required
                          defaultValue={data.describe_problem}
                          disabled
                        />
                      </div>
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide  text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          What is unique about your solution?
                        </label>
                        <textarea
                          name="company_decription"
                          className="appearance-none block w-full   border  rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-password"
                          type="text"
                          defaultValue={data.describe_solution}
                          disabled
                        />
                      </div>
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide  text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          What is your value proposition htmlFor the customer ?
                        </label>
                        <textarea
                          name="company_decription"
                          className="appearance-none block w-full   border  rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-password"
                          type="text"
                          defaultValue={data.describe_value}
                          disabled
                        />
                      </div>
                      <div className="w-full px-3">
                        <button
                          onClick={() => {
                            Approve(data._id);
                          }}
                          className=" mt-5 md:w-1/2    border pl-3 pr-3   h-10 rounded-md text-white text-center font-bold bg-blue-600 hover:bg-blue-500 "
                        >
                          Approve
                        </button>
                        <button onClick={()=>{
                            Decline(data._id)
                        }} className=" mt-5 md:w-1/2    border pl-3 pr-3   h-10 rounded-md text-white text-center font-bold bg-red-600 hover:bg-red-500 ">
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      </div>
    </div>
  );
}

export default ViewApplication;
