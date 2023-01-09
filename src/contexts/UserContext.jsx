import React,{createContext,useReducer} from 'react'

const user={
    userId:0,
    userName:'',
    avatar:'',
    userStory:'',
    role:''
}
 
//létrehozzuk a globális state-t
export const UserContext =createContext(user)

//ahhoz, h a többi komponens hozzáférjen a globális sate-hez szükséges egy Provider(intéző) komponens:
export const UserProvider=({children})=>{
    const [state,dispatch]=useReducer(AppReducer,user)

    //action:
   
    function updateUser(user){
        dispatch({
            type: 'UPDATE_USER',
            payload:user
        })
    }
    function loginUser(user){
        dispatch({
            type: 'LOGIN_USER',
            payload:user
        })
    }
    function logoutUser(user){
        dispatch({
            type: 'LOGOUT_USER',
            payload:user
        })
    }
    return(
        <UserContext.Provider value={{user:state,updateUser,logoutUser,loginUser}}> 
            {children}
        </UserContext.Provider>
    )
}

//a global state-en a komponensek különböző tipusú műveleteket hajthatnak végre, definiálni kell
// a lehetséges műveleteket:
const AppReducer=(state, action)=>{
    switch(action.type) {
        case 'UPDATE_USER':
            return action.payload
        case 'LOGIN_USER':
            console.log('AppReducer:',action.payload)
            return action.payload
        case 'LOGOUT_USER':
            return action.payload
        default:
            return state
    }
}
