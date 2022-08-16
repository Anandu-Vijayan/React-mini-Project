import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddSeat from "../../Components/AdminAddSeat/AddSeat";
import AssignSeat from "../../Components/AdminAssignSeat/AssignSeat";
import AdminSideBar from "../../Components/AdminSideBar/AdminSideBar";
import { AddUserContext, AuthPageContext } from "../../Context/AuthPageContext";

function AdminApprovals() {
  const { showAddUser, setShowAddUser } = useContext(AddUserContext);
  const { showAssignSeat, setShowAssignSeat } = useContext(AuthPageContext);

  const [seats, setSeats] = useState([]);
  const [seatId, setSeatId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("adminInfo");
    // const application_status = axios.get("/approval-status");

    getSeats();

    if (userInfo) {
      navigate("/admin/approval-req");
    } else {
      navigate("/admin");
    }
  }, [showAddUser, showAssignSeat]);

  const assignSeat = (id) => {
    setSeatId(id);
    setShowAssignSeat(true);
  };

  async function getSeats() {
    const seating = await axios
      .get("/admin/get-seats")
      .then(async (response) => {
        console.log(response.data);
        setSeats(response.data);
      });
  }

  return (
    <div className="flex ">
      <AdminSideBar />
      <div className="flex-1 ">
        <h1 className="text-center font-semibold text-3xl text-blue-700  ">
          Seating
        </h1>

        <div>
          <button
            onClick={() => {
              setShowAddUser(true);
            }}
            className="ml-10 bg-blue-500  w-24 rounded-lg text-white h-8 "
          >
            Add Seat
          </button>
        </div>
        <AddSeat />
        <AssignSeat data={seatId} />

        <div class="grid grid-rows-4 grid-flow-col gap-4  h-2/3">
          {seats.map((seat, index) => (
            <div>
              <div
                onClick={() => {
                  assignSeat(seat._id);
                }}
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
        </div>

        {/* <div  className='row-span-4'  >

<div class="  rounded bg-orange-500 overflow-hidden shadow-lg w-36 ml-10 mt-10">
  
  <div class="px-6 py-4">
     <div class="font-bold text-xl mb-2"> </div>
    <p class="text-gray-700 text-base">
      
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
     
  </div>
</div>
</div> */}
      </div>
    </div>
  );
}

export default AdminApprovals;
