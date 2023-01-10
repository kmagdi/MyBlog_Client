import React,{useState,useContext} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { validateImage } from "image-validator";
//import Files from 'react-files'
import FileDrop from './FileDrop'
import {CategContext} from '../contexts/CategContext'
import {Story} from './Story'
import {UserContext} from '../contexts/UserContext'
import { SpinnerCircular } from 'spinners-react';
const apiURL="https://myblog-9922.onrender.com"

export const Write=()=> {
  const {user}=useContext(UserContext)
  const { categ } = useContext(CategContext);
  const {register, handleSubmit,formState: { errors }} = useForm();
  const [postCateg,setPostCateg]=useState(0)
  const [successful,setSuccessFul]=useState(false)
  const [msg,setMsg] =useState('')
  const [selFile,setSelFile] = useState({})
  const [story,setStory]=useState('')
  const [updateing, setUpdateing] = useState(false);
  
  const onSubmit = (data) =>{
    if(selFile.length>0)
        verify(data,selFile[0])
  } 

  const verify=async (data,file)=>{
    console.log('verify:',file)
    const isValidImage = await validateImage(file);
    //setValidImg(isValidImage)
    isValidImage && sendData(apiURL+'/posts',data)//amikor megvan a válasz csak akkor menjen a kérés a szerverre
  }
  
  const sendData=async (url, fdata) =>{
    const formData=new FormData()
    //formData.append('image',fdata.image[0])
    formData.append('image',selFile[0])
    formData.append('title',fdata.title)
    formData.append('user_id',user.userId)
    formData.append('categ_id',fdata.categ_id)
    formData.append('story',story)
    setUpdateing(true)
    try {
      const resp=await axios.post(url,formData)
      const data=await resp.data
      console.log(data)
      setMsg(data.message)
      resp.status===200 ? setSuccessFul(true):setSuccessFul(false)
      setUpdateing(false)
    }catch(e){
      //console.log('write-catch:',Object.keys(e))
      //console.log('write-catch:',e.response)
      //console.log('write-catch:',Object.keys(e.response))
      setSuccessFul(false)
      setMsg(`'Fájlfeltöltési hiba' : ${e.message}`)
    }
  }
console.log('selFile=',selFile)
console.log('A fájl mérete:',selFile.length>0 ? selFile[0].sizeReadable : 0)
console.log('story:',story)
  return (
    <div className="row justify-content-center mx-auto w-75 write" >
  
            <img src="https://i.ibb.co/1K2p1K7/2-min.jpg" alt="hegy" className="header-img  border p-0 rounded-3" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex align-items-center justify-content-between">

              {/*      <label htmlFor="file"><i className="fa-solid fa-circle-plus fa-2xl " role="button"></i></label>
                    <input type="file"  accept="image/*" className="form-control"
                      {...register("image",{required:true})}/>
                      <div className="err">{errors.image&&<span>nincs kiválasztva a képfájl</span>}</div> */}

                    <div className="files">
                          <FileDrop setSelFile={setSelFile} setMsg={setMsg}/>
                    </div>

                    <input type="text" className="form-control m-2 postTitle" placeholder="cím"
                        {...register("title",{required:true})} />
                     <div className="err">{errors.title && <span>a cím megadása kötelező</span>}</div>
                    
                    <input disabled={postCateg==0 } type="submit" className="btn btn-primary m-2" value="publikálás" />
                </div>
                <div className="row">
                  <div className="col-md-6">
                      <select  className="form-select m-2" {...register("categ_id")} onChange={(e)=>setPostCateg(e.target.value)}>
                        <option value="0">válassz kategóriát...</option>
                        {categ.map(obj=>(
                            <option value={obj.id} key={obj.id}>{obj.name}</option>                  
                        ))}

                      </select>
                  </div>
                  <div className="col-md-6">{msg}</div>
                  {updateing && <SpinnerCircular />}
                </div>
                <Story setStory={setStory}/>
                {/*<textarea  cols="30" rows="10" className="form-control"
                  {...register("story",{required:true})} placeholder="mondd el a történeted..."></textarea>
                        <div className="err">{errors.story && <span>hiányzik a történet...</span>}</div>*/}
            </form>
            

    </div>
  )
}
