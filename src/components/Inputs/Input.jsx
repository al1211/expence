import React, { useState } from 'react'
import {FaRegEye,FaRegEyeSlash} from "react-icons/fa6"
const Input = ({value,onChange,label,placholder,type}) => {
    const [showPassword,setShowPassword]=useState(false);
    const toogleShowPassword=()=>{
        setShowPassword(!showPassword);
    };
  return (
    <div>
        <label  className="text-[15px] text-slate-800 mb-20" >{label}</label>
        <div className='input-box'>
            <input type={type=="password"?showPassword?"text":"password":type}
            placeholder={placholder}
            className="w-full bg-transparent outline-none"
            value={value}
            onChange={(e)=>onChange(e)}
            />

            {type==="password" && (
                <>
                {showPassword?(
                    <FaRegEye
                    size={21}
                    className="text-purple-600 cursor-pointer"
                    onClick={()=>toogleShowPassword()}
                    />
                ):(
                    <FaRegEyeSlash
                    size={22 }
                    className="text-slate-400 cursor-pointer"
                    onClick={()=>{toogleShowPassword()}}
                    />
                )}
                </>
            )}
        </div>
    </div>
  )
}

export default Input