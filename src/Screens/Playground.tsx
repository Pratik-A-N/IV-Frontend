import { Canvas } from "@react-three/fiber";
import Lighting from "../Components/Lighting";
import Ground from "../Components/Ground";
import Avatar from "../Components/Avatar";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import AxisLabels from "../Components/AxisLabel";
import { useEffect, useRef } from "react";
import { PerspectiveCamera as PerspectiveCameraType } from "three";
import { useRecoilValue } from "recoil";
import { RoomUsersState } from "@/Atoms/roomUsersAtom";
import OtherAvatar from "@/Components/OtherAvatar";
import { useNavigate } from "react-router-dom";
import useSocket from "@/Hooks/useSocket";
import copyToClipboard from "@/assets/icons/copy.png"
import { Button } from "@/Components/ui/button";



export function PlayGround(){
    const cameraRef = useRef<PerspectiveCameraType>();
    const allUsers = useRecoilValue(RoomUsersState);
    const navigate = useNavigate();
    const otherUsers = allUsers.filter(user => user.username != localStorage.getItem('username'));
    const currUser = allUsers.find(usr => usr.username == localStorage.getItem('username'));
    const { joinRoom } = useSocket()
    const roomId = localStorage.getItem('roomId')?? ""

    useEffect(()=>{
      let token = localStorage.getItem('token');
      let username = localStorage.getItem('username') ?? "";
      let userAvatar = localStorage.getItem('userAvatar') ?? "";
      let roomId = localStorage.getItem('roomId') ?? "";
      if(!token || !username || !userAvatar){
        alert("User Not Logged In")
        navigate("/login")
      }
      // console.log(allUsers);
      if(allUsers.length == 0){
        joinRoom(username,roomId,userAvatar);
      }
    },)

    const handleCopy = () => {
      navigator.clipboard.writeText(roomId);
      alert('Copied to clipboard!');
  };

    return (<div className="w-screen h-screen">
        <div className="absolute z-10">
          <div className="flex  w-screen justify-center">
            <div className="flex inset-0 bg-slate-700 bg-opacity-50 backdrop-blur-lg rounded-xl items-center my-2">
              <div className="px-2">Room Id: {roomId}</div>  
              <button className="bg-transparent px-1" onClick={handleCopy}>
                  <img src={copyToClipboard} className="w-8"></img>
              </button>
            </div>
          </div>
          
        </div>
        <Canvas shadows>
          <PerspectiveCamera ref={cameraRef} makeDefault position={[0,5,-10]} />
        
          <Lighting />
  
          {/* Ground Plane */}
          <Ground/>

          <Avatar cameraRef={cameraRef} user={currUser!} />
          {otherUsers.map((user) => (
              <OtherAvatar key={user.username} user={user} />
          ))}
                   
          {/* Environment - Stars */}
          <Stars />
          <axesHelper args={[5]} />
          <AxisLabels/>
        </Canvas>
      </div>)
}