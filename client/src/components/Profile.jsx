import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getProfile } from '../redux/actions'

const Profile = () => {
    const {user,auth} = useSelector(state=>state)
    const dispatch = useDispatch()
    useEffect(() => {
   dispatch(getProfile())
    }, [])
    
  return (
    <div>
        {
            !localStorage.getItem('token') ? 
            <Navigate to="/login"/>
            :
            <div>

        {user&&
            <div>
            <h2> {user.fullName} </h2>
            <p>  {user.email} </p>
        </div>
        }
        </div>
        }
    </div>
  )
}

export default Profile