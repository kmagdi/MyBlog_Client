import React,{useState} from 'react'
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
import { Welcome } from './components/Welcome';
import { EditPost } from './components/EditPost';
import { AdminPage } from './components/AdminPage';
import {NewPassword} from './components/NewPassword';
//import axios from 'axios';
import { ConfirmProvider } from 'material-ui-confirm';
import {CategProvider} from './contexts/CategContext'
import { UserProvider } from './contexts//UserContext';
import {AdminProvider} from './contexts/AdminContext';


function App() {
   const [posts,setPosts]=useState([])
   const [loggedIn,setLoggedIn] = useState(false)
  return (
    <CategProvider>
      <AdminProvider>
      <UserProvider>
        <ConfirmProvider>
          <HashRouter >
            <TopBar  posts={posts} setLoggedIn={setLoggedIn} />
            <Routes>
              <Route path="/" element={<Home  posts={posts} setPosts={setPosts}/>} />
              <Route path="/admin/:tableName" element={loggedIn ? <AdminPage /> : <Login setLoggedIn={setLoggedIn}/>}/>
              <Route path="/posts/:postId/:imageId" element={<Single   />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/write" element={loggedIn ? <Write  /> : <Login setLoggedIn={setLoggedIn}/>}/>
              <Route path="/settings" element={loggedIn ? <Settings  setLoggedIn={setLoggedIn}/>  : <Login setLoggedIn={setLoggedIn}/>} />
              <Route path="/login" element={loggedIn ? <Home  posts={posts} setPosts={setPosts}/> : <Login setLoggedIn={setLoggedIn}/>} />
              <Route path="/register" element={ <Register />} />
              <Route path="/confirm/:confirmationCode" element={<Welcome />} />
              <Route path="/updatepassword/:token" element={<NewPassword />} />
              <Route path="/editPost/:postId" element={<EditPost />}/>
            </Routes>
          </HashRouter>
        </ConfirmProvider>
      </UserProvider>
      </AdminProvider>
    </CategProvider>
  );
}

export default App;
