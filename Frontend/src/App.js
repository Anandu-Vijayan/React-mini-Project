
import './App.css';
import React,{ useState} from 'react';
import {BrowserRouter,Route,Routes}  from 'react-router-dom'
 
import Home from './Pages/Home';
import {AddUserContext, AuthPageContext,AuthSignupPageContext,EditUserContext} from './Context/AuthPageContext'
import AppHome from './Pages/client/AppHome';
import Profile from './Pages/client/Profile';
import Status from './Pages/client/Status';
import { SelectBtnContext } from './Context/SelectBtnContext';
import AdminHome from './Pages/admin/AdminHome';
import AdminUsers from './Pages/admin/AdminUsers';
import AdminApprovals from './Pages/admin/AdminApprovals';
import AdminLogin from './Pages/admin/AdminLogin';

function App() {
  
  const [showLogin,setShowLogin] = useState(false)
  const [showSignup,setShowSignup] = useState(false)
  const [selectBtn,setSelectBtn]=useState(0)
  const [editUser,setEditUser]=useState(false)
  const [showAddUser,setShowAddUser]=useState(false)
  const [ appStatus,setAppstatus]=useState(false)
  const [ showModal,setShowModal]=useState(false)
  const [ showAssignSeat,setShowAssignSeat]=useState(false)
  return (
    <AuthPageContext.Provider value={{showLogin,setShowLogin,appStatus,setAppstatus,showModal,setShowModal,showAssignSeat,setShowAssignSeat} }>
  <EditUserContext.Provider value={{editUser,setEditUser}}>
      <AuthSignupPageContext.Provider value={{showSignup,setShowSignup} }>
 <AddUserContext.Provider value={{showAddUser,setShowAddUser} }>
    
        <SelectBtnContext.Provider value={{selectBtn,setSelectBtn}}>
           
    <BrowserRouter> 
   
   <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="/app" element={<AppHome/>} />
     <Route path="/profile" element={<Profile/>} />
     <Route path="/status" element={<Status/>} />

     <Route path="/admin" element={<AdminLogin/>} />
     <Route path="/admin/home" element={<AdminHome/>} />
       
        <Route path="/admin/users" element={<AdminUsers/>} />
        <Route path="/admin/approval-req" element={<AdminApprovals/>} />
   </Routes>
    
   </BrowserRouter>

   </SelectBtnContext.Provider>
   </AddUserContext.Provider>
   </AuthSignupPageContext.Provider>
   </EditUserContext.Provider>
<AuthSignupPageContext.Provider />



    </AuthPageContext.Provider>
  );
}

export default App;
