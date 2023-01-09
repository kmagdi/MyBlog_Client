import axios from 'axios';
import React, { useEffect, useState,useContext } from 'react'
import { useForm } from 'react-hook-form';
import emptyavatar from './avatar.svg'
import { UserContext } from '../contexts/UserContext';



export const Login=({setLoggedIn})=> {
  const [typedEmail,setTypedEmail]=useState('')
  const [newPassword,setNewPassword]=useState('')

  const {user,loginUser}=useContext(UserContext)
  const {register, handleSubmit,formState: { errors },} = useForm();
  const [msg,setMsg]=useState('')

 const onSubmit = (data) =>{
    console.log(data);
    let url='/auth/login'
    sendData(url,data)
  } 

  const sendData=async (url,formdata)=>{
    try{
      const resp=await axios.post(url,formdata,{headers:{'Content-Type':'application/json'}})
      const data=await resp.data
      console.log('szerver oldalról:',data)
      const userData={
        userId:data.userId,
        userName:data.username,
        avatar:data.avatar,
        userStory:data.userStory,
        role:data.role
      }
      loginUser(userData)
      setLoggedIn(true)
    }catch(err){
        console.log(err.message)
        console.log(err.response.status)
        if(err.response.status==401){
          loginUser(user)
          setMsg(err.response.data.message)
        }else
          setMsg(err.message)
    }
  }

  const handleUpdatePassword=()=>{
    let url='/auth/updatePassword'
    sendEmail(url,{email:typedEmail,newPassword:newPassword})
  }

  const sendEmail=async (url,obj)=>{
    const resp=await axios.post(url,obj)
    const data=await resp.data
    console.log(data)
    setMsg(data.message)
  }


  return (
    <div className="login">
      <div className="position-absolute top-50 start-50 translate-middle">
        <h3 className="text-center">Bejelentkezés</h3>
       <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email', { required: true })} className="form-control mb-2" placeholder="email" onChange={(e)=>setTypedEmail(e.target.value)}/>
        {errors.email && <p className="err">email cím megadása kötelelező</p>}
        <input type="password" {...register('password', { required: true })} className="form-control mb-2" placeholder="jelszó" onChange={(e)=>setNewPassword(e.target.value)} />
        {errors.password && <p className="err">hibás jelszó</p>}
        <input type="submit" className="btn btn-success form-control rounded"/>
    </form>
    <div className="text-danger">{msg}</div>
    <div className="btn btn-outline-secondary w-100 mt-1" onClick={handleUpdatePassword}>forget/reset password</div>
  </div>
    </div>
  )
}
