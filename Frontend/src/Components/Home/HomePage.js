import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthPageContext } from '../../Context/AuthPageContext'
import Application from '../NewApplication/Application'
import Spinner from '../Spinner/Spinner'

function  HomePage() {
  const [seats,setSeats]=useState([])
  const [appsData,setAppsData]=useState({})
  const userdata = JSON.parse(localStorage.getItem("userInfo"))

  useEffect(() => {
   getRooms()
   getData()
   console.log(appsData);
  }, []);

  const getRooms=async()=>{

 await axios.get('/admin/getRoomsData').then(async(response)=>{
    
    setSeats(response.data)
 })

  }
  async function getData(){
    await  axios.get(`/applications/${userdata._id}`).then((response)=>{
      console.log(response.data[0]);
      setAppsData(response.data[0])
    })
    }

  return (
    <div className='flex-1 h-screen'>
    <h1 className='w-1/2 m-auto text-blue-500 font-extrabold text-4xl text-center'  >Welcome</h1>

    <h1 className='w-1/2 m-auto text-black-500 font-extrabold text-1xl text-center'  >  { appsData.approval_status=="pending"? "your application is pending for approval": null}</h1>

    
    <h1 className='w-1/2 m-auto text-blue-500 font-extrabold text-4xl text-center'  >  { appsData.approval_status=="approved"? "Assigned rooms": null}</h1>
    {appsData.approval_status=="approved"?<h1 className='w-1/2 m-auto text-black-500 font-extrabold text-1xl text-center'  > Your Assigned rooms will appear here   </h1>:null}
    <h1 className='w-1/2 m-auto mt-60 text-red-500 font-extrabold text-1xl text-center '  >  { appsData.approval_status=="declined"? "your application is declined": null}</h1>
   <div className=' mb-10'> <div class="grid grid-rows-4 grid-flow-col gap-4  h-3/4">
          {seats.map((seat, index) => (
            <div className='m-auto' >
         
              <div
                 
                class={` rounded cursor-pointer ${
                  seat.status ? "bg-orange-500" : "bg-red-600"
                } overflow-hidden shadow-lg w-36 ml-10 mt-10`}
              >
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">
                    {" "}
                    Room : {seat.seat_number}
                  </div>
                  <p class="text-white text-base">
                    {!seat.status ? seat.name : null}
                  </p>
                </div>
                <div class="px-6 pt-4 pb-2"></div>
              </div>
            </div>
          ))}
        </div></div>


    </div>
  )
}

export default HomePage