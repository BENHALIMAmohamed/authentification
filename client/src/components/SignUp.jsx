import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { signup } from '../redux/actions'

const SignUp = () => {
    const {errors,user,loading} = useSelector(state=>state)
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const handleSubmit  = (e) => {
        e.preventDefault();
        const newUser = {
            fullName,
            email,
            password,
            phone
        }
        dispatch(signup(newUser))
    }


  return (
    <div>
        {
loading ? 
<h2>loading</h2>
:user? <Navigate to="/login" />
:
        <form   onSubmit={handleSubmit} action=""   style={{display:"flex",flexDirection:"column",width:'50%',marginLeft:"20%"}} >
            <label htmlFor="">Name</label>
            <input type="text"  value={fullName} onChange={(e)=>setFullName(e.target.value)}  />
            <label htmlFor="">Phone</label>
            <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} />
            <label htmlFor="">Email</label>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <label htmlFor="">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button>Register</button>
        </form>
        }

    {
        errors&&
        <div>
            {
                errors.map(el=>
                    <h2 style={{color:"red"}}>
        {el}
    </h2>
                    )
            }
        </div>
        
    }
    </div>
  )
}

export default SignUp