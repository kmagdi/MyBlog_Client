import React from 'react'
import {Post} from './Post'


export const Posts=({posts})=> {

  return (
    <div className="posts mt-3" data-testid="posts-component">
     {posts.length>0 && posts.map(obj=><Post key={obj.id} {...obj}/>)}
     {posts.length==0 && <div data-testid="div-msg">Nincs adat!</div>}
    </div>
  )
}
