import React, { useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import {
  AuthPageContext,
  AuthSignupPageContext,
} from "../../../Context/AuthPageContext";
import Spinner from "../../../Components/Spinner/Spinner";

export default function Signin() {

  const navigate =useNavigate()
  const { showSignup, setShowSignup } = useContext(AuthSignupPageContext);

  const { showLogin, setShowLogin } = useContext(AuthPageContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");

  const [errEmail, setErrEmail] = useState("");

  const [errPass, setErrPass] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

useEffect(()=>{
  const userInfo =localStorage.getItem("userInfo");
  if(userInfo){
    navigate('/app')
  }
})



  const handlePass = () => {
    if (password === "" || password === " ") {
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

  const handleEmail = () => {
    if (email === "" || email === " ") {
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

    if (handleEmail() && handlePass()) {
 
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);
        const { data } = await axios.post(
          "/login",
          {
            email: email,
            password: password,
          },
          config
        );

  
        localStorage.setItem("userInfo", JSON.stringify(data));

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErrEmail(error.response.data.message);
      }
    } else if (!handleEmail() && !handlePass()) {
      
    }
  };

  return showLogin ? (
    <>
      <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div class=" relative p-4 w-full max-w-md h-full md:h-auto">
        

          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {loading ? <Spinner /> : null}
            <button
              onClick={() => {
                setShowLogin(false);
              }}
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>

            <div class="py-6 px-6 lg:px-8">
              <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Sign in to our platform
              </h3>
              <form class="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Your email
                  </label>
                  <input
                    onKeyUp={() => handleEmail()}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                  />
                  <span style={{ color: "red" }}>{errEmail}</span>
                </div>

                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Your password
                  </label>

                  <input
                    onKeyUp={() => handlePass()}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                  <span style={{ color: "red" }}>{errPass}</span>
                </div>

                <div class="flex justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <label
                      for="remember"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    class="text-sm text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Lost Password?
                  </a>
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login to your account
                </button>
                <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{" "}
                  <a
                    className="cursor-pointer text-blue-600"
                    onClick={() => {
                      setShowSignup(true);
                    }}
                    class="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null;
}
