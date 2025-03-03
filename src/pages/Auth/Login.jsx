import React, { useState } from "react";
import AuthLayouts from "../../components/Layout/AuthLayouts";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";

import { validateEmail } from "../../utils/helpers";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // handlelogin form submit

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please enter valid email address.")
      return;
    }
    if(!password){
      setError("Please enter the password")
      return;
    }

    setError("");

    // Login API  call
  };
  return (
    <AuthLayouts>
      <div className="lg-w[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6 ">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Adress"
            placholder="anil@gmail.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placholder="Min 8 Character"
            type="password"
          />

          {error&& <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">LOGIN</button>
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account ?{" "}
            <Link className="font-medium text-primary underline" to="/singup">
            SingUp</Link>
          </p>
        </form>
      </div>
    </AuthLayouts>
  );
};

export default Login;
