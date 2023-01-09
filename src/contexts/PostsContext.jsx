import React,{createContext,useReducer} from 'react';
import axios from 'axios'

const apiURL="https://myblog-9922.onrender.com"
//payload=hasznos teher
  const reducer = (state, {type,payload})=> {
    switch(type){
      case 'loading':
          return {status: "loading"}
      case 'finished':
        return { status: "finished", data: payload };
      case 'DELETE_POST':
        console.log('payload:',payload)
        delPost(payload)
        return {status:'finished', data: state.data.filter(obj=>obj.id!=payload.id)}
     default:
        return state
       
  }                               
}

const delPost=async ({id,imageId}) => {
  const resp = await axios.delete(apiURL+`/posts/${id}/${imageId}`)
  console.log('delPost:',resp.data)
}
  const initState = {
    status: "idle"//tétlen
  };
  

export const PostsContext = createContext();

export const PostsProvider = ({children}) => {
  const [state,dispatch]=useReducer(reducer,initState)

  const asyncDispatch =async () => { // adjust args to your needs
    dispatch({ type: "loading" });
    try {
        const resp=await axios.get(apiURL+'/posts')
        dispatch({ type: "finished", payload: resp.data });
      }catch(err){
        console.log(err)
      }
  };
 
  //action:
  function deletePost({id,imageId}){
    dispatch({
        type: 'DELETE_POST',
        payload:{id:id,imageId:imageId}
    })
}
  return (
    <PostsContext.Provider value={{state,asyncDispatch,deletePost}}>
      {children}
    </PostsContext.Provider>
  );
};
