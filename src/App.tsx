import './App.css'
import { Home } from './Screens/Home';
import { PlayGround } from './Screens/Playground'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from './Screens/SignUp';
import { RecoilRoot } from 'recoil';
import { LoginScreen } from './Screens/Login';
import { useEffect, useState } from 'react';
import { CreateRoom } from './Screens/CreateRoom';
import { JoinRoom } from './Screens/JoinRoom';
import { TestingPlayground } from './Screens/TestingPlayground';


function App() {
  const [isLoggedIn, setisLoggedIn] = useState<string|null>(null)
  useEffect(()=>{
    setisLoggedIn(localStorage.getItem('token'));
  },[])
  return (
    <div className="bg-black w-screen h-screen text-white">
      <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path='playground' element={ isLoggedIn ? <PlayGround /> : <LoginScreen/>} />
          <Route path='testplay' element={ isLoggedIn ? <TestingPlayground/> : <LoginScreen/> } />
          <Route path='createRoom' element={ isLoggedIn ? <CreateRoom /> : <LoginScreen/>} />
          <Route path='joinRoom' element={ isLoggedIn ? <JoinRoom /> : <LoginScreen/>} />
          <Route path='signUp' element={ <RecoilRoot><SignUp/></RecoilRoot>} />
          <Route path='login' element={<LoginScreen/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
