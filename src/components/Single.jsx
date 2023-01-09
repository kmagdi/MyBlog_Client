import React from 'react'
import {Sidebar} from './Sidebar'
import {SinglePost} from './SinglePost'
import {useParams} from 'react-router-dom'

export const Single=()=> {
  const {postId,imageId} = useParams()
  return (
    <div className="row">
      <SinglePost  postId={postId} imageId={imageId}/>
      <Sidebar  />
    </div>
  )
}
