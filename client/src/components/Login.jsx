import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { singin } from '../redux/actions'

const Login = () => {
    const {errors,user,loading} = useSelector(state=>state)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const handleSubmit=(e)=>{
        e.preventDefault();
        const user = {
            email,
            password
        }
        dispatch(singin(user))
    }
  return (
    <div>
        {
            loading? <h2>loading...</h2>
            : localStorage.getItem("token") ?
               <Navigate to="/profile" />
               :
         
         <form   onSubmit={handleSubmit} action=""   style={{display:"flex",flexDirection:"column",width:'50%',marginLeft:"20%"}} >
        <label htmlFor="">Email</label>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <label htmlFor="">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button>Login</button>
            </form>
        }
    </div>
  )
}

export default Login