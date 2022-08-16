import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSideBar from "../../Components/AdminSideBar/AdminSideBar";
import ViewApplication from "../../Components/AdminViewApplication/ViewApplication";
 
import Header from "../../Components/Header/Header";
import { AuthPageContext } from "../../Context/AuthPageContext";

function AdminHome() {
    const {showModal,setShowModal}=useContext(AuthPageContext)
  const navigate = useNavigate();
  const [appsState, setAppState] = useState([]);
 const [appsData, setAppsData] = useState({});
  useEffect(() => {
    const userInfo = localStorage.getItem("adminInfo");
    // const application_status = axios.get("/approval-status");

    applicationData();

    //  await   axios.get('/approval-status').then((response)=>{
    //   setappstatus(response.data)
    //  })

    if (userInfo) {
      navigate("/admin/home");
    } else {
      navigate("/admin");
    }
  }, [showModal]);

  function applicationData() {
    axios.get("/admin/get-applications").then((response) => {
      console.log(response.data);
      setAppState(response.data);
    });
  }

  return (
    <div className="flex ">
      <AdminSideBar />
      <div className="flex-1">
        <div class="overflow-x-auto">
          <div class="min-w-screen min-h-screen   flex   justify-center bg-gray-100 font-sans overflow-hidden">
            <div class="w-full lg:w-5/6">
<h1 className="text-center mt-2 text-xl font-bold" >Submitted applications</h1>

              <div class="bg-white shadow-md rounded my-6">
                <table class="min-w-max w-full table-auto">
                  <thead>
                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th class="py-3 px-6 text-left">S.No</th>
                      <th class="py-3 px-6 text-left">Company Name</th>
                      <th class="py-3 px-6 text-center">Email</th>
                      <th class="py-3 px-6 text-center">Status</th>
                      <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-600 text-sm font-light">
                    {appsState.map((app, index) => (
                      <tr class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="mr-2"></div>
                            <span class="font-medium">{index + 1}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left">
                          <div class="flex items-center">
                            <div class="mr-2"></div>
                            <span>{app.company_name}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-center">
                          <div class="flex items-center justify-center">
                            {app.email}
                          </div>
                        </td>
                        <td class="py-3 px-6 text-center">
                          {app.approval_status=="approved" ? (
                            <span class="bg-purple-200 cursor-pointer text-purple-600 py-1 px-3 rounded-full text-xs">
                              approved
                            </span>
                          ) : (
                            <span class="bg-red-200 cursor-pointer text-red-600 py-1 px-3 rounded-full text-xs">
                             {app.approval_status}
                            </span>
                          )}
                        </td>
                        <td class="py-3 px-6 text-center">
                          <div class="flex item-center justify-center">
                            <div onClick={()=>{
                                setAppsData(app)
                                setShowModal(true)
                            }} class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <svg
                                className="cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </div>
                            
                             
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

            {showModal? <ViewApplication data={appsData} />:null}


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
