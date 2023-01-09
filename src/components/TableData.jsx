import React,{useContext,useEffect} from 'react'
import {CategContext} from '../contexts/CategContext'
import { PostsContext } from '../contexts/PostsContext';
import { UsersContext } from '../contexts/UsersContext';
import {MyTable} from './MyTable'


export const TableData=({tableName})=> {
    const {categ}= useContext(CategContext)
    const {state: { status, data }, asyncDispatch,deletePost}= useContext(PostsContext)
    const {users}=useContext(UsersContext)

    useEffect(()=> {
      asyncDispatch()
    },[])

   console.log(tableName,users,'-TableData')
    const categData = React.useMemo(() =>categ,[categ])
    const postsData = React.useMemo(() =>data,[data])
    const usersData = React.useMemo(() =>users,[users])
   
    const categColumns = React.useMemo(() => [
        {
          Header: 'Azonosító',
          accessor: 'id', // accessor is the "key" in the data
          disableFilters:true
        },
        {
          Header: 'Kategóriák',
          accessor: 'name', // accessor is the "key" in the data
        },
        {
          Header:'',
          id:'delete',
          accessor: str => '❌',
          disableFilters:true, 
          disableSortBy: true
        }
      ],[])

      const postsColumns = React.useMemo(() => [
        {
          Header: 'Azonosító',
          accessor: 'id', // accessor is the "key" in the data
          disableFilters:true
        },
        {
          Header: 'Cím',
          accessor: 'title', // accessor is the "key" in the data
        },
        {
          Header: 'ImageId',
          accessor: 'image_id',
          disableFilters:true, 
          disableSortBy: true,
        },
        {
          Header:'',
          id:'delete',
          accessor: str => '❌',
          disableFilters:true, 
          disableSortBy: true,

          Cell: (row)=> (<span style={{cursor:'pointer'}}  
              onClick={() =>deletePost({id:row.row.values.id,imageId:row.row.values.image_id})}>❌</span>)
        }
      ],[])

      const usersColumns = React.useMemo(() => [
        {
          Header: 'Azonosító',
          accessor: 'id', // accessor is the "key" in the data
          disableFilters:true
        },
        {
          Header: 'Email cím',
          accessor: 'email', // accessor is the "key" in the data
        },
        {
          Header: 'Felhasználó',
          accessor: 'username', // accessor is the "key" in the data
        },
        {
          Header: 'Besorolás',
          accessor: 'role', // accessor is the "key" in the data
        },
        {
          Header: 'Sztátusz',
          accessor: 'status', // accessor is the "key" in the data
        },
        {
          Header:'',
          id:'delete',
          accessor: str => '❌',
          disableFilters:true, 
          disableSortBy: true
        }
      ],[])

  return (
    <>
{status ==='finished' ?
    <div>
       <MyTable data={tableName==='categorie'? categData : (tableName==='users'? usersData : postsData)} 
                columns={tableName==='categorie'? categColumns: (tableName==='users'? usersColumns : postsColumns)}/>
    </div>
    :
    <div>loading...{status}</div>
}
    </>
 )
}
