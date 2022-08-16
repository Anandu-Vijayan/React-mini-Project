
import {
  AuthPageContext,
  AuthSignupPageContext,
} from "../Context/AuthPageContext";
import React, { useContext } from 'react'
import Header from '../Components/Header/Header'
import Landing from "./client/LandingPage";

function Home() {
  const { showSignup, setShowSignup } = useContext(AuthSignupPageContext);
  const { showLogin, setShowLogin } = useContext(AuthPageContext);
 useContext(()=>{
  setShowSignup(false)
  setShowLogin(false)

 },[])


  return (

    <div>
   <Header/>
  

    <Landing/>

    </div>

    
  )
}

export default Home