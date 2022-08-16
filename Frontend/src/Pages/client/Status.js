 
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import ViewApplication from '../../Components/AdminViewApplication/ViewApplication';
import Sidebar from '../../Components/Sidebar/Sidebar'
import ViewApplicationdata from '../../Components/viewApplications/ViewApplicationdata';
import { AuthPageContext } from '../../Context/AuthPageContext';

function Status() {
  const [appsState,setAppsData  ]=useState([]);
   const [appsData,setAppData  ]=useState({});
  const {showModal, setShowModal} =useContext(AuthPageContext);
const userdata = JSON.parse(localStorage.getItem("userInfo"))
useEffect(() => {
  
getData()


  
}, []);


async function getData(){
await  axios.get(`/applications/${userdata._id}`).then((response)=>{
  setAppsData(response.data)
})
}

  return (
    <div>
        
    <div  className="flex" >
       
      <Sidebar/>

      
      <div className="flex-1">
        <div class="overflow-x-auto">
          <div class="min-w-screen min-h-screen   flex   justify-center bg-gray-100 font-sans overflow-hidden">
            <div class="w-full lg:w-5/6">
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
                                setAppData(app)
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

                {showModal? <ViewApplicationdata data={appsData} />:null}


              </div>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
</div>
  )
}

export default Status