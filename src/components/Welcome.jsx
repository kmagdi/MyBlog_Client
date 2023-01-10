import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams,NavLink } from 'react-router-dom'
const apiURL="https://myblog-9922.onrender.com"

export const Welcome=()=> {
    const params=useParams()
    console.log('kliens:',params.confirmationCode)
    const url=apiURL+'/auth/confirm/'
    useEffect(()=> { 
        verifyUser(url,params.confirmationCode)
    },[])

    const verifyUser=async (url, code) => {
        try {
            const resp=await axios.get(url+code)
            const data=await resp.data
            console.log(data)
        }catch(err) {
            console.log(err.message)
        }
    }

  return (
    <div>
      <div className="jumbotron">
          <h3>A fiokod aktiválva van.</h3>
          <NavLink to={"/login"}>Kérlek jelentkezz be...</NavLink>
      </div>
    </div>
  )
}
