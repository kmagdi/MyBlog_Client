import React from 'react'
import { useNavigate } from 'react-router-dom'
import {MyImage} from './MyImage'


export const Post=({id,title,ctg_name,username,image,image_id,updated_at,created_at})=> {
  const navigate=useNavigate()

  return (
    <div className="post">
    <div className="rounded border  d-flex justify-content-center p-2">
      <MyImage image={image} title={title} id={id} image_id={image_id}/>
    </div>
        
   
      <div className="d-flex flex-column align-items-center ">
        <div>
            <span className="m-1 text-secondary" role="button">{ctg_name}</span>
        </div>
        <h5 className="text-center mt-2 border-bottom pb-3" role="button" onClick={()=>navigate('/posts/'+id+'/'+image_id)}>
            {title}
        </h5>
        <span className="fst-italic text-secondary">{updated_at ? updated_at : created_at}</span>
        <span className="mt-1 postDescription">Feltöltötte:<strong>{username}</strong></span>
    </div>
</div>
  )
}
