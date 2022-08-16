import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import swal from "sweetalert";
import { EditUserContext } from "../../Context/AuthPageContext";

function EditUser({ data }) {
  console.log(data);
  console.log("888888888888888888888888");
  const navigate = useNavigate();
  const { editUser, setEditUser } = useContext(EditUserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errName, setErrName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMob, setErrMob] = useState("");
  const [errPass, setErrPass] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [state, setstate] = useState(false);
  const handleName = () => {
    if (name == "" || name == " ") {
      setErrName("Name cannot be empty");
      return false;
    } else {
      setErrName("");
      return true;
    }
  };
  const handlePass = () => {
    if (password == "" || password == " ") {
      setErrPass("Password cannot be empty");
      return false;
    } else if (password.length < 6) {
      setErrPass("Password must be atleast 6 characters");
      return false;
    } else {
      setErrPass("");
      return true;
    }
  };
  const handleMobile = () => {
    if (mobile == "" || mobile == " ") {
      setErrMob("Mobile number cannot be empty");
      return false;
    } else if (mobile.length < 10 || mobile.length > 10) {
      setErrMob("Invalid mobile number");
      return false;
    } else {
      setErrMob("");
      return true;
    }
  };
  const handleEmail = () => {
    if (email == "" || email == " ") {
      setErrEmail("Email cannot be empty");
      return false;
    } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setErrEmail("Enter a proper email");
      return false;
    } else {
      setErrEmail("");
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleEmail() && handleMobile() && handleName()) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);

        const { datas } = await axios.post(
          "/admin/edituser",
          {
            _id: data._id,
            name,
            email,
            mobile,
          },
          config
        );
        console.log("data");
        console.log(datas);
        swal({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
          buttons: false,
          timer: "300ms",
        }).then(() => {
          setEditUser(false);
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErrEmail(error.response.data.message);
      }
    } else if (!handleEmail() && !handleMobile() && !handleName()) {
    }
  };

  console.log(email);
  const [message, setMessage] = useState("");

  return editUser ? (
    <div>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            {/*content*/}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {loading ? <Spinner /> : null}
              <button
                onClick={() => {
                  setEditUser(false);
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
                  Edit User{" "}
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Your email
                    </label>
                    <input
                      defaultValue={data.email}
                      onKeyUp={() => handleEmail()}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                    />
                    <span style={{ color: "red" }}>{errEmail}</span>
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Name
                    </label>
                    <input
                      defaultValue={data.name}
                      onKeyUp={() => handleName()}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Name  "
                    />
                    <span style={{ color: "red" }}>{errName}</span>
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Mobile number
                    </label>
                    <input
                      defaultValue={data.mobile}
                      onKeyUp={() => handleMobile()}
                      onChange={(e) => setMobile(e.target.value)}
                      type="number"
                      name="mobile"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Mobile Number  "
                    />
                    <span style={{ color: "red" }}>{errMob}</span>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-start"></div>
                  </div>
                  <span className="text-center" style={{ color: "red" }}>
                    {errMsg}
                  </span>
                  <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {" "}
                    Edit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </div>
  ) : null;
}

export default EditUser;
