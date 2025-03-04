import React, { useState } from "react";
import AuthLayouts from "../../components/Layout/AuthLayouts";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";

import { validateEmail } from "../../utils/helpers";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

const SingUp = () => {
  const [profilePic,setProfilePic]=useState(null);
  const [fullName,setFullName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");


const [error,setError]=useState(null);
const navigate=useNavigate();

//  handle singup form submit

const handleSingUp= async (e)=>{
  e.preventDefault();

  let profileImageUrl="";
  if(!fullName){
    setError("plese Enter your name.");
    return;
  }
  if(!validateEmail(email)){
    setError("please enter a valid email address.");
    return;


  }

  if(!password){
    setError("please enter the password")
    return;
  }
  setError("");
  // SingUp API call
}
  return (
    <AuthLayouts>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Join us today by entering your details below.</p>

        <form onSubmit={handleSingUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
            value={fullName}
            onChange={({target})=>setFullName(target.value)}
            label="Full Name"
            placholder="Anil"
            type="text"
            />
             <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Adress"
            placholder="anil@gmail.com"
            type="text"
          />



<div className="col-span-2">

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placholder="Min 8 Character"
            type="password"
            />
            </div>
          </div>
{error&& <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">SING UP</button>
          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
            Login</Link>
          </p>
        </form>
      </div>
    </AuthLayouts>
  )
}

export default SingUp