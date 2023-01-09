import React,{useEffect, useContext} from 'react'
import { Header } from './Header'
import {Posts} from './Posts'
import { Sidebar} from './Sidebar'
import axios from 'axios'
import {CategContext} from '../contexts/CategContext'


export const Home=({setPosts,posts})=> {
  const {selCateg}=useContext(CategContext)
  
  useEffect(()=> {
    fetchPosts()
  },[selCateg])

  //console.log('admin=',admin)
  const fetchPosts=async ()=>{
    let url= selCateg===0? '/posts':'/posts/categ/'+selCateg
    try {
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
