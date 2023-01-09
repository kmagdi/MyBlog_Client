import React from 'react';
import {useParams} from 'react-router-dom'
import { PostsProvider } from '../contexts/PostsContext';
import { UsersProvider } from '../contexts/UsersContext';
import {TableData} from './TableData'


export const AdminPage=()=> {
  const {tableName}=useParams()
 
  return(<>
    <PostsProvider>
      <UsersProvider>
         <TableData tableName={tableName}/>
      </UsersProvider>
    </PostsProvider>
   
  </>)
}