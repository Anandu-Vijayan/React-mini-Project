import Sidebar from "../../Components/Sidebar/Sidebar";
import React, { useContext, useEffect, useState } from "react";

import HomePage from "../../Components/Home/HomePage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Application from "../../Components/NewApplication/Application";
import { AuthPageContext } from "../../Context/AuthPageContext";
function AppHome() {
  const { appStatus,setAppstatus}=useContext(AuthPageContext)
  const navigate = useNavigate();
   let user_id=JSON.parse(  localStorage.getItem("userInfo"))._id;
  useEffect(() => {
    const userInfo =JSON.parse(  localStorage.getItem("userInfo"));

     
 
 
    
    // const application_status = axios.get("/approval-status");

    appFind();

    //  await   axios.get('/approval-status').then((response)=>{
    //   setappstatus(response.data)
    //  })

    if (userInfo) {
      navigate("/app");
    } else {
      navigate("/");
    }
  }, []);

  const appFind = async () => {
    const data = await axios.get(`/submit-status/${user_id}`
     ).then((response) => {

    
      if (response.data.status) {
        setAppstatus (true);
      } else {
        setAppstatus(false);
      }
    });
  };
 
 

  return (
    <div>
      <div className="flex">
        <Sidebar />

        { !appStatus ? <Application /> : <HomePage />}
      </div>
    </div>
  );
}

export default AppHome;
