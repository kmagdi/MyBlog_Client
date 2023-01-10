import React,{createContext,useState,useEffect} from 'react';
import axios from 'axios';
const apiURL="https://myblog-9922.onrender.com"


export const CategContext = createContext();

export const CategProvider = (props) => {
  const [categ, setCateg] = useState([]);
  const [selCateg,setSelCateg]=useState(0)

  useEffect(() => {
    fetchCateg()
  },[])

  const fetchCateg=async () => {
    let url=apiURL+'/categ'
    try{
      const resp=await axios.get(url)
      setCateg(resp.data)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <CategContext.Provider value={{ categ ,selCateg,setSelCateg}}>
      {props.children}
    </CategContext.Provider>
  );
};
