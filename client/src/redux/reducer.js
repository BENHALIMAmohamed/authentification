import { GET_PROFILE, GET_PROFILE_FAIL, GET_PROFILE_SUCCESS, LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER, REGISTER_FAIL, REGISTER_SUCCESS } from "./actionTypes";


const init = {
    user:null,
    loading:false,
    errors:null,
    token:null,
    auth:false
}


const reducer = (state=init,{type,payload})=> {
    switch (type) {
        case REGISTER :
        case LOGIN:
        case GET_PROFILE:
        return {
            ...state,loading:true
        }
    case REGISTER_SUCCESS:
        return {
            ...state,loading:false,user:payload,errors:null
        }
    case LOGIN_SUCCESS:
        return {
                ...state,loading:false,user:payload.user,token:payload.token
            }
    case GET_PROFILE_SUCCESS:
        return {
            ...state,loading:false,user:payload,auth:true
        }
    case LOGIN_FAIL:
    case GET_PROFILE_FAIL:
        return {
            ...state,loading:false,errors:payload.errors.map(el=>el)
        }
    
        default:
            return state
    }
}

export default reducer