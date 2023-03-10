import React,{useEffect, useContext} from 'react'
import { Header } from './Header'
import {Posts} from './Posts'
import { Sidebar} from './Sidebar'
import axios from 'axios'
import {CategContext} from '../contexts/CategContext'
const apiURL="https://myblog-9922.onrender.com"

export const Home=({setPosts,posts})=> {
  const {selCateg}=useContext(CategContext)
  
  useEffect(()=> {
    fetchPosts()
  },[selCateg])

  //console.log('admin=',admin)
  const fetchPosts=async ()=>{
    let url= selCateg===0? apiURL+'/posts':apiURL+'/posts/categ/'+selCateg
    try {
      console.log("home-ban:",url)
      const resp=await axios.get(url)
      setPosts(resp.data)
    }catch(err){
      console.log(err)
    }
  }
//console.log(posts)

  return (
    <>
     <Header />
     <div className="row">
       <Posts posts={posts} />
       <Sidebar />
     </div>

    </>
  )
}
