import './App.css'
import { Home } from './Screens/Home';
import { PlayGround } from './Screens/Playground'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from './Screens/SignUp';
import { RecoilRoot } from 'recoil';


function App() {
  return (
    <div className="bg-black w-screen h-screen text-white">
      <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path='playground' element={<PlayGround />} />
          <Route path='signUp' element={ <RecoilRoot><SignUp/></RecoilRoot>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
