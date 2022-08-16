import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthPageContext } from "../../Context/AuthPageContext";

function AssignSeat({ data }) {
  const roomId = data;
  console.log("props");

  const navigate = useNavigate();
  const { showAssignSeat, setShowAssignSeat } = useContext(AuthPageContext);

  const [seat, setSeat] = useState("");
  const [companyId, setCompanyId] = useState("");

  const [Applications, setAppState] = useState([]);

  useEffect(() => {
    applicationData();
  }, [showAssignSeat, companyId]);

  async function applicationData() {
    console.log("companyId");

    axios.get("/admin/get-applications").then((response) => {
      setAppState(response.data);
    });
  }

  const handleSeat = () => {
    if (companyId == "" || companyId == " ") {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleSeat()) {
      console.log(companyId, data);

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          "/admin/assign-seat",
          {
            company_id: companyId,
            seat_id: roomId,
          },
          config
        );

        setShowAssignSeat(false);
      } catch (error) {
        console.log(error);
      }
    } else if (!handleSeat()) {
    }
  };

  const removeCompany = (id) => {
    console.log(id);
    try {
      const removed = axios
        .post("/admin/removecompany", { _id: roomId })
        .then(async (response) => {});
        console.log(removed);

  if(removed){
    setShowAssignSeat(false);
  }


    } catch (error) {}
  };

  return (
    <div>
      {showAssignSeat ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              {/*content*/}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  onClick={() => {
                    setShowAssignSeat(false);
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
                    Assign seat
                  </h3>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div></div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Company
                      </label>
                      {/* <input
                     
                        onChange={(e) => setSeat(e.target.value)}
                        type="number"
                        name="number"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="number  "
                      /> */}

                      <div class="flex justify-center">
                        <div class="mb-3 xl:w-96">
                          <select
                            onChange={(e) => setCompanyId(e.target.value)}
                            class="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example"
                          >
                            <option selected>Open this select menu</option>
                            {Applications.map((apps, index) => {
                              if (apps.approval_status == "approved") {
                                return (
                                  <option value={apps._id}>
                                    {apps.company_name}
                                  </option>
                                );
                              }
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div></div>
                    <div></div>
                    <div className="flex justify-between">
                      <div className="flex items-start"></div>
                    </div>

                    <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                     Assign seat
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        removeCompany(roomId);
                      }}
                      className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Remove company
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

export default AssignSeat;
