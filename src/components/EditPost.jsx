import React,{useState,useEffect,useContext} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {CategContext} from '../contexts/CategContext'
import {Story} from './Story'

export const EditPost=()=> {
  const { categ } = useContext(CategContext);
  const params=useParams()
  console.log('edit post:',params)
  const { register, handleSubmit, formState: { errors },reset } = useForm();
  const [postCateg,setpostCateg] =useState(0)
  const [successfull,setSuccessfull]=useState(false)
  const [msg,setMsg]=useState('')
  const [post,setPost]=useState({})
  const [story,setStory]=useState('')

  useEffect(()=>{
    setpostCateg(post.categ_id)
    reset()
  },[post])

  useEffect(()=>{
    fetchPost()
  },[msg])

  const fetchPost = async () => {
    try {
        const resp = await axios.get(`/posts/${params.postId}`);
        console.log('válasz:',resp.data[0])
        setPost(resp.data[0])
    } catch (err) {
        console.error(err);
    }
  };

  const onSubmit = (data) => {
   console.log('adatok-kliens oldal:',data);
   const url=`/posts/${post.id}`
    sendData(url,data)
    reset()
}
const sendData=async (url,formdata)=>{
  const formData=new FormData()
  formData.append('title',formdata.title)
  formData.append('categ_id',postCateg)
  formData.append('story',story)
  const resp=await axios.put(url,formData)
  const data=await resp.data
  resp.status===200 ? setSuccessfull(true):setSuccessfull(false)
  setMsg(data.message)
}
console.log('editpost',post)
console.log('postcateg=',postCateg)
  return (
    <div className="row justify-content-center mx-auto w-75 write" >
           {post.image && <img src={post.image}  alt="hegy" className="  border p-0 rounded-3" />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex align-items-center">
                    <input type="text" className="form-control m-2" placeholder="cím" 
                      {...register("title", {required: true})} defaultValue={post.title}/>
                    <div className="err">{errors.title && <span> cím megadása kötelező</span>}</div>
                    <input disabled={postCateg==0}  className="btn btn-primary" type="submit" value="Mentés"/>
                </div>
                <div className="row">
                  <div className="col-md-6">
                  <select className="form-select m-2" {...register("categ_id")} onChange={(e)=>setpostCateg(e.target.value)} value={postCateg}>
                      {categ.map(obj => (
                        <option key={obj.id} value={obj.id}  >
                          {obj.name}
                        </option>
                      ))}
                  </select>
                  </div>
                   <div className={successfull? "col-md-6 text-success":"col-md-6 text-danger"}>{msg}</div>
                </div> 
                {post.body && <Story story={post.body} setStory={setStory}/>}
                {/*<textarea name="" id="story" cols="30" rows="10" className="form-control" defaultValue={post.body}
                  {...register("story", {required: true})} placeholder="mondd el a történeted..." ></textarea>  
                      <div className="err">{errors.story && <span>hiányzik a történet...</span>}</div>*/}
            </form>
           
    </div>
  )
}
