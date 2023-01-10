import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useForm } from 'react-hook-form';
const apiURL="https://myblog-9922.onrender.com"

export const Register=()=> {
  const [successfull,setSuccessfull]=useState(false)
  const [msg,setMsg]=useState('')
  const [validUsername,setValidUsername]=useState(true)
  const [validEmail,setValidEmail]=useState(true)

  useEffect(()=>{
    setMsg('')
    if(!validUsername)
      setMsg('foglalt felhasználónév!')
    if(!validEmail)
      setMsg(msg+' foglalt email cím!!')
  },[validUsername,validEmail])

  const {
    register,
    handleSubmit,
    formState: { errors },
      } = useForm();
  const onSubmit = (data) =>{
    console.log(data);
    const url=apiURL+'/auth/register'
    sendData(url,data)
  } 

  const sendData =async (url,formdata)=>{
    const resp=await axios.post(url,formdata,{headers:{'Content-Type': 'application/json'}})
    const data=await resp.data
    resp.status===200 ? setSuccessfull(true) : setSuccessfull(false)
    setMsg(data.message)
  }

  const checkUsername=(e)=>{
    if(e.target.value.length>0){
      const url=apiURL+'/auth/checkUsername'
      sendUsername(url,{"username": e.target.value})
    }
  }
  const sendUsername=async (url,obj)=>{
    const resp=await axios.post(url,obj)
    const data=await resp.data[0]
    data.nr==1 ? setValidUsername(false):setValidUsername(true)
  }
  const checkEmail=(e)=>{
    if(e.target.value.length>0){
      const url=apiURL+'/auth/checkEmail'
      sendEmail(url,{"email": e.target.value})
    }
  }
  const sendEmail=async (url,obj)=>{
    const resp=await axios.post(url,obj)
    const data=await resp.data[0]
    data.nr==1 ? setValidEmail(false):setValidEmail(true)
  }


  return (
    <div className="register">
      <div className="position-absolute top-50 start-50 translate-middle">
        <h3 className="text-center">Regisztráció</h3>
       <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('username',{ required: true, maxLength:20 })} 
            className={validUsername ? "form-control mb-1" : "form-control mb-2 border border-danger"}
            placeholder="felhasználónév"
            onBlur={(e)=>checkUsername(e)}/>
            {errors.userName && <p className="err">a felhasználónév megadása kötelező</p>}
        <input {...register('email', { required: true })} className="form-control mb-2" placeholder="email"
            onBlur={(e)=>checkEmail(e)}/>
            {errors.email && <p className="err">email cím megadása kötelelező</p>}
        <input type="password" {...register('password', { required: true })} className="form-control mb-2" placeholder="jelszó" />
        {errors.password && <p className="err">hibás jelszó</p>}
        <input type="submit" 
          className={validUsername&&validEmail? "btn btn-success form-control rounded":"btn btn-danger form-control rounded" }
          disabled={!validUsername || !validEmail}/>
    </form>
    <div>{msg}</div>
  </div>
    </div>
  )
}
