
import './AdminSideBar.css'
import React, { useContext, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { SelectBtnContext } from "../../Context/SelectBtnContext";
import Swal from 'sweetalert2';
function AdminSideBar() {
    const [open, setOpen] = useState(false);
    const {selectBtn,setSelectBtn}=useContext(SelectBtnContext)
  
  const navigate =useNavigate()
    const Menus = [
      { title: "Dashboard", src: "dashboard",nav:'/admin/home' },
      { title: "Seating", src: "status",nav:'/admin/approval-req' },
      { title: "Users", src: "profile",nav:'/admin/users' },
      { title: "Logout", src: "logout",nav:'/admin/logout',onClick:true },
    ];
    const handleSelect=(index)=>{
      setSelectBtn(index)
      return selectBtn
    }
const handleLogout =()=>{
  
  Swal.fire({
    title: "Do you Want to  Logout?",
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
       localStorage.removeItem("adminInfo")
   navigate('/admin')


    }
  });

  


}


    
  return (
    
   
    <div id={!open?"navbar":''}
    className={` ${
      open ? "w-72" : "w-20 "
    } duration-300  p- pt-8   relative  shadow-2xl  bg-zinc-900   h-screen`}
  >
    <img id={!open?'navicon':''}
      onClick={() => setOpen(!open)}
      src="../icons/arrow-left-3099.png"
      className={`absolute cursor-pointer   rounded-full
-right-3 top-9 w-7 border-2 border-dark-purple duration-500  ${
        !open && "rotate-180 "
      }`}
    />
    <div className="flex gap-x-4 items-center">
      <img
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt=""
        className={` ${
          !open && "rotate-180  "
        } cursor-pointer duration-500 w-7 ml-6`}
      />
      <h1
        className={`text-purple-700 origin-left font-medium text-x duration-500 ${
          !open && "scale-0"
        } `}
      >
        Nest Admin{" "}
      </h1>
    </div>
    <ul className="pt-6 ">
      {Menus.map((menu, index) => (
        <li onClick={()=>{    handleSelect(index); menu.onClick ? handleLogout(): navigate(menu.nav);    }}
          className={`text-gray-100 font-bold text-sm flex items-center gap-x-4 ml-4 duration-200 mr-4 cursor-pointer p-2 hover:bg-slate-500 rounded-md mt-2 ${
            index === selectBtn && "bg-slate-500 duration-300"
          }`}
          key={index}
        >
          <img 
            className="w-8 duration-500"
            src={`../icons/${menu.src}.png`}
            alt=""
            title={`${menu.title}`}
          />
          <span
            className={`    ${
              !open && "scale-0 duration-300 "
            } origin-left duration-300`}
          >
            {menu.title}
          </span>
        </li>
      ))}
    </ul>
  </div>

  
  


  )
}

export default AdminSideBar