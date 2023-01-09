import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MyImage } from './MyImage'


export const Post=({id,title,ctg_name,username,body,image,image_id})=> {
  const navigate=useNavigate()
  return (
    <div className="post">

      <div className="d-flex justify-content-center p-2 rounded">
        {image_id && <MyImage title={title} image={image}/>}
      </div>
      <div className="d-flex flex-column align-items-center ">
        <div>
            <span className="m-1 text-secondary" role="button">{ctg_name}</span>
        </div>
        <h5 className="text-center mt-2 border-bottom pb-3" role="button" onClick={()=>navigate('/posts/'+id+'/'+image_id)}>
            {title}
        </h5>
        <span className="fst-italic text-secondary">1 órával ezelőtt</span>
        <p className="mt-1 postDescription">{body}</p>
    </div>
</div>
  )
}
