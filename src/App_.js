import React,{useEffect, useState} from 'react'
import { HashRouter,Routes,Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import './App.css';
import {TopBar} from './components/TopBar'
import {Home} from './components/Home'
import {Write} from './components/Write'
import {Register} from './components/Register'
import {Login} from './components/Login'
import {Settings} from './components/Settings'
import {Single} from './components/Single'
import {Contact} from './components/Contact'
import {Logout} from './components/Logout'
import { Welcome } from './components/Welcome';
import { EditPost } from './components/EditPost';
//import axios from 'axios';
import { ConfirmProvider } from 'material-ui-confirm';
import {MyContextProvider} from './MyContext'
import { UserProvider } from './UserContext';

import { set } from 'react-hook-form';

function App() {
 /* const [user,setUser]=useState(localStorage.getItem('user')?localStorage['user']:false);
  const [userName,setUserName]=useState(localStorage.getItem('userName')?localStorage['userName']:'');
  const [userId,setUserId]=useState( localStorage.getItem('userId')?localStorage['userId']:0);*/
  const [posts,setPosts]=useState([])
  /*const [avatar,setAvatar]=useState('')
  const [userStory,setUserStory]=useState('')*/
/*
  useEffect(() => {
    localStorage.setItem('user',user)
    localStorage.setItem('userName',userName)
    localStorage.setItem('userId',userId)
  },[user,userName,userId,avatar])
*/
  return (
    <MyContextProvider>
      <UserProvider>
        <ConfirmProvider>
          <HashRouter >
            <TopBar user={user} userName={userName} posts={posts} avatar={avatar}/>
            <Routes>
              <Route path="/" element={<Home   admin={false} posts={posts} setPosts={setPosts}/>} />
              <Route path="/aboutme" element={<Home    admin={true} posts={posts} setPosts={setPosts}/>}/>
              <Route path="/posts/:postId/:imageId" element={<Single   userId={userId}/>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/write" element={ userName ? <Write userId={userId} /> : <Register />} />
              <Route path="/settings" element={ userName ? <Settings userId={userId} avatar={avatar} userStory={userStory} 
                  setAvatar={setAvatar} setUserStory={setUserStory}/> : <Register />} />
              <Route path="/login" element={ userName ? <Home   posts={posts} setPosts={setPosts}/> 
                : <Login setUser={setUser} setUserName={setUserName} setUserId={setUserId} setAvatar={setAvatar} setUserStory={setUserStory}/>} />
              <Route path="/register" element={ userName ? <Home  posts={posts} setPosts={setPosts}/> : <Register />} />
              <Route path="/logout" element={<Logout setUser={setUser}  setUserName={setUserName} setUserId={setUserId} posts={posts} setPosts={setPosts}/>} />
              <Route path="/confirm/:confirmationCode" element={<Welcome setUser={setUser}/>} />
              <Route path="/editPost/:postId" element={user? <EditPost /> : <Login/>}/>
            </Routes>
          </HashRouter>
        </ConfirmProvider>
      </UserProvider>
    </MyContextProvider>
  );
}

export default App;
