import React,{createContext,useState,useEffect} from 'react';
import axios from 'axios';


export const UsersContext = createContext();

export const UsersProvider = (props) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers()
  },[])

  const fetchUsers=async () => {
    const url='/auth/allUsers'
    try{
      const resp=await axios.get(url)
      setUsers(resp.data)
      console.log(users,'************************************')
    }catch(err){
      console.log(err)
    }
  }
  return (
    <UsersContext.Provider value={{ users}}>
      {props.children}
    </UsersContext.Provider>
  );
};
