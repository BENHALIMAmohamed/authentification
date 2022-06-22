import { GET_PROFILE, GET_PROFILE_SUCCESS, LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER, REGISTER_FAIL, REGISTER_SUCCESS } from "./actionTypes"
import axios from "axios"

export const signup = (newUser) => async(dispatch) => {
    dispatch({
        type:REGISTER
    })
    try {
        const res = await axios.post("/user/register",newUser)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:REGISTER_FAIL,
            payload:error.response.data
        })
    }
}


export const singin = (user) => async(dispatch) => {
    dispatch({
        type:LOGIN
    })
    try {
        const res = await axios.post("/user/login",user)
        localStorage.setItem("token",res.data.token)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:{
                user:res.data.user,
                token:res.data.token
            }
        })
    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data
        })
    }
}


export const getProfile  = () =>async(dispatch)=> {
    dispatch({
        type:GET_PROFILE
    })
const token=localStorage.getItem("token")
const config = {
    headers : {
        Authorization:token
    }
}
  try {
    const res = await axios.get("/user/auth",config)
    console.log(res)
    dispatch({
        type:GET_PROFILE_SUCCESS,
        payload:res.data
    })
  } catch (error) {
  alert('get profile error')
  }
}