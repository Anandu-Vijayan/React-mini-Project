import React, { useContext, useEffect, useState } from "react";
import AdminSideBar from "../../Components/AdminSideBar/AdminSideBar";
import AllUsers from "../../Components/AdminUsers/AllUsers";
import Swal from "sweetalert2";
import axios from "axios";
import { AddUserContext, EditUserContext } from "../../Context/AuthPageContext";
import EditUser from "../../Components/AdminUsers/EditUser";
import AddUser from "../../Components/AdminUsers/AddUser";

function AdminUsers() {
   const { showAddUser, setShowAddUser } = useContext(AddUserContext);
  const [allUsers, setAllUsers] = useState([]);
  const localstore = localStorage.getItem("adminInfo");
  const token = JSON.parse(localstore).token;
  const [state, setState] = useState(false);
  const { editUser, setEditUser } = useContext(EditUserContext);
  const [userData, setuserData] = useState([]);
  
  useEffect(() => {
    axios.get("/admin/usersData").then((response) => {
      setAllUsers(response.data.users);
    });
  }, [state, editUser,showAddUser]);

  const BlockUser = (_id) => {
    try {
      const config = {
        headers: {
          token: token,
        },
      };

      Swal.fire({
        title: "Do you Want to block?",
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
          const { data } = await axios.patch(
            "/admin/blockUser",

            {
              _id: _id,
            },
            config
          );

          setState(state ? false : true);
        }
      });
    } catch (error) {}
  };
  const UnBlockUser = (_id) => {
    try {
      const config = {
        headers: {
          token: token,
        },
      };

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
          const { data } = await axios.patch(
            "/admin/unBlockUser",

            {
              _id: _id,
            },
            config
          );
          console.log(data);
          setState(state ? false : true);
        }
      });
    } catch (error) {}
  };
  const deleteUser = (_id) => {
    try {
      const config = {
        headers: {
          token: token,
        },
      };

      Swal.fire({
        title: "Do you Want to Delete this user?",
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
          const { data } = await axios.patch(
            "/admin/deleteUSer",

            {
              _id: _id,
            },
            config
          );
          console.log(data);
          setState(state ? false : true);
        }
      });
    } catch (error) {}
  };

  return (
    <div className="flex ">
      <div className=" ">
        <AdminSideBar />
      </div>
     {  showAddUser?   <AddUser/> :null}
      <div className="flex-1  mt-10  ">
        <div> 
          <div className=" ">
            <div className="overflow-visible ">
            <button onClick={()=>{
           setShowAddUser(true);

            }}
         
             
            
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10" >Add User</button>
              <div className="p-1.5 w-full inline-block align-middle">
            
                <div className="overflow-hidden border rounded-lg">
    


                  <table className="table    text-gray-400 border-separate space-y-6 text-sm w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                        >
                          Contact
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                        >
                          Edit
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                        >
                          Delete
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                        >
                          Block/Unblock
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {allUsers.map((user, index) => (
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {user.email}
                          </td>

                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            +91 {user.mobile}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">

{/* ---------------------------------  Edit button --------------- */}

                            <a
                              onClick={() => {
                                setEditUser(true);
                                setuserData(user);
                                console.log(editUser);
                              }}
                              className="text-red-500  hover:text-red-700 cursor-pointer"
                            >
                              Edit
                            </a>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
 

                            <a
                              onClick={
                                ()=>{
                                  deleteUser(user._id)
                                }
                              }
                              className="text-red-500  hover:text-red-700 cursor-pointer"
                            >
                              Delete  
                            </a>
                          </td>



                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            {user.status ? (
                              <a
                                className="text-red-500  hover:text-red-700 cursor-pointer"
                                onClick={() => {
                                  BlockUser(user._id);
                                  setState(false);
                                }}
                              >
                                Block
                              </a>
                            ) : (
                              <a
                                className="text-red-500 hover:text-red-700 cursor-pointer"
                                onClick={() => {
                                  UnBlockUser(user._id);
                                  setState(true);
                                }}
                              >
                                Unblock
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

{/* ------------------edit modal outside of the map ------------------------ */}

                  {editUser ? <EditUser data={userData} /> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
