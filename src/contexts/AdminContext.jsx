import React,{createContext,useState,useEffect} from 'react';
import axios from 'axios';


export const AdminContext = createContext();

export const AdminProvider = (props) => {
  const [admin, setAdmin] = useState({});
 

  useEffect(() => {
    fetchAdmin()
  },[])

  const fetchAdmin=async () => {
    let url='/auth/admin'
    try{
      const resp=await axios.get(url)
      setAdmin(resp.data[0])
    }catch(err){
      console.log(err)
    }
  }
  return (
    <AdminContext.Provider value={{ admin}}>
      {props.children}
    </AdminContext.Provider>
  );
};
