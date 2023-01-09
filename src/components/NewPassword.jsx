import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams,NavLink } from 'react-router-dom'

export const NewPassword=()=> {
    const params=useParams()
    console.log('kliens:',params.token)
    const url='/auth/activateNewPassword/'
    useEffect(()=> { 
        activateNewPassword(url,params.token)
    },[])

    const activateNewPassword=async (url, code) => {
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
          <h3>A fiokod új jelszava aktiválva van.</h3>
          <NavLink to={"/login"}>Kérlek jelentkezz be...</NavLink>
      </div>
    </div>
  )
}
