import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { validateImage } from "image-validator";
import emptyavatar from './avatar.svg'
import FileDrop from './FileDrop'
import {UserContext} from '../contexts/UserContext'
import {Story} from './Story'
import { SpinnerCircular } from 'spinners-react';
import {useConfirm} from 'material-ui-confirm'
const apiURL="https://myblog-9922.onrender.com"

export const Settings=({setLoggedIn})=> {
  const navigate = useNavigate()
  const {user,updateUser,logoutUser}=useContext(UserContext)
  const [story,setStory]=useState(user.userStory)
  const [successful,setSuccessFul]=useState(false)
  const [msg,setMsg] =useState('')
  const [selFile,setSelFile] = useState({})
  const [updateing, setUpdateing] = useState(false);
  const confirm=useConfirm()
  
console.log('user.avatar=',user.avatar)
  const onUpdateSubmit = () =>{
    console.log('onUpdateSubmit-mentés:',story)
    if(selFile.length>0)
        verify(selFile[0])
    else
      sendData(apiURL+`/auth/updateUserData/${user.userId}`)//ha nem cserél a felhasználó képet
  } 

  const onDeleteSubmit=()=>{
    let url=apiURL+`/auth/deleteUserData/${user.userId}`
    confirm({description:`Biztosan ki szeretnéd törölni a fiokodat?`})
        .then(()=>{delUser(url)})
        .catch(()=>{console.log('confirm box hiba!')})
  }
  const verify=async (file)=>{
    const isValidImage = await validateImage(file);
    isValidImage && sendData(apiURL+`/auth/updateUserData/${user.userId}`)//amikor megvan a válasz csak akkor menjen a kérés a szerverre
  }
  
  const sendData=async (url) =>{
    setUpdateing(true)
    const formData=new FormData()
    if(selFile.length>0)
        formData.append('image',selFile[0])
    formData.append('story',story)
    try {
      const resp=await axios.put(url,formData)
      const data=await resp.data
      setMsg(data.message)
      if(resp.status===200){
          setSuccessFul(true)
          user.userStory=story
          if(data.avatar)
            user.avatar=data.avatar
          updateUser(user)
          setUpdateing(false)
      }else
        setSuccessFul(false)  
    }catch(e){
      setSuccessFul(false)
      setMsg(`'Fájlfeltöltési hiba' : ${e.message}`)
    }
  }

  const delUser=async (url) =>{
    console.log('delUser:',url)
    setUpdateing(true)
    try {
      const resp=await axios.delete(url)
      const data=await resp.data
      setMsg(data.message)
      if(resp.status===200){
          setSuccessFul(true)
          const userData={
            userId:0,
            userName:'',
            avatar:'',
            userStory:''
          }
          logoutUser(userData)
          setLoggedIn(false)
          navigate('/')
          setUpdateing(false)
      }else
        setSuccessFul(false)  
    }catch(e){
      setSuccessFul(false)
      setMsg(`Hiba : ${e.message}`)
    }
  }

  
  return (
    <div className="row justify-content-center mx-auto w-75 write" >
  
            <img src={user.avatar?user.avatar:emptyavatar} alt="avatar" className="  border rounded-3 avatar" />

            <form >
                <div className="d-flex align-items-center justify-content-between"> 

                    <div className="files">
                          <FileDrop setSelFile={setSelFile} setMsg={setMsg}/>
                    </div>
                    {updateing && <SpinnerCircular />}
                  {msg?<div>{msg}</div>:''}
                </div>
                <Story story={story} setStory={setStory}/>
            </form>
            <button className="btn btn-primary m-2" onClick={onUpdateSubmit} > mentés </button>
            <button  className="btn btn-danger m-2" onClick={onDeleteSubmit} > felhasználói fiók TÖRLÉSE </button>

    </div>
  )
}
