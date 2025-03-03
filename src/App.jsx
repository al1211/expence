import React from "react"
import {
 BrowserRouter as Router ,
 Routes,
 Route,
 Navigate,
}from "react-router-dom";

import Login from "./pages/Auth/Login"
import SingUp from "./pages/Auth/SingUp"
import Home from "./pages/Dashboard/Home"
import Income from "./pages/Dashboard/Income"
import Expence from "./pages/Dashboard/Expence"
function App() {
  

  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Root/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/singup" element={<SingUp/>}/>
        <Route path="/dashboard" element={<Home/>}/>
        <Route path="/income" element={<Income/>}/>
        <Route path="/expence" element={<Expence/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App;

const Root =()=>{
  // Check if token exits on localStorage 

  const isAuthenticated=!!localStorage.getItem("token");

  // Redirect to dashboard if authenticated , otherwise login
  return isAuthenticated?(
    <Navigate to="/dashboard"/>
  ):(
    <Navigate to="/login"/>
  )
}
