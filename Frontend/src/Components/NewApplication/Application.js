import axios from "axios";
import React, { useContext, useState } from "react";
import swal from "sweetalert";
import Swal from "sweetalert2";
import {
  AuthPageContext} from "../../Context/AuthPageContext";
function Application( ) {
  const { appStatus,setAppstatus}=useContext(AuthPageContext)
  const [name, setName] = useState("");
  const [errName, setErrName] = useState({});

  const [address, setAddress] = useState("");
  const [errAddress, setErrAddress] = useState({});

  const [city, setCity] = useState("");
  const [errCity, setErrCity] = useState({});

  const [states, setStates] = useState("");
  const [errState, setErrState] = useState({});

  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState({});

  const [phone, setPhone] = useState("");
  const [errPhone, setErrPhone] = useState({});

  const [zip, setZip] = useState("");
  const [errZip, setErrZip] = useState(false);

  const [companyName, setCompanyName] = useState("");

  const [teamDescription, setTeamDescription] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [describeProblem, setDescribeProblem] = useState("");
  const [uniqueAbout, setUniqueAbout] = useState("");
  const [proposition, setProposition] = useState("");

  const handleName = () => {
    if (name === "" || name === " ") {
      setErrName({ bool: true, err: "Please fill out this field" });
      return false;
    } else {
      setErrName({ bool: false, err: "" });
      return true;
    }
  };
  const handleAddress = () => {
    if (address === "" || address === " ") {
      setErrAddress({ bool: true, err: "Please fill out this field" });
      return false;
    } else {
      setErrAddress({ bool: false, err: "" });
      return true;
    }
  };

  const handlecity = () => {
    if (city === "" || city === " ") {
      setErrCity({ bool: true, err: "Please fill out this field" });
      return false;
    } else {
      setErrCity({ bool: false, err: "" });
      return true;
    }
  };
  const handlestate = () => {
    if (states === "" || states === " ") {
      setErrState({ bool: true, err: "Please fill out this field" });
      return false;
    } else {
      setErrState({ bool: false, err: "" });
      return true;
    }
  };
  const handleEmail = () => {
    if (email === "" || email === " ") {
      setErrEmail({ bool: true, err: "Please fill out this field" });
      return false;
    } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setErrEmail({ bool: true, err: "enter a proper email address" });
      return false;
    } else {
      setErrEmail({ bool: false, err: "" });
      return true;
    }
  };
  const handlePhone = () => {
    if (phone === "" || phone === " ") {
      setErrPhone({ bool: true, err: "Please fill out this field" });
      return false;
    } else if (phone.length < 10) {
      setErrPhone({ bool: true, err: "Invalid phone number" });
    } else {
      setErrPhone({ bool: false, err: "" });
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      handleEmail() &&
      handleName() &&
      handleAddress() &&
      handlePhone() &&
      handlecity() &&
      handlestate()
    ) {
      
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        let appsubmit = await axios.post(
          "/submit-application",
          {
            name,
            address,
            city:city,
            state: states,
            email,
            phone,
            company_name: companyName,
            zip:zip,
            describe_company: companyDescription,
            describe_problem: describeProblem,
            describe_team: teamDescription,
            describe_solution: uniqueAbout,
            describe_value: proposition,
            status: true,
            approval_status: "pending",
          },
          config
        ).then(()=>{   
          swal("success!", "Application submitted!", "success");
           setAppstatus(true)
           
        })

        

  
        
      } catch (e) {}
    } else if (
      !handleName() &&
      !handleEmail() &&
      !handleAddress() &&
      !handlePhone() &&
      !handlecity() &&
      !handlestate()
    ) {
      
    }
  };

  return (
    <div className="flex-1   ">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit}>
          <div className="w-full max-w-lg">
            <h1 className="mb-10 font-bold text-3xl">
              Submit application form  For incubation 
            </h1>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Name
                </label>
                <input
                  onKeyUp={() => {
                    handleName();
                  }}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  className={`appearance-none block w-full bg-gray-200  text-gray-700 border ${
                    errName.bool ? "border-red-500" : null
                  } rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white`}
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                />
                {errName.bool ? (
                  <p className="text-red-500 text-xs italic">{errName.err}</p>
                ) : null}
              </div>
              <div className="w-full md:w-2/3 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700  text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Address
                </label>
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyUp={() => {
                    handleAddress();
                  }}
                  name="address"
                  className={`appearance-none block w-full mb-2 bg-gray-200 text-gray-700 border ${
                    errAddress.bool ? "border-red-500" : null
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="grid-last-name"
                  type="text"
                  placeholder="no 101 st. jons st "
                />
                {errAddress.bool ? (
                  <p className="text-red-500 text-xs italic">
                    {errAddress.err}
                  </p>
                ) : null}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  City
                </label>
                <input
                  onKeyUp={() => {
                    handlecity();
                  }}
                  onChange={(e) => setCity(e.target.value)}
                  name="city"
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errCity.bool ? "border-red-500" : null
                  } rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white`}
                  id="grid-first-name"
                  type="text"
                  placeholder="calicut"
                />
                <p className="text-red-500 text-xs italic">
                  {errCity.bool ? errCity.err : null}
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  State
                </label>
                <input
                  onKeyUp={() => {
                    handlestate();
                  }}
                  onChange={(e) => setStates(e.target.value)}
                  name="state"
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errState.bool ? "border-red-500" : null
                  }   rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="grid-last-name"
                  type="text"
                  placeholder=" kerala"
                />
                {errState.bool ? (
                  <p className="text-red-500 text-xs italic">{errState.err}</p>
                ) : null}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Email
                </label>
                <input
                  onKeyUp={() => {
                    handleEmail();
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errEmail.bool ? "border-red-500" : null
                  } rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white`}
                  id="grid-first-name"
                  type="text"
                  placeholder="user@email.com"
                />
                {errEmail.bool ? (
                  <p className="text-red-500 text-xs italic">{errEmail.err}</p>
                ) : null}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Phone no
                </label>
                <input
                  onKeyUp={() => {
                    handlePhone();
                  }}
                  onChange={(e) => setPhone(e.target.value)}
                  name="phone"
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errPhone.bool ? " border-red-500" : null
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="grid-last-name"
                  type="number"
                  placeholder="7012234346"
                />
                <p className="text-red-500 text-xs italic">
                  {errPhone.bool ? errPhone.err : null}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2"></div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Company name
                </label>
                <input
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border   rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="Albuquerque"
                  required
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-zip"
                >
                  Zip
                </label>
                <input
                  onChange={(e) => setZip(e.target.value)}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-zip"
                  type="text"
                  placeholder="90210"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Describe your team and backgroud
                </label>
                <textarea
                  onChange={(e) => setTeamDescription(e.target.value)}
                  name="team_decription"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Describe your company and product
                </label>
                <textarea
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  name="company_decription"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid"
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Describe the problem you are trying to solve?
                </label>
                <textarea
                  onChange={(e) => setDescribeProblem(e.target.value)}
                  name="company_decription"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  What is unique about your solution?
                </label>
                <textarea
                  onChange={(e) => setUniqueAbout(e.target.value)}
                  name="company_decription"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  What is your value proposition htmlFor the customer ?
                </label>
                <textarea
                  onChange={(e) => setProposition(e.target.value)}
                  name="company_decription"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className="w-full px-3">
                <button className=" mt-5 md:w-1/2    border pl-3 pr-3   h-10 rounded-md text-white text-center font-bold bg-blue-600">
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Application;
